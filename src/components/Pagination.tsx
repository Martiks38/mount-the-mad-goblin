import Link from 'next/link'
import { memo, useMemo, useRef } from 'react'

import { EllipsisIcon } from './EllipsisIcon'

import clsx from 'clsx'

import type { ResultPagination } from '@/typings/interfaces'

interface Parameters {
	lastPageNumber: number
	limit: number
	offset: number
}

interface PaginationProps extends Pick<ResultPagination, 'links'>, Parameters {
	maximumElementsSimpleExtension: number
}

const activeEllipsis = 5 // Page x distance from the ends.
const desactiveEllipsisRight = activeEllipsis - 1
const sidePageNumber = activeEllipsis - 2 // Represents the number of pages between the endpoint and the page that triggers the ellipsis.

function Pagination({
	lastPageNumber,
	links,
	limit,
	offset,
	maximumElementsSimpleExtension = 10
}: PaginationProps) {
	const { next_page, prev_page } = links
	const pageNumber = useRef(offset / limit + 1)
	const url = new URL(window.location.href)

	let pathname = url.pathname
	let word = url.searchParams.get('word')
	let wordQuery = word ? `word=${word}&` : ''

	/**
	 * If the limit of items returned by the API is 10.
	 * So if the offset is 0 the page number is 1, and if it is 10 the page number is 2.
	 * So, the page number can be obtained by dividing the offset by the limit and adding one to it.
	 * For example: If the limit is 10 and the offset is 20.
	 * Page number = offset / limit + 1 = 3.
	 */
	pageNumber.current = offset / limit + 1

	const thereIsPrev = prev_page === ''
	const thereIsNext = next_page === ''

	const enableLongPagination = lastPageNumber > maximumElementsSimpleExtension
	const enableSideBrowsers = lastPageNumber > Math.round(maximumElementsSimpleExtension / 2)

	return (
		<div className="containerTabs containerTabs_main">
			{enableSideBrowsers && (
				<Link
					href={prev_page}
					className={clsx({ tab: true, disabled: thereIsPrev })}
					aria-disabled={thereIsPrev}
					aria-label={thereIsPrev ? 'There is no previous page' : 'Go to the previous page'}
				>
					&lt;
				</Link>
			)}
			{enableLongPagination && (
				<LongPaginationBar
					lastPageNumber={lastPageNumber}
					currentPage={pageNumber.current}
					offset={offset}
					links={links}
					limit={limit}
					wordQuery={wordQuery}
					pathname={pathname}
				/>
			)}
			{!enableLongPagination && lastPageNumber !== 1 && (
				<SimplePaginationBar
					links={links}
					lastPageNumber={lastPageNumber}
					limit={limit}
					pathname={pathname}
					wordQuery={wordQuery}
					currentPage={pageNumber.current}
				/>
			)}
			{enableSideBrowsers && (
				<Link
					href={next_page}
					className={clsx({ tab: true, disabled: thereIsNext })}
					aria-disabled={thereIsNext}
					aria-label={thereIsNext ? 'There is no next page' : 'Go to the next page'}
				>
					&gt;
				</Link>
			)}
		</div>
	)
}

interface SimplePaginationBarProps extends Pick<ResultPagination, 'links'> {
	lastPageNumber: number
	limit: number
	currentPage: number
	pathname: string
	wordQuery: string
}

function SimplePaginationBar({
	links,
	lastPageNumber,
	limit,
	currentPage,
	pathname,
	wordQuery
}: SimplePaginationBarProps) {
	const { first_page, last_page } = links

	const pages = Array.from({ length: lastPageNumber }, (_, ind) => {
		let pageNumber = ind + 1
		let link = ''

		if (pageNumber !== 1 && pageNumber !== lastPageNumber) {
			let offset = (pageNumber - 1) * limit

			link = `${pathname}?${wordQuery}offset=${offset}`
		} else if (pageNumber === 1) {
			link = first_page
		} else {
			link = last_page
		}

		return { link, pageNumber }
	})

	return (
		<>
			{pages.map(({ link, pageNumber }, ind) => (
				<Link
					key={link}
					href={link}
					className={clsx({ tab: true, active: currentPage === ind + 1 })}
				>
					{pageNumber}
				</Link>
			))}
		</>
	)
}

interface LongPaginationBarProps extends Pick<ResultPagination, 'links'>, Parameters {
	currentPage: number
	pathname: string
	wordQuery: string
}

function LongPaginationBar({
	lastPageNumber,
	limit,
	links,
	currentPage,
	pathname,
	wordQuery
}: LongPaginationBarProps) {
	const { first_page, last_page, next_page, prev_page, self } = links

	const LeftLinks = useMemo(
		() =>
			Array.from({ length: sidePageNumber }, (_, ind) => {
				// Start on the second page
				let pageNumber = ind + 2
				let offset = (pageNumber - 1) * limit
				return { link: `${pathname}?${wordQuery}offset=${offset}`, pageNumber }
			}),
		[limit, pathname, wordQuery]
	)

	const RightLinks = useMemo(
		() =>
			Array.from({ length: sidePageNumber }, (_, ind) => {
				// Starts at the page resulting from the subtraction between the last page minus sidePageNumber.
				let pageNumber = ind + lastPageNumber - sidePageNumber
				let offset = (pageNumber - 1) * limit
				return { link: `${pathname}?${wordQuery}offset=${offset}`, pageNumber }
			}),
		[lastPageNumber, limit, pathname, wordQuery]
	)

	const CenterLink =
		currentPage < activeEllipsis
			? `${pathname}?${wordQuery}offset=${(activeEllipsis - 1) * limit}`
			: `${pathname}?${wordQuery}offset=${(lastPageNumber - activeEllipsis) * limit}`

	return (
		<>
			<Link href={first_page} className={clsx(['tab', currentPage === 1 && 'active'])}>
				1
			</Link>
			<div className="containerTabs containerTabs_mt0">
				{currentPage < activeEllipsis ? (
					LeftLinks.map((pageLink, ind) => (
						<Link
							key={pageLink.link}
							href={pageLink.link}
							className={clsx(['tab', currentPage === ind + 2 && 'active'])}
						>
							{pageLink.pageNumber}
						</Link>
					))
				) : (
					<EllipsisIcon fill="var(--color-tertiary)" />
				)}
			</div>

			{currentPage < activeEllipsis || currentPage > lastPageNumber - desactiveEllipsisRight ? (
				<Link
					href={CenterLink}
					className={clsx({
						tab: true,
						active:
							currentPage === activeEllipsis ||
							currentPage === lastPageNumber - desactiveEllipsisRight
					})}
				>
					{currentPage < activeEllipsis ? activeEllipsis : lastPageNumber - desactiveEllipsisRight}
				</Link>
			) : (
				<div className="containerTabs containerTabs_mt0">
					<Link href={prev_page} className="tab">
						{currentPage - 1}
					</Link>
					<Link href={self} className="tab active">
						{currentPage}
					</Link>
					<Link href={next_page} className="tab">
						{currentPage + 1}
					</Link>
				</div>
			)}

			{currentPage > lastPageNumber - desactiveEllipsisRight ? (
				<div className="containerTabs container_main containerTabs_mt0">
					{RightLinks.map((pageLink, ind) => (
						<Link
							key={pageLink.link}
							href={pageLink.link}
							className={clsx({
								tab: true,
								active: currentPage === ind + lastPageNumber - sidePageNumber
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
				className={clsx({ tab: true, active: currentPage === lastPageNumber })}
			>
				{lastPageNumber}
			</Link>
		</>
	)
}

export default memo(Pagination, (prevProps, props) => prevProps.links.self === props.links.self)
