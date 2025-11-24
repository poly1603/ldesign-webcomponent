# 批量修复文档中的 script setup 问题
$docsPath = "d:\WorkBench\ldesign\libraries\webcomponent\docs\components"
$files = Get-ChildItem -Path $docsPath -Filter "*.md"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # 替换 <script setup> 为客户端脚本
    $content = $content -replace '<script setup>\s*import \{ onMounted \} from ''vue''\s*', '<script>'
    $content = $content -replace 'onMounted\(\(\) => \{', 'if (typeof window !== ''undefined'') {' + "`n" + '  window.addEventListener(''DOMContentLoaded'', () => {'
    
    # 修复闭合括号
    $pattern = '(?s)(<script>.*?)(\}\)\s*</script>)'
    if ($content -match $pattern) {
        $content = $content -replace $pattern, '$1  })' + "`n" + '}' + "`n" + '</script>'
    }
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "`nAll files have been fixed!"
