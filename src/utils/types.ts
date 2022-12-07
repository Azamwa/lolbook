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
