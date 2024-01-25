
import { test as base } from '@playwright/test'
import { TodoPage } from '../03_advanced/todo.page'
import { mockApi } from './testApiMock'

type IFixtures = {
    todoPage: TodoPage
}
// テストもエクスポート
export { expect } from '@playwright/test'

export const test = base.extend<IFixtures>({
    page: async ({ page, context }, use) => {
        // 共通処理を行い

        // ページを使う
        await use(page)
    },
    todoPage: async ({ page, context }, use) => {
        // ページのモデルを作成
        const todoPage = new TodoPage(page)

        await mockApi(context, 'todo', [
            { method: 'POST', json: { id: '12345678', title: 'NEW TASK' } }
        ])

        // モデルを使う
        await use(todoPage)
    }

})