<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let id: string;
	export let label: string;
	export let disabled = false;
	export let required = false;
	let className = '';
	export { className as class };
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
		type="text"
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		bind:value
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
