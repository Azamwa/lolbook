import React, { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import { ChampionProps } from 'utils/types';
import { useAppDispatch, useAppSelector } from 'store/index';
import { setChampionList } from 'store/champions';
import ChampionSlide from 'components/units/ChampionSlide';
import Select, { SingleValue } from 'react-select';
import { BiSearchAlt2 } from 'react-icons/bi';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const response = await fetch(
		`https://ddragon.leagueoflegends.com/cdn/${context.query.version}/data/ko_KR/champion.json`
	);
	const championData = await response.json();

	return {
		props: {
			championData
		}
	};
};

function champions({ championData }: ChampionDataProps) {
	const version = useAppSelector((state) => state.version);
	const championList = useAppSelector((state) => state.champions.championList);
	const { data }: any = championData;
	const [searchValue, setSearchValue] = useState<string>('');
	const [selectedRole, setSelectedRole] = useState<SingleValue<{ value: string; label: string }>>(
		{
			value: 'all',
			label: '모든 챔피언'
		}
	);
	const [selectChampion, setSelectChampion] = useState<ChampionProps | null>(null);
	const dispatch = useAppDispatch();

	const screenSize = useMemo(() => {
		let value = '';
		if (version.status === 'complete') {
			value = screen.availWidth > 1300 ? 'big' : screen.availWidth > 768 ? 'middle' : 'small';
		}
		return value;
	}, [version]);

	const changeGroup = (e: SingleValue<{ value: string; label: string }>) => {
		setSelectedRole(e);
	};

	const searchChampion = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	useEffect(() => {
		if (version.status === 'complete') {
			dispatch(setChampionList(data));
		}
	}, [version, data, dispatch]);

	useEffect(() => {
		let searchedData: any = {};
		let selectedData: any = {};
		if (searchValue !== '') {
			for (let name in data) {
				if (data[name].name.includes(searchValue)) {
					searchedData[name] = data[name];
				}
			}
		} else {
			searchedData = data;
		}
		if (selectedRole !== null && selectedRole.value !== 'all') {
			for (let name in searchedData) {
				if (searchedData[name].tags.includes(selectedRole.value)) {
					selectedData[name] = searchedData[name];
				}
			}
		} else {
			selectedData = searchedData;
		}
		dispatch(setChampionList(selectedData));
	}, [dispatch, searchValue, selectedRole, data]);

	return (
		<>
			<Head>
				<title>LOLBook | 챔피언도감</title>
			</Head>
			<Background />
			{version.status === 'complete' && (
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
										defaultValue={{ value: 'all', label: '모든 챔피언' }}
										onChange={(e) => changeGroup(e)}
										isSearchable={false}
										options={roleGroup}
										styles={selectStyle}
									/>
								</FilterBox>
							</SearchContainer>
							<ChampionList>
								{championList?.map((champion, index) => {
									return (
										<Champion key={index}>
											<Image
												src={`https://ddragon.leagueoflegends.com/cdn/${version.lastVersion}/img/champion/${champion.id}.png`}
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
					<ChampionSlide
						championList={championList}
						selectChampion={selectChampion}
						screenSize={screenSize}
					/>
				</ChampionPageWrap>
			)}
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

interface ChampionDataProps {
	championData: {
		type: string;
		format: string;
		version: string;
		data: ChampionProps;
	};
}
const roleGroup = [
	{ label: '모든 챔피언', value: 'all' },
	{ label: '탱커', value: 'Tank' },
	{ label: '전사', value: 'Fighter' },
	{ label: '마법사', value: 'Mage' },
	{ label: '암살자', value: 'Assassin' },
	{ label: '원거리 딜러', value: 'Marksman' },
	{ label: '서포터', value: 'Support' }
];

const selectStyle = {
	control: (base: any) => ({
		...base,
		height: '15px',
		minWidth: 130,
		background: '#212F3D',
		border: 'none',
		margin: 0,
		borderRadius: 0,
		fontSize: '1.5rem',
		fontFamily: 'system-ui',
		fontWeight: 700
	}),

	menu: (base: any) => ({
		...base,
		background: '#212F3D',
		color: '#ABB2B9',
		borderRadius: 0,
		fontSize: '1.5rem',
		fontFamily: 'system-ui',
		fontWeight: 700
	}),

	menuList: (base: any) => ({
		...base,
		borderRadius: 0
	}),

	singleValue: (base: any) => ({
		...base,
		color: '#ABB2B9'
	})
};

export default champions;
