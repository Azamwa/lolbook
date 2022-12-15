import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const versionApiURL = 'https://ddragon.leagueoflegends.com/api/versions.json';
const championDetailURL = 'https://ddragon.leagueoflegends.com/cdn/12.23.1/data/ko_KR/champion/';

export const csrFetch = {
	getVersionList: createAsyncThunk('csrFetch/getVersionList', async () => {
		const response = await axios.get(versionApiURL);
		return response;
	}),
	getChampionDetail: createAsyncThunk('csrFetch/getChampionDetail', async (name: string) => {
		const response = await axios.get(`${championDetailURL}${name}.json`);
		return response;
	})
};
