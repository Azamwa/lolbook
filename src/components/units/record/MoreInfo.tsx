import React from 'react';
import styled from 'styled-components';
import { MatchType } from 'utils/recordType';

interface MoreInfoProps {
	match: MatchType;
}

export default function MoreInfo({ match }: MoreInfoProps) {
	return <MoreInfoContainer></MoreInfoContainer>;
}

const MoreInfoContainer = styled.div`
	width: 100%;
	height: 100px;
	border-radius: 5px;
	background-color: pink;
`;
