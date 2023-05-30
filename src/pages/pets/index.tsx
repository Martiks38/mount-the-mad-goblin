import { LayoutGridResults } from '@/layout/LayoutGridResults'

const requestURL = 'http://localhost:3000/api/v1/pets'

export default function PetsSection() {
	return <LayoutGridResults url={requestURL} />
}
