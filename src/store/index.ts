import axios from 'axios';
import { riotAPI } from './record';

export const versionAPI = async () => {
	const res = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
	return res.data;
};

export const patchNoteAPI = async (n: number) => {
	const res = await axios.get(`https://api.lolbook-server.store/patchNoteList/${n}`);
	return res.data;
};

export const championDetailAPI = async (name: string) => {
	const res = await axios.get(
		`https://ddragon.leagueoflegends.com/cdn/13.20.1/data/ko_KR/champion/${name}.json`
	);
	return res.data;
};

export const rankingAPI = async (tier: string, page: string) => {
	const res = await axios.get(
		`${riotAPI}/lol/league-exp/v4/entries/RANKED_SOLO_5x5/${tier}/I?page=${page}&api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`,
		{
			headers: {
				Accept: 'application/json',
				'Accept-Encoding': 'identity'
			}
		}
	);
	return res.data;
};
