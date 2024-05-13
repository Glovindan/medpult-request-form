import React, { Reducer, useReducer } from 'react'
import RequestContext from '../stores/RequestContext'
import { RequestData } from './types'

/** Подключение контеста Обращения */
export const useRequestContext = () => {
	const data = React.useContext(RequestContext)

	if (!data) {
		throw new Error('Can not `useRequestContext` outside of the `AppProvider`')
	}

	return data
}

/** Action для reducer */
interface ReducerAction {
	/** Тип операции */
	type: ActionTypes
	/** Передаваемое значение */
	payload: any
}

/** Типы действий */
enum ActionTypes {
	/** Изменить часть данных */
	PATCH = 'PATCH',
}

/** Изменение значений глобального состояния */
const reducer = <T>(state: T, action: ReducerAction): T => {
	switch (action.type) {
		case ActionTypes.PATCH: {
			const payload = action.payload as { key: string; value: any }

			return {
				...state,
				[payload.key]: payload.value,
			}
		}

		default:
			return state
	}
}

/** Хук для работы с глобальным состоянием Обращения */
export const useRequestState = (): [RequestData, (key: string, value: any) => void] => {
	return useGlobalState<RequestData>(new RequestData())
}

/** Хук для работы с глобальным состоянием */
export const useGlobalState = <T>(initialState: T): [T, (key: string, value: any) => void] => {
	const [state, dispatch] = React.useReducer<Reducer<T, ReducerAction>>(reducer<T>, initialState)

	/** Установка значения поля глобального состояния */
	const setValue = React.useCallback((key: string, value: any) => {
		dispatch({ type: ActionTypes.PATCH, payload: { key: key, value: value } })
	}, [])

	return [state, setValue]
}
