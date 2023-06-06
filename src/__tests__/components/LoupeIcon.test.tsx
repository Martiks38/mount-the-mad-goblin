import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

import { LoupeIcon } from '@/components/LoupeIcon'

expect.extend(matchers)

describe('<LoupeIcon />', () => {
	it('The default component should have no classes', () => {
		const Component = render(<LoupeIcon />).container
		const svg = Component.querySelector('svg') as SVGElement

		expect(svg.classList).toHaveLength(0)
	})

	it('By passing the "styles" value to the styles attribute, the component should have the "styles" class', () => {
		const Component = render(<LoupeIcon styles="styles" />).container
		const svg = Component.querySelector('svg') as SVGElement

		expect(svg).toHaveClass('styles')
	})
})
