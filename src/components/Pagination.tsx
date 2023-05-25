import Link from 'next/link'
import { memo, useMemo, useRef } from 'react'

import { EllipsisIcon } from './EllipsisIcon'

import clsx from 'clsx'

import type { ResultPagination } from '@/typings/interfaces'

type PaginationProps = Pick<ResultPagination, 'links'> & {
	lastPageNumber: number
	limit: number
	offset: number
}

const activeEllipsis = 5 // Page x distance from the ends.
const desactiveEllipsisRight = activeEllipsis - 1
const sidePageNumber = activeEllipsis - 2 // Represents the number of pages between the endpoint and the page that triggers the ellipsis.

function Pagination({ offset, lastPageNumber, links, limit }: PaginationProps) {
	const { first_page, last_page, next_page, prev_page, self } = links
	const pageNumber = useRef(offset / limit + 1)

	/**
	 * If the limit of items returned by the API is 10.
	 * So if the offset is 0 the page number is 1, and if it is 10 the page number is 2.
	 * So, the page number can be obtained by dividing the offset by the limit and adding one to it.
	 * For example: If the limit is 10 and the offset is 20.
	 * Page number = offset / limit + 1 = 3.
	 */
	pageNumber.current = offset / limit + 1

	const LeftLinks = useMemo(
		() =>
			Array.from({ length: sidePageNumber }, (_, ind) => {
				// Start on the second page
				let pageNumber = ind + 2
				let offset = (pageNumber - 1) * limit
				return { link: `/pets?offset=${offset}`, pageNumber }
			}),
		[limit]
	)

	const RightLinks = useMemo(
		() =>
			Array.from({ length: sidePageNumber }, (_, ind) => {
				// Starts at the page resulting from the subtraction between the last page minus sidePageNumber.
				let pageNumber = ind + lastPageNumber - sidePageNumber
				let offset = (pageNumber - 1) * limit
				return { link: `/pets?offset=${offset}`, pageNumber }
			}),
		[lastPageNumber, limit]
	)

	const CenterLink =
		pageNumber.current < activeEllipsis
			? `/pets?offset=${(activeEllipsis - 1) * limit}`
			: `/pets?offset=${(lastPageNumber - activeEllipsis) * limit}`

	const thereIsPrev = prev_page === ''
	const thereIsNext = next_page === ''

	return (
		<div className="containerTabs">
			<Link
				href={prev_page}
				className={clsx({ tab: true, disabled: thereIsPrev })}
				aria-disabled={thereIsPrev}
				aria-label={thereIsPrev ? 'There is no previous page' : 'Go to the previous page'}
			>
				&lt;
			</Link>
			<Link href={first_page} className={clsx(['tab', pageNumber.current === 1 && 'active'])}>
				1
			</Link>
			<div className="containerTabs containerTabs_mt0">
				{pageNumber.current < activeEllipsis ? (
					LeftLinks.map((pageLink, ind) => (
						<Link
							key={pageLink.link}
							href={pageLink.link}
							className={clsx(['tab', pageNumber.current === ind + 2 && 'active'])}
						>
							{pageLink.pageNumber}
						</Link>
					))
				) : (
					<EllipsisIcon fill="var(--color-tertiary)" />
				)}
			</div>

			{pageNumber.current < activeEllipsis ||
			pageNumber.current > lastPageNumber - desactiveEllipsisRight ? (
				<Link
					href={CenterLink}
					className={clsx({
						tab: true,
						active:
							pageNumber.current === activeEllipsis ||
							pageNumber.current === lastPageNumber - desactiveEllipsisRight
					})}
				>
					{pageNumber.current < activeEllipsis
						? activeEllipsis
						: lastPageNumber - desactiveEllipsisRight}
				</Link>
			) : (
				<div className="containerTabs containerTabs_mt0">
					<Link href={prev_page} className="tab">
						{pageNumber.current - 1}
					</Link>
					<Link href={self} className="tab active">
						{pageNumber.current}
					</Link>
					<Link href={next_page} className="tab">
						{pageNumber.current + 1}
					</Link>
				</div>
			)}

			{pageNumber.current > lastPageNumber - desactiveEllipsisRight ? (
				<div className="containerTabs containerTabs_mt0">
					{RightLinks.map((pageLink, ind) => (
						<Link
							key={pageLink.link}
							href={pageLink.link}
							className={clsx({
								tab: true,
								active: pageNumber.current === ind + lastPageNumber - sidePageNumber
							})}
						>
							{pageLink.pageNumber}
						</Link>
					))}
				</div>
			) : (
				<EllipsisIcon fill="var(--color-tertiary)" />
			)}

			<Link
				href={last_page}
				className={clsx({ tab: true, active: pageNumber.current === lastPageNumber })}
			>
				{lastPageNumber}
			</Link>
			<Link
				href={next_page}
				className={clsx({ tab: true, disabled: thereIsNext })}
				aria-disabled={thereIsNext}
				aria-label={thereIsNext ? 'There is no next page' : 'Go to the next page'}
			>
				&gt;
			</Link>
		</div>
	)
}

export default memo(Pagination, (prevProps, props) => prevProps.links.self === props.links.self)
