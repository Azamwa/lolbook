import { createSlice } from '@reduxjs/toolkit';
import { ChampionProps } from 'utils/types';

interface ChampionState {
	championList?: ChampionProps[];
}

const initialState: ChampionState = {
	championList: []
};

const champions = createSlice({
	name: 'champion',
	initialState,
	reducers: {
		setChampionList(state, action) {
			if (state.championList !== undefined) {
				state.championList.length = 0;
			}
			for (let id in action.payload) {
				state.championList?.push(action.payload[id]);
			}
			state.championList?.sort((a, b) => {
				return a.name < b.name ? -1 : 1;
			});
		}
	}
});

export const { setChampionList } = champions.actions;

export default champions;
