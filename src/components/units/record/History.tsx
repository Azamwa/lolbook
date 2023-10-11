import { useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { SummonerType, matchListType } from 'utils/recordType';
import { runeListState, spellListState, versionListState } from 'store/common';

interface HistoryProps {
    summoner: SummonerType;
    matchList: matchListType[];
}

export default function History({ summoner, matchList }: HistoryProps) {
    const { version } = versionListState();
    const currentVersion = version[0];

    const { spellList, setSpellList } = spellListState();
    const { runeList, setRuneList } = runeListState();

    useEffect(() => {
        setSpellList();
        setRuneList();
    }, []);

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

    const mySpell = (id: number) => {
        const spell = spellList.find((spell) => spell.key === String(id));
        return spell === undefined ? 'SummonerCherryHold' : spell.id;
    }

    const primaryRune = (pageId: number, runeId: number) => {
        const runePage = runeList.find((rune) => rune.id === pageId);
        const rune = runePage?.slots.find((rune) => rune.id === runeId);
        return rune?.icon;
    }

    const secondaryRune = (pageId: number) => {
        const runePage = runeList.find((rune) => rune.id === pageId);
        return runePage?.icon;
    }
    

    return (
        <HistoryContainer>
            {matchList.map((match) => 
                <Match isWin={match.win} key={match.matchId}>
                    <GameInfo>
                        <GameResult isWin={match.win}>{match.win ? '승리' : '패배'}</GameResult>
                        <GameType>{match.gameType}</GameType>
                        <GameTime>{gameEndTime(match.gameEndTimeStamp)}</GameTime>
                        <GameTime>{gameMatchTime(match.game_length_second)}</GameTime>
                    </GameInfo>
                    <MyChampion>
                        <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${match.summonerData.championEngName}.png`}
                            width={60}
                            height={60}
                            alt='championImage'
                        />
                        <Spells>
                            <Image
                                src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${mySpell(match.summonerData.spells[0])}.png`}
                                width={28}
                                height={28}
                                alt='spell1'
                            />
                            <Image
                                src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${mySpell(match.summonerData.spells[1])}.png`}
                                width={28}
                                height={28}
                                alt='spell2'
                            />
                        </Spells>
                        <Runes>
                            <Image
                                src={`https://ddragon.leagueoflegends.com/cdn/img/${primaryRune(match.summonerData.rune.primary_page_id, match.summonerData.rune.primary_rune_id)}`}
                                width={28}
                                height={28}
                                alt='rune1'
                            />
                            <Image
                                src={`https://ddragon.leagueoflegends.com/cdn/img/${secondaryRune(match.summonerData.rune.secondary_page_id)}`}
                                width={28}
                                height={28}
                                alt='rune2'
                            />
                        </Runes>
                    </MyChampion>
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

const MyChampion = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const Spells = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Runes = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;