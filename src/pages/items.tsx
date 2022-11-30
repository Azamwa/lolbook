import React, { ChangeEvent, useEffect, useState } from 'react';
import itemsStyle from 'styles/pages/items.module.scss';
import classNames from 'classnames/bind';
import ItemList from './../components/units/ItemList';
import Image from 'next/image';
import { BiSearchAlt2 } from 'react-icons/bi';
import { itemFilter } from 'utils/itemFilter';

const cx = classNames.bind(itemsStyle);

type ItemProps = {
	itemList: {
		type: string;
		version: string;
		basic: object;
		data: object;
		groups: object;
		tree: object;
	};
};

function Items({ itemList }: ItemProps) {
	const { data } = itemList;
	const [searchValue, setSearchValue] = useState<string>('');
	useEffect(() => {
		console.log(data);
	}, [data]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<>
			<div className={cx('Background')} />
			<div className={cx('item-wrap')}>
				<div className={cx('item-list-box')}>
					<div className={cx('spacer')} />
					<div className={cx('searchContainer')}>
						<input
							className={cx('searchInput')}
							onChange={handleInputChange}
							value={searchValue}
							placeholder="아이템을 검색해 주세요."
						/>
						<BiSearchAlt2 className={cx('searchIcon')} />
					</div>
					<div className={cx('filterContainer')}>
						{itemFilter.map((filter) => {
							return (
								<div className={cx('itemFilterBox')} key={filter.id}>
									<Image
										loader={() =>
											`${process.env.NEXT_PUBLIC_ITEM_FILTER_IMG}${filter.url}`
										}
										src={`${process.env.NEXT_PUBLIC_ITEM_FILTER_IMG}${filter.url}`}
										alt="item-filter"
										width={23}
										height={30}
										title={filter.title}
									/>
								</div>
							);
						})}
					</div>
					<ItemList />
				</div>
			</div>
		</>
	);
}

export const getStaticProps = async () => {
	const response = await fetch(
		'https://ddragon.leagueoflegends.com/cdn/12.22.1/data/ko_KR/item.json'
	);
	const itemList = await response.json();
	return {
		props: { itemList }
	};
};

export default Items;
