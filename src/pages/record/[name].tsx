import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import axios from 'axios';
import { riotApiURL } from 'store/record';
import { SummonerApiType } from 'utils/recordType';

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
	}, []);
	return (
		<PageWrap>
			<Background />
		</PageWrap>
	);
}

const PageWrap = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

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
