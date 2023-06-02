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

	return createPortal(
		<div ref={modalRef} onClick={closeModal} className={modalStyles.back} aria-live="polite">
			<div className={`${modalStyles.modal} ${className}`}>{children}</div>
		</div>,
		document.querySelector('body') as Element
	)
}
