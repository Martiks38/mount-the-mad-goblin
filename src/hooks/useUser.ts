import { useUserConnection } from '@/store/user'
import { useEffect, useState } from 'react'

export function useUser() {
	const { token, username, setToken, setUsername } = useUserConnection((state) => ({
		token: state.token,
		username: state.username,
		setToken: state.setToken,
		setUsername: state.setUsername
	}))

	const [tokenUser, setTokenUser] = useState('')
	const [name, setName] = useState('')

	useEffect(() => {
		setTokenUser(token)
		setName(username)
	}, [token, username])

	return { token: tokenUser, username: name, setToken, setUsername }
}
