export interface SummonerApiType {
	info: {
		id: string;
		accountId: string;
		puuid: string;
		name: string;
		profileIconId: number;
		revisionDate: number;
		summonerLevel: number;
	};
	league: {
		leagueId: string;
		summonerId: string;
		summonerName: string;
		queueType: string;
		tier: string;
		rank: string;
		leaguePoints: number;
		wins: number;
		losses: number;
		hotStreak: string;
		veteran: string;
		freshBlood: string;
		inactive: string;
	}[];
}

export interface RankingAPiType {
	summonerId: string;
	summonerName: string;
	leaguePoints: number;
	rank: string;
	wins: number;
	losses: number;
	veteran: boolean;
	inactive: boolean;
	freshBlood: boolean;
	hotStreak: boolean;
}
