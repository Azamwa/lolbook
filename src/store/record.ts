import { atom } from 'jotai';

export const riotApiURL = 'https://kr.api.riotgames.com';

const summonerName = atom('');
export const summonerNameState = atom(
	(get) => get(summonerName),
	(get, set, name: string) => set(summonerName, name)
);
