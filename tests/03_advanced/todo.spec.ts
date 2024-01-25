import { expect, test } from "../utils/testFixtures";

import dotenv from 'dotenv';
import path from 'path';
import { mockApi } from "../utils/testApiMock";

dotenv.config({ path: path.resolve('.env.test.local') })

test.describe('テストをまとめる', () => {
    test.beforeEach(async ({ todoPage }) => {
        // ページへナビゲーション
        await todoPage.goto()
        // ページに正常にきました
        await todoPage.expectPageLoaded()
    })
    test('タスクが表示する', async ({ todoPage }) => {
        // テスト表示
        await todoPage.expectTaskVisible()
        // toHaveTextはぴったりじゃない場合エラー
        await todoPage.expectTaskToHaveText(0, 'test task 02/02/2024', true)
        // toContainTextは部分だけでOK
        await todoPage.expectTaskToHaveText(0, 'test task')

        // タスクを編集してみます
        await todoPage.startEditTask(0)
        await todoPage.expectFormToHaveValues({
            title: 'test task',
            duedate: '2024-02-02',
            description: 'A description for the test task',
        })
    })



    test('タスクを追加', async ({ page, todoPage }) => {
        // FixtureがPOSTのルートをモック
        await todoPage.openAddTaskForm()
        await todoPage.setTaskFormInput('title', 'NEW TASK')
        await todoPage.saveTask()

        // いつもどおりのLocatorも使っていいです
        await expect(page.getByText('NEW TASK', { exact: true })).toBeVisible()
    })

})

test.describe('タスクの無いテスト', () => {
    test.beforeEach(async ({ context, todoPage }) => {
        await mockApi(context, 'todo', [{ method: 'GET', json: [] }])
        await todoPage.goto()
    })

    test('タスクが無いなら、ないメッセージを送ります', async ({ todoPage }) => {
        // テスト表示せず、テストがないメッセージが表示
        await todoPage.expectTaskVisible(false)
    })

})
