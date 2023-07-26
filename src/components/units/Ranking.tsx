import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { currentPageState, summonerNameState } from 'store/record';
import styled from 'styled-components';
import { winningRate } from 'utils/common';
import { RankingType } from 'utils/recordType';

interface RankingProps {
	rankers: RankingType[];
}

export default function Ranking({ rankers }: RankingProps) {
	const router = useRouter();
	const page = useAtomValue(currentPageState);
	const [pageNumber, setPageNumber] = useState<number[]>([]);
	const [currentRanker, setCurrentRanker] = useState<RankingType[]>([]);
	const setSummonerName = useSetAtom(summonerNameState);

	useEffect(() => {
		let pageRankers: RankingType[] = [];
		let numbers: number[] = [];
		for (let i = (page - 1) * 15; i < page * 15; i++) {
			pageRankers = [...pageRankers, rankers[i]];
			numbers = [...numbers, i + 1];
		}
		setPageNumber(numbers);
		setCurrentRanker(pageRankers);
	}, [page]);

	const searchSummoner = (ranker: RankingType) => {
		setSummonerName(ranker.summonerName);
		router.push({
			pathname: `/record/${ranker.summonerName}`,
			query: {
				fromRank: true
			}
		});
	};

	return (
		<RankingTable>
			<thead>
				<tr>
					<TableHeader>
						<RankingNumber>#</RankingNumber>
						<SummonerName>소환사명</SummonerName>
						<Tier>티어</Tier>
						<LeaguePoint>LP</LeaguePoint>
						<WinningRate>승률</WinningRate>
					</TableHeader>
				</tr>
			</thead>
			<tbody>
				<TableBody>
					{currentRanker.map((ranker, index) => (
						<TableContent
							key={ranker.summonerId}
							onClick={() => searchSummoner(ranker)}>
							<RankingNumber>{pageNumber[index]}</RankingNumber>
							<SummonerName>{currentRanker[index].summonerName}</SummonerName>
							<Tier>{pageNumber[index] <= 300 ? 'Challenger' : 'GrandMaster'}</Tier>
							<LeaguePoint>{`${currentRanker[index].leaguePoints} LP`}</LeaguePoint>
							<WinningRate>
								<WinningGraph>
									<WinRate
										winsRate={winningRate(
											currentRanker[index].wins,
											currentRanker[index].losses
										)}>
										<Wins>{currentRanker[index].wins}W</Wins>
									</WinRate>
									<LoseRate
										lossesRate={
											100 -
											winningRate(
												currentRanker[index].wins,
												currentRanker[index].losses
											)
										}>
										<Losses>{currentRanker[index].losses}L</Losses>
									</LoseRate>
								</WinningGraph>
								<WinningRateText>
									{`${winningRate(
										currentRanker[index].wins,
										currentRanker[index].losses
									)} %`}
								</WinningRateText>
							</WinningRate>
						</TableContent>
					))}
				</TableBody>
			</tbody>
		</RankingTable>
	);
}

const RankingTable = styled.table`
	width: 870px;
	height: 590px;
	border-radius: 5px;
	background-color: rgb(52, 69, 85);
	color: #ccc;
	font-size: 1.5rem;
`;

const TableHeader = styled.th`
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
	width: 380px;
`;

const Tier = styled.div`
	width: 120px;
`;

const LeaguePoint = styled.div`
	width: 100px;
`;

const WinningRate = styled.div`
	width: 200px;
	display: flex;
	align-items: center;
	gap: 10px;
	position: relative;
`;

const WinningGraph = styled.div`
	width: 150px;
	height: 25px;
	border-radius: 5px;
`;

const WinRate = styled.div<{ winsRate: number }>`
	width: ${(props) => props.winsRate * 1.5 + 'px'};
	height: 100%;
	border-radius: 5px 0 0 5px;
	display: flex;
	justify-content: flex-end;
	background-color: #4983ff;
	position: absolute;
	left: 0;
	line-height: 25px;
`;

const LoseRate = styled.div<{ lossesRate: number }>`
	width: ${(props) => props.lossesRate * 1.5 + 'px'};
	height: 100%;
	border-radius: 0 5px 5px 0;
	display: flex;
	justify-content: flex-end;
	background-color: #ff4848;
	position: absolute;
	left: ${(props) => 150 - props.lossesRate * 1.5 + 'px'};
	line-height: 25px;
`;

const Wins = styled.span`
	font-size: 1.2rem;
	color: #fff;
	position: absolute;
	left: 5px;
`;

const Losses = styled.span`
	font-size: 1.2rem;
	color: #fff;
	position: absolute;
	right: 5px;
`;

const WinningRateText = styled.span`
	font-size: 1.3rem;
	color: #fff;
`;

const TableBody = styled.tr``;

const TableContent = styled.td`
	width: 100%;
	height: 35px;
	padding: 10px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);

	:hover {
		cursor: pointer;
		background-color: rgb(77, 97, 116);
	}
`;
