export const PET_TYPES = [
	'Humanoid',
	'Dragonkin',
	'Flying',
	'Undead',
	'Critter',
	'Magic',
	'Elemental',
	'Beast',
	'Aquatic',
	'Mechanical'
] as const

export const PRICE_RANGE = Object.freeze({
	min: 1,
	max: 9999999 // Maximum allowed by the game.
})

export const projection = Object.freeze({
	_id: false
})

export const KEY_SESSION_STORAGE = 'shopping-cart'

export const KEY_LOCAL_STORAGE = 'user-connection'

export const TOKEN_HEADER = 'x-access-token'

export const INVALID_BILLING_INFORMATION = 'billing-information'
