import React, { useEffect, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import axios from 'axios';
import { riotAPI } from 'store/record';
import { SummonerType, matchListType } from 'utils/recordType';
import { timeStampToDate } from 'utils/common';
import SearchForm from 'components/common/SearchForm';
import SummonerRank from 'components/units/SummonerRank';
import RecentChampions from 'components/units/RecentChampions';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const name = params?.name as string;
    const header = {
		headers: {
			Accept: 'application/json',
			'Accept-Encoding': 'identity',
            'X-Riot-Token': process.env.NEXT_PUBLIC_RIOT_API_KEY
		}
	};
    try {
		const summonerURL = `${riotAPI}/lol/summoner/v4/summoners/by-name/${name}`;
		const summoner_res = await axios.get(summonerURL, header);
		const id = summoner_res.data.id;
		const puuid = summoner_res.data.puuid;
		const summonerLeagueURL = `${riotAPI}/lol/league/v4/entries/by-summoner/${id}`;
		const league_res = await axios.get(summonerLeagueURL, header);

		const matchListURL = `https://4tsd4q6r68.execute-api.ap-northeast-2.amazonaws.com/v1/getMatchList?puuid=${puuid}`
		const matchList = await axios.get(matchListURL, header);

		return {
			props: {
				summoner: {
					info: { ...summoner_res.data },
					league: [...league_res.data]
				},
				matchList: matchList.data.body
			}
		};
	} catch (e) {
		return {
			props: {
				error_message: '등록되지 않은 소환사입니다. 다시 검색해 주세요.',
			}
		};
	}
}

interface SummonerInfoProps {
    summoner: SummonerType;
    matchList: matchListType[];
    error_message?: string;
}

export default function SummonerInfo({ summoner, matchList, error_message }: SummonerInfoProps) {
    const router = useRouter();
	const soloRank = useMemo(() => {
		return summoner?.league.find((league) => league.queueType === 'RANKED_SOLO_5x5');
	}, [summoner]);

	const freeRank = useMemo(() => {
		return summoner?.league.find((league) => league.queueType === 'RANKED_FLEX_SR');
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
                        <UtilForm>
                            <RouterBack onClick={() => router.back()}>← 뒤로가기</RouterBack>
                            <SearchForm />
                        </UtilForm>
                        <MainContent>
                            <SideInfo>
                                <NameCard>
                                    <Image
                                        src={`http://ddragon.leagueoflegends.com/cdn/13.20.1/img/profileicon/${summoner.info.profileIconId}.png`}
                                        width={80}
                                        height={80}
                                        alt="profileIcon"
                                    />
                                    <TextInfo>
                                        <SummonerName nameLength={summoner.info.name.length}>{summoner.info.name}</SummonerName>
                                        {matchList.length > 0 && <LastAccess>
                                            가장최근게임: {timeStampToDate(matchList[0].gameStartTimeStamp)}
                                        </LastAccess>}
                                        <SummonerLevel>{summoner.info.summonerLevel}</SummonerLevel>
                                    </TextInfo>
                                </NameCard>
                                <InfoSide>
                                    <SummonerHistory>
                                        <SummonerRank rankInfo={soloRank} rankType="솔로랭크" />
                                        <SummonerRank rankInfo={freeRank} rankType="자유랭크" />
                                    </SummonerHistory>
                                    {matchList.length > 0 && <RecentChampions matchList={matchList}/>}
                                </InfoSide>
                            </SideInfo>
                            <RecentRecord>
                                <TabMenu>
                                    <Tab>최근전적</Tab>
                                    <Tab>통계</Tab>
                                </TabMenu>
                            </RecentRecord>
                        </MainContent>
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
	padding: 100px;
	padding-bottom: 70px;
    overflow: auto;
`;

const UtilForm = styled.section`
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const RouterBack = styled.div`
	font-size: 1.5rem;
    font-weight: 700;
	color: rgb(52, 69, 85);
	user-select: none;

	:hover {
		cursor: pointer;
	}
`;

const MainContent = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 15px;
`;

const SideInfo = styled.section`
    width: 400px;
	display: flex;
    flex-direction: column;
	gap: 15px;
`;

const RecentRecord = styled.div`
    width: calc(100% - 405px);
    height: 800px;
    border-radius: 5px;
    background-color: rgb(52, 69, 85);
`;

const TabMenu = styled.div`
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    display: flex;
    gap: 20px;
    font-size: 2rem;
    color: #aaa;
`;

const Tab = styled.span`
    &:hover {
        cursor: pointer;
        color: #ddd;
    }
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

const NameCard = styled.div`
	display: flex;
	padding: 10px;
    gap: 20px;
	background-color: rgb(52, 69, 85);
	border-radius: 5px;
`;

const TextInfo = styled.article`
	display: flex;
	flex-direction: column;
    justify-content: center;
	gap: 15px;
    position: relative;
`;

const SummonerName = styled.h2<{ nameLength: number }>`
	color: #fff;
	font-size: ${(props) => props.nameLength < 11 ?
      '2.5rem' : props.nameLength < 14 ?
      '2.1rem': '1.8rem'
    };
`;

const LastAccess = styled.p`
    font-size: 1.3rem;
    font-style: italic;
    color: #aaa;
`;

const SummonerLevel = styled.h5`
    width: 50px;
    height: 25px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    background-color: rgb(33, 47, 61);
    position: absolute;
    left: -50px;
    top: -5px;
`;  

const InfoSide = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SummonerHistory = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 5px;
`;
