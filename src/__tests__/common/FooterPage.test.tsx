import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

import { FooterPage } from '@/common/FooterPage'

expect.extend(matchers)

describe('', () => {
	beforeEach(() => {
		render(<FooterPage />)
	})

	afterEach(() => cleanup())

	it('The logo should be in the footer of the page', () => {
		const Logo = screen.getByAltText(/Pets - The Crazy Goblin/i)

		expect(Logo).toBeInTheDocument()
	})

	it('The icon to send an email should be in the footer of the page', () => {
		const mailBtn = screen.getByRole('button', { name: 'Send mail' })

		expect(mailBtn).toBeInTheDocument()
	})
})
