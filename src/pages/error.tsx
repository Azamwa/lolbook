import React from 'react';
import styled from 'styled-components';

export default function error() {
	return <ErrorPage>에러페이지입니다.</ErrorPage>;
}

const ErrorPage = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
