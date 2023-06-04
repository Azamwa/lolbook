import { atomFamily } from 'recoil';
import { itemGroup } from 'utils/items/itemListInfo';

// export const itemListState = atomFamily({
//     key: 'itemList',
//     default: () => {
//         itemGroup.forEach(group => {
//             for(let id in )
//         })
//     }
// })

// type ItemsState = {
// 	itemDetail?: ItemProps;
// 	fromItemList?: ItemProps[] | null;
// 	openDetail: boolean;
// };

// const initialState: ItemsState = {
// 	itemGroup:
// 	itemDetail: undefined,
// 	fromItemList: null,
// 	openDetail: false
// };

// const items = createSlice({
// 	name: 'items',
// 	initialState,
// 	reducers: {
//  // 여기서 하나하나씩 추가하는 방식
// setItemsByGroup(state, action) {
// 	state.itemGroup.forEach((group) => {
// 		group.value.length = 0;
// 		for (let id in action.payload) {
// 			if (group.items.includes(Number(id))) {
// 				group.value.push(action.payload[id]);
// 			}
// 		}
// 		group.value.sort((a: ItemProps, b: ItemProps): number => {
// 			return a.gold.total - b.gold.total;
// 		});
// 	});
// },
// 		setItemDetail(state, action) {
// 			state.itemDetail = action.payload;
// 			state.openDetail = true;
// 		},
// 		setFromItem(state, action) {
// 			state.fromItemList = action.payload;
// 		},
// 		closeDetail(state) {
// 			state.openDetail = false;
// 		}
// 	}
// });
