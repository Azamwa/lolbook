export interface SummonerType {
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

export interface RankingType {
    summonerId: string;
    tier: string;
    summonerName: string;
    leagueId: string;
    wins: number;
    losses: number;
    idx: number;
    leaguePoints: number;
}
