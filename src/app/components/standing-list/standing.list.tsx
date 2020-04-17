import React, { Component } from "react";
import './standing.list.scss';

/** 
 * Accepted data type for the list.
 * 
 * A particular type for the component
 * in order to provide isolation between presentational and smart components.
 */
export interface StandingItem {
    season: number;
    winner: {
        id: string;
        fullName: string;
        nationality: string;
    };
    team: string;
    points: number;
    wins: number;
}

interface ListProps {
    items: StandingItem[];
    onItemClicked: (season: number) => any;
}
/** Presentation component to display a list of standings / champions */
export default class StandingList extends Component<ListProps, {}> {
    render() {
        return (
            <div className="standing-list-container">
                <Header />
                {this.props.items.map((item, index) =>
                    (<Item item={item} index={index}
                        onItemClicked={event => this.props.onItemClicked(event)} />))}
            </div>
        );
    }
}

/** Item row properties */
interface ItemProps {
    item: StandingItem;
    index: number;
    onItemClicked: (season: number) => void;
}
/** Component for each item row */
class Item extends Component<ItemProps, {}> {
    render() {
        return (
            <div key={this.props.index} onClick={_ => this.props.onItemClicked(this.props.item.season)} className="row standing-list-item">
                <div className="season cell">
                    {this.props.item.season}
                </div>
                <div className="driver cell">
                    {this.props.item.winner.fullName}
                </div>
                <div className="team cell">
                    {this.props.item.team}
                </div>
                <div className="nationality cell">
                    {this.props.item.winner.nationality}
                </div>
                <div className="points cell">
                    {this.props.item.points}
                </div>
                <div className="wins cell">
                    {this.props.item.wins}
                </div>
            </div>
        );
    }
}
/** Component for standing list header */
class Header extends Component<{}, {}> {
    render() {
        return (
            <div className="row standing-list-header">
                <div className="season cell">
                    Season
                </div>
                <div className="driver cell">
                    Driver
                </div>
                <div className="team cell">
                    Team
                </div>
                <div className="nationality cell">
                    Nationality
                </div>
                <div className="points cell">
                    Points
                </div>
                <div className="wins cell">
                    Wins
                </div>
            </div>
        );
    }
}