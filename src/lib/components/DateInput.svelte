<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let id: string;
	export let label: string;
	export let disabled = false;
	export let required = false;
	let className = '';
	export { className as class };

	$: {
		console.log(value);
	}
</script>

<div>
	<label>
		{label}
		{#if required}
			<span>*</span>
		{/if}
		<input
			class={className}
			type="date"
			{placeholder}
			{required}
			{disabled}
			{id}
			name={id}
			bind:value
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
