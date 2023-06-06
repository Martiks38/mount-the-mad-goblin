interface EllipsisIconProps {
	className?: string
	fill?: string
}

export function EllipsisIcon({ className, fill }: EllipsisIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill="none"
			viewBox="0 0 24 24"
			className={className}
			style={{ width: '2em', height: '2em' }}
		>
			<circle cx="6" cy="12" r="2" fill={fill ? fill : '#fff'}></circle>
			<circle cx="12" cy="12" r="2" fill={fill ? fill : '#fff'}></circle>
			<circle cx="18" cy="12" r="2" fill={fill ? fill : '#fff'}></circle>
		</svg>
	)
}
