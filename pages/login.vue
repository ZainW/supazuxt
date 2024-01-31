<script lang="ts" setup>
import type { FormError } from '#ui/types'

const fields = [{
	name: 'username',
	type: 'text',
	label: 'Username',
	placeholder: 'Enter your username'
}, {
	name: 'password',
	label: 'Password',
	type: 'password',
	placeholder: 'Enter your password'
}]

const validate = (state: any) => {
	const errors: FormError[] = []
	if (!state.username) errors.push({ path: 'username', message: 'Username is required' })
	if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
	return errors
}

async function login(data: any) {
	await useFetch("/api/login", {
		method: "POST",
		body: data,
		async onResponseError() {
			await navigateTo('/')
		}
	});
}
</script>

<template>
	<UCard class="max-w-sm w-full">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      title="Welcome back!"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      @submit="login"
    >
      <template #description>
        Don't have an account? <NuxtLink to="/signup" class="text-primary font-medium">Sign up</NuxtLink>.
      </template>

      <!--<template #password-hint>-->
      <!--  <NuxtLink to="/" class="text-primary font-medium">Forgot password?</NuxtLink>-->
      <!--</template>-->

      <!--<template #footer>-->
      <!--  By signing in, you agree to our <NuxtLink to="/" class="text-primary font-medium">Terms of Service</NuxtLink>.-->
      <!--</template>-->
    </UAuthForm>
  </UCard>
	<!--<h1>Sign in</h1>-->
	<!--<form method="post" action="/api/login" @submit.prevent="login">-->
	<!--	<label for="username">Username</label>-->
	<!--	<input name="username" id="username" />-->
	<!--	<br />-->
	<!--	<label for="password">Password</label>-->
	<!--	<input type="password" name="password" id="password" />-->
	<!--	<br />-->
	<!--	<button>Continue</button>-->
	<!--</form>-->
</template>
