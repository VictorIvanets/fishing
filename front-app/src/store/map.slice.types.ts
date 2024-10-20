export type Coords = [number, number]

export interface MapResponse {
	title: string
	description: string
	score: number
	date: number
	coords: Coords
	setID: number
	login: string
	img: string[]
	weather: object[] | string
}

export interface InitState {
	data: MapResponse[]
	errorMassege: string | undefined
}
