import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { versionListState } from 'store/common';
import { ItemGroupType, ItemListType, ItemType } from 'utils/types';
import { fromItemState, openDetailState, selectItemState } from 'store/items';

type ItemListProps = {
	itemList: ItemGroupType[];
	allItems: ItemListType;
};

export default function ItemList({ itemList, allItems }: ItemListProps) {
	const version = useAtomValue(versionListState)[0];
	const setFromItem = useSetAtom(fromItemState);
	const [selectItem, setSelectItem] = useAtom(selectItemState);
	const setOpenDetail = useSetAtom(openDetailState);
	const [toggleGroup, setToggleGroup] = useState<boolean[]>(
		new Array(itemList.length).fill(true)
	);

	useEffect(() => {
		console.log(version);
	}, [version]);

	const handleSetToggle = (index: number) => {
		setToggleGroup(
			toggleGroup.map((toggleOn, toggleIndex) => {
				return index === toggleIndex ? !toggleOn : toggleOn;
			})
		);
	};

	const handleClickItems = (item: ItemType) => {
		setOpenDetail();
		setSelectItem(item);
		setFromItem({ itemIdList: item.from, itemList: allItems });
	};

	return (
		<ListContainer>
			{itemList.map((group, groupIdx) => {
				return (
					group.value.length > 0 && (
						<ItemGroup key={group.id}>
							<ItemGroupName onClick={() => handleSetToggle(groupIdx)}>
								{group.name} ▾
							</ItemGroupName>
							<ItemListByGroup toggleOn={toggleGroup[groupIdx]}>
								{group.value.map((item, index) => {
									return (
										<ItemContainer
											key={index}
											title={item.name}
											selected={
												selectItem !== null && item.name === selectItem.name
											}>
											{version && (
												<Image
													src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
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

const ListContainer = styled.div`
	padding: 20px;
	height: 100%;
	background-color: rgb(33, 47, 61);
	overflow-x: hidden;
	overflow-y: auto;

	@media screen and (max-width: 1300px) {
		padding: 15px;
	}
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

	@media screen and (max-width: 1300px) {
		padding-left: 15px;
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

		@media screen and (max-width: 767px) {
			width: 35px;
			height: 35px;
		}
	}
`;

const ItemPrice = styled.span`
	font-size: 1.2rem;
	color: #fff;
`;
