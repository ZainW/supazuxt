<script lang="ts" setup>
import type { FormError } from '#ui/types'

const fields = [{
  name: 'username',
  type: 'text',
  label: 'Username',
  placeholder: 'Enter your username',
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
}]

function validate(state: any) {
  const errors: FormError[] = []
  if (!state.username)
    errors.push({ path: 'username', message: 'Username is required' })
  if (!state.password)
    errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

async function login(data: any) {
  await $fetch('/api/login', {
    method: 'POST',
    body: data,
    async onResponse() {
      await navigateTo('/')
    },
  })
}
</script>

<template>
  <UCard class="max-w-sm w-full">
    <UAuthForm
      :fields="fields" :validate="validate" title="Welcome back!" align="top" icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }" @submit="login"
    >
      <template #description>
        Don't have an account? <NuxtLink to="/signup" class="text-primary font-medium">
          Sign up
        </NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
  <!-- </form> -->
</template>
