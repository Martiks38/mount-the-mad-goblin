import { LayoutGridResults } from '@/layout/LayoutGridResults'
import { apiURLs } from '@/consts'

const requestURL = apiURLs.pets.base

export default function PetsSection() {
	return <LayoutGridResults url={requestURL} />
}
