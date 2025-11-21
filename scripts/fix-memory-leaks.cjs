#!/usr/bin/env node

/**
 * 自动修复组件内存泄漏脚本
 * 
 * 功能：
 * 1. 扫描所有组件文件
 * 2. 检测内存泄漏模式
 * 3. 生成修复建议报告
 * 4. 可选：自动应用修复（需要确认）
 * 
 * 使用方法：
 *   node scripts/fix-memory-leaks.js --scan          # 扫描并生成报告
 *   node scripts/fix-memory-leaks.js --fix           # 自动修复
 *   node scripts/fix-memory-leaks.js --component button  # 修复特定组件
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// 配置
const config = {
  componentsDir: path.join(__dirname, '../src/components'),
  outputFile: path.join(__dirname, '../MEMORY_LEAK_SCAN_REPORT.md'),
  backupDir: path.join(__dirname, '../.backup'),
};

// 内存泄漏模式检测规则
const leakPatterns = [
  {
    name: 'Direct addEventListener',
    pattern: /(\w+)\.addEventListener\(/g,
    severity: 'high',
    fix: 'this.addSafeEventListener($1, ...)',
  },
  {
    name: 'Direct setTimeout',
    pattern: /(?:const|let|var)?\s*\w+\s*=\s*setTimeout\(/g,
    severity: 'high',
    fix: 'this.addSafeTimeout(...)',
  },
  {
    name: 'Direct setInterval',
    pattern: /(?:const|let|var)?\s*\w+\s*=\s*setInterval\(/g,
    severity: 'high',
    fix: 'this.addSafeInterval(...)',
  },
  {
    name: 'New ResizeObserver',
    pattern: /new\s+ResizeObserver\(/g,
    severity: 'medium',
    fix: 'this.observeResize(...)',
  },
  {
    name: 'New IntersectionObserver',
    pattern: /new\s+IntersectionObserver\(/g,
    severity: 'medium',
    fix: 'this.observeIntersection(...)',
  },
  {
    name: 'New MutationObserver',
    pattern: /new\s+MutationObserver\(/g,
    severity: 'medium',
    fix: 'this.observeMutation(...)',
  },
  {
    name: 'Direct requestAnimationFrame',
    pattern: /(?:const|let|var)?\s*\w+\s*=\s*requestAnimationFrame\(/g,
    severity: 'low',
    fix: 'this.addSafeRAF(...)',
  },
];

// 扫描结果
const scanResults = {
  totalFiles: 0,
  totalIssues: 0,
  fileIssues: [],
  summary: {
    high: 0,
    medium: 0,
    low: 0,
  },
};

/**
 * 扫描单个文件
 */
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(config.componentsDir, filePath);
  const issues = [];

  // 检查是否继承 BaseComponent
  const extendsBase = /extends\s+BaseComponent/.test(content);

  // 检测所有模式
  leakPatterns.forEach(pattern => {
    const matches = content.matchAll(pattern.pattern);
    for (const match of matches) {
      const lineNumber = content.substring(0, match.index).split('\n').length;
      issues.push({
        pattern: pattern.name,
        severity: pattern.severity,
        line: lineNumber,
        code: match[0],
        fix: pattern.fix,
      });
      scanResults.summary[pattern.severity]++;
    }
  });

  if (issues.length > 0) {
    scanResults.fileIssues.push({
      file: relativePath,
      extendsBase,
      issues,
    });
    scanResults.totalIssues += issues.length;
  }

  scanResults.totalFiles++;
}

/**
 * 扫描所有组件
 */
async function scanComponents() {
  console.log('🔍 扫描组件目录...');

  const files = await glob('**/*.tsx', {
    cwd: config.componentsDir,
    absolute: true,
    ignore: ['**/base/**', '**/*.spec.tsx', '**/*.d.ts'],
  });

  console.log(`📁 找到 ${files.length} 个组件文件\n`);

  files.forEach(file => {
    scanFile(file);
  });

  return scanResults;
}

/**
 * 生成报告
 */
function generateReport(results) {
  const timestamp = new Date().toISOString();

  let report = `# 内存泄漏扫描报告\n\n`;
  report += `> **扫描时间**: ${timestamp}\n`;
  report += `> **扫描文件**: ${results.totalFiles} 个\n`;
  report += `> **发现问题**: ${results.totalIssues} 个\n\n`;

  report += `---\n\n`;

  report += `## 📊 问题统计\n\n`;
  report += `| 严重程度 | 数量 |\n`;
  report += `|----------|------|\n`;
  report += `| 🔴 High | ${results.summary.high} |\n`;
  report += `| 🟡 Medium | ${results.summary.medium} |\n`;
  report += `| 🟢 Low | ${results.summary.low} |\n`;
  report += `| **总计** | **${results.totalIssues}** |\n\n`;

  report += `---\n\n`;

  report += `## 📋 详细问题列表\n\n`;

  // 按严重程度排序
  const sortedIssues = results.fileIssues.sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 };
    const maxSeverityA = Math.min(...a.issues.map(i => severityOrder[i.severity]));
    const maxSeverityB = Math.min(...b.issues.map(i => severityOrder[i.severity]));
    return maxSeverityA - maxSeverityB;
  });

  sortedIssues.forEach((fileIssue, index) => {
    const icon = fileIssue.extendsBase ? '✅' : '❌';
    report += `### ${index + 1}. \`${fileIssue.file}\` ${icon}\n\n`;

    if (!fileIssue.extendsBase) {
      report += `⚠️ **未继承 BaseComponent**\n\n`;
    }

    report += `**问题数量**: ${fileIssue.issues.length}\n\n`;

    // 按严重程度分组
    const groupedIssues = {
      high: fileIssue.issues.filter(i => i.severity === 'high'),
      medium: fileIssue.issues.filter(i => i.severity === 'medium'),
      low: fileIssue.issues.filter(i => i.severity === 'low'),
    };

    ['high', 'medium', 'low'].forEach(severity => {
      if (groupedIssues[severity].length > 0) {
        const icon = severity === 'high' ? '🔴' : severity === 'medium' ? '🟡' : '🟢';
        report += `#### ${icon} ${severity.toUpperCase()} (${groupedIssues[severity].length})\n\n`;

        groupedIssues[severity].forEach(issue => {
          report += `- **Line ${issue.line}**: ${issue.pattern}\n`;
          report += `  \`\`\`typescript\n  ${issue.code}\n  \`\`\`\n`;
          report += `  **修复建议**: \`${issue.fix}\`\n\n`;
        });
      }
    });

    report += `---\n\n`;
  });

  report += `## 🔧 修复步骤\n\n`;
  report += `1. **让组件继承 BaseComponent**\n`;
  report += `   \`\`\`typescript\n`;
  report += `   import { BaseComponent } from '../base/base-component';\n`;
  report += `   export class YourComponent extends BaseComponent { }\n`;
  report += `   \`\`\`\n\n`;

  report += `2. **替换资源管理方法**\n`;
  report += `   - \`addEventListener\` → \`this.addSafeEventListener\`\n`;
  report += `   - \`setTimeout\` → \`this.addSafeTimeout\`\n`;
  report += `   - \`setInterval\` → \`this.addSafeInterval\`\n`;
  report += `   - \`new ResizeObserver\` → \`this.observeResize\`\n`;
  report += `   - \`new IntersectionObserver\` → \`this.observeIntersection\`\n`;
  report += `   - \`requestAnimationFrame\` → \`this.addSafeRAF\`\n\n`;

  report += `3. **删除手动清理代码**\n`;
  report += `   \`\`\`typescript\n`;
  report += `   disconnectedCallback() {\n`;
  report += `     super.disconnectedCallback(); // 一行搞定！\n`;
  report += `   }\n`;
  report += `   \`\`\`\n\n`;

  report += `## 📚 相关文档\n\n`;
  report += `- [修复模板](./COMPONENT_FIX_TEMPLATE.md)\n`;
  report += `- [BaseComponent API](./src/components/base/base-component.ts)\n`;
  report += `- [修复记录](./MEMORY_LEAK_FIXES.md)\n\n`;

  report += `---\n\n`;
  report += `**报告生成**: ${timestamp}  \n`;
  report += `**工具版本**: 1.0.0  \n`;

  return report;
}

/**
 * 保存报告
 */
function saveReport(report) {
  fs.writeFileSync(config.outputFile, report, 'utf-8');
  console.log(`\n✅ 报告已保存到: ${config.outputFile}`);
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  console.log('🚀 内存泄漏修复工具 v1.0.0\n');

  if (!command || command === '--scan') {
    // 扫描模式
    const results = await scanComponents();

    console.log('\n📊 扫描结果:');
    console.log(`   总文件: ${results.totalFiles}`);
    console.log(`   总问题: ${results.totalIssues}`);
    console.log(`   - 🔴 High: ${results.summary.high}`);
    console.log(`   - 🟡 Medium: ${results.summary.medium}`);
    console.log(`   - 🟢 Low: ${results.summary.low}`);

    const report = generateReport(results);
    saveReport(report);

    console.log('\n💡 提示:');
    console.log('   - 查看详细报告: cat MEMORY_LEAK_SCAN_REPORT.md');
    console.log('   - 查看修复模板: cat COMPONENT_FIX_TEMPLATE.md');
    console.log('   - 自动修复: node scripts/fix-memory-leaks.js --fix');

  } else if (command === '--fix') {
    console.log('⚠️  自动修复功能开发中...');
    console.log('💡 当前请手动修复，参考: COMPONENT_FIX_TEMPLATE.md');

  } else if (command === '--component') {
    const componentName = args[1];
    if (!componentName) {
      console.error('❌ 错误: 请指定组件名称');
      console.error('   用法: node scripts/fix-memory-leaks.js --component button');
      process.exit(1);
    }
    console.log(`🔍 扫描组件: ${componentName}`);
    // TODO: 实现单个组件扫描

  } else {
    console.error('❌ 未知命令:', command);
    console.error('\n用法:');
    console.error('  node scripts/fix-memory-leaks.js --scan');
    console.error('  node scripts/fix-memory-leaks.js --fix');
    console.error('  node scripts/fix-memory-leaks.js --component <name>');
    process.exit(1);
  }
}

// 运行
main().catch(err => {
  console.error('❌ 错误:', err);
  process.exit(1);
});
