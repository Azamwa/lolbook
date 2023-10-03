import { useEffect, useMemo } from 'react'
import styled from 'styled-components';
import { matchListType } from 'utils/recordType';

interface RecentChampionsType {
    matchList: matchListType[];
}

export default function RecentChampions({ matchList }: RecentChampionsType) {
    const recentChampions = useMemo(() => {
        const championMap = new Map();
        let chunk = {
            championId: 0,
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