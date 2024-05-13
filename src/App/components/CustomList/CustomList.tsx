import React, { ButtonHTMLAttributes, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { InputDataCategory, InputDataString, ListColumnData, SortData, getDetailsLayoutAttributes } from '../../shared/types'
import icons from '../../shared/icons'
import CustomListColumn from './CustomListHeaderColumn/CustomListHeaderColumn'
import Loader from '../Loader/Loader'
import CustomListRow from './CustomListRow/CustomListRow'

type ListProps = {
	/** Основные настройки */
	/** Настройки отображения колонок */
	columnsSettings: ListColumnData[]
	/** Получение данных */
	getDataHandler: any
	/** Есть прокрутка? */
	isScrollable?: boolean

	/** Настройки поиска */
	/** Данные поиска */
	searchData?: any
	/** Установка обработчика нажатия на поиск */
	setSearchHandler?: any

	/** Получение формы детальной информации по вкладке */
	getDetailsLayout?: ({ rowData, onClickRowHandler }: getDetailsLayoutAttributes) => any
}

function CustomList(props: ListProps) {
	const { columnsSettings, getDataHandler, searchData, setSearchHandler, isScrollable = true, getDetailsLayout } = props;

	const [page, setPage] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [sortData, setSortData] = useState<SortData>();
	const [items, setItems] = useState<any[]>([]);
	const [openRowIndex, setOpenRowIndex] = useState<number>();
	const bodyRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log(searchData)
	}, [searchData])

	const reloadData = () => {
		setIsLoading(false);
		setItems([])

		loadData();
	}

	useEffect(() => {
		console.log(items);
	}, [items])

	const loadData = async (items: any[] = [], page: number = 0, hasMore: boolean = true) => {
		if (isLoading) return;
		if (!hasMore) return;

		setIsLoading(true);

		const fetchData = await getDataHandler(page, sortData, searchData);
		setHasMore(fetchData.hasMore)

		setItems([...items, ...fetchData.data])
		setPage(page + 1);
		setIsLoading(false);
	}

	const onScroll = () => {
		const body = bodyRef.current!;
		const height = body.scrollHeight - body.offsetHeight;
		const scrollPosition = body.scrollTop;

		if ((height - scrollPosition) / height < 0.05 && !isLoading) {
			loadData(items, page, hasMore)
		}
	}

	/** Установить обработчик нажатия на кнопку поиск */
	useEffect(() => {
		if (!setSearchHandler) return;

		setSearchHandler(() => () => { reloadData() });
	}, [searchData])

	/** Обновление оглавления при изменении сортировки */
	useEffect(() => {
		reloadData();
	}, [sortData])

	/** Нажатие на сортировку */
	const handleSortClick = (sortDataNew: SortData | undefined) => {
		setSortData(sortDataNew);
	}

	return (
		<div className='custom-list'>
			<div
				className={
					isScrollable
						? "custom-list__header custom-list__header_scrollable"
						: "custom-list__header"
				}
			>
				{columnsSettings.map(columnSettings =>
					<CustomListColumn
						sortData={sortData}
						handleSortClick={handleSortClick}
						{...columnSettings}
					/>
				)}
			</div>
			<div
				className={
					isScrollable
						? "custom-list__body_scrollable"
						: "custom-list__body"
				}
				ref={bodyRef}
				onScroll={onScroll}
			>
				{items.map(data => {
					/** Обработчик нажатия на строку */
					const toggleShowDetails = () => {
						if (data.id === undefined) return;

						if (data.id === openRowIndex) {
							setOpenRowIndex(undefined)
							return
						}

						setOpenRowIndex(data.id)
					}

					return <CustomListRow
						key={data.id}
						data={data}
						columnsSettings={columnsSettings}
						getDetailsLayout={getDetailsLayout}
						isShowDetails={getDetailsLayout && data.id === openRowIndex}
						setOpenRowIndex={toggleShowDetails}
						reloadData={reloadData}
					/>
				})}
				{isLoading && <Loader />}
			</div>
		</div>
	)
}

export default CustomList
