import { Range } from '@/typings/types'

/**
 * @typedef {Object} Range
 * @property {number} min
 * @property {number} max
 */

/**
 * Check if a series of numbers is within the passed range.
 * @param { Range } range Value range.
 * @param { number[] } values values
 * @returns { boolean }
 */
export function outRange(range: Range, ...values: number[]) {
	return values.some((value) => value < range.min || value > range.max)
}
