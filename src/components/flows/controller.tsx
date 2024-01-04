import useStore, { WrappedState } from "../../store"
import Competitions from "./Competitions"
import Events from "./Events"
import FavStaff from "./FavStaff"
import Geography from "./Geography"
import Newcomer from "./Newcomer"
import None from "./None"
import Success from "./Success"
import Thanks from "./Thanks"

export default function WrappedController() {
	const wrappedState = useStore(state => state.wrappedState)
	function render() {
		switch (wrappedState.state) {
			case WrappedState.None: return <None />
			case WrappedState.Competitions: return <Competitions />
			case WrappedState.Events: return <Events />
			case WrappedState.FavStaff: return <FavStaff />
			case WrappedState.Newcomer: return <Newcomer />
			case WrappedState.Geography: return <Geography />
			case WrappedState.NoCompetitions: return <None />
			case WrappedState.Success: return <Success />
			case WrappedState.Thanks: return <Thanks />
			default:
				return <h1>{wrappedState.state}</h1>
		}

	}
	return (
		<>
			{render()}
		</>
	)
}