import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Race } from '../../types/types';
import RaceList from '../../components/race-list/race.list';
import './details.scss';
import store from '../../app/reducers/store';
import { F1ServiceInstance } from '../../app/services/f1.service';
import { add } from '../../app/reducers/races';

interface State {
	races: Race[];
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
				winnerDriverId: this.getWinnerOfSeason(season),
				races: await this.getRaces(season)
			})
		}
	}

	private getWinnerOfSeason(season: number): string {
		let seasonStanding = store.getState().standings.find(x => x.season === season)
		return seasonStanding?.winnerDriver?.driverId || "";
	}

	private async getRaces(season: number): Promise<Race[]> {
		return new Promise<Race[]>(resolve => {
			let races = store.getState().races.filter(x => x.season === season);
			// if no race exists in the given season
			if (!races || !races.length) {

				F1ServiceInstance.getRaces(season)
					.then(races => {

						store.dispatch(add(races));

						resolve(races);
					});
			}
			else {

				resolve(races);
			}
		});
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