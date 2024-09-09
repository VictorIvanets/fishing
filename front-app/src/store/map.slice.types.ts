export type Coords = [number, number]

export interface MapState {
	title: string | null
	description: string | null
	score: number | null
	date: number | null
	coords: Coords | null
	setID: number | null
	login: string | null | undefined
}
export interface MapResponse {
	title: string
	description: string
	score: number
	date: number
	coords: Coords
	setID: number
	login: string
}

export interface InitState {
	data: MapState[]
	errorMassege: string | undefined
}
