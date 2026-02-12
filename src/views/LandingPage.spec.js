import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import LandingPage from './LandingPage.vue'

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'Landing', component: LandingPage },
      { path: '/register', name: 'register', component: { template: '<div>Register</div>' } },
      { path: '/auth', name: 'auth', component: { template: '<div>Auth</div>' } },
    ],
  })
}

describe('LandingPage', () => {
  it('affiche le hero avec le titre principal', async () => {
    const router = createTestRouter()
    await router.push('/')

    const wrapper = mount(LandingPage, {
      global: {
        plugins: [router],
      },
    })

    const heroTitle = wrapper.find('#hero h1')
    expect(heroTitle.exists()).toBe(true)
    expect(heroTitle.text()).toBe('Encontrar hogar juntas es más fácil')
  })

  it('affiche la section Cómo funciona avec 4 étapes', async () => {
    const router = createTestRouter()
    await router.push('/')

    const wrapper = mount(LandingPage, {
      global: {
        plugins: [router],
      },
    })

    const section = wrapper.find('#como-funciona')
    expect(section.exists()).toBe(true)

    const steps = section.findAll('li')
    expect(steps).toHaveLength(4)

    const titles = steps.map((li) => li.find('h3').text())
    expect(titles).toEqual([
      'Crea tu perfil',
      'Verifica tu identidad',
      'Encuentra tu match',
      'Conecta y busca hogar',
    ])
  })

  it('affiche la section Testimonios avec 3 témoignages', async () => {
    const router = createTestRouter()
    await router.push('/')

    const wrapper = mount(LandingPage, {
      global: {
        plugins: [router],
      },
    })

    const section = wrapper.find('#testimonios')
    expect(section.exists()).toBe(true)

    const articles = section.findAll('article')
    expect(articles).toHaveLength(3)

    const sectionText = section.text()
    expect(sectionText).toContain('María')
    expect(sectionText).toContain('Laura')
    expect(sectionText).toContain('Carmen')
  })

  it('tous les CTA principaux pointent vers /register', async () => {
    const router = createTestRouter()
    await router.push('/')

    const wrapper = mount(LandingPage, {
      global: {
        plugins: [router],
      },
    })

    const registerLinks = wrapper.findAll('a[href="/register"]')
    expect(registerLinks.length).toBeGreaterThanOrEqual(2)
  })

  it('affiche le header et le footer', async () => {
    const router = createTestRouter()
    await router.push('/')

    const wrapper = mount(LandingPage, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
  })
})
