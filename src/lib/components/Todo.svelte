<script lang="ts">
	import { enhance } from '$app/forms';

	export let id: string;
	export let title = '';
	export let description = '';
	export let isdone = false;
	export let duedate = '';

	export let onEdit: () => void;

	// TODO NEXT
	// Wrap in form to update, call requestSubmit on:checked:
	let form: HTMLFormElement;
</script>

<form bind:this={form} method="POST" action="?/update" use:enhance>
	<input type="hidden" id="id" name="id" value={id} />
	<input type="hidden" id="title" name="title" value={title} />
	<input type="hidden" id="description" name="description" value={description} />
	<input type="hidden" id="duedate" name="duedate" value={duedate} />

	<aside class="todo">
		<details>
			<summary>
				<input
					id="isdone"
					name="isdone"
					type="checkbox"
					checked={isdone}
					on:change={(e) => form.requestSubmit()}
				/>
				{title}
			</summary>
			{#if duedate}
				<p>
					Due: {duedate}
				</p>
			{/if}
			<p>
				{description}
			</p>
			<button on:click={onEdit}>Edit Todo</button>
		</details>
	</aside>
</form>

<style>
	.todo {
		display: flex;
		align-items: center;
		padding: 5px 1.5rem;
		margin: 3px 0;
	}
	form {
		border: none;
		box-shadow: none;
		padding: 0;
		min-width: 0;
	}
	details {
		flex: 1 1 auto;
		margin: 0;
	}
	details > summary {
		list-style: none;
	}
	summary {
		position: relative;
	}
	summary::marker {
		content: none;
	}
	summary::after {
		content: ' ◀';
		position: absolute;
		right: 0px;
	}
	details[open] summary::after {
		content: ' ▼';
	}
</style>
