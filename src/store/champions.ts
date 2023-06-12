import { atom } from 'jotai';
import { ChampionDetailType, ChampionType } from 'utils/types';

const searchChampionList = atom<ChampionType[]>([]);
export const searchChampionState = atom(
	(get) => get(searchChampionList),
	(_, set, { championList, role, searchValue }) => {
		let searchChampion: ChampionType[] = Object.values(championList);
		let filteredChampion: ChampionType[] = [];
		if (searchValue !== '') {
			searchChampion = searchChampion.filter((champion) =>
				champion.name.includes(searchValue)
			);
		}
		if (role !== null && role.value !== 'all') {
			filteredChampion = searchChampion.filter((champion) =>
				champion.tags.includes(role.value)
			);
		} else {
			filteredChampion = searchChampion;
		}
		filteredChampion.sort((a, b) => (a.name < b.name ? -1 : 1));
		set(searchChampionList, filteredChampion);
	}
);

const selectChampion = atom<ChampionType>({} as ChampionType);
export const selectChampionState = atom(
	(get) => get(selectChampion),
	(_, set, champion: ChampionType) => set(selectChampion, champion)
);

const championDetail = atom<ChampionDetailType>({} as ChampionDetailType);
export const championDetailState = atom(
	(get) => get(championDetail),
	(_, set, champion: ChampionDetailType) => set(championDetail, champion)
);

const screenSize = atom<string>('');
export const screenSizeState = atom(
	(get) => get(screenSize),
	(_, set, availWidth: number) =>
		set(screenSize, availWidth > 1300 ? 'big' : availWidth > 768 ? 'middle' : 'small')
);
// interface ChampionState {
// 	status: string;
// 	championList?: ChampionProps[];
// 	championDetail?: ChampionDetailProps;
// 	skinNumber: number;
// }

// const initialState: ChampionState = {
// 	status: 'complete',
// 	championList: [],
// 	skinNumber: 0
// };

// const champions = createSlice({
// 	name: 'champion',
// 	initialState,
// 	reducers: {
// 		setChampionList(state, action) {
// 			if (state.championList !== undefined) {
// 				state.championList.length = 0;
// 			}
// 			for (let id in action.payload) {
// 				state.championList?.push(action.payload[id]);
// 			}
// 			state.championList?.sort((a, b) => {
// 				return a.name < b.name ? -1 : 1;
// 			});
// 		},
// 		setSkinNumber(state, action) {
// 			state.skinNumber = action.payload;
// 		}
// 	},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(csrFetch.getChampionDetail.pending, (state) => {
// 				state.status = 'pending';
// 			})
// 			.addCase(csrFetch.getChampionDetail.fulfilled, (state, action) => {
// 				state.championDetail = action.payload.data.data;
// 				state.status = 'complete';
// 			})
// 			.addCase(csrFetch.getChampionDetail.rejected, (state) => {
// 				state.status = 'error';
// 			});
// 	}
// });

// export const { setChampionList, setSkinNumber } = champions.actions;

// export default champions;
