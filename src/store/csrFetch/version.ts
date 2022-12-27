import { createSlice } from '@reduxjs/toolkit';
import { csrFetch } from '.';

type VersionListState = {
	lastVersion: string;
	status: string;
	patchNoteList: {
		list: {
			title: string;
			imgURL: string;
			author: string[];
			date: string;
			version: string;
			totalElements: number;
		}[];
	};
};

const initialState: VersionListState = {
	lastVersion: '',
	status: '',
	patchNoteList: {
		list: []
	}
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
			})
			.addCase(csrFetch.getPatchNoteList.fulfilled, (state, action) => {
				state.patchNoteList = action.payload.data;
			});
	}
});
