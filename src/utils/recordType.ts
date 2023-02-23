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

export interface matchListType {
    gameId: number;
    gameStartTimeStamp: number;
    game_length_second: number;
    matchId: string;
    gameType: string;
    summonerData: {
        assist: number;
        death: number;
        kill: number;
        championId: number;
        championLevel: number;
        championName: string;
        championEngName: string;
        items: number[];
        minionKill: number;
        position: string;
        rune: {
            primary_page_id: number;
            primary_rune_id: number;
            secondary_page_id: number;
        };
        spells: number[];
        win: true;
    };
    participants: {
        assist: number;
        death: number;
        kill: number;
        goldEarned: number;
        championId: number;
        championLevel: number;
        championName: string;
        championEngName: string;
        items: number[];
        minionKill: number;
        position: string;
        rune: {
            primary_page_id: number;
            primary_rune_id: number;
            secondary_page_id: number;
        };
        spells: number[];
        summonerName: string;
        tierInfo: string[];
    }[];
    ourTeam: teamInfo;
    enemyTeam: teamInfo;
}

interface teamInfo {
    assist: number;
    death: number;
    kill: number;
    baron_kill: number;
    dragon_kill: number;
    tower_kill: number;
    gold_earned: number;
    ban_champion: [number, null];
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
