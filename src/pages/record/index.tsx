import SearchIcon from 'components/common/SearchIcon';
import React from 'react';
import styled from 'styled-components';

export default function index() {
	return (
		<PageWrap>
			<Background />
			<SearchForm>
				<SearchInput placeholder="소환사명을 검색해주세요." />
				<SearchIcon />
			</SearchForm>
		</PageWrap>
	);
}

const PageWrap = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Background = styled.div`
	width: 100vw;
	height: 100vh;
	background-image: url('/img/background/in73r6sbixz31.webp');
	background-size: cover;
	background-position: center center;
	filter: blur(1.5px);
	transform: scale(1.02);
	position: absolute;
	z-index: -1;
`;

const SearchForm = styled.div`
	width: 40%;
	max-width: 1300px;
	height: 50px;
	padding: 0 20px;
	display: flex;
	align-items: center;
	position: relative;
`;

const SearchInput = styled.input`
	width: 100%;
	height: 50px;
	border: none;
	padding: 0 40px;
	background-color: rgb(52, 69, 85);
	border-radius: 5px;
	color: #fff;
	font-size: 1.5rem;
	outline: none;

	::placeholder {
		color: rgb(93, 109, 126);
	}
`;
