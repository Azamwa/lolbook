import styled from 'styled-components';
import dayjs from 'dayjs';

interface MatchInfoProps {
    match: any;
}

export default function MatchInfo({ match }: MatchInfoProps) {
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
        <GameInfo>
            <GameResult isWin={match.win}>{match.win ? '승리' : '패배'}</GameResult>
            <GameType>{match.gameType}</GameType>
            <GameTime>{gameEndTime(match.gameEndTimeStamp)}</GameTime>
            <GameTime>{gameMatchTime(match.game_length_second)}</GameTime>
        </GameInfo>
    )
}


const GameInfo = styled.div`
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

const GameResult = styled.p<{ isWin: boolean;}>`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${(props) => props.isWin ? '#86a3e4' : '#e698ad'};
`;

const GameType = styled.p`
    width: 80px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    text-align: center;
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.65);
`;

const GameTime = styled.p`
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.7);
`;

