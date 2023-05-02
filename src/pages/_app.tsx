import { LayoutPage } from '@/layout/LayoutPage'
import '@/styles/globals.css'
import '@/styles/reset.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<LayoutPage>
			<Component {...pageProps} />
		</LayoutPage>
	)
}
