interface UserIconProps {
	size: number
}

export function UserIcon({ size }: UserIconProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
			<g fill="none" stroke="#f8b700" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
				<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
				<circle cx="12" cy="7" r="4"></circle>
			</g>
		</svg>
	)
}
