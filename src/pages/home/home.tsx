import React, { Component } from 'react';
import StandingList from '../../components/standing-list/standing.list';
import store from '../../app/reducers/store';
import { Standing } from '../../types/types';
import { F1ServiceInstance } from '../../app/services/f1.service';
import './home.scss';
import { add } from '../../app/reducers/standings';
import { RouteComponentProps } from 'react-router-dom';

interface State {
	standings: Standing[];
}

export default class Home extends Component<RouteComponentProps, State> {

	constructor(props: RouteComponentProps) {
		super(props);

		this.state = {
			standings: []
		}
	}

	async componentDidMount() {
		this.setState({ standings: await this.getStandings() });
	}

	private async getStandings(): Promise<Standing[]> {
		return new Promise(resolve => {
			// first check the standings in the store
			let standings = store.getState().standings;
			// if there is no data
			if (!standings || !standings.length) {
				// then request data from the API
				F1ServiceInstance.getStandings()
					.then(standings => {
						// save them in the store, for future requests
						store.dispatch(add(standings));
						// return data
						resolve(standings);
					});
			}
			else {
				// return data
				resolve(standings);
			}
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