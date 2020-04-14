export interface Driver {
    driverId: string;
    givenName: string;
    familyName: string;
    nationality: string;
}

export interface Team {
    teamId: string;
    name: string;
    nationality: string;
}

export interface Standing {
    season: number;
    winnerDriver: Driver;
    winnerTeam: Team;
    wins: number;
    points: number;
}

export interface Race {
    season: number;
    name: string;
    round: number;
    date: Date;
    time: string;
    winnerDriver: Driver;
    winnerTeam: Team;
}