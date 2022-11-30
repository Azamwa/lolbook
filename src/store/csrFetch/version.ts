import { createSlice } from '@reduxjs/toolkit';
import { csrFetch } from '.';

type VersionListState = {
	lastVersion: string;
	status: string;
};

const initialState: VersionListState = {
	lastVersion: '',
	status: ''
};

export const version = createSlice({
	name: 'getVersion',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(csrFetch.getVersionList.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(csrFetch.getVersionList.fulfilled, (state, action) => {
				state.status = 'complete';
				state.lastVersion = action.payload.data[0];
			})
			.addCase(csrFetch.getVersionList.rejected, (state) => {
				state.status = 'error';
			});
	}
});
