import Link from 'next/link'
import showCategoryStyle from '@/styles/components/ShowCategory.module.css'

interface CategoryInfo {
	alt?: string
	href: string
	media: string
	title: string
}

export function ShowCategory({ alt, href, media, title }: CategoryInfo) {
	return (
		<Link
			href={href}
			aria-label={title}
			title={title}
			className={showCategoryStyle.wrapperCategory}
		>
			<h3 className={showCategoryStyle.wrapperCategory__title}>{title}</h3>
			<img
				src={media}
				alt={alt}
				width={200}
				height={200}
				className={showCategoryStyle.wrapperCategory__bgImage}
			/>
		</Link>
	)
}
