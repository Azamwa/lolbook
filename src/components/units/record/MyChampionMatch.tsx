import Image from 'next/image';
import styled from 'styled-components';
import { rateCalculator } from 'utils/common';
import { SummonerInfo } from 'utils/recordType';
import { RuneType, SpellType } from 'utils/types';

interface MyChampionProps {
	summonerInfo: SummonerInfo;
	currentVersion: string;
	spellList: SpellType[];
	runeList: RuneType[];
	totalTeamKill: number;
	win: boolean;
}

export default function MyChampionMatch({
	summonerInfo,
	currentVersion,
	spellList,
	runeList,
	totalTeamKill,
	win
}: MyChampionProps) {
	const mySpell = (id: number) => {
		const spell = spellList.find((spell) => spell.key === String(id));
		return spell === undefined ? 'SummonerCherryHold' : spell.id;
	};

	const primaryRune = (pageId: number, runeId: number) => {
		const runePage = runeList.find((rune) => rune.id === pageId);
		const rune = runePage?.slots.find((rune) => rune.id === runeId);
		return rune?.icon;
	};

	const secondaryRune = (pageId: number) => {
		const runePage = runeList.find((rune) => rune.id === pageId);
		return runePage?.icon;
	};
	return (
		<MyChampion>
			<BasicInfo>
				<Image
					src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${summonerInfo.championEngName}.png`}
					width={60}
					height={60}
					alt="championImage"
				/>
				<Spells>
					<Image
						src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${mySpell(
							summonerInfo.spells[0]
						)}.png`}
						width={28}
						height={28}
						alt="spell1"
					/>
					<Image
						src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${mySpell(
							summonerInfo.spells[1]
						)}.png`}
						width={28}
						height={28}
						alt="spell2"
					/>
				</Spells>
				<Runes>
					<RuneBackground>
						<Image
							src={`https://ddragon.leagueoflegends.com/cdn/img/${primaryRune(
								summonerInfo.rune.primary_page_id,
								summonerInfo.rune.primary_rune_id
							)}`}
							width={25}
							height={25}
							alt="rune1"
						/>
					</RuneBackground>
					<RuneBackground>
						<Image
							src={`https://ddragon.leagueoflegends.com/cdn/img/${secondaryRune(
								summonerInfo.rune.secondary_page_id
							)}`}
							width={20}
							height={20}
							alt="rune2"
						/>
					</RuneBackground>
				</Runes>
			</BasicInfo>
			<KillDeathInfo>
				<KDA>
					{summonerInfo.kill} / <span>{summonerInfo.death}</span> / {summonerInfo.assist}
				</KDA>
				<KDARate>
					{rateCalculator(summonerInfo.kill, summonerInfo.death, summonerInfo.assist)}
				</KDARate>
				<KillInvolvement>
					킬관여율{' '}
					{Math.round(((summonerInfo.kill + summonerInfo.assist) * 100) / totalTeamKill)}%
				</KillInvolvement>
			</KillDeathInfo>
			<UseItems>
				<BasicItems>
					{summonerInfo.items.map((item, index) => {
						if (index !== 6) {
							return item === 0 ? (
								<BlockImage key={index} win={win} />
							) : (
								<Image
									src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${item}.png`}
									width={25}
									height={25}
									alt="itemIUsed"
									key={index}
								/>
							);
						}
					})}
				</BasicItems>
				<Image
					src={`https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${summonerInfo.items[6]}.png`}
					width={25}
					height={25}
					alt="accessaryItem"
				/>
			</UseItems>
		</MyChampion>
	);
}

const MyChampion = styled.div`
	display: flex;
	align-items: center;
	gap: 30px;
`;

const BasicInfo = styled.div`
	width: 125px;
	display: flex;
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

const RuneBackground = styled.div`
	width: 28px;
	height: 28px;
	border-radius: 50%;
	background-color: #000;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const KillDeathInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 3px;
	font-weight: 700;
	color: #ddd;
	font-size: 1.3rem;
`;

const KDA = styled.p`
	span {
		color: #e84057;
	}
`;
const KDARate = styled.p``;
const KillInvolvement = styled.p``;

const UseItems = styled.div`
	width: 110px;
	height: 55px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

const BasicItems = styled.div`
	width: 80px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 2px;
`;

const BlockImage = styled.div<{ win: boolean }>`
	width: 25px;
	height: 25px;
	background-color: ${(props) => (props.win ? '#2a50a0' : '#aa2446')};
`;
