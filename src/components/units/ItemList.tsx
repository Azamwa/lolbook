import React from 'react';
import styled from 'styled-components';
import { ItemProps } from 'utils/types';

const ListContainer = styled.div`
	background-color: rgb(33, 47, 61);
	overflow-x: hidden;
	overflow-y: auto;
	display: grid;
	grid-template-columns: repeat(40px, auto);
`;

const ItemContainer = styled.div``;

type ItemListProps = {
	itemList: [string, ItemProps][];
};

function ItemList({ itemList }: ItemListProps) {
	return (
		<ListContainer>
			{itemList.map((item) => {
				return <div key={item[0]}>{item[1].name}</div>;
			})}
		</ListContainer>
	);
}

export default ItemList;
