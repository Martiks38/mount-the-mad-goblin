import { useId } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { LoupeIcon } from '@/components/LoupeIcon'
import { ShoppingBag } from '@/components/ShoppingBag'

import logo from '@/assets/imgs/logo.webp'

import headerPageStyles from './HeaderPage.module.css'
import loupeIconStyles from '@/styles/components/LoupeIcon.module.css'

export function HeaderPage() {
	const searchId = useId()
	const widthImg = 42
	const heightImg = 42

	return (
		<header className={headerPageStyles.header}>
			<nav className={headerPageStyles.header__nav}>
				<a href="#content" className={headerPageStyles.header__skip}>
					Skip menu
				</a>

				<Link href="/" className={headerPageStyles.header__logo} aria-label="Go to home">
					<Image src={logo} alt="Pets - The Crazy Goblin" width={widthImg} height={heightImg} />
					<span>Pets - The Crazy Goblin</span>
				</Link>

				<form className={clsx([headerPageStyles.header__form, headerPageStyles.form])}>
					<label className={headerPageStyles.form__labelSearch} htmlFor={searchId}>
						<div className={headerPageStyles.form__searchLoupe}>
							<LoupeIcon styles={loupeIconStyles.loupe} />
						</div>
						<input
							type="search"
							name=""
							id={searchId}
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
						<li>
							<Link href="#" className={headerPageStyles.header__linkItem}>
								Sign in
							</Link>
						</li>
						<li>
							<Link href="#" className={headerPageStyles.header__linkItem}>
								Log up
							</Link>
						</li>
					</ul>
					<ShoppingBag />
				</div>
			</nav>
		</header>
	)
}
