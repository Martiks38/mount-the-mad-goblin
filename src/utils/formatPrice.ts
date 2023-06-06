const zone = 'en-US'

export function formatPrice(number: number): string {
	return new Intl.NumberFormat(zone, { style: 'decimal' }).format(number)
}
