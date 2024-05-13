import React, { useContext, useEffect, useReducer, useState } from 'react'
import { RequestProvider } from './stores/RequestContextProvider'
import { useRequestContext, useRequestState } from './shared/hooks'

const reducer = (state, action) => {
	return {
		test: "fuck"
	}
}

const Test = () => {
	const { data, setValue } = useRequestContext();

	const setId = (id: string) => setValue("id", id);

	return <input type="text" value={data.id} onChange={(ev) => setId(ev.target.value)} />
}

export default function App() {
	const [data, setValue] = useRequestState()

	// Подгрузка данных
	React.useLayoutEffect(() => {
	}, [])

	return (
		<RequestProvider value={{ data, setValue }}>
			<Test />
			{data.id}
		</RequestProvider>
	)
}
