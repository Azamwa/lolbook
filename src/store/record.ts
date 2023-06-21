import { atom } from 'jotai';

const summonerName = atom('');
export const summonerNameState = atom(
	(get) => get(summonerName),
	(get, set, name: string) => set(summonerName, name)
);
