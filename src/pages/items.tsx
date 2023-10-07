import React, { ChangeEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import ItemList from 'components/units/item/ItemList';
import ItemDetail from 'components/units/item/ItemDetail';
import { ItemListType, ItemType } from 'utils/types';
import { itemFilter, itemListState, openDetailState } from 'store/items';
import { BiSearchAlt2 } from 'react-icons/bi';

export const getStaticProps = async () => {
	const response = await fetch(
		`https://ddragon.leagueoflegends.com/cdn/13.20.1/data/ko_KR/item.json`
	);
	const { data } = await response.json();
	const items = Object.values(data);

	return {
		props: { items, allItems: data }
	};
};

interface ItemsProps {
	items: ItemType[];
	allItems: ItemListType;
}

export default function Items({ items, allItems }: ItemsProps) {
	const [searchValue, setSearchValue] = useState<string>('');
	const [checkedFilter, setCheckedFilter] = useState<string[][]>([]);
	const { openDetail } = openDetailState();
	const { itemGroup, setItemGroup } = itemListState();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleChecked = (e: ChangeEvent<HTMLInputElement>, id: string[]) => {
		if (e.target.checked) {
			setCheckedFilter(checkedFilter.length === 0 ? [id] : [...checkedFilter, id]);
		} else {
			setCheckedFilter(checkedFilter.filter((filter) => id !== filter));
		}
	};

	useEffect(() => {
		let searchItems =
			searchValue === '' ? items : items.filter((item) => item.name.includes(searchValue));

		if (checkedFilter.length !== 0) {
			let filterCount = 0;
			while (filterCount < checkedFilter.length) {
				const filter = checkedFilter[filterCount];
				searchItems = searchItems.filter((item) => {
					if (filter.length === 1) {
						return item.tags.includes(filter[0]);
					} else if (filter.length === 2) {
						return item.tags.includes(filter[0]) || item.tags.includes(filter[1]);
					}
					return false;
				});
				filterCount++;
			}
		}
		setItemGroup(searchItems);
	}, [searchValue, checkedFilter]);

	return (
		<>
			<Head>
				<title>LOLBook | 아이템도감</title>
			</Head>
			<Background>
				<Image src="/img/background/Invasion_of_starGuard.jpg" alt="background" fill />
			</Background>
			<ItemWrap>
				<ItemListBox openDetail={openDetail}>
					<Spacer />
					<SearchContainer>
						<SearchInput
							onChange={handleInputChange}
							value={searchValue}
							placeholder="아이템을 검색해 주세요."
						/>
                        <IconWrap>
                            <BiSearchAlt2 />
                        </IconWrap>
					</SearchContainer>
					<FilterContainer>
						{itemFilter.map((filter, index) => {
							return (
								<ItemFilterBox key={filter.id[0]}>
									<FilterCheckBox
										type="checkbox"
										id={filter.id[0]}
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleChecked(e, filter.id)
										}
										filterImage={filter.url}
										smallSize={index > 4 && index < 11}
										title={filter.title}
									/>
									<Label htmlFor={filter.id[0]} title={filter.title} />
								</ItemFilterBox>
							);
						})}
					</FilterContainer>
					<ItemList itemList={itemGroup} allItems={allItems} />
				</ItemListBox>
				<ItemDetail allItems={allItems} />
			</ItemWrap>
		</>
	);
}

const Background = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	z-index: -1;
`;

const ItemWrap = styled.div`
	height: 100%;
	padding: 50px;
	padding-top: 120px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;

	@media screen and (max-width: 767px) {
		justify-content: center;
	}
`;

const ItemListBox = styled.div<{ openDetail: boolean }>`
	min-width: 310px;
	width: 40%;
	max-width: 650px;
	min-height: 691px;
	height: 85%;
	background-color: rgb(44, 62, 80);
	display: grid;
	grid-template-rows: 50px auto;
	grid-template-columns: 45px auto;

	& ::-webkit-scrollbar {
		color: black;
	}

	& ::-webkit-scrollbar-thumb {
		background-color: rgb(52, 69, 85);
	}

	& ::-webkit-scrollbar-track {
		background-color: rgb(26, 36, 46);
	}

	@media screen and (max-width: 1300px) {
		grid-template-columns: 40px auto;
		min-height: 620px;
	}

	@media screen and (max-width: 767px) {
		display: ${(props) => (props.openDetail ? 'none' : 'grid')};
		width: 55%;
		grid-template-rows: 40px auto;
		grid-template-columns: 35px auto;
		min-height: 540px;
	}
`;

const Spacer = styled.div`
	width: 45px;
	height: 50px;
	border-bottom: 1px solid rgb(93, 109, 126);
	border-right: 1px solid rgb(93, 109, 126);

	@media screen and (max-width: 1300px) {
		width: 40px;
	}

	@media screen and (max-width: 767px) {
		width: 35px;
		height: 40px;
	}
`;

const SearchContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	padding: 0 20px;
`;

const SearchInput = styled.input`
	width: 100%;
	height: 35px;
	padding: 5px 40px;
	font-size: 1.5rem;
	background-color: rgb(33, 47, 61);
	border: 1px solid rgb(93, 109, 126);
	color: #fff;
	outline: none;

	::placeholder {
		color: rgb(93, 109, 126);
	}

	@media screen and (max-width: 767px) {
		height: 30px;
		padding: 3px 30px;
	}
`;


const IconWrap = styled.div`
	font-size: 2rem;
	color: rgb(93, 109, 126);
	position: absolute;
	top: 15px;
	left: 30px;

	@media screen and (max-width: 767px) {
		font-size: 1.7rem;
	}
`;


const FilterContainer = styled.div``;

const ItemFilterBox = styled.div`
	height: 45px;
	display: flex;
	justify-content: center;
	align-items: center;

	:hover {
		cursor: pointer;
		background-color: rgb(93, 109, 126);
	}

	@media screen and (max-width: 1300px) {
		height: 40px;
	}

	@media screen and (max-width: 767px) {
		height: 35px;
	}
`;

const Label = styled.label``;

const FilterCheckBox = styled.input<{ filterImage: string; smallSize: boolean }>`
	position: absolute;
	width: 45px;
	height: 45px;
	opacity: 0;
	z-index: 0;

	@media screen and (max-width: 1300px) {
		width: 40px;
		height: 40px;
	}

	@media screen and (max-width: 767px) {
		width: 35px;
		height: 35px;
	}

	& + ${Label} {
		display: block;
		width: ${(props) => (props.smallSize ? '65%' : '50%')};
		height: ${(props) => (props.smallSize ? '65%' : '50%')};
		background-image: ${(props) =>
			`url(https://cdn.mobalytics.gg/assets/lol/images/item-categories/${props.filterImage})`};
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
		filter: invert(62%) sepia(28%) saturate(632%) hue-rotate(3deg) brightness(97%) contrast(90%);

		&:hover {
			cursor: pointer;
		}

		@media screen and (max-width: 1300px) {
			width: ${(props) => (props.smallSize ? '55%' : '45%')};
			height: ${(props) => (props.smallSize ? '55%' : '45%')};
		}

		@media screen and (max-width: 767px) {
			width: ${(props) => (props.smallSize ? '50%' : '40%')};
			height: ${(props) => (props.smallSize ? '50%' : '40%')};
		}
	}

	&:hover {
		cursor: pointer;
	}

	&:checked + ${Label} {
		filter: invert(9%) sepia(73%) saturate(2159%) hue-rotate(352deg) brightness(100%)
			contrast(95%);
	}
`;
