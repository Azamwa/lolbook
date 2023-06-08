import axios from 'axios';

export const versionAPI = async () => {
	const res = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
	return res.data;
};

export const patchNoteAPI = async (n: number) => {
	const res = await axios.get(`https://api.lolbook-server.store/patchNoteList/${n}`);
	return res.data;
};

export const itemListAPI = async (version: string) => {
	const res = await axios.get(
		`https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/item.json`
	);
	return res.data;
};
