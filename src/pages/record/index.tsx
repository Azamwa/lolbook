import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { summonerNameState } from 'store/record';
import SearchIcon from 'components/common/SearchIcon';

export default function index() {
	const router = useRouter();
	const [searchName, setSearchName] = useState<string>('');
	const [summonerName, setSummonerName] = useAtom(summonerNameState);
	const asd = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSummonerName(searchName);
		router.push(`/record/${summonerName}`);
	};

	return (
		<PageWrap>
			<Background />
			<SearchForm onSubmit={(e) => asd(e)}>
				<SearchInput
					placeholder="소환사명을 검색해주세요."
					onChange={(e) => setSearchName(e.target.value)}
				/>
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

const SearchForm = styled.form`
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
