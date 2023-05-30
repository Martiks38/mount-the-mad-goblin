interface generateResourceURLProps {
	pathname: string
	limit: number
	offset: number
	total: number
	word?: string
}

// It can be generalized by changing word to a rest parameter.
export function generateResourceURL({
	pathname,
	limit,
	offset,
	total,
	word
}: generateResourceURLProps) {
	const lastOffset = Math.ceil(total / limit)

	const wordQuery = word ? `word=${word}&` : ''

	const first_page = pathname + `?${wordQuery}offset=0`
	const last_page = pathname + `?${wordQuery}offset=${(lastOffset - 1) * 10}`

	const prev_page = offset !== 0 ? pathname + `?${wordQuery}offset=${offset - limit}` : ''
	const next_page =
		lastOffset === 1 + offset / limit ? '' : pathname + `?${wordQuery}offset=${offset + limit}`

	return { first_page, last_page, lastPageNumber: lastOffset, next_page, prev_page }
}
