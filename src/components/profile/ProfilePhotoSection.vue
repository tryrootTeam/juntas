<template>
  <section class="bg-white rounded-xl border border-cream-400 p-6 flex flex-col sm:flex-row items-center gap-6">
    <div class="relative shrink-0">
      <img
        v-if="profile?.photo_url"
        :src="profile.photo_url"
        alt="Foto de perfil"
        class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-cream-400"
      />
      <div
        v-else
        class="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-sage-200 flex items-center justify-center text-3xl font-bold text-sage-700 border-2 border-cream-400"
      >
        {{ initial }}
      </div>
      <button
        type="button"
        class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-terracota text-white flex items-center justify-center shadow hover:bg-terracota-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracota focus-visible:ring-offset-2"
        aria-label="Editar foto"
        @click="$emit('edit')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
          <path d="m2.695 14.762-1.262-3.155a2 2 0 0 1 .573-2.28l.897-.897a2 2 0 0 1 2.828 0l7.586 7.586a2 2 0 0 1 0 2.828l-.897.897a2 2 0 0 1-2.28.573L5.265 16.29a2 2 0 0 1-2.57-2.528ZM14.5 3.5l2.3 2.3a.5.5 0 0 0 0-.707l-2.3-2.3a.5.5 0 0 0-.707 0l-2.3 2.3a.5.5 0 0 0 0 .707l2.3 2.3a.5.5 0 0 0 .707 0l2.3-2.3a.5.5 0 0 0 0-.707Z" />
        </svg>
      </button>
    </div>
    <div class="text-center sm:text-left">
      <h2 class="text-xl font-semibold text-deepblue">
        {{ profile?.display_name || profile?.name || 'Usuario' }}
      </h2>
      <p v-if="profile?.occupation" class="text-deepblue-300 text-sm mt-0.5">
        {{ profile.occupation }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  profile: { type: Object, default: null },
})

defineEmits(['edit'])

const initial = computed(() => {
  const n = props.profile?.name || props.profile?.display_name || 'U'
  return n.charAt(0).toUpperCase()
})
</script>
