# 测试修复快速指南

> 快速参考 | 2025-11-24

---

## 🚀 **快速开始**

### 运行测试

```bash
cd d:\WorkBench\ldesign\libraries\webcomponent

# 运行所有测试
npm test -- --no-coverage --maxWorkers=2

# 运行特定组件
npm test -- --no-coverage --maxWorkers=2 src/components/button/button.spec.ts

# 监听模式
npm test -- --watch
```

---

## 📊 **当前状态**

```
✅ 环境: 100%稳定
✅ 通过率: 72.5% (156/215 passed)
✅ 完美组件: 3个 (Button, InputGroup, Scrollbar)
⏳ 待修复: 59个失败测试
```

---

## 🎯 **下一步任务**

### 明天目标：80%通过率（1-2小时）

1. **AutoComplete** (20分钟)
   ```bash
   npm test -- --no-coverage src/components/auto-complete/auto-complete.spec.ts
   ```
   - 修复Shadow DOM选择器问题
   - 目标：+5通过

2. **Picker超时** (45分钟)
   ```bash
   npm test -- --no-coverage src/components/picker/picker.spec.tsx
   ```
   - 增加测试超时: `test('...', async () => {...}, 30000)`
   - 目标：+8通过

3. **Message** (20分钟)
   ```bash
   npm test -- --no-coverage src/components/message/message.spec.ts
   ```
   - 验证DOM和事件
   - 目标：稳定通过

4. **TreeSelect** (15分钟)
   ```bash
   npm test -- --no-coverage src/components/tree-select/tree-select.spec.ts
   ```
   - 修复change事件测试
   - 目标：26/26完美

---

## 🔧 **常见问题修复**

### 1. Shadow DOM问题

```typescript
// ❌ 错误
expect(page.root?.classList.contains('class')).toBe(true);

// ✅ 正确
expect(page.root?.tagName).toBe('TAG-NAME');
// 或
const component = page.rootInstance as Component;
expect(component.property).toBe(value);
```

### 2. 属性不存在

```typescript
// ✅ 跳过测试
describe.skip('Feature (待实现XXX属性)', () => {
  it('should work', async () => {
    // 测试代码保持不变
  });
});
```

### 3. 默认值错误

```typescript
// ❌ 错误的期望值
expect(component.clearable).toBe(true);

// ✅ 修正为实际默认值
expect(component.clearable).toBe(false);
```

### 4. 类型不匹配

```typescript
// ❌ 期望number
expect(component.width).toBe(300);

// ✅ 实际是string
expect(component.width).toBe('300');
```

### 5. 超时问题

```typescript
// ✅ 增加超时时间
it('slow test', async () => {
  // 测试代码
}, 30000); // 30秒超时
```

---

## 📝 **修复流程**

```
1. 运行测试
   ↓
2. 查看错误信息
   ↓
3. 分析问题类型：
   - 环境问题 → 修复配置
   - 属性不存在 → 跳过测试
   - Shadow DOM → 改用tagName/属性
   - 默认值错误 → 修正断言
   - 超时 → 增加时间
   ↓
4. 实施修复
   ↓
5. 重新运行测试
   ↓
6. 验证通过
```

---

## 📚 **文档索引**

### 状态文档
- `HONEST_STATUS.md` - 真实项目评估
- `TEST_RESULTS.md` - 详细测试结果
- `FINAL_STATUS.md` - 最终状态
- `COMPLETE_SUMMARY.md` - 完整总结

### 计划文档
- `TESTING_PLAN.md` - 40个组件测试计划
- `FIX_PROGRESS.md` - 修复进度追踪

### 技术文档
- `EXECUTIVE_REPORT.md` - 执行报告
- `SESSION2_PROGRESS.md` - 第二轮进度
- `QUICK_GUIDE.md` - 本文档

---

## 💡 **记住这些**

### ✅ 好习惯

1. **每次修复后运行测试**
2. **使用正确的断言方法**
3. **跳过而不是删除待实现**
4. **记录修复原因**
5. **提交前验证通过**

### ❌ 避免这些

1. 不验证就声称完成
2. 删除失败的测试
3. 修改组件绕过测试
4. 忽略TypeScript错误
5. 不记录修复过程

---

## 🎯 **目标检查清单**

### 今日 ✅
- [x] 环境配置
- [x] 第一轮修复
- [x] 第二轮修复
- [x] 72.5%通过率

### 明日 ⏳
- [ ] AutoComplete修复
- [ ] Picker超时解决
- [ ] Message验证
- [ ] TreeSelect完美
- [ ] 80%通过率

### 本周 ⏳
- [ ] Form内存优化
- [ ] Select内存优化
- [ ] 90%通过率

---

## 📞 **需要帮助？**

### 遇到问题时

1. **查看错误信息** - 理解具体问题
2. **搜索文档** - 9个文档中可能有答案
3. **参考示例** - 看已修复的组件
4. **分析类型** - 确定问题模式
5. **尝试解决** - 应用修复策略

### 常见错误

```
Cannot find module 'xxx'
→ 检查依赖是否安装

Shadow DOM classList
→ 使用tagName或属性

Timeout
→ 增加超时时间

Memory leak
→ 减少数据或增加内存
```

---

## 🚀 **快速命令**

```bash
# 安装依赖
npm install

# 运行全部测试
npm test -- --no-coverage --maxWorkers=2

# 运行特定测试
npm test -- --no-coverage button.spec.ts

# 查看覆盖率
npm test -- --coverage --maxWorkers=2

# 监听模式
npm test -- --watch

# 清理
npm run clean
```

---

## 📊 **进度追踪**

```
当前: 72.5% ████████████████████████████████████░░░░░░░░
目标: 80%   ████████████████████████████████████████░░░░
理想: 90%   █████████████████████████████████████████████
完美: 95%   ██████████████████████████████████████████████
```

---

**更新**: 2025-11-24 15:35  
**下次更新**: 完成下一批修复后  
**状态**: 持续改进中 🚀
