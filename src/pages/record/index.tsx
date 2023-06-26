import SearchForm from 'components/common/SearchForm';
import React from 'react';
import styled from 'styled-components';

export default function index() {
	return (
		<>
			<Background />
			<PageWrap>
				<FormWrap>
                    <SearchForm />
                </FormWrap>
			</PageWrap>
		</>
	);
}

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

const PageWrap = styled.div`
	width: 100vw;
	height: 100vh;
	padding: 60px;
	padding-top: 100px;
`;

const FormWrap = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
