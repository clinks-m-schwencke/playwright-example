import test, { expect } from "@playwright/test";

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env.test.local') })

test.describe('テストをまとめる', () => {
    // 各テストの前に実行します
    test.beforeEach(async ({ page }) => {

        const email = process.env.LOGIN_EMAIL
        const password = process.env.LOGIN_PASSWORD

        if (!email || !password) {
            expect(email).toBeTruthy()
            expect(password).toBeTruthy()
            return
        }

        // On Dev server, this will break
        await page.goto('/login')

        // Eメールを入力する
        await page.getByLabel('Email').fill(email)

        // パスワードを入力する
        await page.getByLabel('Password').fill(password)

        await expect(page.getByLabel('Email')).toHaveValue(email)
        await expect(page.getByLabel('Password')).toHaveValue(password)

        // ログインボタンをクリック
        await page.getByRole('button', { name: 'Login' }).click()

        // ページに着くまで待つ
        await page.waitForURL('/')
    })

    test('このテストまだできていない', async ({ page }) => {
        // TODO
        test.fixme()
    })

    test('Chromeだけ対応できるテスト', async ({ page, browserName }) => {
        test.skip(browserName !== 'chromium')
        // このあとテスト...
        // ページに正常にきました
        await expect(page).toHaveURL('/')
        // ページタイトルの確認
        await expect(page).toHaveTitle('Todo List')
    })

    test('Firefox対応できないテスト', async ({ page, browserName }) => {
        test.skip(browserName === 'firefox')
        // このあとテスト...
        // ページに正常にきました
        await expect(page).toHaveURL('/')
        // ページタイトルの確認
        await expect(page).toHaveTitle('Todo List')
    })

    test('失敗するテスト(機能まだできていない)', async ({ page }) => {
        test.fail()
        // 失敗するexpectを書きます
        await expect(page.getByText('Log In')).toBeVisible()
    })

    test('タスクが表示する', async ({ page }) => {
        // ページに正常にきました
        await expect(page).toHaveURL('/')
        // ページタイトルの確認
        await expect(page).toHaveTitle('Todo List')

        // テスト表示
        await expect(page.getByTestId('todo-title').first()).toBeVisible()
        // テストがないテキスト表示しない
        await expect(page.getByText('You have no tasks :(')).toBeHidden()

        // toHaveTextはぴったりじゃない場合エラー
        await expect(page.getByTestId('todo-title').first()).toHaveText('test task 02/02/2024')
        // toContainTextは部分だけでOK
        await expect(page.getByTestId('todo-title').first()).toContainText('test task')

        // タスクを編集してみます
        await page.getByTestId('todo-title').first().click()
        await page.getByRole('button', { name: 'Edit Todo' }).first().click()

        // タスクの値を確認
        await expect(page.getByLabel('Title')).toHaveValue('test task')
        // await expect()
        await expect(page.getByLabel('Due Date')).toHaveValue('2024-02-02')
        await expect(page.getByLabel('Description')).toHaveValue('A description for the test task')

    })



    test('タスクを追加', async ({ page }) => {

        // POSTを実際に送らないよう
        await page.route('**/api/todo**', async (route, request) => {
            if (request.method() !== 'POST') {
                return route.continue()
            }
            // POSTのレスポンスを作る
            return route.fulfill({
                json: {
                    id: '12345678',
                    title: 'NEW TASK',
                }
            })
        })
        // テスト表示せず、テストがないメッセージが表示
        await page.getByRole('button', { name: 'Add New Task' }).click()
        await page.getByLabel('Title').fill('NEW TASK')

        await page.getByRole('button', { name: 'Add Task' }).click()

        await expect(page.getByText('NEW TASK', { exact: true })).toBeVisible()
    })

})

test.describe('タスクの無いテスト', () => {

    test.beforeEach(async ({ page, context }) => {

        await context.route('**/api/todo**', async (route, request) => {
            if (request.method() !== 'GET') {
                return route.continue()
            }
            return route.fulfill({ json: [] })
        })

        const email = process.env.LOGIN_EMAIL
        const password = process.env.LOGIN_PASSWORD

        if (!email || !password) {
            expect(email).toBeTruthy()
            expect(password).toBeTruthy()
            return
        }

        // On Dev server, this will break
        await page.goto('/login')

        // Eメールを入力する
        await page.getByLabel('Email').fill(email)

        // パスワードを入力する
        await page.getByLabel('Password').fill(password)

        await expect(page.getByLabel('Email')).toHaveValue(email)
        await expect(page.getByLabel('Password')).toHaveValue(password)

        // ログインボタンをクリック
        await page.getByRole('button', { name: 'Login' }).click()

        // ページに着くまで待つ
        await page.waitForURL('/')
    })

    test('タスクが無いなら、ないメッセージを送ります', async ({ page }) => {
        // テスト表示せず、テストがないメッセージが表示
        await expect(page.getByText('You have no tasks :(')).toBeVisible()
    })

})
