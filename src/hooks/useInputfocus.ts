import { useEffect, useRef } from 'react'

export function useInputfocus(ref: HTMLInputElement | null) {
	const elementeRef = useRef(ref)

	useEffect(() => elementeRef.current?.focus(), [])

	return elementeRef
}
