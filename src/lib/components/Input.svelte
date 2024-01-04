<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let id: string;
	export let label: string;
	export let type: string = 'text';
	export let disabled = false;
	export let required = false;
	let className = '';
	export { className as class };
	export let checked = false;
</script>

<div>
	<label for={id}>
		{label}
		{#if required}
			<span>*</span>
		{/if}
	</label>
	<input
		class={className}
		{type}
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		{value}
		{checked}
	/>
</div>

<style>
	input {
		width: calc(100% - 1.6rem);
	}
	span {
		color: red;
	}
</style>
