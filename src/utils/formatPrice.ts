export function formatPrice(number: number): string {
	return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(number)
}
