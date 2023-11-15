import { useState } from 'react';
import styled from 'styled-components';
import { versionListState } from 'store/common';
import { recordCountState, recordHistoryState } from 'store/record';
import { RuneType, SpellType } from 'utils/types';
import MyChampionMatch from './MyChampionMatch';
import MatchInfo from './MatchInfo';
import Participants from './Participants';
import MoreInfo from './MoreInfo';
import { IoIosArrowDown } from 'react-icons/io';

interface HistoryProps {
	puuid: string;
	spellList: SpellType[];
	runeList: RuneType[];
}

export default function History({ puuid, spellList, runeList }: HistoryProps) {
	const { version } = versionListState();
	const currentVersion = version[0];
	const { recordCount, setRecordCount } = recordCountState();
	const { recordHistory, setRecordHistory } = recordHistoryState();
	const [currentToggle, setToggle] = useState<string>('');

	const moreRequest = async () => {
		setRecordCount();
		setRecordHistory(null, recordCount + 1, puuid);
	};

	const setMoreInfo = (matchId: string) => {
		setToggle(currentToggle === matchId ? '' : matchId);
	};

	return (
		<HistoryContainer>
			{recordHistory.length > 0 &&
				recordHistory.map((match) => (
					<MatchContainer key={match.matchId}>
						<Match win={match.win}>
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
							<MoreInfoButton
								win={match.win}
								onClick={() => setMoreInfo(match.matchId)}>
								<IoIosArrowDown />
							</MoreInfoButton>
						</Match>
						{match.matchId === currentToggle && <MoreInfo match={match} />}
					</MatchContainer>
				))}
			<MoreRequest onClick={() => moreRequest()}>더 불러오기</MoreRequest>
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

const MatchContainer = styled.li`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const Match = styled.div<{ win: boolean }>`
	width: 100%;
	height: 110px;
	padding: 10px;
	border-radius: 5px;
	background-color: ${(props) => (props.win ? '#162c5c' : '#80122d')};
	display: flex;
	gap: 30px;
	color: #bbb;
	position: relative;
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

const MoreInfoButton = styled.div<{ win: boolean }>`
	width: 40px;
	height: 100%;
	padding: 10px 0;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	position: absolute;
	top: 0;
	right: 0;
	font-size: 2rem;

	:hover {
		cursor: pointer;
		background-color: ${(props) => (props.win ? '#294a91' : '#a32847')};
	}
`;
