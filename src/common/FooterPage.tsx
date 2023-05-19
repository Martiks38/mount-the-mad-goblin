import Image from 'next/image'

import logo from '@/assets/imgs/logo.webp'
import mail from '@/assets/imgs/mailLetter.png'

import footerPageStyles from './FooterPage.module.css'

export function FooterPage() {
	const sizeImg = 54

	return (
		<footer className={footerPageStyles.footer}>
			<nav className={footerPageStyles.footer__nav}>
				<Image src={logo} alt="Pets - The Crazy Goblin" width={sizeImg} height={sizeImg} />
				<button
					aria-label="Send mail"
					title="Send mail"
					className={footerPageStyles.footer__toMail}
				>
					<Image src={mail} alt="Mail letter" width={sizeImg} height={sizeImg} priority={true} />
				</button>
			</nav>
		</footer>
	)
}
