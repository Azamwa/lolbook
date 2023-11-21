import styled from 'styled-components';
import { TeamInfo } from 'utils/recordType';

interface MatchTeamProps {
	ourTeam?: TeamInfo;
	enemyTeam?: TeamInfo;
}

export default function MatchTeamInfo({ ourTeam, enemyTeam }: MatchTeamProps) {
	const currentTeam = ourTeam || (enemyTeam as TeamInfo);
	return <TeamContainer win={currentTeam.win}></TeamContainer>;
}

const TeamContainer = styled.div<{ win: boolean }>`
	width: 400px;
	background-color: ${(props) => (props.win ? '#162c5c' : '#80122d')};
`;
