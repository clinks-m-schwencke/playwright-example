<script>
	import Input from '$lib/components/Input.svelte';
</script>

<div>
	<h2>Login to your account</h2>
	<p>Or <a href="/register">Register</a> if you don't have an account</p>
	<form action="?/login" method="post">
		<Input type="email" id="email" label="Email" />
		<Input type="password" id="password" label="Password" />
		<div>
			<button type="submit">Login</button>
		</div>
	</form>
</div>
