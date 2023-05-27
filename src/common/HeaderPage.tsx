import Image from 'next/image'
import Link from 'next/link'

import { useCart } from '@/hooks/useCart'

import { Searcher } from '@/components/Searcher'
import { ShoppingBag } from '@/components/ShoppingBag'
import { UserIcon } from '@/components/UserIcon'

import logo from '@/assets/imgs/logo.webp'

import headerPageStyles from './HeaderPage.module.css'

export function HeaderPage() {
	const { connected } = useCart()

	const sideImg = 42

	return (
		<header className={headerPageStyles.header}>
			<nav className={headerPageStyles.header__nav}>
				<a href="#content" className={headerPageStyles.header__skip}>
					Skip menu
				</a>

				<Link href="/" className={headerPageStyles.header__logo} aria-label="Go to home">
					<Image
						src={logo}
						alt="Pets - The Crazy Goblin"
						width={sideImg}
						height={sideImg}
						priority={true}
					/>
					<span>Pets - The Crazy Goblin</span>
				</Link>

				<Searcher path="/pets/search?word=" />

				<div className={headerPageStyles.header__containerLinks}>
					<ul className={headerPageStyles.header__menu}>
						<li>
							<Link href="/pets" className={headerPageStyles.header__linkItem}>
								Pets
							</Link>
						</li>
						{connected ? (
							<li>
								<Link href="#" className={headerPageStyles.header__linkItem}>
									<UserIcon size={sideImg - 8} />
								</Link>
							</li>
						) : (
							<>
								<li>
									<Link href="/user/login" className={headerPageStyles.header__linkItem}>
										Log in
									</Link>
								</li>
								<li>
									<Link href="/user/signup" className={headerPageStyles.header__linkItem}>
										Sign up
									</Link>
								</li>
							</>
						)}
					</ul>
					<ShoppingBag />
				</div>
			</nav>
		</header>
	)
}
