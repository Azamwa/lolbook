import React from 'react';
import styled from 'styled-components';
import { RankingAPiType } from 'utils/recordType';

interface RankingProps {
	rankers: RankingAPiType[];
}

export default function Ranking({ rankers }: RankingProps) {
	return (
		<RankingTable>
			<TableHeader>
				<RankingNumber>#</RankingNumber>
				<SummonerName>소환사명</SummonerName>
				<Tier>티어</Tier>
				<LeaguePoint>LP</LeaguePoint>
				<WinningRate>승률</WinningRate>
			</TableHeader>
			<TableBody></TableBody>
		</RankingTable>
	);
}

const RankingTable = styled.div`
	min-width: 850px;
	height: 600px;
	border-radius: 5px;
	background-color: rgb(52, 69, 85);
	color: #ccc;
	font-size: 1.5rem;
`;

const TableHeader = styled.div`
	width: 100%;
	height: 45px;
	padding: 10px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const RankingNumber = styled.div`
	width: 50px;
`;

const SummonerName = styled.div`
	width: 400px;
`;

const Tier = styled.div`
	width: 100px;
`;

const LeaguePoint = styled.div`
	width: 100px;
`;

const WinningRate = styled.div`
	width: 200px;
`;

const TableBody = styled.div``;
