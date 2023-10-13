import styled from 'styled-components';
import { SummonerType, MatchType } from 'utils/recordType';
import { versionListState } from 'store/common';
import MyChampionMatch from './MyChampionMatch';
import MatchInfo from './MatchInfo';

interface HistoryProps {
    summoner: SummonerType;
    matchList: MatchType[];
}

export default function History({ summoner, matchList }: HistoryProps) {
    const { version } = versionListState();
    const currentVersion = version[0];

    return (
        <HistoryContainer>
            {matchList.map((match) => 
                <Match isWin={match.win} key={match.matchId}>
                    <MatchInfo match={match}/>
                    <MyChampionMatch summonerInfo={match.summonerData} currentVersion={currentVersion}/>
                </Match>
            )}
        </HistoryContainer>
    )
}

const HistoryContainer = styled.ul`
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Match = styled.li<{ isWin: boolean;}>`
    width: 100%;
    height: 110px;
    padding: 10px;
    border-radius: 5px;
    background-color: ${(props) => props.isWin ? '#162c5c' : '#80122d'};
    display: flex;
    gap: 30px;
    color: #bbb;
`;
