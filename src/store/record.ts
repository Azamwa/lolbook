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
	setRecordCount: () => void;
}

interface RecordHistoryState {
	recordHistory: MatchType[];
	setRecordHistory: (matchList: MatchType[], count?: number, puuid?: string) => void;
}

export const summonerNameState = create<SummonerNameState>((set) => ({
	summonerName: '',
	setSummonerName: (name) => {
		set(() => ({ summonerName: name }));
	}
}));

export const recordCountState = create<RecordCountState>((set) => ({
	recordCount: 0,
	setRecordCount: () => {
		set((state) => ({ recordCount: state.recordCount + 1 }));
	}
}));

export const recordHistoryState = create<RecordHistoryState>((set) => ({
	recordHistory: [],
	setRecordHistory: async (matchList, count, puuid) => {
		let result = matchList;

		if (result === null && count !== undefined && puuid !== undefined) {
			result = await await matchListAPI(count, puuid);
		}

		set((state) => ({ recordHistory: state.recordHistory.concat(result) }));
	}
}));
