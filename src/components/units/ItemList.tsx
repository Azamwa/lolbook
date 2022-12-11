import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ItemProps } from 'utils/types';
import { useAppDispatch, useAppSelector } from 'store/index';
import { setItemDetail } from 'store/items';

const ListContainer = styled.div`
	padding: 20px;
	height: 100%;
	max-height: 640px;
	background-color: rgb(33, 47, 61);
	overflow-x: hidden;
	overflow-y: auto;
`;

const ItemGroup = styled.div`
	margin-bottom: 20px;
`;

const ItemGroupName = styled.div`
	padding-left: 20px;
	color: #fff;
	font-size: 2rem;
	margin-bottom: 10px;

	:hover {
		cursor: pointer;
	}
`;

const ItemListByGroup = styled.div<{ toggleOn: boolean }>`
	display: ${(props) => (props.toggleOn ? 'grid' : 'none')};
	justify-content: center;
	grid-template-columns: repeat(auto-fill, 40px);
	grid-gap: 10px;
	margin-bottom: 50px;
`;

const ItemContainer = styled.div<{ selected: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;

	:hover {
		cursor: pointer;
	}

	img {
		border: ${(props) => (props.selected ? '2px solid rgb(174, 214, 241)' : 'none')};
	}
`;

const ItemPrice = styled.span`
	font-size: 1.2rem;
	color: #fff;
`;

type ItemListProps = {
	itemList: {
		id: string;
		items: number[];
		name: string;
		value: undefined | ItemProps[];
	}[];
	fromItemDetail: (item: ItemProps) => void;
};

function ItemList({ itemList, fromItemDetail }: ItemListProps) {
	const dispatch = useAppDispatch();
	const [toggleGroup, setToggleGroup] = useState<boolean[]>(
		new Array(itemList.length).fill(true)
	);
	const selectItemDetail = useAppSelector((state) => state.items.itemDetail);
	const [selectedItem, setSelectItem] = useState<ItemProps | undefined>();
	const version = useAppSelector((state) => state.version.lastVersion);

	const handleSetToggle = (index: number) => {
		setToggleGroup(
			toggleGroup.map((toggleOn, toggleIndex) => {
				return index === toggleIndex ? !toggleOn : toggleOn;
			})
		);
	};

	const handleClickItems = (item: ItemProps) => {
		dispatch(setItemDetail(item));
		setSelectItem(item);
		fromItemDetail(item);
	};

	useEffect(() => {
		setSelectItem(selectItemDetail);
	}, [selectItemDetail]);

	return (
		<ListContainer>
			{itemList.map((group, groupIdx) => {
				return (
					group?.value?.length !== 0 && (
						<ItemGroup key={group.id}>
							<ItemGroupName onClick={() => handleSetToggle(groupIdx)}>
								{group.name} ▾
							</ItemGroupName>
							<ItemListByGroup toggleOn={toggleGroup[groupIdx]}>
								{group?.value?.map((item, index) => {
									return (
										<ItemContainer
											key={index}
											title={item.name}
											selected={item === selectedItem}>
											{version !== '' && (
												<Image
													src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item?.image?.full}`}
													width={40}
													height={40}
													alt="itemImage"
													onClick={() => handleClickItems(item)}
												/>
											)}
											<ItemPrice>{item?.gold?.total}</ItemPrice>
										</ItemContainer>
									);
								})}
							</ItemListByGroup>
						</ItemGroup>
					)
				);
			})}
		</ListContainer>
	);
}

export default ItemList;
