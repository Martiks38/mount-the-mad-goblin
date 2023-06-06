import { ConnectionStates, connect, connection } from 'mongoose'
import { DB_DEV, DB_PROD } from '@/config'

export function dbConnection() {
	if (connection.readyState === ConnectionStates.connected) return

	const DB_URL = process.env.NODE_ENV === 'production' ? DB_PROD : DB_DEV

	if (!DB_URL) {
		const error = new Error("Database URL can't be undefined")
		error.name = 'DatabaseError'

		throw error
	}

	connect(DB_URL)
		.then(() => console.log('Database is connected'))
		.catch((err) => {
			const error = new Error('Error establishing connection to database')
			error.name = 'DBConnectionError'

			console.error(`[${err.name}]: ${err.message}`)
		})
}
