import type { ITodo } from "$lib/types/todo";
import type { Locator, Page } from "@playwright/test";

export class TodoPage {
    readonly page: Page

    readonly addTaskButton: Locator
    readonly tasks: Locator

    readonly taskForm: {
        title: Locator,
        description: Locator,
        duedate: Locator
    }

    constructor(page: Page) {
        this.page = page

        this.addTaskButton = page.getByRole('button', { name: 'Add Task' })
        this.tasks = page.getByTestId('todo-title')

        this.taskForm = {
            title: page.getByLabel('Title *'),
            duedate: page.getByLabel('Due Date'),
            description: page.getByLabel('Description')
        }
    }

    async goto() {
        this.page.goto('/')
    }

    async openAddTaskForm() {
        this.addTaskButton.click()
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
}