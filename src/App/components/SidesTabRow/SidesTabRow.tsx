import React, { useEffect, useState } from 'react'
import { IFormData, IInputData, InputDataCategory, SideData } from '../../shared/types'
import CustomSelectList from '../CustomSelect/CustomSelect'
import Scripts from '../../shared/utils/clientScripts'
import CustomInputAppItem from '../CustomInputAppItem/CustomInputAppItem'
import icons from '../../shared/icons'
import InputButton from '../InputButton/InputButton'
import { openContractorPage } from '../../shared/utils/utils'

type SidesTabRowProps = {
	index: number
	type: InputDataCategory
	contractor: InputDataCategory
	isEdit?: boolean
	values: IFormData
	handler: (name: string, value: any) => void
	saveStateHandler: () => void
	setSelectedRowIndex: React.Dispatch<React.SetStateAction<number | undefined>>
	selectedRowIndex: number | undefined
	isViewMode?: boolean
}

/** Вкладка Общее */
function SidesTabRow({ index, type, contractor, isEdit, values, handler, saveStateHandler, setSelectedRowIndex, selectedRowIndex, isViewMode }: SidesTabRowProps) {
	/** Удалить строку */
	const deleteRow = () => {
		const sides = values.sides;
		sides.splice(index, 1);

		handler("sides", sides)
		setSelectedRowIndex(undefined);
	}

	/** Отменить изменения строки */
	const denyRow = () => {
		const sides = values.sides;

		sides[index].actualData = JSON.parse(JSON.stringify(sides[index].originalData));
		sides[index].isEdit = false;

		handler("sides", sides)
	}

	/** Применить изменения строки */
	const applyRow = () => {
		const sides = values.sides;

		sides[index].originalData = JSON.parse(JSON.stringify(sides[index].actualData))
		sides[index].isEdit = false;

		handler("sides", sides)
	}

	/** При нажатии на строку */
	const onClickRow = (ev) => {
		ev.stopPropagation();
		setSelectedRowIndex(index);
	}

	const selectHandler = (name: string, data: IInputData) => {
		const sides = values.sides;
		sides[index].actualData.type = new InputDataCategory(data.value, data.data.code);

		handler("sides", sides)
	}

	const getTypeValueHandler = () => {
		const sides = values.sides;
		console.log(sides)
		return sides[index].actualData.type.value
	}

	const getContractorValueHandler = () => {
		const sides = values.sides;
		return sides[index].actualData.contractor.value
	}

	const removeContractorValueHandler = () => {
		const sides = values.sides;
		sides[index].actualData.contractor = new InputDataCategory();

		handler("sides", sides)
	}

	const [isTypeInvalid, setIsTypeInvalid] = useState<boolean>(false);
	const [isContractorInvalid, setIsContractorInvalid] = useState<boolean>(false);

	/** При нажатии на галочку */
	const onClickApply = (ev) => {
		ev.stopPropagation();
		const sides = values.sides;

		const isTypeInvalid = !sides[index].actualData.type.data.code;
		const isContractorInvalid = !sides[index].actualData.contractor.data.code;

		if (isTypeInvalid || isContractorInvalid) {
			setIsTypeInvalid(isTypeInvalid)
			setIsContractorInvalid(isContractorInvalid)
			return;
		}

		applyRow();
	}

	/** При нажатии на крестик */
	const onClickDeny = (ev) => {
		ev.stopPropagation();
		const sides = values.sides;


		if (!sides[index].originalData.contractor.data.code && !sides[index].originalData.type.data.code) {
			deleteRow();
			return;
		}

		setIsTypeInvalid(false)
		setIsContractorInvalid(false)
		denyRow();
	}

	/** Кнопки строки в режиме редактирования */
	const buttons = (
		<div className='sides-tab-row__buttons'>
			<InputButton svg={icons.Apply} clickHandler={onClickApply} />
			<InputButton svg={icons.Deny} clickHandler={onClickDeny} />
		</div>
	)

	/** Нажатие на контрагента */
	const onClickContractor = () => {
		saveStateHandler();
		const contractorId = values.sides[index].actualData.contractor.data.code;
		if (contractorId)
			openContractorPage(contractorId)
	}

	/** Разметка режима редактирования */
	const editLayout = ([
		<CustomSelectList isInvalid={isTypeInvalid} getValueHandler={getTypeValueHandler} getDataHandler={Scripts.getResponsibleTypes} name={String(index)} values={values} inputHandler={selectHandler} />,
		<CustomInputAppItem clickHandler={onClickContractor} isInvalid={isContractorInvalid} href={Scripts.getSelectContractorPageLinkResponsible(index)} removeValueHandler={removeContractorValueHandler} getValueHandler={getContractorValueHandler} name={String(index)} values={values} inputHandler={selectHandler} saveStateHandler={saveStateHandler} />,
		buttons
	])

	/** Разметка режима просмотра */
	const viewLayout = ([
		<div className="sides-tab-row__type">{type.value}</div>,
		<div className="sides-tab-row__contractor" onClick={onClickContractor}>{contractor.value}</div>
	])

	return (
		<div
			className={
				selectedRowIndex == index
					? "sides-tab-row sides-tab-row_selected"
					: "sides-tab-row"
			}
			onClick={onClickRow}
		>
			{
				isEdit
					? editLayout
					: viewLayout
			}

		</div>
	)
}

export default SidesTabRow
