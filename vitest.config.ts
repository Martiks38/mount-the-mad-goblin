import path from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const resolve = (route: string) => path.resolve(process.cwd(), route)

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		coverage: { provider: 'c8' },
		alias: {
			'@': resolve('src')
		}
	}
})
