import { create } from 'zustand';
import { PatchNoteType } from 'utils/types';
import { patchNoteAPI, versionAPI } from 'store';

interface versionListType {
	version: string[];
	setVersion: () => void;
}

interface PatchNoteListType {
	patchNoteList: PatchNoteType[];
	setPatchNoteList: (count: number) => void;
}

interface ScreenSizeType {
	screenSize: string;
	setScreenSize: (availWidth: number) => void;
}

export const versionListState = create<versionListType>((set) => ({
	version: [],
	setVersion: async () => {
		const versionList = await versionAPI();
		set(() => ({ version: versionList }));
	}
}));

export const patchNoteListState = create<PatchNoteListType>((set) => ({
	patchNoteList: [],
	setPatchNoteList: async (count) => {
		const { list } = await patchNoteAPI(count);
		set((state) => ({ patchNoteList: state.patchNoteList.concat(list) }));
	}
}));

export const screenSizeState = create<ScreenSizeType>((set) => ({
	screenSize: 'big',
	setScreenSize: (availWidth) => {
		set(() => ({
			screenSize: availWidth > 1300 ? 'big' : availWidth > 768 ? 'middle' : 'small'
		}));
	}
}));
