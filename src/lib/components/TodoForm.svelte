<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from './Input.svelte';
	import TextArea from './TextArea.svelte';
	export let id = '';
	export let isdone = false;
	export let isNew = false;
	export let onSave: () => void;
	export let onCancel: () => void;
	export let title: string = '';
	export let description: string = '';
	export let duedate: string = '';
</script>

<form method="post" action={isNew ? '?/create' : '?/update'} use:enhance on:submit={onSave}>
	<input id="id" name="id" type="hidden" value={id} />
	<h3>{isNew ? 'New Todo' : 'Edit Todo'}</h3>
	<Input id="isdone" label="Done?" type="checkbox" checked={isdone} />
	<Input id="title" label="Title" required value={title} />
	<Input id="due" label="Due Date" type="date" value={duedate} />
	<TextArea id="description" label="Description" value={description} />

	<button type="button" on:click={onCancel}>Cancel</button>
	<button type="submit">{isNew ? 'Add Task' : 'Save Task'}</button>
</form>

<style>
	h3 {
		margin-top: 0;
	}
</style>
