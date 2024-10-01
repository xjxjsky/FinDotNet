// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


/*
你可以删除 `setupTests.ts` 文件，但要确保以下几点：

1. **内容检查**：
   - 确保 `setupTests.ts` 文件中没有重要的配置或全局设置。如果文件中包含需要的测试环境配置（如设置 Jest 和 Testing Library 的全局配置，或其他测试工具的初始化代码），那么删除它可能会影响你的测试运行。

2. **配置验证**：
   - 如果你在 `jest.config.js` 中设置了其他全局配置，并且不再需要 `setupTests.ts` 文件中包含的任何配置，那么你可以安全地删除它。

3. **后续影响**：
   - 删除后，可以运行你的测试以验证一切正常。如果发现测试失败或某些功能不工作，可能需要重新考虑删除的决定。

4. **简化配置**：
   - 如果你觉得配置文件太多导致烦乱，可以考虑将一些配置合并到 `jest.config.js` 中，前提是这样做不会影响测试的可维护性和可读性。

### 总结

如果你确认 `setupTests.ts` 文件中的内容不再需要，且你的测试在删除后依然能够正常运行，那么你可以安全地将其删除。确保在删除之前备份该文件，以防将来需要恢复。
*/