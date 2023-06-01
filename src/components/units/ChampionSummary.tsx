import React from 'react';
import styled from 'styled-components';
import { ChampionDetailProps } from 'utils/types';

interface SummaryProps {
	detailInfo: ChampionDetailProps;
}

const statsList = [
	{ name: '체력', value: 'hp', perlevelUp: 'hpperlevel' },
	{ name: '체력 회복량', value: 'hpregen', perlevelUp: 'hpregenperlevel' },
	{ name: '공격력', value: 'attackdamage', perlevelUp: 'attackdamageperlevel' },
	{ name: '공격속도', value: 'attackspeed', perlevelUp: 'attackspeedperlevel' },
	{ name: '방어력', value: 'armor', perlevelUp: 'armorperlevel' },
	{ name: '마법저항력', value: 'spellblock', perlevelUp: 'spellblockperlevel' },
	{ name: '공격사거리', value: 'attackrange' },
	{ name: '이동속도', value: 'movespeed' },
	{ name: '마나(기력)', value: 'mp', perlevelUp: 'mpperlevel' },
	{ name: '마나회복량', value: 'mp', perlevelUp: 'mpregenperlevel' }
];

function ChampionSummary({ detailInfo }: SummaryProps) {
	return (
		<SummaryContainer>
			<Description>{detailInfo.lore}</Description>
			<StatsContainer>
				<Subject>스탯</Subject>
				<SubjectExplain>&#40;괄호 안은 레벨업당 증가량 &#41;</SubjectExplain>
				<StatsList>
					{statsList.map((stats, index) => {
						return (
							<Stats key={index}>
								{detailInfo.stats[stats.value] !== 0 && (
									<StatsValue>
										{stats.name}: {detailInfo.stats[stats.value]}
									</StatsValue>
								)}
								{stats.perlevelUp && detailInfo.stats[stats.perlevelUp] !== 0 && (
									<StatsPerLevelUp>
										&#40;+{detailInfo.stats[stats.perlevelUp]}
										{stats.value === 'attackspeed' && '%'}&#41;
									</StatsPerLevelUp>
								)}
							</Stats>
						);
					})}
				</StatsList>
			</StatsContainer>
		</SummaryContainer>
	);
}

const SummaryContainer = styled.div``;

const Description = styled.p`
	font-size: 1.7rem;

	@media screen and (max-width: 1300px) {
		font-size: 1.5rem;
	}
`;

const StatsContainer = styled.div`
	margin-top: 40px;

	@media screen and (max-width: 1300px) {
		margin-top: 30px;
	}
`;

const Subject = styled.span`
	font-size: 2.5rem;

	@media screen and (max-width: 1300px) {
		font-size: 2.2.rem;
	}
`;

const SubjectExplain = styled.span`
	font-size: 1.7rem;
`;

const StatsList = styled.div`
	margin-top: 10px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
`;

const Stats = styled.div`
	display: flex;
	gap: 2px;
	margin-bottom: 5px;
`;

const StatsValue = styled.span`
	font-size: 1.8rem;

	@media screen and (max-width: 1300px) {
		font-size: 1.5rem;
	}

	@media screen and (max-width: 767px) {
		font-size: 1.3rem;
	}
`;

const StatsPerLevelUp = styled.span`
	font-size: 1.5rem;
	color: #2aff00;
	font-style: italic;

	@media screen and (max-width: 1300px) {
		font-size: 1.3rem;
	}
`;

export default ChampionSummary;
