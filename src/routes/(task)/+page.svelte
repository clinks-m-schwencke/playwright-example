<script lang="ts">
	import Todo from '$lib/components/Todo.svelte';
	import TodoForm from '$lib/components/TodoForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let editingIndex = -1;
	let isAddingTask = false;

	$: console.log(data);
</script>

<main>
	<h1>Todo List!</h1>
	{#if data.tasks.length > 1}
		{#each data.tasks as task, index}
			{#if editingIndex === index}
				<TodoForm
					{...task}
					onSave={() => (editingIndex = -1)}
					onCancel={() => (editingIndex = -1)}
				/>
			{:else}
				<Todo {...task} onEdit={() => (editingIndex = index)} />
			{/if}
		{/each}
	{:else}
		<p>You have no tasks :(</p>
	{/if}
	{#if isAddingTask}
		<TodoForm isNew onSave={() => (isAddingTask = false)} onCancel={() => (isAddingTask = false)} />
	{:else}
		<button on:click={() => (isAddingTask = true)}>Add New Task</button>
	{/if}
</main>
