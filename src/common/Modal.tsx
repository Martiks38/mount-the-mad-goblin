import modalStyles from '@/styles/components/Modal.module.css'
import { useEffect, useRef, useState } from 'react'
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

	return (
		<div ref={modalRef} className={modalStyles.back} onClick={closeModal} aria-live="polite">
			{createPortal(
				<div className={`${modalStyles.modal} ${className}`}>{children}</div>,
				document.querySelector('body') as Element
			)}
		</div>
	)
}
