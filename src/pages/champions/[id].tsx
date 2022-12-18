import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import { ChampionProps, ChampionDetailProps } from 'utils/types';
import ChampionSkill from 'components/units/ChampionSkill';
import ChampionSummary from 'components/units/ChampionSummary';
import { MdKeyboardBackspace } from 'react-icons/md';
import ChampionSkin from 'components/units/ChampionSkin';

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
`;

const ChampionBackground = styled.div<{ champion: string }>`
	width: 70%;
	height: 100%;
	background: linear-gradient(to left, transparent, #000),
		${(props) =>
			`url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.champion}_0.jpg)`},
		no-repeat;
	background-size: cover;
	background-position: right center;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 1;
`;

const GoBack = styled.p`
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 2rem;
	margin-bottom: 20px;
	user-select: none;

	svg {
		font-size: 3rem;

		:hover {
			cursor: pointer;
		}
	}
`;

const InfoArea = styled.div`
	min-width: 290px;
	width: 23%;
	position: absolute;
	z-index: 12;
`;

const ChampionName = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 20px;
	margin-bottom: 20px;
`;

const Name = styled.span`
	font-size: 3rem;
`;
const Title = styled.span`
	font-size: 2.5rem;
	opacity: 0.8;
`;

const TapGroup = styled.div`
	width: 250px;
	border-top: 2px solid #fff;
	border-bottom: 2px solid #fff;
	display: flex;
	justify-content: center;
	margin-bottom: 50px;
`;

const Tap = styled.div<{ active: boolean }>`
	padding: 10px 20px;
	font-size: 2.5rem;
	color: ${(props) => (props.active ? '#fff' : '#666')};

	:hover {
		cursor: pointer;
	}
`;

interface ChampionInfoProps {
	championInfo: {
		type: string;
		format: string;
		version: string;
		data: {
			[key: string]: ChampionDetailProps;
		};
	};
}

function ChampionInfo({ championInfo }: ChampionInfoProps) {
	const router = useRouter();
	const { data } = championInfo;
	const [detailInfo, setDetailInfo] = useState<ChampionDetailProps>();
	const [activeTap, setActiveTap] = useState<string>('summary');
	useEffect(() => {
		if (router.query.id !== undefined) {
			setDetailInfo(data[router.query.id.toString()]);
		}
	}, [data, router]);
	return (
		<>
			<Background />
			{detailInfo !== undefined && (
				<PageWrap>
					<DetailContainer>
						<InfoArea>
							<GoBack>
								<MdKeyboardBackspace onClick={() => router.back()} /> 뒤로가기
							</GoBack>
							<ChampionName>
								<Image
									src={`/img/positions/${detailInfo.tags[0]}.png`}
									width={40}
									height={40}
									alt="championRole"
								/>
								<Name>{detailInfo.name}</Name>
								<Title>{detailInfo.title}</Title>
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
								<Tap
									onClick={() => setActiveTap('skin')}
									active={activeTap === 'skin'}>
									스킨
								</Tap>
							</TapGroup>
							{activeTap === 'summary' && <ChampionSummary detailInfo={detailInfo} />}
							{activeTap === 'skill' && <ChampionSkill detailInfo={detailInfo} />}
						</InfoArea>
						<ChampionBackground champion={detailInfo.id} />
						{activeTap === 'skin' && <ChampionSkin detailInfo={detailInfo} />}
					</DetailContainer>
				</PageWrap>
			)}
		</>
	);
}

export const getStaticProps = async (context: { params: { id: string } }) => {
	const { id } = context.params;
	const response = await fetch(
		`https://ddragon.leagueoflegends.com/cdn/12.23.1/data/ko_KR/champion/${id}.json`
	);

	const championInfo = await response.json();

	return {
		props: {
			championInfo
		}
	};
};

export const getStaticPaths = async () => {
	const response = await fetch(
		'https://ddragon.leagueoflegends.com/cdn/12.23.1/data/ko_KR/champion.json'
	);
	const champion = await response.json();
	const { data } = champion;
	let idx = [];
	for (let name in data) {
		idx.push(name);
	}
	const paths = idx.map((id: string) => {
		return {
			params: { id }
		};
	});
	return { paths, fallback: false };
};

export default ChampionInfo;
