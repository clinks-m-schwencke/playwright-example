import type { ITodo } from "$lib/types/todo";
import { expect, type Locator, type Page } from "@playwright/test";

export class TodoPageModel {
    readonly page: Page

    readonly url = "/"
    readonly title = "Todo List"

    readonly addTaskButton: Locator
    readonly tasks: Locator
    readonly noTaskText: Locator
    readonly taskEditButtons: Locator
    readonly saveTaskButton: Locator

    readonly taskForm: {
        title: Locator,
        description: Locator,
        duedate: Locator
    }

    constructor(page: Page) {
        this.page = page

        this.addTaskButton = page.getByRole('button', { name: 'Add New Task' })
        this.tasks = page.getByTestId('todo-title')
        this.noTaskText = page.getByText('You have no tasks :(')
        this.taskEditButtons = page.getByRole('button', { name: 'Edit Todo' })
        this.saveTaskButton = page.
            getByRole('button', { name: 'Add Task' }).
            or(page.getByRole('button', { name: 'Save Task' }))

        this.taskForm = {
            title: page.getByLabel('Title'),
            duedate: page.getByLabel('Due Date'),
            description: page.getByLabel('Description')
        }
    }

    async goto() {
        await this.page.goto('/')
        await this.page.waitForResponse('/api/todo')
    }

    async openAddTaskForm() {
        await this.addTaskButton.click()
    }

    async startEditTask(index: number) {
        await this.tasks.nth(index).click()
        await this.taskEditButtons.nth(index).click()
    }

    async setTaskFormInput(key: keyof ITodo, value: any) {
        switch (key) {
            case 'title':
                this.taskForm.title.fill(value.toString())
                break
            case 'duedate':
                this.taskForm.duedate.fill(value)
                break
            case 'description':
                this.taskForm.description.fill(value)
                break
        }
    }

    async saveTask() {
        await this.saveTaskButton.click()
    }

    /**
     * ページが正常ロード完了の確認
     */
    async expectPageLoaded() {
        await expect(this.page).toHaveURL(this.url)
        await expect(this.page).toHaveTitle(this.title)
    }

    async expectTaskVisible(isVisible = true) {
        await expect(this.tasks.first()).toBeVisible({ visible: isVisible })
        await expect(this.noTaskText).toBeVisible({ visible: !isVisible })
    }

    async expectTaskToHaveText(index: number, text: string, exact: boolean = false) {
        if (exact) {
            await expect(this.tasks.nth(index)).toHaveText(text)
        } else {
            await expect(this.tasks.nth(index)).toContainText(text)
        }
    }

    async expectTaskFormInputToHaveValue(key: keyof Omit<ITodo, 'id' | 'isdone'>, value: string) {
        await expect(this.taskForm[key]).toHaveValue(value)
    }

    async expectFormToHaveValues(values: Omit<ITodo, 'id' | 'isdone'>) {
        const keys = Object.keys(values)
        for (const key of keys) {
            // Typescriptのため、タイプを設定
            const todoKey = key as keyof Omit<ITodo, 'id' | 'isdone'>
            await this.expectTaskFormInputToHaveValue(todoKey, values[todoKey])
        }
    }
}