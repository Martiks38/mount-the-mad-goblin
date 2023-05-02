import Image from 'next/image'

import logo from '@/assets/imgs/logo.webp'
import mail from '@/assets/imgs/mailLetter.png'

import footerPageStyles from './FooterPage.module.css'

/**
 * @todo Añadir modal sendMail al presionar el botón de correo
 */
export function FooterPage() {
	const widthImg = 54
	const heightImg = 54

	return (
		<footer className={footerPageStyles.footer}>
			<nav className={footerPageStyles.footer__nav}>
				<Image src={logo} alt="Pets - The Crazy Goblin" width={widthImg} height={heightImg} />
				<button
					aria-label="Send mail"
					title="Send mail"
					className={footerPageStyles.footer__toMail}
				>
					<Image src={mail} alt="Mail letter" width={widthImg} height={heightImg} />
				</button>
			</nav>
		</footer>
	)
}
