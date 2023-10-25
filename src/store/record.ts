import { matchListAPI } from 'store';
import { MatchType } from 'utils/recordType';
import { create } from 'zustand';

export const riotAPI = 'https://kr.api.riotgames.com';

interface SummonerNameState {
	summonerName: string;
	setSummonerName: (name: string) => void;
}

interface RecordCountState {
	recordCount: number;
	setRecordCount: (count?: number) => void;
}

interface RecordHistoryState {
	recordHistory: MatchType[];
	setRecordHistory: (matchList: MatchType[] | null, count?: number, puuid?: string) => void;
}

export const summonerNameState = create<SummonerNameState>((set) => ({
	summonerName: '',
	setSummonerName: (name) => {
		set(() => ({ summonerName: name }));
	}
}));

export const recordCountState = create<RecordCountState>((set) => ({
	recordCount: 0,
	setRecordCount: (count) => {
		set((state) => ({ recordCount: count === undefined ? state.recordCount + 1 : count }));
	}
}));

export const recordHistoryState = create<RecordHistoryState>((set) => ({
	recordHistory: [],
	setRecordHistory: async (matchList, count, puuid) => {
		if (matchList !== null) {
			set(() => ({ recordHistory: matchList }));
		}
		if (matchList === null) {
			if (count !== undefined && puuid !== undefined) {
				const res = await matchListAPI(count, puuid);
				set((state) => ({ recordHistory: state.recordHistory.concat(res) }));
			} else {
				set(() => ({ recordHistory: [] }));
			}
		}
	}
}));
