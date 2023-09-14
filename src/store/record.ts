import { create } from 'zustand';

export const riotAPI = 'https://kr.api.riotgames.com';
export const riotAsiaAPI = 'https://asia.api.riotgames.com';
export const API_KEY = `api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;

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
