export interface ItemType {
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
	tags: [string];
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
		[key: string]: number;
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

export interface ChampionDetailProps {
	id: string;
	key: string;
	name: string;
	title: string;
	image: {
		full: string;
		sprite: string;
		group: string;
		x: number;
		y: number;
		w: number;
		h: number;
	};
	skins: {
		id: string;
		num: number;
		name: string;
		chromas: boolean;
	}[];
	lore: string;
	blurb: string;
	allytips: string[];
	enemytips: string[];
	tags: string[];
	partype: string;
	info: {
		[key: string]: number;
	};
	stats: {
		[key: string]: number;
	};
	spells: {
		id: string;
		name: string;
		description: string;
		tooltip: string;
		leveltip: {
			label: string[];
			effect: string[];
		};
		maxrank: number;
		cooldown: number[];
		cooldownBurn: string;
		cost: number[];
		costBurn: string;
		datavalues: {};
		effect: null | number[];
		effectBurn: null | string[];
		vars: [];
		costType: string;
		maxammo: string;
		range: number[];
		rangeBurn: string;
		image: {
			full: string;
			sprite: string;
			group: string;
			x: number;
			y: number;
			w: number;
			h: number;
		};
		resource: string;
	}[];
	passive: {
		name: string;
		description: string;
		image: {
			full: string;
			sprite: string;
			group: string;
			x: number;
			y: number;
			w: number;
			h: number;
		};
		tooltip: string;
		effectBurn: string[];
		costBurn: string;
		rangeBurn: string;
		cooldownBurn: string;
	};
}

export interface PatchNoteListType {
	title: string;
	imgURL: string;
	author: string[];
	date: string;
	version: string;
	totalElements: number;
}
