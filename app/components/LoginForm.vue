<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import * as z from 'zod'

const state = reactive({
  email: '',
  password: ''
})

const toast = useToast()

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Correo Electrónico',
  placeholder: 'Ingresa tu correo electrónico',
  required: true
}, {
  name: 'password',
  label: 'Contraseña',
  type: 'password',
  placeholder: 'Ingresa tu contraseña',
  required: true
}, {
  name: 'remember',
  label: 'Recuérdame',
  type: 'checkbox'
}]

const schema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(8, 'Debe tener al menos 8 caracteres')
})
  
type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: payload.data
    })

    toast.add({
      title: 'Login correcto',
      description: `Bienvenido ${payload.data.email}`
    })

    // Opcional: guardar el token
    if (res.token) {
      localStorage.setItem('token', res.token)
    }

    // Redirigir a otra página
    await
    navigateTo('https://google.com', { external: true })
  } catch (err: any) {
    toast.add({
      color: 'red',
      title: 'Error',
      description: err?.data?.statusMessage || 'Error desconocido'
    })
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Inicia Sesión"
        description="Ingresa tus credenciales para acceder a tu cuenta."
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
