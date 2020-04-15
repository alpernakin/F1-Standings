import React, { Component } from "react";
import { Race } from "../../types/types";
import './race.list.scss';

interface Props {
    items: Race[];
    seasonWinnerId: string;
}
export default class RaceList extends Component<Props, {}> {
    render() {
        let isHighlightedItem = (item: Race) => item.winnerDriver.driverId === this.props.seasonWinnerId;
        return (
            <div className="race-list-container">
                <Header />
                {this.props.items.map((item, index) =>
                    <Item item={item} key={index.toString()} highlight={isHighlightedItem(item)} />)}
            </div>
        );
    }
}

/** Item row properties */
interface ItemProps {
    item: Race;
    key: string;
    highlight: boolean;
}
/** Component for each item row */
class Item extends Component<ItemProps, {}> {
    render() {
        let getHighlightClass = () => this.props.highlight ? " highlight " : " ";
        return (
            <div key={this.props.key} className={"row race-list-item" + getHighlightClass()}>
                <div className="race cell">
                    {this.props.item.name}
                </div>
                <div className="driver cell">
                    {this.props.item.winnerDriver.givenName} {this.props.item.winnerDriver.familyName}
                </div>
                <div className="team cell">
                    {this.props.item.winnerTeam.name}
                </div>
                <div className="nationality cell">
                    {this.props.item.winnerDriver.nationality}
                </div>
                <div className="time cell">
                    {this.props.item.time}
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