import React from 'react';
import styled from 'styled-components';
import { MatchType } from 'utils/recordType';

interface ComprehensiveProps {
	match: MatchType;
}

export default function Comprehensive({ match }: ComprehensiveProps) {
	return (
		<ComprehensiveInfo>
			<ObjectInfo>
				<KillObject>파괴한 포탑 {match.ourTeam.tower_kill}</KillObject>
				<KillObject>처치한 용 {match.ourTeam.dragon_kill}</KillObject>
				<KillObject>처치한 바론 {match.ourTeam.baron_kill}</KillObject>
			</ObjectInfo>
			<Compare>
				<Title>Total Kill</Title>
				<TotalAmount>
					<span>{match.ourTeam.kill}</span>
					<RatingBar>
						<Rating
							rate={match.ourTeam.kill / (match.ourTeam.kill + match.enemyTeam.kill)}
							team={match.ourTeam.win}
						/>
						<Rating
							rate={
								match.enemyTeam.kill / (match.ourTeam.kill + match.enemyTeam.kill)
							}
							team={match.enemyTeam.win}
						/>
					</RatingBar>
					<span>{match.enemyTeam.kill}</span>
				</TotalAmount>
				<Title>Total Gold</Title>
				<TotalAmount>
					<span>{match.ourTeam.gold_earned}</span>
					<RatingBar>
						<Rating
							rate={
								match.ourTeam.gold_earned /
								(match.ourTeam.gold_earned + match.enemyTeam.gold_earned)
							}
							team={match.ourTeam.win}
						/>
						<Rating
							rate={
								match.enemyTeam.gold_earned /
								(match.ourTeam.gold_earned + match.enemyTeam.gold_earned)
							}
							team={match.enemyTeam.win}
						/>
					</RatingBar>
					<span>{match.enemyTeam.gold_earned}</span>
				</TotalAmount>
			</Compare>
			<ObjectInfo>
				<KillObject>파괴한 포탑 {match.enemyTeam.tower_kill}</KillObject>
				<KillObject>처치한 용 {match.enemyTeam.dragon_kill}</KillObject>
				<KillObject>처치한 바론 {match.enemyTeam.baron_kill}</KillObject>
			</ObjectInfo>
		</ComprehensiveInfo>
	);
}

const ComprehensiveInfo = styled.div`
	width: 100%;
	padding: 10px;
	border-radius: 5px;
	background-color: rgb(52, 69, 85);
	display: flex;
	justify-content: space-around;
	color: #fff;
	font-size: 1.3rem;
`;

const ObjectInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
`;

const KillObject = styled.p`
	font-size: 1.3rem;
`;

const Compare = styled.div`
	width: 500px;
	height: 105px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h2`
	font-size: 1.5rem;
	margin-bottom: 3px;
`;

const TotalAmount = styled.div`
	margin-bottom: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;

	span {
		font-size: 1.4rem;
	}
`;

const RatingBar = styled.div`
	width: 400px;
	display: flex;
`;

const Rating = styled.div<{ rate: number; team: boolean }>`
	width: ${(props) => props.rate * 400 + 'px'};
	height: 10px;
	background-color: ${(props) => (props.team ? '#4983ff;' : '#ff4848')};
`;
