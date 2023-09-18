import { create } from 'zustand';

export const riotAPI = 'https://kr.api.riotgames.com';
export const riotAsiaAPI = 'https://asia.api.riotgames.com';

interface SummonerNameState {
	summonerName: string;
	setSummonerName: (name: string) => void;
}

export const summonerNameState = create<SummonerNameState>((set) => ({
	summonerName: '',
	setSummonerName: (name) => {
		set(() => ({ summonerName: name }));
	}
}));
