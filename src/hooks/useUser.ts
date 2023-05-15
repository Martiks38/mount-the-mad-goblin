import { useEffect, useState } from 'react'
import { useUserConnection } from '@/store/user'

export function useUser() {
	const { isConnected, changeConnection } = useUserConnection((state) => ({
		isConnected: state.isConnected,
		changeConnection: state.changeConnection
	}))

	const [connected, setConnected] = useState(false)

	useEffect(() => {
		setConnected(isConnected)
	}, [isConnected])

	return { connected, changeConnection }
}
