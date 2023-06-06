import modalStyles from '@/styles/components/Modal.module.css'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
	children: JSX.Element | JSX.Element[]
	className?: string
	closeModal: () => void
}

export function Modal({ children, className, closeModal }: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const modalEl = modalRef.current

		if (modalEl) modalEl.focus()
	}, [])

	useEffect(() => {
		const closeModalEscapeKey = (ev: KeyboardEvent) => {
			const key = ev.key

			if (key === 'Escape') closeModal()
		}

		window.addEventListener('keydown', closeModalEscapeKey)

		return () => window.removeEventListener('keydown', closeModalEscapeKey)
	}, [closeModal])

	return createPortal(
		<>
			<div
				ref={modalRef}
				onClick={closeModal}
				className={modalStyles.back}
				aria-live="polite"
			></div>
			<div className={`${modalStyles.modal} ${className}`}>{children}</div>
		</>,
		document.body
	)
}
