import { writable, get } from 'svelte/store'

// View
export const view = writable('welcome')

// Controls popup
export const panel = writable(null)

// Graphemescope
export const graphemescope = writable(null)

// Zoom
export const zoom = writable(30)

zoom.subscribe(value => {
  const gs = get(graphemescope)
  if (gs) gs.zoomTarget = value / 100 * 0.5 + 0.45
})
