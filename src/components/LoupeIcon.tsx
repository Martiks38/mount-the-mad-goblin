interface LoupeIconProps {
	styles?: string
}

export function LoupeIcon({ styles }: LoupeIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 512 512"
			className={styles}
		>
			<path d="M497.94 430.06l-126.92-126.9A198.5 198.5 0 00400 200C400 89.72 310.28 0 200 0S0 89.72 0 200s89.72 200 200 200c37.76 0 72.98-10.71 103.15-28.97l126.91 126.9A47.84 47.84 0 00464 512a47.98 47.98 0 0033.94-81.94zM64 200c0-75 61.02-136 136-136s136 61 136 136-61.02 136-136 136S64 275 64 200z"></path>
		</svg>
	)
}
