import { TwistyPlayerConfig } from "cubing/twisty"
import { create } from "zustand"


export const puzzle: { [key: string]: NonNullable<TwistyPlayerConfig["puzzle"]> } = {

	"333": "3x3x3",
	"222": "2x2x2",
	"pyram": "pyraminx",
	"skewb": "skewb",
	"444": "4x4x4",
	"555": "5x5x5",
	"666": "6x6x6",
	"777": "7x7x7",
	// "clock": "clock",
	"minx": "megaminx",
	// "sq1": "square1"


}

interface CubeStoreState {
	puzzleType: string
	setPuzzleType: (puzzleType: string) => void
}

const useCubeStore = create<CubeStoreState>((set) => ({
	puzzleType: "333",
	setPuzzleType: (puzzleType: string) => set({ puzzleType })
}))

export default useCubeStore