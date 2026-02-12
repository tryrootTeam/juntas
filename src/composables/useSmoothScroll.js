const HEADER_OFFSET = 80

/**
 * Scroll fluide vers une section par id (prise en compte du header sticky).
 */
export function useSmoothScroll() {
  const scrollToSection = (id) => {
    const el = typeof document !== 'undefined' ? document.getElementById(id) : null
    if (!el) return

    const elementPosition = el.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - HEADER_OFFSET

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }

  return { scrollToSection }
}
