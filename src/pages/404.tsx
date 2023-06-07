import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import errorPageStyles from '@/styles/pages/Page404.module.css'

import error404 from '@/assets/imgs/404.jpg'

export default function Error404() {
	return (
		<>
			<Head>
				<meta name="description" content="Page not found." />
				<meta property="og:description" content="Page not found" />
				<title>Error 404 | Pets - The Crazy Goblin</title>
			</Head>
			<section className="content content_letterWhite">
				<div className={errorPageStyles.containerMessage}>
					<Image
						src={error404}
						alt="The page could not be found"
						className={errorPageStyles.containerMessage__img}
					/>
					<div className={errorPageStyles.containerMessage__text}>
						<h1 className={errorPageStyles.containerMessage__title}>Error&nbsp;404</h1>
						<h2>Page not found</h2>
						<Link href="/" className={errorPageStyles.containerMessage__link}>
							Go to home
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}
