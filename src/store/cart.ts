import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

import { KEY_SESSION_STORAGE, shoppingCartCookie } from '@/consts'

import type { PurchasedPet } from '@/typings/interfaces'

interface ShoppingCartState {
	isConnected: boolean
	purchasedPets: PurchasedPet[]
	setConnection: (isConnected: boolean) => void
	setPurchasedPets: (pets: PurchasedPet[]) => void
	addToCart: (pet: PurchasedPet) => void
	removeOneFromCart: (petName: string) => void
	removeAllOfPet: (petName: string) => void
	removeAllFromCart: () => void
}

/**
 * @param { string } key
 * @param { any } value
 * @param { number } maxAge - Default: one day
 */
function setCookie(key: string, value: any, maxAge = 24 * 60 * 60) {
	document.cookie = `${key}=${JSON.stringify(value)};max-age=${maxAge}`
}

export const useShoppingCart = create<ShoppingCartState>()(
	devtools(
		persist(
			(set, get) => {
				return {
					isConnected: false,
					setConnection: (isConnected: boolean) => set({ isConnected }),
					purchasedPets: [],
					setPurchasedPets: (pets: PurchasedPet[]) => {
						set({ purchasedPets: pets })
					},
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
						setCookie(shoppingCartCookie, { purchasedPets: newPurchasedPets }, 24 * 60 * 60 * 2)
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
						setCookie(shoppingCartCookie, { purchasedPets: newPurchasedPets }, 24 * 60 * 60 * 2)
					},
					removeAllOfPet: (petName: string) => {
						const { purchasedPets } = get()
						const newPurchasedPets = purchasedPets.filter(({ name }) => name !== petName)

						set({ purchasedPets: newPurchasedPets })
						setCookie(shoppingCartCookie, { purchasedPets: newPurchasedPets }, 24 * 60 * 60 * 2)
					},
					removeAllFromCart: () => {
						set({ purchasedPets: [] }, false, 'REMOVE_ALL_FROM_CART')
						setCookie(shoppingCartCookie, '', 0)
					}
				}
			},
			{
				name: KEY_SESSION_STORAGE,
				storage: createJSONStorage(() => sessionStorage)
			}
		)
	)
)
