import type { ErrorResult } from '@/typings/interfaces'
import type { HTTPStatusCodeList } from '@/typings/types'

type ErrorStatusCode = Exclude<HTTPStatusCodeList, 200>
type Messages = Record<ErrorStatusCode, string>

const messages: Messages = {
	400: 'Bad request',
	401: 'Unauthorized',
	404: 'Not found',
	500: 'Internal Server Error'
}

export function errorMessage(
	httpStatusCode: ErrorStatusCode = 500,
	errorMessage?: string
): ErrorResult {
	let badHTTPStatusCode = httpStatusCode < 400 || httpStatusCode > 599
	let status = httpStatusCode
	let message = ''

	if (badHTTPStatusCode) {
		console.error('The entered status code is invalid')
		status = 500
	}

	message = errorMessage ? errorMessage : messages[status]

	return { status, message }
}
