import { RankingType } from 'utils/recordType';
import { create } from 'zustand';

export const riotAPI = 'https://kr.api.riotgames.com';
export const riotAsiaAPI = 'https://asia.api.riotgames.com';
export const API_KEY = `api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;

interface SummonerNameState {
	summonerName: string;
	setSummonerName: (name: string) => void;
}

interface CurrentPageState {
	currentPage: number;
	setCurrentPage: (page: number) => void;
}

interface RankListState {
	rankList: RankingType[];
	setRankList: (addList: RankingType[]) => void;
}

export const summonerNameState = create<SummonerNameState>((set) => ({
	summonerName: '',
	setSummonerName: (name) => {
		set(() => ({ summonerName: name }));
	}
}));

export const currentPageState = create<CurrentPageState>((set) => ({
	currentPage: 1,
	setCurrentPage: (page) => {
		set(() => ({ currentPage: page }));
	}
}));

export const rankListState = create<RankListState>((set) => ({
	rankList: [],
	setRankList: (addList) => {
		set((state) => ({ rankList: state.rankList.concat(addList) }));
	}
}));
