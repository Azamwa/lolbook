import { createSlice } from '@reduxjs/toolkit';
import { ItemProps } from 'utils/types';

type ItemsState = {
	itemGroup: {
		id: string;
		name: string;
		items: number[];
		value: ItemProps[];
	}[];
};

const initialState: ItemsState = {
	itemGroup: [
		{
			id: 'boots',
			name: '신발',
			items: [2422, 1001, 3009, 3047, 3117, 3158, 3020, 3006, 3111],
			value: []
		},
		{
			id: 'consumables',
			name: '소모품',
			items: [2003, 2031, 2033, 2055, 3363, 3340, 3364, 2138, 2139, 2140, 3330, 3400, 3599],
			value: []
		},
		{
			id: 'start',
			name: '시작',
			items: [1082, 3070, 1056, 1055, 1054, 3850, 3862, 3854, 1083, 3858, 1011, 1012, 1013],
			value: []
		},
		{
			id: 'basic',
			name: '기본',
			items: [
				1004, 1006, 1011, 1018, 1026, 1027, 1028, 1029, 1031, 1033, 1036, 1037, 1038, 1042,
				1052, 1058, 2419, 2420, 2421, 3035, 3057
			],
			value: []
		},
		{
			id: 'epic',
			name: '서사',
			items: [
				1043, 1053, 1057, 2015, 3024, 3035, 3044, 3051, 3066, 3067, 3076, 3077, 3082, 3086,
				3105, 3108, 3113, 3114, 3123, 3133, 3134, 3140, 3145, 3155, 3191, 3211, 3801, 3802,
				3803, 3851, 3855, 3859, 3863, 3916, 4630, 4632, 4635, 4642, 6029, 6660, 6670, 6677
			],
			value: []
		},
		{
			id: 'legend',
			name: '전설',
			items: [
				3003, 3004, 3011, 3026, 3031, 3033, 3036, 3040, 3041, 3042, 3046, 3050, 3053, 3065,
				3068, 3071, 3072, 3074, 3075, 3083, 3085, 3089, 3091, 3094, 3095, 3100, 3102, 3107,
				3109, 3110, 3115, 3116, 3119, 3121, 3124, 3135, 3139, 3142, 3143, 3153, 3156, 3157,
				3161, 3165, 3179, 3181, 3193, 3222, 3504, 3508, 3742, 3748, 3814, 3853, 3857, 3860,
				3864, 4401, 4403, 4628, 4629, 4637, 4645, 6035, 6333, 6609, 6616, 6664, 6675, 6676,
				6694, 6695, 6696, 8001, 8020
			],
			value: []
		},
		{
			id: 'myth',
			name: '신화',
			items: [
				2065, 3001, 3078, 3084, 3152, 3190, 4005, 4633, 4636, 4644, 6617, 6630, 6631, 6632,
				6653, 6655, 6656, 6657, 6662, 6665, 6667, 6671, 6672, 6673, 6691, 6692, 6693, 7000,
				7001, 7002, 7005, 7006, 7007, 7008, 7009, 7010, 7011, 7012, 7013, 7014, 7015, 7016,
				7017, 7018, 7019, 7020, 7021, 7022, 7023, 7024, 7025, 7026, 7027, 7028
			],
			value: []
		}
	]
};

const items = createSlice({
	name: 'items',
	initialState,
	reducers: {
		setItemsByGroup(state, action) {
			state.itemGroup.forEach((group) => (group.value.length = 0));
			for (let id in action.payload) {
				state.itemGroup.forEach((group) => {
					if (group.items.includes(Number(id))) {
						group.value.push(action.payload[id]);
					}
				});
			}
		}
	}
});

export const { setItemsByGroup } = items.actions;

export default items;
