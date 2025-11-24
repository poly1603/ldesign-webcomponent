# 一键启动文档服务器
# 自动检查并构建组件库

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  LDesign WebComponent 文档服务器启动脚本" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# 检查 dist 目录是否存在组件文件
$distExists = Test-Path "dist/components/index.js"

if (-not $distExists) {
    Write-Host "⚠ 检测到组件库未构建" -ForegroundColor Yellow
    Write-Host "正在构建组件库，请稍候..." -ForegroundColor Yellow
    Write-Host ""
    
    npm run build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "✗ 构建失败！请检查错误信息" -ForegroundColor Red
        Write-Host ""
        pause
        exit 1
    }
    
    Write-Host ""
    Write-Host "✓ 组件库构建成功！" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "✓ 组件库已存在" -ForegroundColor Green
    Write-Host ""
}

Write-Host "启动文档服务器..." -ForegroundColor Cyan
Write-Host "访问地址: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Gray
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

npm run docs:dev
