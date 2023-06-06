import { useId } from 'react'
import { useRouter } from 'next/router'

import { LoupeIcon } from './LoupeIcon'

import searcherStyles from '@/styles/components/Searcher.module.css'
import loupeIconStyles from '@/styles/components/LoupeIcon.module.css'

interface SearcherProps {
	path: string
}

export function Searcher({ path }: SearcherProps) {
	const formId = useId()
	const router = useRouter()

	const searchPet = (ev: React.FormEvent<HTMLFormElement>) => {
		const word = ev.currentTarget.word

		ev.preventDefault()

		router.push(path + word.value)
		word.value = null
	}

	return (
		<form className={`${searcherStyles.header__form} ${searcherStyles.form}`} onSubmit={searchPet}>
			<label className={searcherStyles.form__labelSearch} htmlFor={`${formId}-search`}>
				<div className={searcherStyles.form__searchLoupe}>
					<LoupeIcon styles={loupeIconStyles.loupe} />
				</div>
				<input
					type="search"
					name="word"
					id={`${formId}-search`}
					className={searcherStyles.form__search}
					placeholder="Search..."
				/>
			</label>
		</form>
	)
}
