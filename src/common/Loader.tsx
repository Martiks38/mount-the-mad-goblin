import clsx from 'clsx'
import loaderStyles from './Loader.module.css'

interface LoaderProps {
	styles?: string
	stylesCenterCircle?: string
}

export function Loader({ styles, stylesCenterCircle }: LoaderProps) {
	return (
		<div className={clsx([loaderStyles.shadow, styles])}>
			<div className={clsx([loaderStyles.loader, stylesCenterCircle])}></div>
		</div>
	)
}
