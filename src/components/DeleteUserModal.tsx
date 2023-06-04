import { useId, useMemo, useState } from 'react'

import { Modal } from '@/common/Modal'

import deleteModal from '@/styles/components/DeleteUserModal.module.css'
import { Loader } from '@/common/Loader'

interface DeleteUserModalProps {
	closeModal: () => void
	deleteAccount: () => void
	isLoading: boolean
	startDeleteWith: string
	username: string
}

export function DeleteUserModal({
	closeModal,
	deleteAccount,
	isLoading,
	startDeleteWith,
	username
}: DeleteUserModalProps) {
	const modalId = useId()
	const [phrase, setPhrase] = useState('')

	const changeDeleteInput = (ev: React.ChangeEvent<HTMLInputElement>) =>
		setPhrase(ev.currentTarget.value)

	const checkDeletePhrase = useMemo(
		() => phrase !== startDeleteWith + username,
		[phrase, startDeleteWith, username]
	)

	return isLoading ? (
		<div className="containerLoader">
			<Loader />
		</div>
	) : (
		<Modal closeModal={closeModal} className={deleteModal.modal}>
			<header className={deleteModal.modal__header}>
				<p>Delete {username} account</p>
				<button onClick={closeModal} className="closeBtn" aria-label="Cancel account deletion">
					<span className="closeBtn__line"></span>
				</button>
			</header>
			<form className={deleteModal.modal__body} onSubmit={deleteAccount}>
				<label htmlFor={`${modalId}-delete`}>{`To confirm, type "${
					startDeleteWith + username
				}" in the box below`}</label>
				<input
					type="text"
					onChange={changeDeleteInput}
					name="delete"
					id={`${modalId}-delete`}
					autoComplete="off"
					autoCorrect="off"
					spellCheck={false}
				/>

				<button
					type="submit"
					className={`${deleteModal.modal__btn} ${deleteModal.modal__btn_delete}`}
					disabled={checkDeletePhrase}
				>
					Delete this account
				</button>
			</form>
		</Modal>
	)
}
