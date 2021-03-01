import { writable, derived } from 'svelte/store'
import { uniqueId } from 'lodash'

export const userBgId = writable(null)

export function createUserBgs() {
  const { subscribe, update } = writable({})
  return {
    subscribe,
    add: image => update(prev => {
      const id = uniqueId()
      setTimeout(() => userBgId.set(id))

      return {
        ...prev, [id]: {
          title: `Мой фон ${Object.keys(prev).length + 1}`,
          key: id,
          image
        }
      }
    })
  }
}
export const userBgs = createUserBgs()

export const currentUserBg = derived([userBgs, userBgId], ([$userBgs, $userBgId]) => {
  return $userBgs[$userBgId] || null
})
