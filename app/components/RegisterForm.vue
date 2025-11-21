<script setup lang="ts">
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import * as z from 'zod'

const toast = useToast()

// Campos visibles en el formulario
const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    required: true
  }
]

// Validación con Zod
const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener mínimo 8 caracteres')
})

type Schema = z.output<typeof schema>

// Submit del formulario
async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    const res = await $fetch('/api/auth/signup', {
      method: 'POST',
      body: payload.data
    })

    toast.add({
      title: 'Registro exitoso',
      description: `Bienvenido ${payload.data.email}`
    })

    console.log('Signup response:', res)

    // Redirige al login (o a donde tú quieras)
    navigateTo('/login')
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
  <div class="flex flex-col items-center justify-center p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        title="Crear cuenta"
        description="Regístrate para acceder a tu nueva cuenta."
        icon="i-lucide-user-plus"
        :fields="fields"
        :schema="schema"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
