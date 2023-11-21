import styled from 'styled-components';
import { MatchType } from 'utils/recordType';
import MatchTeamInfo from './MatchTeamInfo';
import Comprehensive from './Comprehensive';

interface MatchDetailProps {
	match: MatchType;
}

export default function MatchDetail({ match }: MatchDetailProps) {
	return (
		<MoreInfoContainer>
			<Comprehensive />
			<TeamContainer>
				<MatchTeamInfo ourTeam={match.ourTeam} />
				<MatchTeamInfo enemyTeam={match.enemyTeam} />
			</TeamContainer>
		</MoreInfoContainer>
	);
}

const MoreInfoContainer = styled.section`
	width: 100%;
	height: 500px;
	padding: 10px;
	border-radius: 5px;
	background-color: rgb(26, 36, 46);
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const TeamContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	gap: 5px;
	height: 470px;
`;
