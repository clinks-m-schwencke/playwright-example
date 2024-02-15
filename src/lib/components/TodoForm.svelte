<script lang="ts">
	import type { ITodo } from '$lib/types/todo';
	import Checkbox from './Checkbox.svelte';
	import DateInput from './DateInput.svelte';
	import TextArea from './TextArea.svelte';
	import TextField from './TextField.svelte';

	export let onSave: (newTodo: ITodo) => void;
	export let onCancel: () => void;

	export let id = '';
	export let isdone = false;
	export let isNew = false;
	export let title: string = '';
	export let description: string = '';
	export let duedate: string = '';

	async function handleSubmit() {
		const request = {
			id: id || undefined,
			isdone,
			title,
			description,
			duedate
		};
		console.log(request);
		const res = await fetch('/api/todo', {
			method: isNew ? 'POST' : 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request)
		});
		const json = await res.json();
		// 日付を掃除
		json.duedate = json.duedate ? json.duedate.split(' ')[0] : '';
		onSave(json);
	}
</script>

<form method="post" on:submit|preventDefault={handleSubmit}>
	<input id="id" name="id" type="hidden" value={id} />
	<h3>{isNew ? 'New Todo' : 'Edit Todo'}</h3>
	<Checkbox id="isdone" label="Done?" bind:checked={isdone} />
	<TextField id="title" label="Title" required bind:value={title} />
	<DateInput id="duedate" label="Due Date" bind:value={duedate} />
	<TextArea id="description" label="Description" bind:value={description} />

	<button type="button" on:click={onCancel}>Cancel</button>
	<button type="submit">{isNew ? 'Add Task' : 'Save Task'}</button>
</form>

<style>
	h3 {
		margin-top: 0;
	}
</style>
