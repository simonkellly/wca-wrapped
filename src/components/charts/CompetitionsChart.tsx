import { useMemo } from "react"
import useStore, { StoreState } from "../../store"
import { ResponsiveLine } from '@nivo/line'


export default function CompetitionsChart() {
	const competitions = useStore(state => state.competitionsByYear) as NonNullable<StoreState['competitionsByYear']>
	const data = useMemo(() => {

		return [{
			id: "years",
			data: Object.keys(competitions).map(key => ({ x: key, y: competitions[key].length }))
		}]

	}, [])

	return (
		<ResponsiveLine data={data} margin={{ top: 20, bottom: 40, right: 30, left: 30 }}
			colors={{ scheme: 'category10' }}
			axisLeft={null}
			axisBottom={{
				format: (value) => `'${value.toString().slice(2, 4)}`,
				tickSize: 0,
				tickRotation: 0,
				legendOffset: 36,
				legendPosition: 'middle'
			}}
			enableGridX={false}
			enableGridY={false}
			lineWidth={4}
			isInteractive={true}


		/>
	)
}