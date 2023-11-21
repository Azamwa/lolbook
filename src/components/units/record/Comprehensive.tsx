import React from 'react';
import styled from 'styled-components';

export default function Comprehensive() {
	return <ComprehensiveInfo>Comprehensive</ComprehensiveInfo>;
}

const ComprehensiveInfo = styled.div`
	width: 100%;
	height: 100px;
	padding: 10px;
	border-radius: 5px;
	background-color: rgb(52, 69, 85);
	display: flex;
	justify-content: center;
`;
