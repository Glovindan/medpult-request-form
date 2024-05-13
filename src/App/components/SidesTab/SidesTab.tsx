import React, { useEffect, useState } from 'react';

import { IFormData, SideDataExtended, TabProps } from '../../shared/types';
import SidesTabRow from '../SidesTabRow/SidesTabRow';

/** Вкладка Общее */
function SidesTab(props: TabProps) {
	const { handler, values, isViewMode, saveStateHandler, setActionHandlers } = props;

	const [rows, setRows] = useState<React.JSX.Element[]>([])

	const [selectedRowIndex, setSelectedRowIndex] = useState<number>();

	// Установка обработчика нажатия на кнопки удалить и редактировать в заголовке вкладок
	useEffect(() => {
		if (!isViewMode && selectedRowIndex != undefined) {
			setActionHandlers.setEditHandler(() => editRowHandler)
			setActionHandlers.setDeleteHandler(() => deleteRowHandler)
		} else {
			setActionHandlers.setEditHandler(undefined)
			setActionHandlers.setDeleteHandler(undefined)
		}
	}, [selectedRowIndex, isViewMode])

	// Установка обработчика нажатия на кнопку добавить в заголовке вкладок
	useEffect(() => {
		if (!isViewMode) {
			setActionHandlers.setAddHandler(() => addRowHandler)
		} else {
			setActionHandlers.setAddHandler(undefined)
		}
	}, [isViewMode])


	const editRowHandler = () => {
		if (selectedRowIndex == undefined) return;

		const sides = values.sides;
		sides[selectedRowIndex].isEdit = true;

		handler("sides", sides)
	}

	const deleteRowHandler = () => {
		if (selectedRowIndex == undefined) return;

		setSelectedRowIndex(undefined);
		const sides = values.sides;
		sides.splice(selectedRowIndex, 1);

		handler("sides", sides)
	}

	const addRowHandler = () => {
		const sides = values.sides;

		sides.push(new SideDataExtended(true))

		handler("sides", sides)
	}
	// Обновление строк при изменении значения
	useEffect(() => {
		const rows = values.sides.map((value, index) => {
			return <SidesTabRow
				index={index}
				contractor={value.actualData.contractor}
				type={value.actualData.type}
				isEdit={value.isEdit}
				setSelectedRowIndex={setSelectedRowIndex}
				selectedRowIndex={selectedRowIndex}
				{...props}
			/>
		})

		setRows(rows);
	}, [values, selectedRowIndex])

	// Сбросить значения при переключении в режим просмотра
	useEffect(() => {
		if (!isViewMode) return;
		const sides = values.sides;
		for (const side of sides) {
			side.actualData = JSON.parse(JSON.stringify(side.originalData));
			side.isEdit = false;
		}

		handler("sides", sides.filter(side => !!side.actualData.contractor.data.code || !!side.actualData.type.data.code))
	}, [isViewMode])

	return (
		<div className="sides-tab">
			<div className="sides-tab__header">
				<div className="sides-tab__header-item">Тип ответственного лица</div>
				<div className="sides-tab__header-item">Ответственное лицо</div>
			</div>
			<div className="sides-tab__list">
				{rows}
			</div>
		</div>
	)
}

export default SidesTab
