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
	<label>
		{label}
		<textarea class={className} {placeholder} {required} {disabled} {id} name={id} {value} />
	</label>
</div>

<style>
	textarea {
		resize: none;
		height: 3rem;
		width: calc(100% - 1.6rem);
	}
</style>
