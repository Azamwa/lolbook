import React from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';

export const getServerSideProps: GetServerSideProps<SummonerInfoProps> = async (context) => {
	const name = context.params?.name as string;
	return { props: { name } };
};

interface SummonerInfoProps {
	name: string;
}

export default function SummonerInfo({ name }: SummonerInfoProps) {
	return (
		<PageWrap>
			<Background />
			<p>{name}</p>
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
