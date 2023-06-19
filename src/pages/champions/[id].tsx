import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAtomValue } from 'jotai';
import { screenSizeState } from 'store/common';
import { skinNumberState } from 'store/champions';
import { ChampionDetailType } from 'utils/types';
import ChampionSkill from 'components/units/ChampionSkill';
import ChampionSummary from 'components/units/ChampionSummary';
import ChampionSkin from 'components/units/ChampionSkin';
import { MdKeyboardBackspace } from 'react-icons/md';

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const name = params?.id as string;
	const response = await fetch(
		`https://ddragon.leagueoflegends.com/cdn/13.12.1/data/ko_KR/champion/${name}.json`
	);
	const { data } = await response.json();
	return {
		props: {
			championInfo: data[name]
		}
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch(
		'https://ddragon.leagueoflegends.com/cdn/13.12.1/data/ko_KR/champion.json'
	);
	const champion = await response.json();
	let paths = [];
	for (let name in champion.data) {
		paths.push({ params: { id: name } });
	}
	return { paths, fallback: false };
};

interface ChampionInfoProps {
	championInfo: ChampionDetailType;
}

function ChampionInfo({ championInfo }: ChampionInfoProps) {
	const router = useRouter();
	const [activeTap, setActiveTap] = useState<string>('summary');
	const screenSize = useAtomValue(screenSizeState);
	const skinNumber = useAtomValue(skinNumberState);

	return (
		<>
			<Head>
				<title>{`LOLBook | ${championInfo.name} - 챔피언도감`}</title>
			</Head>
			<Background />
			<PageWrap>
				<DetailContainer>
					<InfoArea>
						<TopArea>
							<GoBack>
								<MdKeyboardBackspace onClick={() => router.back()} /> 뒤로가기
							</GoBack>
							{screenSize === 'small' && (
								<ChampionSplashImg
									onClick={() =>
										window.open(
											`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championInfo.id}_${skinNumber}.jpg`
										)
									}>
									스플래시이미지
								</ChampionSplashImg>
							)}
						</TopArea>
						<ChampionName>
							<ChampionGroupImage
								imgSrc={`/img/positions/${championInfo.tags[0]}.png`}
							/>
							<Name>{championInfo.name}</Name>
							<Title>{championInfo.title}</Title>
						</ChampionName>
						<TapGroup>
							<Tap
								onClick={() => setActiveTap('summary')}
								active={activeTap === 'summary'}>
								개요
							</Tap>
							<Tap
								onClick={() => setActiveTap('skill')}
								active={activeTap === 'skill'}>
								스킬
							</Tap>
							<Tap onClick={() => setActiveTap('skin')} active={activeTap === 'skin'}>
								스킨
							</Tap>
						</TapGroup>
						{activeTap === 'summary' && (
							<ChampionSummary championDetail={championInfo} />
						)}
						{activeTap === 'skill' && <ChampionSkill championDetail={championInfo} />}
					</InfoArea>
					{activeTap === 'skin' && <ChampionSkin championDetail={championInfo} />}
					{activeTap !== 'skin' &&
						(screenSize === 'big' ? (
							<ChampionBackground champion={championInfo.id} />
						) : (
							<ChampionLoadingImg champion={championInfo.id} />
						))}
				</DetailContainer>
			</PageWrap>
		</>
	);
}

const Background = styled.div`
	width: 100vw;
	height: 100vh;
	background-image: url('/img/runeterra.jpg');
	background-size: cover;
	background-position: center center;
	filter: blur(2px);
	transform: scale(1.02);
	position: absolute;
	z-index: -1;
`;

const PageWrap = styled.div`
	width: 100vw;
	height: 100vh;
	padding-top: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const DetailContainer = styled.div`
	width: 80%;
	height: 90%;
	padding: 30px 50px;
	position: relative;
	background-color: #000;
	color: #fff;

	@media screen and (max-width: 1300px) {
		padding: 30px 40px;
	}

	@media screen and (max-width: 767px) {
		width: 90%;
		padding: 0;
	}
`;

const ChampionBackground = styled.div<{ champion: string }>`
	width: 70%;
	height: 100%;
	background: linear-gradient(to left, transparent, #000),
		${(props) =>
			`url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.champion}_0.jpg)`},
		no-repeat;
	background-size: cover;
	background-position: right center;
	position: absolute;
	border-left: 1px solid #000;
	top: 0;
	right: 0;
	z-index: 1;
`;

const ChampionLoadingImg = styled.div<{ champion: string }>`
	width: 100%;
	height: 100%;
	background: ${(props) =>
			`url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${props.champion}_0.jpg)`},
		no-repeat;
	background-position: center center;
	background-size: cover;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
`;

const TopArea = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;

	@media screen and (max-width: 767px) {
	}
`;

const GoBack = styled.p`
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 2rem;
	user-select: none;

	svg {
		font-size: 3rem;

		:hover {
			cursor: pointer;
		}
	}
`;

const ChampionSplashImg = styled.div`
	width: 100px;
	height: 20px;
	background-color: #fff;
	color: #000;
	font-size: 1.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InfoArea = styled.div`
	width: 30%;
	position: absolute;
	z-index: 12;

	@media screen and (max-width: 767px) {
		width: 100%;
		padding: 25px;
	}
`;

const ChampionName = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 20px;
	margin-bottom: 20px;

	@media screen and (max-width: 1300px) {
		gap: 10px;
	}

	@media screen and (max-width: 767px) {
		gap: 5px;
		margin-bottom: 10px;
	}
`;

const ChampionGroupImage = styled.div<{ imgSrc: string }>`
	width: 40px;
	height: 40px;
	background: url(${(props) => props.imgSrc}) no-repeat;
	background-size: cover;
	background-position: center;

	@media screen and (max-width: 767px) {
		width: 30px;
		height: 30px;
	}
`;

const Name = styled.span`
	font-size: 3rem;
	@media screen and (max-width: 1300px) {
		font-size: 2.5rem;
	}
`;
const Title = styled.span`
	font-size: 2.5rem;
	opacity: 0.8;
	@media screen and (max-width: 1300px) {
		font-size: 2rem;
	}

	@media screen and (max-width: 767px) {
		font-size: 1.8rem;
	}
`;

const TapGroup = styled.div`
	width: 250px;
	border-top: 2px solid #fff;
	border-bottom: 2px solid #fff;
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
`;

const Tap = styled.div<{ active: boolean }>`
	padding: 10px 20px;
	font-size: 2.5rem;
	color: ${(props) => (props.active ? '#fff' : '#666')};

	:hover {
		cursor: pointer;
	}
`;

export default ChampionInfo;
