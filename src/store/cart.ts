import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

import { KEY_SESSION_STORAGE } from '@/consts'

import type { PurchasedPet } from '@/typings/interfaces'

interface ShoppingCartState {
	loading: boolean
	purchasedPets: PurchasedPet[]
	addToCart: (pet: PurchasedPet) => void
	removeOneFromCart: (petName: string) => void
	removeAllOfPet: (petName: string) => void
	removeAllFromCart: () => void
}

export const useCart = create<ShoppingCartState>()(
	devtools(
		persist(
			(set, get) => {
				return {
					purchasedPets: [],
					loading: true,
					addToCart: (pet: PurchasedPet) => {
						const { purchasedPets } = get()
						let newPurchasedPets = structuredClone(purchasedPets)
						const petIndex = newPurchasedPets.findIndex(({ name }) => pet.name === name)

						if (petIndex === -1) {
							newPurchasedPets.push(pet)
						} else {
							newPurchasedPets[petIndex].quantity += pet.quantity
						}

						set({ purchasedPets: newPurchasedPets })
					},
					removeOneFromCart: (petName: string) => {
						const { purchasedPets } = get()
						let newPurchasedPets = structuredClone(purchasedPets)
						const petIndex = newPurchasedPets.findIndex(({ name }) => petName === name)

						if (newPurchasedPets[petIndex].quantity === 1) {
							newPurchasedPets = newPurchasedPets.filter(({ name }) => name !== petName)
						} else {
							newPurchasedPets[petIndex].quantity -= 1
						}

						set({ purchasedPets: newPurchasedPets }, false, 'REMOVE_ONE_FROM_CART')
					},
					removeAllOfPet: (petName: string) => {
						const { purchasedPets } = get()

						set({ purchasedPets: purchasedPets.filter(({ name }) => name !== petName) })
					},
					removeAllFromCart: () => {
						set({ purchasedPets: [] }, false, 'REMOVE_ALL_FROM_CART')
					}
				}
			},
			{ name: KEY_SESSION_STORAGE, storage: createJSONStorage(() => sessionStorage) }
		)
	)
)
