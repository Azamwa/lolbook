import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import axios from 'axios';
import { riotApiURL } from 'store/record';
import { SummonerApiType } from 'utils/recordType';
import { useQuery } from 'react-query';

export const getServerSideProps: GetServerSideProps<SummonerInfoProps> = async (context) => {
	const name = context.params?.name as string;
	const response = await axios.get(
		`${riotApiURL}/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`
	);
	const { data } = response;
	return { props: { summoner: data } };
};

interface SummonerInfoProps {
	summoner: SummonerApiType;
}

export default function SummonerInfo({ summoner }: SummonerInfoProps) {
	useQuery(
		'asd',
		async () =>
			await axios.get(
				'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/찌2찌?api_key=RGAPI-c1fe632a-fbb1-44f3-abf9-a4f9f5ee71c0'
			),
		{
			onSuccess: (data) => console.log(data)
		}
	);
	useEffect(() => {
		const aa = JSON.stringify(summoner);
		console.log(JSON.stringify(aa));
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
