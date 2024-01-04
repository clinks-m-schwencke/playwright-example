<script lang="ts">
	// TODO
	import '../mvp.css';
	// import '../ress.css';
	export let data;
</script>

<header>
	<nav>
		<a href="/">Showcase</a>
		<div>
			{#if !data.user}
				<a href="/login"><strong>Login</strong></a>
				<a href="/register"><em>Sign up</em></a>
			{:else}
				<form action="/logout" method="POST">
					<button type="submit">Log out</button>
				</form>
			{/if}
		</div>
	</nav>
</header>
<section>
	<slot />
</section>

<style>
	nav {
		margin-bottom: 0;
	}
	form {
		border: none;
		box-shadow: none;
		padding: 0;
		min-width: 0;
	}
</style>
