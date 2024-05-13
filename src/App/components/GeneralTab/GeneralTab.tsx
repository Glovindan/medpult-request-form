import React, { useEffect, useState } from 'react'

import LabledField from '../LabledField/LabledField';
import CustomInput from '../CustomInput/CustomInput';
import { IFormData, IInputData, TabProps } from '../../shared/types';
import CustomSelect from '../CustomSelect/CustomSelect';
import Scripts from '../../shared/utils/clientScripts';
import Masks from '../../shared/utils/masks';
import CustomInputDate from '../CustomInputDate/CustomInputDate';
import CustomInputAppItem from '../CustomInputAppItem/CustomInputAppItem';
import CustomInputSearch from '../CustomInputSearch/CustomInputSearch';
import { openContractorPage } from '../../shared/utils/utils';

/** Вкладка Общее */
function GeneralTab(props: TabProps) {
	const { handler, values, isViewMode, saveStateHandler, setActionHandlers } = props;

	// Установка обработчиков нажатия на кнопки действий в заголовке вкладок
	useEffect(() => {
		setActionHandlers.setAddHandler(undefined)
		setActionHandlers.setEditHandler(undefined)
		setActionHandlers.setDeleteHandler(undefined)
	}, [])

	/** Нажатие на контрагента */
	const onClickContractor = () => {
		saveStateHandler();
		const contractorId = values.policyHolder.data.code
		if (contractorId) openContractorPage(contractorId)
	}

	return (
		<div className="general-tab general-tab__columns">
			<div className="general-tab__column">
				<LabledField label={"Номер"}>
					<CustomInput isViewMode={isViewMode} name='number' inputHandler={handler} values={values} />
				</LabledField>
				<LabledField label={"Страхователь"}>
					<CustomInputAppItem clickHandler={onClickContractor} href={Scripts.getSelectContractorPageLink()} saveStateHandler={saveStateHandler} isViewMode={isViewMode} name='policyHolder' inputHandler={handler} values={values} />
				</LabledField>
				<LabledField label={"Продукт"}>
					<CustomSelect isViewMode={isViewMode} getDataHandler={Scripts.getProducts} name='objProduct' inputHandler={handler} values={values} />
				</LabledField>
				<div className="general-tab__columns">
					<div className="general-tab__column">
						<LabledField label={"Статус"}>
							<CustomSelect isViewMode={isViewMode} getDataHandler={Scripts.getStatuses} name='status' inputHandler={handler} values={values} />
						</LabledField>
						<LabledField label={"Дата начала действия"}>
							<CustomInputDate isViewMode={isViewMode} name='startDate' inputHandler={handler} values={values} />
						</LabledField>
					</div>
					<div className="general-tab__column">
						<LabledField label={"Дата заключения"}>
							<CustomInputDate isViewMode={isViewMode} name='conclusionDate' inputHandler={handler} values={values} />
						</LabledField>
						<LabledField label={"Дата окончания действия"}>
							<CustomInputDate isViewMode={isViewMode} name='endDate' inputHandler={handler} values={values} />
						</LabledField>
					</div>
				</div>
			</div>

			<div className="general-tab__column">
				<LabledField label={"Канал продажи"}>
					<CustomSelect isViewMode={isViewMode} getDataHandler={Scripts.getChannels} name='channel' inputHandler={handler} values={values} />
				</LabledField>
				<LabledField label={"Регион заключения"}>
					<CustomInputSearch isViewMode={isViewMode} name='region' inputHandler={handler} values={values} getDataHandler={Scripts.getAddressSuggestion} />
				</LabledField>
				<LabledField label={"Валюта договора"}>
					<CustomSelect isViewMode={isViewMode} getDataHandler={Scripts.getCurrencies} name='currency' inputHandler={handler} values={values} />
				</LabledField>
				<div className="general-tab__columns">
					<div className="general-tab__column">
						<LabledField label={"Страховая сумма по договору"}>
							<CustomInput isViewMode={isViewMode} name='insuranceAmount' inputHandler={handler} values={values} maskFunction={Masks.applyNumbersMask} />
						</LabledField>
						<LabledField label={"Страховая премия по договору"}>
							<CustomInput isViewMode={isViewMode} name='insurancePremium' inputHandler={handler} values={values} maskFunction={Masks.applyNumbersMask} />
						</LabledField>
					</div>
					<div className="general-tab__column">
						<LabledField label={"Страховая сумма по договору, руб"}>
							<CustomInput name='insuranceAmountRub' isViewMode={isViewMode} inputHandler={handler} values={values} maskFunction={Masks.applyNumbersMask} />
						</LabledField>
						<LabledField label={"Страховая премия по договору, руб"}>
							<CustomInput name='insurancePremiumRub' isViewMode={isViewMode} inputHandler={handler} values={values} maskFunction={Masks.applyNumbersMask} />
						</LabledField>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GeneralTab
