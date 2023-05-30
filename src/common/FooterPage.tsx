import Image from 'next/image'

import logo from '@/assets/imgs/logo.webp'

import footerPageStyles from './FooterPage.module.css'

export function FooterPage() {
	const sizeImg = 54

	return (
		<footer className={footerPageStyles.footer}>
			<nav className={footerPageStyles.footer__nav}>
				<Image src={logo} alt="Pets - The Crazy Goblin" width={sizeImg} height={sizeImg} />
			</nav>
		</footer>
	)
}
