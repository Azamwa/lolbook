import React, { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { screenSizeState, versionListState } from 'store/common';
import { searchChampionState, selectChampionState } from 'store/champions';
import { selectStyle } from 'utils/common';
import { ChampionListType } from 'utils/types';
import ChampionSlide from 'components/units/ChampionSlide';
import Select, { SingleValue } from 'react-select';
import { BiSearchAlt2 } from 'react-icons/bi';

export const getStaticProps = async () => {
	const response = await fetch(
		`https://ddragon.leagueoflegends.com/cdn/13.18.1/data/ko_KR/champion.json`
	);
	const { data } = await response.json();

	return {
		props: {
			championList: data
		}
	};
};

export const roleGroup = [
	{ label: '모든 챔피언', value: 'all' },
	{ label: '탱커', value: 'Tank' },
	{ label: '전사', value: 'Fighter' },
	{ label: '마법사', value: 'Mage' },
	{ label: '암살자', value: 'Assassin' },
	{ label: '원거리 딜러', value: 'Marksman' },
	{ label: '서포터', value: 'Support' }
];

function champions({ championList }: ChampionListType) {
	const version = useAtomValue(versionListState)[0];
	const [searchValue, setSearchValue] = useState<string>('');
	const [role, setRole] = useState<SingleValue<{ value: string; label: string }>>({
		value: 'all',
		label: '모든 챔피언'
	});
	const setSelectChampion = useSetAtom(selectChampionState);
	const [searchChampions, setSearchChampions] = useAtom(searchChampionState);
	const screenSize = useAtomValue(screenSizeState);

	useEffect(() => {
		const searchChampionProps = { championList, role, searchValue };
		setSearchChampions(searchChampionProps);
	}, [searchValue, role]);

	const searchChampion = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<>
			<Head>
				<title>LOLBook | 챔피언도감</title>
			</Head>
			<Background>
				<Image src="/img/background/runeterra.jpg" alt="background" fill />
			</Background>
			<ChampionPageWrap>
				<ChampionListWrap>
					<Title>챔피언 도감</Title>
					<ChampionListBox>
						<SearchContainer>
							<SearchBox>
								<SearchInput
									type="text"
									placeholder="챔피언 검색"
									onChange={(e) => searchChampion(e)}
								/>
								<BiSearchAlt2 />
							</SearchBox>
							<FilterBox>
								<Select
									id="long-value-select"
									instanceId="long-value-select"
									defaultValue={{ value: 'all', label: '모든 챔피언' }}
									onChange={(e) => setRole(e)}
									isSearchable={false}
									options={roleGroup}
									styles={selectStyle}
								/>
							</FilterBox>
						</SearchContainer>
						<ChampionList>
							{searchChampions.length > 0 &&
								searchChampions?.map((champion, index) => {
									return (
										<Champion key={index}>
											<Image
												src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`}
												width={70}
												height={70}
												alt="champion-image"
												onClick={() => setSelectChampion(champion)}
											/>
											<ChampionName>{champion.name}</ChampionName>
										</Champion>
									);
								})}
						</ChampionList>
					</ChampionListBox>
				</ChampionListWrap>
				<ChampionSlide screenSize={screenSize} />
			</ChampionPageWrap>
		</>
	);
}

const Background = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	z-index: -1;
`;

const ChampionPageWrap = styled.div`
	width: 100%;
	height: 100%;
	padding: 70px 100px 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 30px;

	@media screen and (max-width: 1300px) {
		padding: 50px 30px 0;
		gap: 25px;
	}
`;

const ChampionListWrap = styled.div`
	width: 95%;
`;

const Title = styled.span`
	display: inline-block;
	margin-bottom: 10px;
	font-size: 2.5rem;
	color: #fff;

	@media screen and (max-width: 767px) {
		font-size: 2rem;
	}
`;

const ChampionListBox = styled.div`
	width: 100%;
	height: 400px;
	background-color: rgb(33, 47, 61);

	& ::-webkit-scrollbar {
		color: black;
	}

	& ::-webkit-scrollbar-thumb {
		background-color: rgb(52, 69, 85);
	}

	& ::-webkit-scrollbar-track {
		background-color: rgb(26, 36, 46);
	}

	@media screen and (max-width: 1300px) {
		height: 300px;
	}

	@media screen and (max-width: 767px) {
		height: 250px;
	}
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

	@media screen and (max-width: 1300px) {
		height: 45px;
	}

	@media screen and (max-width: 767px) {
		padding: 0 10px;
	}
`;

const SearchBox = styled.div`
	position: relative;

	svg {
		position: absolute;
		color: rgb(171, 178, 185);
		top: 7px;
		left: 8px;
		font-size: 2.3rem;
		opacity: 0.8;

		@media screen and (max-width: 1300px) {
			font-size: 2rem;
		}

		@media screen and (max-width: 767px) {
			display: none;
		}
	}
`;

const SearchInput = styled.input`
	width: 300px;
	height: 40px;
	padding-left: 35px;
	outline: none;
	background-color: rgb(33, 47, 61);
	border: 1px solid rgb(86, 101, 115);
	color: rgb(171, 178, 185);
	font-size: 1.8rem;
	display: flex;
	align-items: center;

	@media screen and (max-width: 1300px) {
		height: 33px;
		font-size: 1.5rem;
	}

	@media screen and (max-width: 767px) {
		width: 150px;
		padding-left: 10px;
		font-size: 1.5rem;
	}
`;

const FilterBox = styled.div``;

const ChampionList = styled.div`
	width: 100%;
	height: 345px;
	padding: 20px;
	overflow-x: hidden;
	overflow-y: auto;
	display: grid;
	grid-template-columns: repeat(auto-fill, 70px);
	grid-template-rows: repeat(auto-fill, 90px);
	grid-gap: 20px;
	justify-content: center;

	@media screen and (max-width: 1300px) {
		height: 255px;
		grid-template-columns: repeat(auto-fill, 60px);
		grid-template-rows: repeat(auto-fill, 80px);
	}

	@media screen and (max-width: 767px) {
		padding: 10px;
		height: 205px;
		grid-template-columns: repeat(auto-fill, 50px);
		grid-template-rows: repeat(auto-fill, 70px);
	}
`;

const Champion = styled.div`
	width: 70px;
	height: 90px;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media screen and (max-width: 1300px) {
		width: 60px;
		height: 80px;
	}

	@media screen and (max-width: 767px) {
		width: 50px;
		height: 70px;
	}

	img {
		:hover {
			cursor: pointer;
			border: 1px solid rgb(174, 214, 241);
		}

		@media screen and (max-width: 1300px) {
			width: 60px;
			height: 60px;
		}

		@media screen and (max-width: 767px) {
			width: 50px;
			height: 50px;
		}
	}
`;

const ChampionName = styled.span`
	display: inline-block;
	margin-top: 5px;
	font-size: 1.5rem;
	color: #fff;

	@media screen and (max-width: 767px) {
		font-size: 1.2rem;
		font-weight: 500;
	}
`;

export default champions;
