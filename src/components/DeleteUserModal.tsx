import { useId, useMemo, useState } from 'react'

import { Modal } from '@/common/Modal'

import deleteModal from '@/styles/components/DeleteUserModal.module.css'

interface DeleteUserModalProps {
	closeModal: () => void
	deleteAccount: () => void
	startDeleteWith: string
	username: string
}

export function DeleteUserModal({
	closeModal,
	deleteAccount,
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

	return (
		<Modal closeModal={closeModal} className={deleteModal.modal}>
			<header className={deleteModal.modal__header}>
				<p>Delete {username} account</p>
				<button className="closeBtn" aria-label="Cancel account deletion">
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
