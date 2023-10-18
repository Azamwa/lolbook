import { useMemo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { versionListState } from 'store/common';
import { ParticipantsType } from 'utils/recordType';

interface ParticipantsProps {
	participants: ParticipantsType[];
	win: boolean;
}

export default function Participants({ participants, win }: ParticipantsProps) {
	const { version } = versionListState();
	const currentVersion = version[0];
	const ourTeam = useMemo(() => {
		return participants.filter((summoner) => summoner.win === win);
	}, [participants, win]);
	const enemyTeam = useMemo(() => {
		return participants.filter((summoner) => summoner.win !== win);
	}, [participants, win]);

	return (
		<MatchContainer>
			<Teams>
				{ourTeam.map((summoner) => (
					<User key={summoner.summonerName}>
						<Image
							src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${summoner.championEngName}.png`}
							width={17}
							height={17}
							alt="championImage"
						/>
						<SummonerName>{summoner.summonerName}</SummonerName>
					</User>
				))}
			</Teams>
			<Teams>
				{enemyTeam.map((summoner) => (
					<User key={summoner.summonerName}>
						<Image
							src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${summoner.championEngName}.png`}
							width={17}
							height={17}
							alt="championImage"
						/>
						<SummonerName>{summoner.summonerName}</SummonerName>
					</User>
				))}
			</Teams>
		</MatchContainer>
	);
}

const MatchContainer = styled.div`
	display: flex;
`;

const Teams = styled.div`
	width: 120px;
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

const User = styled.div`
	display: flex;
	align-items: center;
	gap: 3px;
	font-size: 1.2rem;
	color: #ddd;
`;

const SummonerName = styled.p``;
