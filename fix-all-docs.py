#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量修复VitePress文档中的script setup问题
将 Vue 3 的 <script setup> 语法转换为客户端纯 JavaScript
"""

import os
import re
from pathlib import Path

docs_path = Path("d:/WorkBench/ldesign/libraries/webcomponent/docs/components")

def fix_script_setup(content):
    """修复单个文件的 script setup 语法"""
    
    # 模式1: 修复残留的 onMounted
    pattern1 = r'<script>onMounted\(\(\) => \{'
    replacement1 = '<script>\nif (typeof window !== \'undefined\') {\n  window.addEventListener(\'DOMContentLoaded\', () => {'
    content = re.sub(pattern1, replacement1, content)
    
    # 模式2: 完整的 script setup
    pattern2 = r'<script setup>\s*import\s*{\s*onMounted\s*}\s*from\s*[\'"]vue[\'"]\s*\n\s*onMounted\(\(\)\s*=>\s*{'
    replacement2 = '<script>\nif (typeof window !== \'undefined\') {\n  window.addEventListener(\'DOMContentLoaded\', () => {'
    content = re.sub(pattern2, replacement2, content, flags=re.MULTILINE | re.DOTALL)
    
    # 模式3: 修复结尾的括号 - 查找 }) 后面直接跟 </script>
    pattern3 = r'}\)\s*\n</script>'
    replacement3 = '  })\n}\n</script>'
    content = re.sub(pattern3, replacement3, content)
    
    return content

def process_file(file_path):
    """处理单个文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        fixed_content = fix_script_setup(content)
        
        if fixed_content != original_content:
            with open(file_path, 'w', encoding='utf-8', newline='\n') as f:
                f.write(fixed_content)
            return True, "Fixed"
        return False, "No changes needed"
            
    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    """主函数"""
    print("开始批量修复文档...")
    print("=" * 60)
    
    fixed_count = 0
    error_count = 0
    
    for md_file in docs_path.glob("*.md"):
        changed, status = process_file(md_file)
        
        if changed:
            fixed_count += 1
            print(f"✓ {md_file.name}: {status}")
        elif "Error" in status:
            error_count += 1
            print(f"✗ {md_file.name}: {status}")
    
    print("=" * 60)
    print(f"完成！修复了 {fixed_count} 个文件")
    if error_count > 0:
        print(f"⚠ {error_count} 个文件出现错误")

if __name__ == "__main__":
    main()
