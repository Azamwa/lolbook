import Image from 'next/image';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ItemProps } from 'utils/types';

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
	color: #fff;
	font-size: 2.5rem;
	margin-bottom: 10px;

	:hover {
		cursor: pointer;
	}
`;

const ItemListByGroup = styled.div`
	display: grid;
	justify-content: center;
	grid-template-columns: repeat(auto-fill, 40px);
	grid-gap: 10px;
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
	useEffect(() => {
		console.log(itemList);
	}, []);
	return (
		<ListContainer>
			{itemList.map((group) => {
				return (
					<ItemGroup key={group.id}>
						<ItemGroupName>{group.name} ▾</ItemGroupName>
						<ItemListByGroup>
							{group?.value?.map((item, index) => {
								return (
									<ItemContainer key={index} title={item.name}>
										<Image
											src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/item/${item?.image?.full}`}
											width={40}
											height={40}
											alt="itemImage"
										/>
										<ItemPrice>{item?.gold?.total}</ItemPrice>
									</ItemContainer>
								);
							})}
						</ItemListByGroup>
					</ItemGroup>
				);
			})}
		</ListContainer>
	);
}

export default ItemList;
