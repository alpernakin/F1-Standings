import React, { Component } from "react";
import './race.list.scss';

/** 
 * Accepted data type for the list.
 * 
 * A particular type for the component
 * in order to provide isolation between presentational and smart components.
 */
export interface RaceItem {
    name: string;
    winner: {
        id: string;
        fullName: string;
        nationality: string;
    };
    team: string;
    timestamp: number;
}

interface ListProps {
    items: RaceItem[];
    seasonWinnerId: string;
}
/** Presentation component to display a list of races. */
export default class RaceList extends Component<ListProps, {}> {
    render() {
        let isHighlightedItem = (item: RaceItem) => item.winner.id === this.props.seasonWinnerId;
        return (
            <div className="race-list-container">
                <Header />
                {this.props.items.map((item, index) =>
                    <Item item={item} index={index} highlight={isHighlightedItem(item)} />)}
            </div>
        );
    }
}

/** Item row properties */
interface ItemProps {
    item: RaceItem;
    index: number;
    highlight: boolean;
}
/** Component for each item row */
class Item extends Component<ItemProps, {}> {
    render() {
        let getHighlightClass = () => this.props.highlight ? " highlight " : " ";
        return (
            <div key={this.props.index} className={"row race-list-item" + getHighlightClass()}>
                <div className="race cell">
                    {this.props.item.name}
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
                <div className="time cell">
                    {new Date(this.props.item.timestamp).toUTCString()}
                </div>
            </div>
        );
    }
}
/** Component for standing list header */
class Header extends Component<{}, {}> {
    render() {
        return (
            <div className="row race-list-header">
                <div className="race cell">
                    Race
                </div>
                <div className="driver cell">
                    Winner
                </div>
                <div className="team cell">
                    Team
                </div>
                <div className="nationality cell">
                    Nationality
                </div>
                <div className="time cell">
                    Time
                </div>
            </div>
        );
    }
}