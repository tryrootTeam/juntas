<template>
  <header
    :class="[
      'fixed top-0 inset-x-0 z-30 bg-cream/90 backdrop-blur border-b transition-shadow',
      isScrolled ? 'shadow-md' : 'shadow-none',
    ]"
  >
    <nav class="container-juntas flex items-center justify-between py-3 md:py-4">
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="h-8 w-8 rounded-full bg-soft-terracota flex items-center justify-center text-sm font-bold text-off-white">
          J
        </span>
        <span class="text-lg font-bold tracking-tight text-deep-plum">
          Juntas
        </span>
      </RouterLink>

      <button
        class="inline-flex items-center justify-center rounded-md border border-transparent p-2 text-charcoal hover:bg-warm-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracota focus-visible:ring-offset-2 md:hidden"
        type="button"
        :aria-expanded="mobileOpen ? 'true' : 'false'"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation"
        @click="mobileOpen = !mobileOpen"
      >
        <span v-if="!mobileOpen" class="i-heroicons-bars-3 h-5 w-5" aria-hidden="true">
          <span class="sr-only">Open menu</span>
        </span>
        <span v-else class="i-heroicons-x-mark h-5 w-5" aria-hidden="true">
          <span class="sr-only">Close menu</span>
        </span>
        <span class="sr-only">Menu</span>
        <svg
          v-if="!mobileOpen"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          class="h-6 w-6"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          class="h-6 w-6"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="hidden items-center gap-8 md:flex">
        <button
          v-if="isPublic"
          type="button"
          class="text-sm font-medium text-charcoal hover:text-soft-terracota transition"
          @click="scrollToSection('como-funciona')"
        >
          Cómo funciona
        </button>
        <button
          v-if="isPublic"
          type="button"
          class="text-sm font-medium text-charcoal hover:text-soft-terracota transition"
          @click="scrollToSection('testimonios')"
        >
          Testimonios
        </button>
        <RouterLink
          v-if="!isPublic"
          to="/dashboard"
          class="text-sm font-medium text-charcoal hover:text-soft-terracota transition"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          v-if="!isPublic"
          to="/profile"
          class="text-sm font-medium text-charcoal hover:text-soft-terracota transition"
        >
          Mi Perfil
        </RouterLink>
        <RouterLink
          v-if="!isPublic"
          to="/chat"
          class="text-sm font-medium text-charcoal hover:text-soft-terracota transition"
        >
          Chat
        </RouterLink>
        <RouterLink
          v-if="!isPublic && isAdmin"
          to="/admin"
          class="text-sm font-medium text-charcoal hover:text-soft-terracota transition"
        >
          Admin
        </RouterLink>
        <RouterLink
          :to="isPublic ? '/auth' : '/dashboard'"
          class="inline-flex items-center justify-center rounded-full border-2 border-soft-terracota px-4 py-2 text-sm font-semibold text-soft-terracota hover:bg-soft-terracota hover:text-off-white transition"
        >
          Entrar
        </RouterLink>
      </div>
    </nav>

    <div
      id="mobile-menu"
      class="md:hidden"
      :class="mobileOpen ? 'block' : 'hidden'"
    >
      <div class="space-y-1 px-4 pb-4 pt-2 border-t border-cream-400 bg-cream">
        <button
          v-if="isPublic"
          type="button"
          class="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-charcoal hover:bg-warm-sand"
          @click="handleMobileClick('como-funciona')"
        >
          Cómo funciona
        </button>
        <button
          v-if="isPublic"
          type="button"
          class="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-charcoal hover:bg-warm-sand"
          @click="handleMobileClick('testimonios')"
        >
          Testimonios
        </button>
        <RouterLink
          v-if="!isPublic"
          to="/dashboard"
          class="block rounded-md px-3 py-2 text-base font-medium text-charcoal hover:bg-warm-sand"
          @click="mobileOpen = false"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          v-if="!isPublic"
          to="/profile"
          class="block rounded-md px-3 py-2 text-base font-medium text-charcoal hover:bg-warm-sand"
          @click="mobileOpen = false"
        >
          Mi Perfil
        </RouterLink>
        <RouterLink
          v-if="!isPublic"
          to="/chat"
          class="block rounded-md px-3 py-2 text-base font-medium text-charcoal hover:bg-warm-sand"
          @click="mobileOpen = false"
        >
          Chat
        </RouterLink>
        <RouterLink
          v-if="!isPublic && isAdmin"
          to="/admin"
          class="block rounded-md px-3 py-2 text-base font-medium text-charcoal hover:bg-warm-sand"
          @click="mobileOpen = false"
        >
          Admin
        </RouterLink>
        <RouterLink
          :to="isPublic ? '/auth' : '/dashboard'"
          class="block rounded-md px-3 py-2 text-base font-semibold text-off-white bg-soft-terracota hover:bg-terracota-600 text-center"
          @click="mobileOpen = false"
        >
          Entrar
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useScrollHeader } from '@/composables/useScrollHeader'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { useUserStore } from '@/stores/user'

defineProps({
  isPublic: {
    type: Boolean,
    default: false,
  },
})

const userStore = useUserStore()
const isAdmin = computed(() => userStore.isAdmin)

const mobileOpen = ref(false)
const { isScrolled } = useScrollHeader()
const { scrollToSection } = useSmoothScroll()

const handleMobileClick = (id) => {
  mobileOpen.value = false
  scrollToSection(id)
}
</script>

