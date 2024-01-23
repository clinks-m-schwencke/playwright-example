import test, { expect } from "@playwright/test";

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env.test.local') })

test('タスクが表示する', async ({ page }) => {

    await page.goto('/login')

    // Eメールを入力する
    await page
        .getByLabel('Email')
        .fill(process.env.LOGIN_EMAIL ?? '')

    // パスワードを入力する
    await page
        .getByLabel('Password')
        .fill(process.env.LOGIN_PASSWORD ?? '')

    page.pause()

    // ログインボタンをクリック
    await page.getByRole('button', { name: 'Login' }).click()

    // ページに着くまで待つ
    await page.waitForURL('/')

    // ページに正常にきました
    await expect(page).toHaveURL('/')
    // ページタイトルの確認
    await expect(page).toHaveTitle('Todo List')

    // テスト表示
    await expect(page.getByRole('button', { name: 'test task' })).toBeVisible()
    // テストがないテキスト表示しない
    await expect(page.getByText('You have no tasks :(')).toBeHidden()

    // タスクを編集してみます
    await page.getByRole('button', { name: 'test task' }).click()
    await page.getByRole('button', { name: 'Edit Todo' }).click()

    // タスクの値を確認
    await expect(page.getByLabel('Title')).toHaveValue('test task')
    // await expect()

})

test('タスクが無いなら、ないメッセージを送ります', async ({ page }) => {

    await page.route('**/api/todo**', async (route, request) => {
        return route.fulfill({ json: [] })
    })

    await page.goto('/login')

    // Eメールを入力する
    await page
        .getByLabel('Email')
        .fill(process.env.LOGIN_EMAIL ?? '')

    // パスワードを入力する
    await page
        .getByLabel('Password')
        .fill(process.env.LOGIN_PASSWORD ?? '')

    // ログインボタンをクリック
    await page.getByRole('button', { name: 'Login' }).click()

    // ページに着くまで待つ
    await page.waitForURL('/')

    // テスト表示せず、テストがないメッセージが表示
    await expect(page.getByText('You have no tasks :(')).toBeVisible()
})
