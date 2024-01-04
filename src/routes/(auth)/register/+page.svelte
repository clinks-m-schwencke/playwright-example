<script>
	import Input from '$lib/components/Input.svelte';
</script>

<div>
	<h2>Register Account</h2>
	<p>Or <a href="/login">Login</a> if you have an account</p>
	<form action="?/register" method="post">
		<Input id="name" label="Name" />
		<Input id="email" label="Email" type="email" />
		<Input id="password" type="password" label="Password" />
		<div>
			<button type="submit">Sign Up</button>
		</div>
	</form>
</div>

<style>
	form input {
		width: calc(100% - 1.6rem);
	}
</style>
