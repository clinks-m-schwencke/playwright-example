import { test as setup } from '@playwright/test'

import dotenv from 'dotenv'
import path from 'path'

const authFile = 'tests/auth/user.json'

dotenv.config({ path: path.resolve('.env.test.local') })

setup('ログイン', async ({ page }) => {
    // ログインページに移動する
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

    // ローカルステートに保存
    await page.context().storageState({ path: authFile })

})