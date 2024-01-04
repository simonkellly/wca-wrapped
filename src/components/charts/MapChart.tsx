import useStore from '../../store'
import getCountryISO2 from "country-iso-3-to-2"

import {
	ComposableMap,
	Geographies,
	Geography,
	Sphere,
	Graticule,
} from "react-simple-maps";

const geoUrl = "/features.json";


const MapChart = () => {
	const competitions = useStore(state => state.competitionsByYear)
	// @ts-expect-error reducer
	const countries = (competitions!["2023"] ?? []).map(competition => competition.country_iso2).reduce(function (acc, curr) { return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc }, {});

	return (
		<ComposableMap
			height={300}
			projectionConfig={{
				rotate: [-10, 0, 0],
				scale: 100,
				center: [0, 3]
			}}
		>
			{// @ts-expect-error err
				<Sphere stroke="#E4E5E6" strokeWidth={0.5} />}
			<Graticule stroke="#E4E5E6" strokeWidth={0.5} />
			{(
				<Geographies geography={geoUrl}>
					{({ geographies }) =>
						geographies.map((geo) => {
							// @ts-expect-error err
							const d = countries[getCountryISO2(geo.id)]
							return (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									fill={d ? "#ff5233" : "#F5F4F6"}
								/>
							);
						})
					}
				</Geographies>
			)}
		</ComposableMap>
	);
};

export default MapChart;
