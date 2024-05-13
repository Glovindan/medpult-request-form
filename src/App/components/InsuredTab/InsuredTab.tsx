import React, { useEffect, useState } from 'react';

import { InputDataCategory, InsuredSearchData, ListColumnData, TabProps } from '../../shared/types';
import CustomInput from '../CustomInput/CustomInput';
import CustomInputDate from '../CustomInputDate/CustomInputDate';
import Button from '../Button/Button';
import CustomSelectList from '../CustomSelect/CustomSelect';
import icons from '../../shared/icons';
import CustomList from '../CustomList/CustomList';
import Scripts from '../../shared/utils/clientScripts';
import utils, { openContractorPage, redirectSPA } from '../../shared/utils/utils';

interface InsuredTabProps extends Omit<TabProps, "values"> {
	values: InsuredSearchData
}

/** Вкладка Общее */
function InsuredTab({ values, handler, setActionHandlers, saveStateHandler }: InsuredTabProps) {
	const [onClickSearch, setOnClickSearch] = useState<any>();

	// Установка обработчиков нажатия на кнопки действий в заголовке вкладок
	useEffect(() => {
		setActionHandlers.setAddHandler(() => onClickCreateContractor)
		setActionHandlers.setEditHandler(undefined)
		setActionHandlers.setDeleteHandler(undefined)
	}, [])

	const buttonTitle = (
		<div className="insured-search-button">
			<div className='insured-search-button__icon'>
				{icons.Search}
			</div>
			<div className="insured-search-button__title">
				Поиск
			</div>
		</div>
	)

	/** Создание контрагента */
	const onClickCreateContractor = () => {
		saveStateHandler();
		openContractorPage()
	}

	/** Нажатие на контрагента */
	const onClickContractor = (data: InputDataCategory) => {
		saveStateHandler();
		openContractorPage(data.data.code)
	}

	/** Колонки списка */
	const columns = [
		new ListColumnData({ name: "ФИО", code: "fullname", fr: 1.5, isSortable: true, isLink: true, onClick: onClickContractor }),
		new ListColumnData({ name: "Дата рождения", code: "birthDate", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Номер полиса", code: "policyNumber", fr: 1.5 }),
		new ListColumnData({ name: "Категория", code: "category", fr: 1.5 }),
		new ListColumnData({ name: "Дата начала", code: "startDate", fr: 1 }),
		new ListColumnData({ name: "Дата окончания", code: "endDate", fr: 1 }),
		new ListColumnData({ name: "План", code: "plan", fr: 1.5 }),
		new ListColumnData({ name: "ДС", code: "additionalAgreement", fr: 1 }),
	]

	return (
		<div className="insured-tab">
			<div className="insured-tab__search">
				<CustomInput inputHandler={handler} values={values} name='fullname' placeholder='ФИО' />
				<CustomInputDate inputHandler={handler} values={values} name='birthDate' placeholder='Дата рождения' />
				<CustomInput inputHandler={handler} values={values} name='policyNumber' placeholder='Номер полиса' />
				<CustomSelectList inputHandler={handler} getDataHandler={async () => { return [new InputDataCategory()] }} values={values} name='category' placeholder='Категория' />
				<CustomInputDate inputHandler={handler} values={values} name='startDate' placeholder='Дата начала' />
				<CustomInputDate inputHandler={handler} values={values} name='endDate' placeholder='Дата окончания' />
				<CustomInput inputHandler={handler} values={values} name='plan' placeholder='План' />
				<CustomInput inputHandler={handler} values={values} name='additionalAgreement' placeholder='ДС' />
				<Button clickHandler={onClickSearch} title={buttonTitle} style={{ height: "100%" }} />
			</div>
			<div className="insured-tab-list">
				<CustomList columnsSettings={columns} searchData={values} setSearchHandler={setOnClickSearch} getDataHandler={Scripts.getContractors} />
			</div>
		</div>
	)
}

export default InsuredTab
