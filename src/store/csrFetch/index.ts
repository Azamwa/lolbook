import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const versionApiURL = 'http://ddragon.leagueoflegends.com/api/versions.json';
const championDetailURL = 'http://ddragon.leagueoflegends.com/cdn/13.6.1/data/ko_KR/champion/';
const patchNoteURL = 'https://lol-version.herokuapp.com/patchNoteList';

export const csrFetch = {
	getVersionList: createAsyncThunk('csrFetch/getVersionList', async () => {
		const response = await axios.get(versionApiURL);
		return response;
	}),
	getChampionDetail: createAsyncThunk('csrFetch/getChampionDetail', async (name: string) => {
		const response = await axios.get(`${championDetailURL}${name}.json`);
		return response;
	}),
	getPatchNoteList: createAsyncThunk('csrFetch/getPatchNoteList', async (idx: number) => {
		const response = await axios.get(`${patchNoteURL}/${idx}`);
		return response;
	})
};
