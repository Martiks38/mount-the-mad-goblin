import clsx from 'clsx'
import loaderStyles from './Loader.module.css'

interface LoaderProps {
	styles?: string
}

export function Loader({ styles }: LoaderProps) {
	return (
		<div className={clsx([loaderStyles.shadow, styles])}>
			<div className={loaderStyles.loader}></div>
		</div>
	)
}
