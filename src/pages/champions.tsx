import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useAppSelector } from 'store/index';
import { ChampionProps } from 'utils/types';

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

const ChampionPageWrap = styled.div`
	width: 100%;
	height: 100%;
	padding: 130px 100px 80px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ChampionListWrap = styled.div`
	width: 90%;
	height: 30%;
`;

const Title = styled.span`
	display: inline-block;
	margin-bottom: 10px;
	font-size: 2.5rem;
	color: #fff;
`;

const ChampionListBox = styled.div`
	width: 100%;
	min-height: 400px;
	background-color: rgb(33, 47, 61);
`;

const SearchContainer = styled.div`
	width: 100%;
	height: 55px;
	padding: 0 20px;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: rgb(44, 62, 80);

	svg {
		position: absolute;
		color: rgb(171, 178, 185);
		left: 28px;
		font-size: 2.3rem;
		opacity: 0.8;
	}
`;

const SearchInput = styled.input`
	width: 30%;
	height: 40px;
	padding-left: 35px;
	outline: none;
	background-color: rgb(33, 47, 61);
	border: 1px solid rgb(86, 101, 115);
	color: rgb(171, 178, 185);
	font-size: 1.8rem;
`;

interface ChampionDataProps {
	championData: {
		type: string;
		format: string;
		version: string;
		data: ChampionProps;
	};
}

function champions({ championData }: ChampionDataProps) {
	const version = useAppSelector((state) => state.version);
	useEffect(() => {
		console.log(championData);
	}, [championData]);
	return (
		<>
			<Background />
			{version.status === 'complete' && (
				<ChampionPageWrap>
					<ChampionListWrap>
						<Title>챔피언 목록</Title>
						<ChampionListBox>
							<SearchContainer>
								<SearchInput type="text" placeholder="챔피언 검색" />
								<BiSearchAlt2 />
							</SearchContainer>
						</ChampionListBox>
					</ChampionListWrap>
				</ChampionPageWrap>
			)}
		</>
	);
}

export const getStaticProps = async () => {
	const response = await fetch(
		'https://ddragon.leagueoflegends.com/cdn/12.23.1/data/ko_KR/champion.json'
	);
	const championData = await response.json();

	return {
		props: {
			championData
		}
	};
};

export default champions;
