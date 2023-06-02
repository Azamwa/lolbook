import { atom } from 'recoil';
import { PatchNoteListType } from 'utils/types';

export const versionListState = atom<string[]>({
	key: 'versionList',
	default: []
});

export const patchNoteListState = atom<PatchNoteListType[]>({
	key: 'patchNoteList',
	default: []
});
