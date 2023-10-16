import Image from 'next/image';
import styled from 'styled-components';
import { SummonerInfo } from 'utils/recordType';
import { RuneType, SpellType } from 'utils/types';

interface MyChampionProps {
	summonerInfo: SummonerInfo;
	currentVersion: string;
	spellList: SpellType[];
	runeList: RuneType[];
}

export default function MyChampionMatch({
	summonerInfo,
	currentVersion,
	spellList,
	runeList
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
			{/* <KillDeathInfo>
                <KDA></KDA>
                <KDARate></KDARate>
                <KillInvolvement></KillInvolvement>
            </KillDeathInfo>
            <ItemImage></ItemImage>
            <OthersInfo></OthersInfo> */}
		</MyChampion>
	);
}

const MyChampion = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const BasicInfo = styled.div`
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
	font-weight: 700;
	color: #ddd;
`;

const KDA = styled.p`
	span {
		color: #e84057;
	}
`;
const KDARate = styled.p``;
const KillInvolvement = styled.p``;

const ItemImage = styled.div``;
const OthersInfo = styled.div``;
