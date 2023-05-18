import { useEffect, useRef } from 'react'

export function useFocus<T extends HTMLInputElement | HTMLSelectElement>(ref: T | null) {
	const elementeRef = useRef(ref)

	useEffect(() => elementeRef.current?.focus(), [])

	return elementeRef
}
