export function checkType(type: unknown, correctTypes: readonly unknown[]) {
	return correctTypes.some((correctType) => correctType === type)
}
