<script lang="ts">
	import Todo from '$lib/components/Todo.svelte';
	import TodoForm from '$lib/components/TodoForm.svelte';
	import type { ITodo } from '$lib/types/todo';

	let editingIndex = -1;
	let isAddingTask = false;

	let tasks: ITodo[];
	async function getTodos() {
		const res = await fetch('api/todo');
		const json = await res.json();
		// Clean up dates
		tasks = json.map((task: ITodo) => ({ ...task, duedate: task.duedate.split(' ')[0] }));
	}

	const onSaveEdit = (index: number) => (newTodo: ITodo) => {
		if (!tasks || tasks.length === 0) {
			return;
		}
		tasks[index] = newTodo;
		tasks = tasks; // Reset State
		editingIndex = -1;
	};
	const onSaveNew = (newTodo: ITodo) => {
		if (!tasks || tasks.length === 0) {
			return;
		}
		tasks.push(newTodo);
		tasks = tasks;
		isAddingTask = false;
	};
</script>

<svelte:head>
	<title>Todo List</title>
</svelte:head>
<main>
	<h1>Todo List!</h1>
	{#await getTodos()}
		<p>Loading Todos...</p>
	{:then}
		{#if tasks && tasks.length > 0}
			{#each tasks as task, index}
				{#if editingIndex === index}
					<TodoForm {...task} onSave={onSaveEdit(index)} onCancel={() => (editingIndex = -1)} />
				{:else}
					<Todo {...task} onEdit={() => (editingIndex = index)} />
				{/if}
			{/each}
		{:else}
			<p>You have no tasks :(</p>
		{/if}
	{:catch}
		<p>Error Loading Tasks :(</p>
	{/await}
	{#if isAddingTask}
		<TodoForm isNew onSave={onSaveNew} onCancel={() => (isAddingTask = false)} />
	{:else}
		<button on:click={() => (isAddingTask = true)}>Add New Task</button>
	{/if}
</main>
