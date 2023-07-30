import { atom } from 'jotai';
import { ChampionDetailType, ChampionType } from 'utils/types';

const searchChampionList = atom<ChampionType[]>([]);
export const searchChampionState = atom(
	(get) => get(searchChampionList),
	(_, set, { championList, role, searchValue }) => {
		let searchChampion: ChampionType[] = Object.values(championList);
		let filteredChampion: ChampionType[] = [];
		if (searchValue !== '') {
			searchChampion = searchChampion.filter((champion) =>
				champion.name.includes(searchValue)
			);
		}
		if (role !== null && role.value !== 'all') {
			filteredChampion = searchChampion.filter((champion) =>
				champion.tags.includes(role.value)
			);
		} else {
			filteredChampion = searchChampion;
		}
		filteredChampion.sort((a, b) => (a.name < b.name ? -1 : 1));
		set(searchChampionList, filteredChampion);
	}
);

const selectChampion = atom<ChampionType>({} as ChampionType);
export const selectChampionState = atom(
	(get) => get(selectChampion),
	(_, set, champion: ChampionType) => set(selectChampion, champion)
);

const championDetail = atom<ChampionDetailType>({} as ChampionDetailType);
export const championDetailState = atom(
	(get) => get(championDetail),
	(_, set, champion: ChampionDetailType) => set(championDetail, champion)
);

const skinNumber = atom<number>(0);
export const skinNumberState = atom(
	(get) => get(skinNumber),
	(_, set, number: number) => {
		set(skinNumber, number);
	}
);
