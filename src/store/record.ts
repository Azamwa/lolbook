import { atom } from 'jotai';

export const riotApiURL = 'https://kr.api.riotgames.com';
export const API_KEY = `api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`;

const summonerName = atom('');
export const summonerNameState = atom(
	(get) => get(summonerName),
	(get, set, name: string) => set(summonerName, name)
);

const currentPage = atom(1);
export const currentPageState = atom(
	(get) => get(currentPage),
	(get, set, page: number) => set(currentPage, page)
);
