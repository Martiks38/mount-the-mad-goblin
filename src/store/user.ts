import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { KEY_LOCAL_STORAGE } from '@/consts'

interface UserConnectinState {
	token: string
	username: string
	setToken: (token: string) => void
	setUsername: (username: string) => void
}

export const useUserConnection = create<UserConnectinState>()(
	devtools(
		persist(
			(set, get) => {
				return {
					token: '',
					username: '',
					setUsername: (username: string) => set({ username }),
					setToken: (token: string) => set({ token })
				}
			},
			{
				name: KEY_LOCAL_STORAGE,
				storage: createJSONStorage(() => localStorage)
			}
		)
	)
)
