import { atom } from 'jotai';
import { PatchNoteListType } from 'utils/types';

export const versionListState = atom<string[]>([]);

export const patchNoteListState = atom<PatchNoteListType[]>([]);
