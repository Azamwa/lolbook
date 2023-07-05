import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_KEY, riotApiURL } from 'store/record';
import SearchForm from 'components/common/SearchForm';
import { RankingType } from 'utils/recordType';
import Ranking from 'components/units/Ranking';
import Pagenation from 'components/common/Pagenation';

export const getServerSideProps = async () => {
	const header = {
		headers: {
			Accept: 'application/json',
			'Accept-Encoding': 'identity'
		}
	};
	try {
		const challenger = await axios.get(
			`${riotApiURL}/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?${API_KEY}`,
			header
		);
		const grandMaster = await axios.get(
			`${riotApiURL}/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5?${API_KEY}`,
			header
		);

		const entries = [...challenger.data.entries, ...grandMaster.data.entries];
		const ranking = entries.sort(
			(a: RankingType, b: RankingType) => b.leaguePoints - a.leaguePoints
		);

		return {
			props: {
				ranking
			}
		};
	} catch (e) {
		console.log(e);
	}
};

interface RecordProps {
	ranking: RankingType[];
}

export default function index({ ranking }: RecordProps) {
	useEffect(() => {
		console.log(ranking);
	}, []);
	return (
		<>
			<Background />
			<PageWrap>
				<PageContent>
					<SearchForm />
					<RankingSection>
						<RankingTitle>
							# 랭킹<span>그랜드마스터 이상의 소환사만 표시합니다. </span>
						</RankingTitle>
						<Ranking rankers={ranking} />
					</RankingSection>
					<Pagenation />
				</PageContent>
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
`;

const PageContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 30px;
`;

const RankingSection = styled.section``;

const RankingTitle = styled.p`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 5px;
	font-size: 3rem;
	color: rgb(52, 69, 85);

	span {
		font-size: 1.5rem;
	}
`;
