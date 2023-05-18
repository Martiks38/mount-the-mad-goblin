import Image from 'next/image'
import Link from 'next/link'
import { useId } from 'react'
import { useCart } from '@/hooks/useCart'

import { LoupeIcon } from '@/components/LoupeIcon'
import { ShoppingBag } from '@/components/ShoppingBag'

import logo from '@/assets/imgs/logo.webp'

import headerPageStyles from './HeaderPage.module.css'
import loupeIconStyles from '@/styles/components/LoupeIcon.module.css'
import { UserIcon } from '@/components/UserIcon'

export function HeaderPage() {
	const { connected } = useCart()
	const formId = useId()
	const sideImg = 42

	return (
		<header className={headerPageStyles.header}>
			<nav className={headerPageStyles.header__nav}>
				<a href="#content" className={headerPageStyles.header__skip}>
					Skip menu
				</a>

				<Link href="/" className={headerPageStyles.header__logo} aria-label="Go to home">
					<Image src={logo} alt="Pets - The Crazy Goblin" width={sideImg} height={sideImg} />
					<span>Pets - The Crazy Goblin</span>
				</Link>

				<form
					className={`${headerPageStyles.header__form} ${headerPageStyles.form}`}
					onSubmit={() => {}}
				>
					<label className={headerPageStyles.form__labelSearch} htmlFor={`${formId}-search`}>
						<div className={headerPageStyles.form__searchLoupe}>
							<LoupeIcon styles={loupeIconStyles.loupe} />
						</div>
						<input
							type="search"
							name=""
							id={`${formId}-search`}
							className={headerPageStyles.form__search}
							placeholder="Search..."
						/>
					</label>
				</form>

				<div className={headerPageStyles.header__containerLinks}>
					<ul className={headerPageStyles.header__menu}>
						<li>
							<Link href="#" className={headerPageStyles.header__linkItem}>
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
