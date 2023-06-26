import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import axios from 'axios';
import { riotApiURL } from 'store/record';
import { SummonerApiType } from 'utils/recordType';
import SearchForm from 'components/common/SearchForm';

export const getServerSideProps: GetServerSideProps<SummonerInfoProps> = async (context) => {
	const name = context.params?.name as string;
	const header = {
		headers: {
			Accept: 'application/json',
			'Accept-Encoding': 'identity'
		}
	};
	try {
		const summonerURL = `${riotApiURL}/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
		const summoner_res = await axios.get(summonerURL, header);
		const id = summoner_res.data.id;
		const summonerLeagueURL = `${riotApiURL}/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;
		const league_res = await axios.get(summonerLeagueURL, header);

		return {
			props: {
				summoner: {
					info: { ...summoner_res.data },
					league: { ...league_res.data }
				}
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
	summoner?: SummonerApiType;
}

export default function SummonerInfo({ error_message, summoner }: SummonerInfoProps) {
	useEffect(() => {
		console.log(summoner, error_message);
	}, [error_message, summoner]);
	return (
		<>
			<Background />
			<PageWrap>
				<TopSection>
					<MainInfo>
						<Image
							src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/${summoner?.info.profileIconId}.png`}
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

const TopSection = styled.section`
	display: flex;
	justify-content: space-between;
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
	letter-spacing: 2px;
	margin-top: 10px;
`;

const ResetRecord = styled.div`
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
