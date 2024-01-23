<script lang="ts">
	export let placeholder = '';
	export let id: string;
	export let label: string;
	export let disabled = false;
	export let required = false;
	let className = '';
	export { className as class };
	export let checked = false;
</script>

<div>
	<label>
		{label}
		{#if required}
			<span>*</span>
		{/if}
		<input
			class={className}
			type="checkbox"
			{placeholder}
			{required}
			{disabled}
			{id}
			name={id}
			bind:checked
		/>
	</label>
</div>

<style>
	input {
		width: calc(100% - 1.6rem);
	}
	span {
		color: red;
	}
</style>
