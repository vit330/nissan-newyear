import { writable, derived } from 'svelte/store'
import commonStub from '@/js/stubs/common'
import bgStub from '@/js/stubs/bg'
import toyStub from '@/js/stubs/toy'

// Model
export const modelId = writable('qashqai')
export const model = derived(modelId, $modelId => {
  return commonStub[$modelId]
})

// Color
export const colorId = writable('blue')
export const color = derived([modelId, colorId], ([$modelId, $colorId]) => {
  return commonStub[$modelId].colors[$colorId]
})

// Bgs
export const bgId = writable('balls')
export const bg = derived(bgId, $bgId => {
  return bgStub[$bgId]
})

export const patternImage = derived([modelId, colorId, bgId], ([$modelId, $colorId, $bgId]) => {
  if (commonStub[$modelId].colors[$colorId]) {
    return commonStub[$modelId].colors[$colorId].patterns[$bgId].image
  }
  const availableСolor = Object.keys(commonStub[$modelId].colors)[0]
  colorId.set(availableСolor)
  return commonStub[$modelId].colors[availableСolor].patterns[$bgId].image
})

export const carImage = derived([modelId, colorId], ([$modelId, $colorId]) => {
  if (commonStub[$modelId].colors[$colorId]) {
    return commonStub[$modelId].colors[$colorId].car
  }
  const availableСolor = Object.keys(commonStub[$modelId].colors)[0]
  colorId.set(availableСolor)
  return commonStub[$modelId].colors[availableСolor].car
})

export const toyPdf = derived([modelId, colorId, bgId], ([$modelId, $colorId, $bgId]) => {
  return toyStub[$modelId][$colorId][$bgId]
})
