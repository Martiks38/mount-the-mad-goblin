import Head from 'next/head'

import { FooterPage } from '@/common/FooterPage'
import { HeaderPage } from '@/common/HeaderPage'

import layoutStyles from './LayoutPage.module.css'

interface LayoutPageProps {
	children: JSX.Element | JSX.Element[]
	haveHeroImage?: string
}

export function LayoutPage({ children }: LayoutPageProps): JSX.Element {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon-32x32.png" type="image/png" />
				<link rel="icon" href="/favicon-180x180.png" type="image/png" />
				<link rel="apple-touch-icon" href="/favicon-180x180.png" type="image/png" />

				<meta
					name="description"
					content="Come to The Crazy Goblin. Here you can find the pet of your dreams. From flying pets or dragons to mechanical or magical pets. The Crazy Goblin your pet store."
				/>
				<meta
					property="og:description"
					content="Come to The Crazy Goblin. Here you can find the pet of your dreams. From flying pets or dragons to mechanical or magical pets. The Crazy Goblin your pet store."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/favicon-180x180.png" />
				<link rel="preconnect" href="http://localhost:3000/api/v1" />

				<title>Pets - The Crazy Goblin</title>
			</Head>
			<div className={layoutStyles.wrapperPage}>
				<HeaderPage />
				<main className={layoutStyles.wrapperPage__main}>{children}</main>
				<FooterPage />
			</div>
		</>
	)
}
