import axios from 'axios';
import { championDetailAPI } from 'store';
import { ChampionDetailType, ChampionListType, ChampionType } from 'utils/types';
import { create } from 'zustand';

interface AllChampionState {
    championList: {
        id: number;
        name: string;
        engName: string;
    }[];
    setAllChampions: (champions?: ChampionListType) => void;
}

interface SearchChampionState {
	searchChampions: ChampionType[];
	setSearchChampions: (championList: ChampionType[], role: string, searchValue: string) => void;
}

interface SelectChampionState {
	selectChampion: ChampionType;
	setSelectChampion: (champion: ChampionType) => void;
}

interface ChampionDetailState {
	championDetail: ChampionDetailType;
	setChampionDetail: (name: string) => void;
}

interface SkinNumberState {
	skinNumber: number;
	setSkinNumber: (number: number) => void;
}

export const allChampionState = create<AllChampionState>((set) => ({
    championList: [],
    setAllChampions: async (champions) => {
        let result: { id: number; name: string; engName: string; }[] = [];
        let list = champions;
        if(champions === undefined) {
            const url = 'https://ddragon.leagueoflegends.com/cdn/13.21.1/data/ko_KR/champion.json';
            const res = await axios.get(url);
            list = res.data.data;
        }

        for(const champion in list) {
            result.push({
                id: Number(list[champion].key),
                name: list[champion].name,
                engName: champion
            });
        }
        set(() => ({ championList: result }));
    }
}))

export const searchChampionState = create<SearchChampionState>((set) => ({
	searchChampions: [],
	setSearchChampions: (championList, role, searchValue) => {
		let filteredChampion = championList;
		if (searchValue !== '') {
			filteredChampion = filteredChampion.filter((champion) =>
				champion.name.includes(searchValue)
			);

			if (role !== 'all') {
				filteredChampion = filteredChampion.filter((champion) =>
					champion.tags.includes(role)
				);
			}
		}
		if (role !== 'all') {
			filteredChampion = filteredChampion.filter((champion) => champion.tags.includes(role));
            
			if (searchValue !== '') {
				filteredChampion = filteredChampion.filter((champion) =>
					champion.name.includes(searchValue)
				);
			}
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
	setChampionDetail: async (name) => {
		const { data } = await championDetailAPI(name);
		set(() => ({ championDetail: data[name] }));
	}
}));

export const skinNumberState = create<SkinNumberState>((set) => ({
	skinNumber: 0,
	setSkinNumber: (number) => {
		set(() => ({ skinNumber: number }));
	}
}));
