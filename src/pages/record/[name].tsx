import React, { useEffect, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import axios from 'axios';
import { API_KEY, riotAPI, riotAsiaAPI } from 'store/record';
import { SummonerType } from 'utils/recordType';
import SearchForm from 'components/common/SearchForm';
import SummonerRank from 'components/units/SummonerRank';

export const getServerSideProps: GetServerSideProps<SummonerInfoProps> = async (context) => {
	const name = context.params?.name as string;
	const header = {
		headers: {
			Accept: 'application/json',
			'Accept-Encoding': 'identity'
		}
	};

	try {
		const summonerURL = `${riotAPI}/lol/summoner/v4/summoners/by-name/${name}?${API_KEY}`;
		const summoner_res = await axios.get(summonerURL, header);
		const id = summoner_res.data.id;
		const puuid = summoner_res.data.puuid;
		const summonerLeagueURL = `${riotAPI}/lol/league/v4/entries/by-summoner/${id}?${API_KEY}`;
		const league_res = await axios.get(summonerLeagueURL, header);

		const matchListURL = `${riotAsiaAPI}/lol/match/v5/matches/by-puuid/${puuid}/ids?${API_KEY}`;
		const matchCode = await axios.get(matchListURL, header);

		const promises = matchCode.data.map((code: string) =>
			axios.get(`${riotAsiaAPI}/lol/match/v5/matches/${code}?${API_KEY}`, header)
		);
		// let result = (await Promise.all(promises)).map((match: any) => match.data);

		return {
			props: {
				summoner: {
					info: { ...summoner_res.data },
					league: [...league_res.data]
				},
				matchList: promises
			}
		};
	} catch {
		return {
			props: {
				error_message: '등록되지 않은 소환사입니다. 다시 검색해 주세요.'
			}
		};
	}
};

interface SummonerInfoProps {
	error_message?: string;
	summoner?: SummonerType;
	matchList?: any;
}

export default function SummonerInfo({ error_message, summoner, matchList }: SummonerInfoProps) {
	const router = useRouter();
	const soloRank = useMemo(() => {
		return summoner?.league.find((league) => league.queueType === 'RANKED_SOLO_5x5');
	}, [summoner]);

	const freeRank = useMemo(() => {
		return summoner?.league.find((league) => league.queueType === 'RANKED_FLEX_SR');
	}, [summoner]);

	useEffect(() => {
		console.log(summoner, matchList);
	}, [summoner]);
	return (
		<>
			<Background />
			<PageWrap>
				{summoner === undefined ? (
					<NotSearched>
						<SearchForm />
						<ErrorMessage>{error_message}</ErrorMessage>
					</NotSearched>
				) : (
					<>
						{router.query.fromRank === 'true' && (
							<RouterBack onClick={router.back}>← 랭킹보기</RouterBack>
						)}
						<TopSection>
							<MainInfo>
								<Image
									src={`http://ddragon.leagueoflegends.com/cdn/13.20.1/img/profileicon/${summoner?.info.profileIconId}.png`}
									width={100}
									height={100}
									alt="profileIcon"
								/>
								<TextInfo>
									<SummonerName>{summoner?.info.name}</SummonerName>
									<ResetRecord>
										<ResetButton>최신정보</ResetButton>
										<ResetTime>방금 전 갱신됨</ResetTime>
									</ResetRecord>
								</TextInfo>
							</MainInfo>
							<SearchForm />
						</TopSection>
						<MainSection>
							<SummonerHistory>
								<SummonerRank rankInfo={soloRank} rankType="솔로랭크" />
								<SummonerRank rankInfo={freeRank} rankType="자유랭크" />
							</SummonerHistory>
						</MainSection>
					</>
				)}
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

const RouterBack = styled.div`
	width: 100%;
	margin-bottom: 15px;
	font-size: 2rem;
	color: rgb(52, 69, 85);
	user-select: none;

	:hover {
		cursor: pointer;
	}
`;

const TopSection = styled.section`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
`;

const NotSearched = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 30px;
`;

const ErrorMessage = styled.p`
	display: flex;
	align-items: center;
	font-size: 2.5rem;
	color: red;
`;

const MainInfo = styled.div`
	min-width: 500px;
	padding: 10px;
	background-color: rgb(52, 69, 85);
	border-radius: 5px;
	display: flex;
	gap: 20px;
`;

const TextInfo = styled.article`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const SummonerName = styled.h2`
	color: #fff;
	font-size: 3.5rem;
	margin-top: 10px;
`;

const ResetRecord = styled.div`
	width: 180px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 15px;
`;

const ResetButton = styled.button`
	height: 40px;
	border: none;
	border-radius: 20px;
	outline: none;
	background-color: #3b5998;
	color: #fff;
	font-size: 1.5rem;

	:hover {
		cursor: pointer;
		background-color: #4f6eb4;
	}
`;

const ResetTime = styled.p`
	font-size: 1.3rem;
	color: #bbb;
	font-style: italic;
`;

const MainSection = styled.main`
	width: 100%;
	display: flex;
	gap: 50px;
`;

const SummonerHistory = styled.section`
	width: 350px;
	display: flex;
	flex-direction: column;
	gap: 5px;
`;
