import { KEY_LOCAL_STORAGE } from '@/consts'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface UserConnectinState {
	isConnected: boolean
	changeConnection: (state: boolean) => void
}

export const useUserConnection = create<UserConnectinState>()(
	devtools(
		persist(
			(set, get) => {
				return {
					isConnected: false,
					changeConnection: (state: boolean) => {
						set({ isConnected: state })
					}
				}
			},
			{ name: KEY_LOCAL_STORAGE, storage: createJSONStorage(() => localStorage) }
		)
	)
)
