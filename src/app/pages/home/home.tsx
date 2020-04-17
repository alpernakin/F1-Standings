import React, { Component } from 'react';
import StandingList, { StandingItem } from '../../components/standing-list/standing.list';
import { RouteComponentProps } from 'react-router-dom';
import './home.scss';
import { f1Controller } from '../../controllers/f1.controller';
import { Standing } from '../../types/types';

interface State {
    standings: StandingItem[];
}
export default class Home extends Component<RouteComponentProps, State> {

    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            standings: []
        }
    }

    async componentDidMount() {
        this.setState({
            // map the data from data source
            standings: (await f1Controller.getStandings())
                .map(standing => this.mapStanding(standing))
        });
    }

    /**
     * Maps the `standing` object for the child component.
     * @param standing Standing data from the data source.
     * @returns The object for the child component.
     */
    public mapStanding(standing: Standing): StandingItem {
        return {
            season: standing.season,
            winner: {
                id: standing.winnerDriver.driverId,
                fullName: `${standing.winnerDriver.givenName} ${standing.winnerDriver.familyName}`,
                nationality: standing.winnerDriver.nationality
            },
            team: standing.winnerTeam.name,
            points: standing.points,
            wins: standing.wins
        }
    }

    private onStandingItemClicked(season: number) {
        // navigate to details of the season
        this.props.history.push(`/details/${season}`);
    }

    render() {
        return (
            <div>{
                this.state.standings && this.state.standings.length ?
                    (<StandingList items={this.state.standings}
                        onItemClicked={event => this.onStandingItemClicked(event)} />) :
                    (<div>No data</div>)
            }</div>
        );
    }
}