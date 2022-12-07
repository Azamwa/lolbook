import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemList from './../components/units/ItemList';
import { BiSearchAlt2 } from 'react-icons/bi';
import { itemFilter } from 'utils/items/itemListInfo';
import { useAppDispatch } from 'store';
import { useAppSelector } from './../store/index';
import items, { setItemsByGroup } from 'store/items';

const Background = styled.div`
	width: 100vw;
	height: 100vh;
	background-image: url('/img/Invasion_of_starGuard.jpg');
	background-size: cover;
	background-position: center;
	filter: blur(2px);
	opacity: 0.9;
	position: absolute;
	transform: scale(1.02);
	z-index: -1;
`;

const ItemWrap = styled.div`
	height: 100%;
	padding: 50px;
	padding-top: 120px;
	display: flex;
	align-items: center;
`;

const ItemListBox = styled.div`
	min-width: 310px;
	width: 45%;
	min-height: 641px;
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
`;

const Spacer = styled.div`
	width: 45px;
	height: 50px;
	border-bottom: 1px solid rgb(93, 109, 126);
	border-right: 1px solid rgb(93, 109, 126);
`;

const SearchContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

const SearchInput = styled.input`
	width: 90%;
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
`;

const SearchIcon = styled.div`
	font-size: 2rem;
	color: rgb(93, 109, 126);
	position: absolute;
	left: 7%;
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
`;

const FilterCheckBox = styled.input`
	display: none;
	width: 30px;
	height: 30px;
`;

const Label = styled.label<{ filterImage: string; smallSize: boolean }>`
	display: block;
	width: ${(props) => (props.smallSize ? '60%' : '50%')};
	height: ${(props) => (props.smallSize ? '60%' : '50%')};
	background-image: ${(props) =>
		`url(https://cdn.mobalytics.gg/assets/lol/images/item-categories/${props.filterImage})`};
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	filter: invert(62%) sepia(28%) saturate(632%) hue-rotate(3deg) brightness(97%) contrast(90%);

	:hover {
		cursor: pointer;
	}
`;

type ItemProps = {
	itemData: {
		type: string;
		version: string;
		basic: object;
		data: object;
		groups: object;
		tree: object;
	};
};

function Items({ itemData }: ItemProps) {
	const dispatch = useAppDispatch();
	const itemList = useAppSelector((state) => state.items.itemGroup);
	const { data } = itemData;
	const [searchValue, setSearchValue] = useState<string>('');

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	useEffect(() => {
		dispatch(setItemsByGroup(data));
	}, []);

	return (
		<>
			<Background />
			<ItemWrap>
				<ItemListBox>
					<Spacer />
					<SearchContainer>
						<SearchInput
							onChange={handleInputChange}
							value={searchValue}
							placeholder="아이템을 검색해 주세요."
						/>
						<SearchIcon>
							<BiSearchAlt2 />
						</SearchIcon>
					</SearchContainer>
					<FilterContainer>
						{itemFilter.map((filter, index) => {
							return (
								<ItemFilterBox key={filter.id}>
									<FilterCheckBox type="checkbox" id="filterImg" />
									<Label
										htmlFor="filterImg"
										filterImage={filter.url}
										smallSize={index > 4 && index < 11}
										title={filter.title}
									/>
								</ItemFilterBox>
							);
						})}
					</FilterContainer>
					<ItemList itemList={itemList} />
				</ItemListBox>
			</ItemWrap>
		</>
	);
}

export const getStaticProps = async () => {
	const response = await fetch(
		'https://ddragon.leagueoflegends.com/cdn/12.22.1/data/ko_KR/item.json'
	);
	const itemData = await response.json();
	return {
		props: { itemData }
	};
};

export default Items;
