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
async function signup(data: any) {
  await $fetch('/api/signup', {
    method: 'post',
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
      :fields="fields" :validate="validate" title="Welcome!" align="top" icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }" @submit="signup"
    >
      <template #description>
        Have an account? <NuxtLink to="/login" class="text-primary font-medium">
          Login
        </NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
