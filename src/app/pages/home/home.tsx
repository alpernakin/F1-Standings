import React, { Component } from 'react';
import StandingList, { StandingItem } from '../../components/standing-list/standing.list';
import { RouteComponentProps } from 'react-router-dom';
import { f1Controller } from '../../controllers/f1.controller';
import './home.scss';

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
            standings: (await f1Controller.getStandings()).map(standing => ({
                season: standing.season,
                winner: {
                    id: standing.winnerDriver.driverId,
                    fullName: `${standing.winnerDriver.givenName} ${standing.winnerDriver.familyName}`,
                    nationality: standing.winnerDriver.nationality
                },
                team: standing.winnerTeam.name,
                points: standing.points,
                wins: standing.wins
            } as StandingItem))
        });
    }

    private onStandingItemClicked(season: number) {
        // navigate to details of the season
        this.props.history.push(`/details/${season}`);
    }

    render() {
        return (
            <div>{
                this.state.standings ?
                    (<StandingList items={this.state.standings} onItemClicked={event => this.onStandingItemClicked(event)} />) :
                    (<div>No data</div>)
            }</div>
        );
    }
}