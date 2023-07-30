import axios from 'axios';

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
		`https://ddragon.leagueoflegends.com/cdn/13.14.1/data/ko_KR/champion/${name}.json`
	);
	return res.data;
};
