<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const items = computed(() => [{
  label: 'Características',
  to: '#features',
  active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('pricing')
}, {
  label: 'Planes',
  to: '#pricing',
  active: activeHeadings.value.includes('pricing')
}, {
  label: 'Testimonios',
  to: '#testimonials',
  active: activeHeadings.value.includes('testimonials') && !activeHeadings.value.includes('pricing')
}])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#features'),
    document.querySelector('#pricing'),
    document.querySelector('#testimonials')
  ].filter(Boolean) as Element[])
})
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="text-2xl font-bold">
        PrimerPaso.com
      </NuxtLink>
    </template>

    <template #right>
      <UNavigationMenu
        :items="items"
        variant="link"
        class="hidden lg:block"
      />

      <UButton
        to="login"
        color="secondary"
        label="Inicia Sesión"
        variant="subtle"
        class="hidden lg:block"
      />

      <UButton
        to="register"
        color="primary"
        label="Regístrate"
        variant="subtle"
        class="hidden lg:block"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
      <UButton
        color="primary"
        class="mt-4"
        label="Student Portal"
        variant="subtle"
        block
      />
      <UButton
        color="secondary"
        class="mt-4"
        label="Company Portal"
        variant="subtle"
        block
      />
    </template>
  </UHeader>
</template>
