import type { BrowserContext, Page } from "@playwright/test"

type IHttpMethod =
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'OPTIONS'
    | 'DELETE'

export type IMethodOptions = {
    method?: IHttpMethod,
    json?: any
}

const testApiCommonResponse = {}

/*
 * 自動テストのためにAPIをモックする関数
 */
export const mockApi = async (
    context: BrowserContext | Page,
    apiRoute: string,
    methodList: IMethodOptions[],
    isExactRoute = false
) => {
    let modifiedRoute = apiRoute
    if (!isExactRoute) {
        modifiedRoute = `**/api/${apiRoute}**`
    }

    // APIルートをモック
    await context.route(modifiedRoute, async (route, request) => {
        // 各メソッドを実行
        for (const mock of methodList) {
            const { method, json } = mock
            if (method === undefined || request.method() === method) {
                // サーバー叩かずに共通レスポンスを使う

                return await route.fulfill({ json })
                // 共通レスポンスがあれば...
                // return await route.fulfill({ json: {...testApiCommonResponse, ...json} })
            }
        }
        await route.continue()
    })
}