import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const versionApiURL = 'https://ddragon.leagueoflegends.com/api/versions.json';

export const csrFetch = {
	getVersionList: createAsyncThunk('csrFetch/getVersionList', async () => {
		const response = await axios.get(versionApiURL);
		return response;
	})
};
