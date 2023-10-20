import { useEffect } from 'react';
import styled from 'styled-components';
import { MatchType } from 'utils/recordType';
import { runeListState, spellListState, versionListState } from 'store/common';
import MyChampionMatch from './MyChampionMatch';
import MatchInfo from './MatchInfo';
import Participants from './Participants';

interface HistoryProps {
	matchList: MatchType[];
}

export default function History({ matchList }: HistoryProps) {
	const { version } = versionListState();
	const currentVersion = version[0];
	const { spellList, setSpellList } = spellListState();
	const { runeList, setRuneList } = runeListState();

	useEffect(() => {
		setSpellList();
		setRuneList();
	}, []);

	const moreRequest = () => {};

	return (
		<HistoryContainer>
			{matchList.map((match) => (
				<Match isWin={match.win} key={match.matchId}>
					<MatchInfo match={match} />
					<MyChampionMatch
						summonerInfo={match.summonerData}
						currentVersion={currentVersion}
						spellList={spellList}
						runeList={runeList}
						totalTeamKill={match.ourTeam.kill}
						win={match.win}
					/>
					<Participants participants={match.participants} win={match.win} />
				</Match>
			))}
			{matchList.length === 10 && (
				<MoreRequest onClick={() => moreRequest()}>더 불러오기</MoreRequest>
			)}
		</HistoryContainer>
	);
}

const HistoryContainer = styled.ul`
	width: 100%;
	padding: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`;

const Match = styled.li<{ isWin: boolean }>`
	width: 100%;
	height: 110px;
	padding: 10px;
	border-radius: 5px;
	background-color: ${(props) => (props.isWin ? '#162c5c' : '#80122d')};
	display: flex;
	gap: 30px;
	color: #bbb;
`;

const MoreRequest = styled.button`
	width: 300px;
	height: 50px;
	margin: 20px 0;
	background-color: #349d85;
	color: #fff;
	font-weight: 700;
	font-size: 2rem;
`;
