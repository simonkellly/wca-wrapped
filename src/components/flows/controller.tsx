import useStore, { WrappedState } from "../../store"
import None from "./None"

export default function WrappedController() {
	const wrappedState = useStore(state => state.wrappedState)
	function render() {
		switch (wrappedState.state) {
			case WrappedState.None: return <None />
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