import { create } from 'zustand';
import axios from 'axios';
import { PatchNoteType, RuneType, SpellType } from 'utils/types';
import { patchNoteAPI, versionAPI } from 'store';

interface VersionListState {
	version: string[];
	setVersion: () => void;
}

interface PatchNoteListState {
	patchNoteList: PatchNoteType[];
	setPatchNoteList: (count: number, patchNote?: PatchNoteType[]) => void;
}

interface ScreenSizeState {
	screenSize: string;
	setScreenSize: (availWidth: number) => void;
}

interface SpellListState {
	spellList: SpellType[];
	setSpellList: () => void;
}

interface RuneListState {
	runeList: RuneType[];
	setRuneList: () => void;
}

export const versionListState = create<VersionListState>((set) => ({
	version: [],
	setVersion: async () => {
		const versionList = await versionAPI();
		set(() => ({ version: versionList }));
	}
}));

export const patchNoteListState = create<PatchNoteListState>((set) => ({
	patchNoteList: [],
	setPatchNoteList: async (count, patchNote) => {
		if (count === 0) {
			set(() => ({ patchNoteList: patchNote }));
		} else {
			const list = await patchNoteAPI(count);
			set((state) => ({ patchNoteList: state.patchNoteList.concat(list) }));
		}
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

export const spellListState = create<SpellListState>((set) => ({
	spellList: [],
	setSpellList: async () => {
		const res = await axios.get(
			'https://ddragon.leagueoflegends.com/cdn/13.20.1/data/ko_KR/summoner.json'
		);
		const result = Object.values(res.data.data).map((spell: any) => {
			return {
				id: spell.id,
				name: spell.name,
				key: spell.key,
				description: spell.description,
				cooldown: spell.cooldown[0]
			};
		});
		set(() => ({ spellList: result }));
	}
}));

export const runeListState = create<RuneListState>((set) => ({
	runeList: [],
	setRuneList: async () => {
		const res = await axios.get(
			'https://ddragon.leagueoflegends.com/cdn/13.20.1/data/ko_KR/runesReforged.json'
		);
		let result = res.data.map((perks: any) => {
			let chunk: any = [];
			for (const page of perks.slots) {
				chunk.push(...page.runes);
			}
			return { ...perks, slots: chunk };
		});

		set(() => ({ runeList: result }));
	}
}));
