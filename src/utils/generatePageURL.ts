export function generatePageURL({
	pathname,
	limit,
	offset,
	total
}: {
	pathname: string
	limit: number
	offset: number
	total: number
}) {
	const lastOffset = Math.ceil(total / limit)
	const first_page = pathname + `?offset=0`
	const last_page = pathname + `?offset=${(lastOffset - 1) * 10}`

	const prev_page = offset !== 0 ? pathname + `?offset=${offset - limit}` : ''
	const next_page = lastOffset === (offset + limit) / limit ? '' : '' + `?offset=${offset + limit}`

	return { first_page, last_page, next_page, prev_page }
}
