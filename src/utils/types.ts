export interface ItemProps {
	image?: {
		full: string;
		sprite: string;
		group: string;
		x: number;
		y: number;
		w: number;
		h: number;
	};
	name: string;
	gold: {
		base: number;
		total: number;
		sell: number;
		purchasable: boolean;
	};
	group: string;
	description?: string;
	colloq?: string;
	plintext?: string;
	consumed?: boolean;
	consumeOnFull?: boolean;
	from?: [string];
	into?: [string];
	specialRecipe?: number;
	inStore?: boolean;
	hideFromAll?: boolean;
	requiredChampion?: string;
	requiredAlly?: string;
	stats?: object;
	tags?: [string];
	maps?: {
		'11': boolean;
		'12': boolean;
		'21': boolean;
		'22': boolean;
	};
}

export interface ChampionProps {
	version: string;
	id: string;
	key: string;
	name: string;
	title: string;
	blurb: string;
	info: {
		attack: number;
		defense: number;
		magic: number;
		difficulty: number;
	};
	image: {
		full: string;
		sprite: string;
		group: string;
		x: number;
		y: number;
		w: number;
		h: number;
	};
	tags: string[];
	partype: string;
	stats: {
		hp: number;
		hpperlevel: number;
		mp: number;
		mpperlevel: number;
		movespeed: number;
		armor: number;
		armorperlevel: number;
		spellblock: number;
		spellblockperlevel: number;
		attackrange: number;
		hpregen: number;
		hpregenperlevel: number;
		mpregen: number;
		mpregenperlevel: number;
		crit: number;
		critperlevel: number;
		attackdamage: number;
		attackdamageperlevel: number;
		attackspeedperlevel: number;
		attackspeed: number;
	};
}
