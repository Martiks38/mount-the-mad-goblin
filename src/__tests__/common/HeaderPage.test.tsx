import { beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

import { HeaderPage } from '@/common/HeaderPage'

expect.extend(matchers)

describe('<HeaderPage />', () => {
	beforeEach(() => {
		render(<HeaderPage />)
	})

	afterEach(() => cleanup())

	it('The "Skip menu" button must have the href #content attribute', async () => {
		const skipBtn = screen.getByRole('link', { name: 'Skip menu' })

		expect(skipBtn).toHaveAttribute('href', '#content')
	})

	it('The logo must have the href="/" attribute', () => {
		const logoBtn = screen.getByLabelText(/Go to home/i)

		expect(logoBtn).toHaveAttribute('href', '/')
	})
})
