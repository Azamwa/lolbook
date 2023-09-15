import React, { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';
import SearchIcon from 'components/common/SearchIcon';
import { useRouter } from 'next/router';

export default function SearchForm() {
	const router = useRouter();
	const [searchName, setSearchName] = useState<string>('');

	const movePage = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            router.push({ pathname: `/record/${searchName}` });
        }
	};

	return (
		<InputContainer>
			<SearchInput
				placeholder="소환사명을 검색해주세요."
				onChange={(e) => setSearchName(e.target.value)}
                onKeyUp={(e) => movePage(e)}
			/>
			<SearchIcon />
		</InputContainer>
	);
}

const InputContainer = styled.div`
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
	height: 40px;
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
