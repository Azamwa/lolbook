import { ChampionDetailType, ChampionType } from 'utils/types';
import { create } from 'zustand';

interface SearchChampionState {
	searchChampions: ChampionType[];
	setSearchChampions: (
		championList: ChampionType,
		role: string | undefined,
		searchValue: string
	) => void;
}

interface SelectChampionState {
	selectChampion: ChampionType;
	setSelectChampion: (champion: ChampionType) => void;
}

interface ChampionDetailState {
	championDetail: ChampionDetailType;
	setChampionDetail: (champion: ChampionDetailType) => void;
}

interface SkinNumberState {
	skinNumber: number;
	setSkinNumber: (number: number) => void;
}

export const searchChampionState = create<SearchChampionState>((set) => ({
	searchChampions: [],
	setSearchChampions: (championList, role, searchValue) => {
		let searchChampion = Object.values(championList);
		let filteredChampion: ChampionType[] = [];
		if (searchValue !== '') {
			searchChampion = searchChampion.filter((champion) => champion.name.includes(role));
		}
		if (role !== undefined && role !== 'all') {
			filteredChampion = searchChampion.filter((champion) => champion.tags.includes(role));
		} else {
			filteredChampion = searchChampion;
		}
		filteredChampion.sort((a, b) => (a.name < b.name ? -1 : 1));
		set(() => ({ searchChampions: filteredChampion }));
	}
}));

export const selectChampionState = create<SelectChampionState>((set) => ({
	selectChampion: {} as ChampionType,
	setSelectChampion: (champion) => {
		set(() => ({ selectChampion: champion }));
	}
}));

export const championDetailState = create<ChampionDetailState>((set) => ({
	championDetail: {} as ChampionDetailType,
	setChampionDetail: (champion) => {
		set(() => ({ championDetail: champion }));
	}
}));

export const skinNumberState = create<SkinNumberState>((set) => ({
	skinNumber: 0,
	setSkinNumber: (number) => {
		set(() => ({ skinNumber: number }));
	}
}));
