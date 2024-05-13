import React, { useEffect, useReducer, useRef, useState } from 'react'
import CustomSelectRow from '../CustomSelectRow/CustomSelectRow';
import { CustomInputProps, IFormData } from '../../shared/types';
import CustomInput from '../CustomInput/CustomInput';
import InputButton from '../InputButton/InputButton';
import Masks from '../../shared/utils/masks';
import icons from '../../shared/icons';

function CustomInputDate(props) {
	const { type = "date", inputHandler, name } = props;
	const pickerRef = useRef<HTMLInputElement>(null)

	const buttonSvg = icons.Calendar;

	const openPicker = () => {
		const picker = pickerRef.current;
		if (!picker) return;

		picker.showPicker();
	}

	//  При изменении значения пикера
	const onChangePickerValue = () => {
		const picker = pickerRef.current;
		if (!picker) return;

		let value = "";
		switch (picker.type) {
			case "date":
				{
					const values = picker.value.split("-");
					value = values.reverse().join(".");
					break;
				}
			case "time":
				{
					value = picker.value;
					break;
				}
			case "datetime-local":
				{
					const values = picker.value.split("T");
					const dateValues = values[0].split("-");
					const timeValue = values[1];

					value = dateValues.reverse().join(".") + " " + timeValue;
					break;
				}
		}

		inputHandler(name, { value: value })
	}

	return (
		<div className='custom-input-date'>
			<input type={type} onChange={onChangePickerValue} className='custom-input-date__picker' ref={pickerRef} />
			<CustomInput
				{...props}
				buttons={<InputButton svg={buttonSvg} clickHandler={openPicker} />}
				placeholder={props.placeholder ?? "ДД.ММ.ГГГГ"}
				maskFunction={Masks.applyDateMask}
			/>
		</div>
	)
}

export default CustomInputDate
