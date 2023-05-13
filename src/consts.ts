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

export const TOKEN_HEADER = 'x-access-token'
