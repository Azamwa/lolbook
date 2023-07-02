import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { romeToNumber, winningRate } from 'utils/common';

interface SummonerRankProps {
	rankInfo?: {
		leagueId: string;
		summonerId: string;
		summonerName: string;
		queueType: string;
		tier: string;
		rank: string;
		leaguePoints: number;
		wins: number;
		losses: number;
		hotStreak: string;
		veteran: string;
		freshBlood: string;
		inactive: string;
	};
	rankType: string;
}

export default function SummonerRank({ rankInfo, rankType }: SummonerRankProps) {
	return (
		<LankBox>
			<LankTitle>
				{rankType} {rankInfo === undefined && <span>Unranked</span>}
			</LankTitle>
			{rankInfo !== undefined && (
				<LankInfo>
					<TierInfo>
						<Image
							src={`/img/rank/emblem-${rankInfo.tier.toLowerCase()}.png`}
							width={80}
							height={80}
							alt={'rank_emblem'}
						/>
						<Tier>
							<p>{`${rankInfo.tier} ${romeToNumber(rankInfo.rank)}`}</p>
							<LeaguePoint>{`${rankInfo.leaguePoints} LP`}</LeaguePoint>
						</Tier>
					</TierInfo>
					<Record>
						<p>{`${rankInfo.wins}승 ${rankInfo.losses}패`}</p>
						<p>{`승률 ${winningRate(rankInfo.wins, rankInfo.losses)}%`}</p>
					</Record>
				</LankInfo>
			)}
		</LankBox>
	);
}
const LankBox = styled.div`
	width: 100%;
	border-radius: 5px;
	font-size: 1.7rem;
	color: #fff;
	background-color: rgb(52, 69, 85);
`;

const LankTitle = styled.div`
	border-bottom: 1px solid rgb(138, 158, 177);
	padding: 10px;
	display: flex;
	justify-content: space-between;
`;

const LankInfo = styled.div`
	width: 100%;
	padding: 10px;
	padding-right: 15px;
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;

const TierInfo = styled.div`
	display: flex;
	gap: 5px;
`;

const Tier = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	justify-content: center;
`;

const LeaguePoint = styled.p`
	font-size: 1.3rem;
	color: #bbb;
`;

const Record = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	font-size: 1.5rem;
	color: #bbb;
`;
