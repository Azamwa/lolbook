import { useMemo } from 'react'
import styled from 'styled-components';
import { matchListType } from 'utils/recordType';

interface RecentChampionsType {
    matchList: matchListType[];
}

export default function RecentChampions({ matchList }: RecentChampionsType) {
    const myChampions = useMemo(() => {
        let champions = matchList.map((match) => {
            return {
                championId: match.summonerData.championId,
                teamTotalKill: match.ourTeam.kill,
                kill: match.summonerData.kill,
                assist: match.summonerData.assist,
                death: match.summonerData.death,
                minionKill: match.summonerData.minionKill
            };
        });
    }, [matchList]);


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