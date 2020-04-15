import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import RaceList, { RaceItem } from '../../components/race-list/race.list';
import { f1Controller } from '../../controllers/f1.controller';
import './details.scss';

interface State {
    races: RaceItem[];
    winnerDriverId: string;
}

export default class Details extends Component<RouteComponentProps, State> {

    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            races: [],
            winnerDriverId: ""
        }
    }

    async componentDidMount() {
        let seasonParam = (this.props.match.params as any)["season"];
        // if the parameter passed
        if (seasonParam) {
            let season = parseInt(seasonParam);

            this.setState({
                winnerDriverId: f1Controller.getSeasonWinner(season)?.driverId || "",
                races: (await f1Controller.getRaces(season)).map(x => ({
                    name: x.name,
                    winner: {
                        id: x.winnerDriver.driverId,
                        fullName: `${x.winnerDriver.givenName} ${x.winnerDriver.familyName}`,
                        nationality: x.winnerDriver.nationality
                    },
                    team: x.winnerTeam.name,
                    date: x.date
                } as RaceItem))
            })
        }
    }

    render() {
        return (
            <div className="details-container">
                <div className="go-back">
                    <button onClick={_ => this.props.history.goBack()}>BACK</button>
                </div>
                <div className="list-container">
                    {this.state.races && this.state.winnerDriverId ?
                        (<RaceList items={this.state.races} seasonWinnerId={this.state.winnerDriverId} />) :
                        (<div>No Data</div>)}
                </div>
            </div>
        );
    }
}