import React from 'react';
import styled from 'styled-components';

export default function error() {
	return <ErrorPage>에러페이지 리디렉션</ErrorPage>;
}

const ErrorPage = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(52, 69, 85);
	color: #fff;
	font-size: 2rem;
	font-weight: 700;
`;
