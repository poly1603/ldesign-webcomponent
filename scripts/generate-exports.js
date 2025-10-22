/**
 * 生成组件按需导入的 package.json exports 配置
 * 自动扫描 src/components 目录并生成导出映射
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, '../src/components');
const packageJsonPath = path.join(__dirname, '../package.json');

// 获取所有组件目录
function getComponentDirs() {
  const items = fs.readdirSync(componentsDir);
  return items.filter(item => {
    const itemPath = path.join(componentsDir, item);
    const stat = fs.statSync(itemPath);
    return stat.isDirectory() && item !== 'base';
  });
}

// 将组件名转换为 kebab-case
function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// 生成 exports 配置
function generateExports() {
  const components = getComponentDirs();
  const exports = {
    '.': {
      import: './dist/index.js',
      require: './dist/index.cjs.js',
      types: './dist/types/index.d.ts'
    },
    './loader': {
      import: './loader/index.js',
      require: './loader/index.cjs.js',
      types: './loader/index.d.ts'
    },
    './dist/*': './dist/*',
    './components/*': './dist/components/*',
    './styles/*': {
      default: './src/styles/*'
    },
    './utils': {
      import: './dist/utils/index.js',
      types: './dist/types/utils/index.d.ts'
    }
  };

  // 为每个组件生成导出
  components.forEach(component => {
    const kebabName = toKebabCase(component);
    exports[`./${kebabName}`] = {
      import: `./dist/components/${component}.js`,
      types: `./dist/types/components/${component}/${component}.d.ts`
    };
  });

  return exports;
}

// 更新 package.json
function updatePackageJson() {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  packageJson.exports = generateExports();

  // 添加 sideEffects
  packageJson.sideEffects = [
    '*.css',
    '*.less',
    'dist/loader/**',
    'src/global/**'
  ];

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✅ package.json exports 配置已更新');
  console.log(`✅ 已为 ${Object.keys(packageJson.exports).length} 个导出生成配置`);
}

// 执行
try {
  updatePackageJson();
} catch (error) {
  console.error('❌ 更新失败:', error);
  process.exit(1);
}

