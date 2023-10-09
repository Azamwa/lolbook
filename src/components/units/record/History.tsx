import { useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { SummonerType, matchListType } from 'utils/recordType';
import { time } from 'console';

interface HistoryProps {
    summoner: SummonerType;
    matchList: matchListType[];
}

export default function History({ summoner, matchList }: HistoryProps) {
    const gameEndTime = (timeStamp: number) => {
        const endTime = dayjs().diff(dayjs(timeStamp), 's');
        if(endTime < 60) return Math.floor(endTime) + '초 전';
        else if (endTime < 3600) return Math.floor(endTime / 60) + '분 전';
        else if (endTime < 86400) return Math.floor(endTime / 3600) + '시간 전';
        else if (endTime < 2592000) return Math.floor(endTime / 86400) + '일 전';
        else if (endTime < 31536000) return Math.floor(endTime / 2592000) + '달 전';
        else return endTime / 31536000 + '년 전';
    };

    const gameMatchTime = (timeStamp: number) => {
        const hour = Math.floor(timeStamp / 3600);
        const min = Math.floor(timeStamp / 60);
        const sec = timeStamp - Math.floor(timeStamp / 60) * 60;

        return hour > 0 
            ? `${hour}:${min - (hour * 60)}:${sec}`
            : `${min}:${sec}`;
    }

    return (
        <HistoryContainer>
            {matchList.map((match) => 
                <Match isWin={match.win} key={match.matchId}>
                    <GameInfo>
                        <GameResult>{match.win ? '승리' : '패배'}</GameResult>
                        <GameType>{match.gameType}</GameType>
                        <GameTime>{gameEndTime(match.gameEndTimeStamp)}</GameTime>
                        <GameTime>{gameMatchTime(match.game_length_second)}</GameTime>
                    </GameInfo>
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
    height: 100px;
    padding: 10px;
    border-radius: 5px;
    background-color: ${(props) => props.isWin ? 'skyblue' : 'pink'};
    display: flex;
`;

const GameInfo = styled.div`
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

const GameResult = styled.p`
    font-size: 1.5rem;
    font-weight: 700;
    color: #4265b1;
`;

const GameType = styled.p`
    font-size: 1.3rem;
    color: rgba(0, 0, 0, 0.65);
    font-weight: 600;
`;

const GameTime = styled.p`
    font-size: 1.3rem;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.7);
`;