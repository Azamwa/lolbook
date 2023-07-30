import { atom } from 'jotai';
import { PatchNoteListType } from 'utils/types';

export const versionListState = atom<string[]>([]);

export const patchNoteListState = atom<PatchNoteListType[]>([]);

const screenSize = atom<string>('');
export const screenSizeState = atom(
	(get) => get(screenSize),
	(_, set, availWidth: number) =>
		set(screenSize, availWidth > 1300 ? 'big' : availWidth > 768 ? 'middle' : 'small')
);
