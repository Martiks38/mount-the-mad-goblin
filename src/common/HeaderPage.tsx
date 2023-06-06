import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useCart } from '@/hooks/useCart'
import { useUser } from '@/hooks/useUser'

import { Searcher } from '@/components/Searcher'
import { ShoppingBag } from '@/components/ShoppingBag'
import { UserIcon } from '@/components/UserIcon'

import logo from '@/assets/imgs/logo.webp'

import headerPageStyles from './HeaderPage.module.css'

export function HeaderPage() {
	const router = useRouter()
	const { setToken, setUsername } = useUser()
	const { connected, setConnection } = useCart()

	const sideImg = 42

	const signOut = () => {
		router.push('/')

		setConnection(false)
		setToken('')
		setUsername('')
	}

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
							<>
								<li>
									<button
										onClick={signOut}
										className={`${headerPageStyles.header__linkItem} ${headerPageStyles.header__linkItem_button}`}
									>
										Sign out
									</button>
								</li>
								<li>
									<Link href="/user/dashboard" className={headerPageStyles.header__linkItem}>
										<UserIcon size={sideImg - 8} />
									</Link>
								</li>
							</>
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
