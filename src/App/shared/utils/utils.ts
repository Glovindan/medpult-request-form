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

/** Открыть карточку контрагента */
export const openContractorPage = (id?: string) => {
	id
		? localStorage.setItem('medpultContractorId', id)
		: localStorage.removeItem('medpultContractorId')

	redirectSPA(Scripts.getContractorPageLink())
}
