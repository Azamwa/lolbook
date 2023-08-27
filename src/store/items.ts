import { ItemGroupType, ItemListType, ItemType } from 'utils/types';
import { create } from 'zustand';

interface ItemGroupState {
	itemGroup: ItemGroupType[];
	setItemGroup: (selectItems: ItemType[]) => void;
}

interface FromItemState {
	fromItem: ItemType[];
	setFromItem: (itemIdList: string[] | undefined, itemList: ItemListType) => void;
}

interface selectItemState {
	selectItem: ItemType | null;
	setSelectItem: (item: ItemType) => void;
}

interface OpenDetailState {
	openDetail: boolean;
	setOpenDetail: () => void;
}

export const itemFilter = [
	{
		url: 'attack-damage.svg',
		id: ['Damage'],
		title: '공격력'
	},
	{
		url: 'ctrit-chance.svg',
		id: ['CriticalStrike'],
		title: '치명타'
	},
	{
		url: 'attack-speed.svg',
		id: ['AttackSpeed'],
		title: '공격속도'
	},
	{
		url: 'on-hit.svg',
		id: ['OnHit'],
		title: '적중 시 효과'
	},
	{
		url: 'armor-penetration.svg',
		id: ['ArmorPenetration'],
		title: '방어구관통력'
	},
	{
		url: 'ability-power.svg',
		id: ['SpellDamage'],
		title: '주문력'
	},
	{
		url: 'mana.svg',
		id: ['Mana', 'ManaRegen'],
		title: '마나 및 재생'
	},
	{
		url: 'magic-penetration.svg',
		id: ['MagicPenetration'],
		title: '마법관통력'
	},
	{
		url: 'health.svg',
		id: ['Health', 'HealthRegen'],
		title: '체력 및 재생'
	},
	{
		url: 'armor.svg',
		id: ['Armor'],
		title: '방어력'
	},
	{
		url: 'magic-resist.svg',
		id: ['SpellBlock'],
		title: '마법저항력'
	},
	{
		url: 'ability-haste.svg',
		id: ['AbilityHaste', 'CooldownReduction'],
		title: '스킬가속'
	},
	{
		url: 'movement-speed.svg',
		id: ['Boots', 'NonbootsMovement'],
		title: '이동속도'
	},
	{
		url: 'omni-vamp.svg',
		id: ['SpellVamp', 'LifeSteal'],
		title: '생명력흡수 및 흡혈'
	}
];

export const itemListState = create<ItemGroupState>((set) => ({
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
			items: [2003, 2031, 2033, 2055, 3363, 3340, 3364, 2138, 2139, 2140, 3330, 3599],
			value: []
		},
		{
			id: 'start',
			name: '시작',
			items: [
				1082, 3070, 1056, 1055, 1054, 3850, 3862, 3854, 1083, 3858, 1012, 1013, 1101, 1102,
				1103
			],
			value: []
		},
		{
			id: 'basic',
			name: '기본',
			items: [
				1004, 1006, 1018, 1026, 1027, 1028, 1029, 1031, 1033, 1036, 1037, 1038, 1042, 1052,
				1058, 2420, 3057
			],
			value: []
		},
		{
			id: 'epic',
			name: '서사',
			items: [
				1011, 1043, 1053, 1057, 2015, 3024, 3035, 3044, 3051, 3066, 3067, 3076, 3077, 3082,
				3086, 3105, 3108, 3113, 3114, 3123, 3133, 3134, 3140, 3145, 3155, 3191, 3211, 3801,
				3802, 3803, 3916, 4630, 4632, 4635, 4642, 6029, 6660, 6670, 6677
			],
			value: []
		},
		{
			id: 'legend',
			name: '전설',
			items: [
				3003, 3011, 3026, 3033, 3036, 3041, 3042, 3046, 3050, 3053, 3065, 3068, 3071, 3072,
				3074, 3075, 3083, 3085, 3089, 3091, 3094, 3095, 3100, 3102, 3107, 3109, 3110, 3115,
				3116, 3135, 3139, 3143, 3153, 3156, 3157, 3161, 3165, 3179, 3181, 3193, 3222, 3504,
				3508, 3742, 3748, 3814, 4401, 4628, 4629, 4637, 4645, 6035, 6333, 6609, 6616, 6664,
				6676, 6694, 6695, 6696, 8001, 8020, 3119, 6672, 6673, 6693, 3087
			],
			value: []
		},
		{
			id: 'myth',
			name: '신화',
			items: [
				2065, 3001, 3078, 3084, 3152, 3190, 4005, 4633, 4636, 4644, 6617, 6630, 6631, 6632,
				6653, 6655, 6656, 6657, 6662, 6665, 6667, 6671, 6691, 6692, 3124, 3031, 3142, 6620,
				6675
			],
			value: []
		}
	],
	setItemGroup: (selectItems) => {
		set((state) => ({
			itemGroup: state.itemGroup.map((group) => ({
				...group,
				value: [
					...selectItems.filter((item) =>
						group.items.includes(Number(item.image.full.split('.')[0]))
					)
				]
			}))
		}));
	}
}));

export const fromItemState = create<FromItemState>((set) => ({
	fromItem: [],
	setFromItem: (itemIdList, itemList) => {
		set((state) => ({
			fromItem:
				itemIdList === undefined
					? state.fromItem
					: itemIdList.map((id: string) => itemList[id])
		}));
	}
}));

export const selectItemState = create<selectItemState>((set) => ({
	selectItem: null,
	setSelectItem: (item) => {
		set(() => ({ selectItem: item }));
	}
}));

export const openDetailState = create<OpenDetailState>((set) => ({
	openDetail: false,
	setOpenDetail: () => {
		set((state) => ({ openDetail: !state.openDetail }));
	}
}));
