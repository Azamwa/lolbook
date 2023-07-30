import React from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import styled from 'styled-components';

export default function SearchIcon() {
	return (
		<IconWrap>
			<BiSearchAlt2 />
		</IconWrap>
	);
}

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
