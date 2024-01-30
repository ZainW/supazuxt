<script lang="ts" setup>
async function signup(e: Event) {
	const result = await useFetch("/api/signup", {
		method: "POST",
		body: new FormData(e.target as HTMLFormElement)
	});
	if (!result.error.value) {
		await navigateTo("/");
	}
}
</script>

<template>
	<h1>Create an account</h1>
	<form method="post" action="/api/login" @submit.prevent="signup">
		<label htmlFor="username">Username</label>
		<input name="username" id="username" />
		<br />
		<label htmlFor="password">Password</label>
		<input type="password" name="password" id="password" />
		<br />
		<button>Continue</button>
	</form>
</template>
