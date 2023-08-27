import { create } from 'zustand';
import { PatchNoteType } from 'utils/types';
import { patchNoteAPI, versionAPI } from 'store';

interface versionListState {
	version: string[];
	setVersion: () => void;
}

interface PatchNoteListState {
	patchNoteList: PatchNoteType[];
	setPatchNoteList: (count: number) => void;
}

interface ScreenSizeState {
	screenSize: string;
	setScreenSize: (availWidth: number) => void;
}

export const versionListState = create<versionListState>((set) => ({
	version: [],
	setVersion: async () => {
		const versionList = await versionAPI();
		set(() => ({ version: versionList }));
	}
}));

export const patchNoteListState = create<PatchNoteListState>((set) => ({
	patchNoteList: [],
	setPatchNoteList: async (count) => {
		const { list } = await patchNoteAPI(count);
		set((state) => ({ patchNoteList: state.patchNoteList.concat(list) }));
	}
}));

export const screenSizeState = create<ScreenSizeState>((set) => ({
	screenSize: 'big',
	setScreenSize: (availWidth) => {
		set(() => ({
			screenSize: availWidth > 1300 ? 'big' : availWidth > 768 ? 'middle' : 'small'
		}));
	}
}));
