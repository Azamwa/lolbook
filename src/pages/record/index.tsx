import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_KEY, riotApiURL } from 'store/record';
import SearchForm from 'components/common/SearchForm';
import { RankingAPiType } from 'utils/recordType';

export const getServerSideProps = async () => {
	const header = {
		headers: {
			Accept: 'application/json',
			'Accept-Encoding': 'identity'
		}
	};
	const rankingURL = `${riotApiURL}/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?${API_KEY}`;
	const rankingAPI = await axios.get(rankingURL, header);

	try {
		const { entries } = rankingAPI.data;
		const ranking = entries.sort(
			(a: RankingAPiType, b: RankingAPiType) => b.leaguePoints - a.leaguePoints
		);
		return {
			props: {
				ranking: ranking
			}
		};
	} catch (e) {
		console.log(e);
	}
};

interface RecordProps {
	ranking: RankingAPiType[];
}

export default function index({ ranking }: RecordProps) {
	useEffect(() => {
		console.log(ranking);
	}, []);
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
