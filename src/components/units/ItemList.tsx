import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ItemProps } from 'utils/types';
import { useAppSelector } from 'store/index';

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
	padding: 10px;
	color: #fff;
	font-size: 2.5rem;
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

const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 3px;

	:hover {
		cursor: pointer;
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
};

function ItemList({ itemList }: ItemListProps) {
	const [toggleGroup, setToggleGroup] = useState<boolean[]>(
		new Array(itemList.length).fill(true)
	);
	const version = useAppSelector((state) => state.version.lastVersion);

	const handleSetToggle = (index: number) => {
		setToggleGroup(
			toggleGroup.map((toggleOn, toggleIndex) => {
				return index === toggleIndex ? !toggleOn : toggleOn;
			})
		);
	};

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
										<ItemContainer key={index} title={item.name}>
											{version !== '' && (
												<Image
													src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item?.image?.full}`}
													width={40}
													height={40}
													alt="itemImage"
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
