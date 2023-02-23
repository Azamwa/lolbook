import Image from 'next/image';
import { useEffect, useMemo } from 'react'
import styled from 'styled-components';
import { versionListState } from 'store/common';
import { matchListType } from 'utils/recordType';

interface RecentChampionsType {
    matchList: matchListType[];
}

export default function RecentChampions({ matchList }: RecentChampionsType) {
    const { version } = versionListState();
	const currentVersion = version[0];
    const recentChampions = useMemo(() => {
        const championMap = new Map();
        let chunk = {
            championId: 0,
            championName: '',
            championEngName: '',
            kill: 0,
            assist: 0,
            death: 0,
            killInvolvementRate: 0,
            minionKill: 0,
            playedChampionCount: 1
        }
        let result = [];

        matchList.map((match) => {
            const championId = match.summonerData.championId;
            if(!championMap.has(championId)) {
                championMap.set(championId, 1);
            } else {
                championMap.set(championId, championMap.get(championId) + 1);
            }
            return {
                championId: championId,
                championName: match.summonerData.championName,
                championEngName: match.summonerData.championEngName,
                teamTotalKill: match.ourTeam.kill,
                kill: match.summonerData.kill,
                assist: match.summonerData.assist,
                death: match.summonerData.death,
                killInvolvementRate: Math.round(
                    (match.summonerData.kill + match.summonerData.assist)* 100 / match.ourTeam.kill
                ),
                minionKill: match.summonerData.minionKill,
            };
        }).map((match) => {
            return {
                ...match,
                playedChampionCount: championMap.get(match.championId)
            }
        }).sort((a, b) => b.playedChampionCount - a.playedChampionCount)
          .forEach((match) => {
            if(chunk.championId !== match.championId) {
                if(chunk.championId !== 0) result.push(chunk);
                chunk = {
                    championId: match.championId,
                    championName: match.championName,
                    championEngName: match.championEngName,
                    assist: match.assist,
                    kill: match.kill,
                    death: match.death,
                    killInvolvementRate: match.killInvolvementRate,
                    minionKill: match.minionKill,
                    playedChampionCount: match.playedChampionCount
                }
            } else {
                chunk = {
                    ...chunk,
                    assist: chunk.assist + match.assist,
                    kill: chunk.kill + match.kill,
                    death: chunk.death + match.death,
                    killInvolvementRate: chunk.killInvolvementRate + match.killInvolvementRate,
                    minionKill: chunk.minionKill + match.minionKill,
                }
            }
        })

        result.push(chunk);

        return result;
    }, [matchList]);

    useEffect(() => {
        console.log(recentChampions)
    }, [recentChampions])


    return (
        <Container>
            <Title>최근 10게임동안 플레이 한 챔피언</Title>
            {recentChampions.map((champion) => 
                <PlayedChampionInfo key={champion.championId}>
                    <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${champion.championEngName}.png`}
                        width={40}
                        height={40}
                        alt="championImage"
                    />
                    <ChampionName>{champion.championName}</ChampionName>
                    <PlayCount>{`${champion.playedChampionCount}게임`}</PlayCount>
                    <KillInfo>
                        <Kda>
                            {
                                `${(champion.kill / champion.playedChampionCount).toFixed(1)} 
                                / ${(champion.death/ champion.playedChampionCount).toFixed(1)} 
                                / ${(champion.assist/ champion.playedChampionCount).toFixed(1)}` 
                            }
                        </Kda>
                        <KdaRating>{ `평점 ${((champion.kill + champion.death) / champion.assist).toFixed(2)}`}</KdaRating>
                    </KillInfo>
                    <KillInvolvement>
                        <span>킬관여율</span> {(champion.killInvolvementRate / champion.playedChampionCount).toFixed(2)}%
                    </KillInvolvement>
                </PlayedChampionInfo>
            )}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding: 10px 0;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: rgb(52, 69, 85);
    color: #fff;
`;

const Title = styled.p`
    color: #aaa;
    font-size: 1.3rem;
    padding: 0 5px 10px 5px;
    border-bottom: 1px solid #aaa;
`;

const PlayedChampionInfo = styled.div`
    width: 100%;
    height: 50px;
    padding: 0 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ChampionName = styled.span`
    width: 60px;
    text-align: center;
    font-size: 1.3rem;
`;

const PlayCount = styled.p`
    font-size: 1.3rem;
    width: 35px;
    text-align: center;
`;

const KillInfo = styled.div`
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3px;
    font-size: 1.2rem;
`;

const Kda = styled.p``;

const KdaRating = styled.p``;

const KillInvolvement = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3px;
    font-size: 1.2rem;
`;