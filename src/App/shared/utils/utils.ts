import React, { useCallback, useState } from 'react'
import { IFormData, IInputData } from '../types'
import Scripts from './clientScripts'

/** Маршрутизация по SPA */
export const redirectSPA = (href: string) => {
	let element = document.createElement('a')
	element.href = href
	element.style.display = 'none'
	document.querySelector('body')?.appendChild(element)
	element.click()
	element.remove()
}

export default {
	redirectSPA,
}

/** Значения полей формы */
export interface IMap {}

/** Создание функции изменения состояния объекта со значениями формы */
export const useMapState = <T>(
	initialValue: T | (() => T)
): [T, (name: string, value: IInputData) => void, (values: T) => void] => {
	const [state, setState] = useState<T>(initialValue)

	/** Установка значений всех полей формы */
	const setValues = React.useCallback((values: T) => {
		setState(values)
	}, [])

	/** Установка одного значения формы */
	const setValue = React.useCallback((name: string, value: any) => {
		setState((currentState) => (currentState = { ...currentState, [name]: value } as T))
	}, [])

	return [state, setValue, setValues]
}

/** Открыть карточку контрагента */
export const openContractorPage = (id?: string) => {
	id
		? localStorage.setItem('medpultContractorId', id)
		: localStorage.removeItem('medpultContractorId')

	redirectSPA(Scripts.getContractorPageLink())
}
