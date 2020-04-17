import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import RaceList, { RaceItem } from '../../components/race-list/race.list';
import './details.scss';
import { f1Controller } from '../../controllers/f1.controller';
import { Race } from '../../types/types';

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
                winnerDriverId: (await f1Controller.getSeasonWinner(season))?.driverId || "",
                // map the data from data source
                races: (await f1Controller.getRaces(season))
                    .map(race => this.mapRace(race))
            })
        }
    }

    /** 
     * Maps the `race` object for the child component.
     * @param race Race data from the data source.
     * @returns The object for the child component.
     */
    public mapRace(race: Race): RaceItem {
        return {
            name: race.name,
            winner: {
                id: race.winnerDriver.driverId,
                fullName: `${race.winnerDriver.givenName} ${race.winnerDriver.familyName}`,
                nationality: race.winnerDriver.nationality
            },
            team: race.winnerTeam.name,
            timestamp: race.timestamp
        };
    }

    render() {
        return (
            <div className="details-container">
                <div className="go-back">
                    <button onClick={_ => this.props.history.goBack()}>BACK</button>
                </div>
                <div className="list-container">
                    {this.state.races && this.state.races.length && this.state.winnerDriverId ?
                        (<RaceList items={this.state.races} seasonWinnerId={this.state.winnerDriverId} />) :
                        (<div>No Data</div>)}
                </div>
            </div>
        );
    }
}