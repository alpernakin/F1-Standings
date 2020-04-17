import { Race, Standing, Team, Driver } from "../types/types";

export const alonso: Driver = {
    driverId: 'alonso',
    givenName: 'Fernando',
    familyName: 'Alonso',
    nationality: 'Spanish'
};

export const renault: Team = {
    teamId: 'renault',
    name: 'Renault',
    nationality: 'French'
};

export const dummyStandingsData: Standing[] = [
    {
        season: 2006,
        winnerDriver: alonso,
        winnerTeam: renault,
        points: 100,
        wins: 5
    },
    {
        season: 2005,
        winnerDriver: alonso,
        winnerTeam: renault,
        points: 99,
        wins: 6
    }
];

export const dummyRacesData: Race[] = [
    {
        season: 2008,
        name: 'German Grand Prix',
        round: 2,
        timestamp: 1199145600,
        winnerDriver: alonso,
        winnerTeam: renault
    },
    {
        season: 2008,
        name: 'Italian Grand Prix',
        round: 1,
        timestamp: 1167609600,
        winnerDriver: alonso,
        winnerTeam: renault
    },
];