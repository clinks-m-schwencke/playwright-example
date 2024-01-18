<script lang="ts">
	import { enhance } from '$app/forms';
	import Checkbox from './Checkbox.svelte';
	import DateInput from './DateInput.svelte';
	import TextArea from './TextArea.svelte';
	import TextField from './TextField.svelte';
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
	<Checkbox id="isdone" label="Done?" checked={isdone} />
	<TextField id="title" label="Title" required value={title} />
	<DateInput id="duedate" label="Due Date" value={duedate} />
	<TextArea id="description" label="Description" value={description} />

	<button type="button" on:click={onCancel}>Cancel</button>
	<button type="submit">{isNew ? 'Add Task' : 'Save Task'}</button>
</form>

<style>
	h3 {
		margin-top: 0;
	}
</style>
