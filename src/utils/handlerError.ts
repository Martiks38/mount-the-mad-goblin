import type { ErrorResult } from '@/typings/interfaces'
import type { HTTPStatusCodeList } from '@/typings/types'

type ErrorStatusCode = Exclude<HTTPStatusCodeList, 200>
type Messages = Record<ErrorStatusCode, string>

/**
 * @todo Make custom messages
 */
const messages: Messages = {
	400: 'Bad request',
	401: 'Unauthorized',
	404: 'Not found',
	500: 'Internal Server Error'
}

export function errorMessage(httpStatusCode: ErrorStatusCode): ErrorResult {
	const badHTTPStatusCode = httpStatusCode < 400 || httpStatusCode > 599
	let statusCode = httpStatusCode

	if (badHTTPStatusCode) {
		console.error('The entered status code is invalid')
		statusCode = 500
	}

	return { status: statusCode, message: messages[statusCode] }
}
