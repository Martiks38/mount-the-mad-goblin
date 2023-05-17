export function parseBodyRequest(data: string) {
	const dataParams = new URLSearchParams(data)
	const pairs = Array.from(dataParams.entries())
	let obj: Record<string, string> = {}

	for (const pair of pairs) {
		obj[pair[0]] = pair[1]
	}

	return obj
}
