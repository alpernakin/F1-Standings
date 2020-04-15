import React, { Component } from "react";
import { Standing } from "../../types/types";
import './standing.list.scss';

interface Props {
    items: Standing[];
    onItemClicked: (season: number) => any;
}
export default class StandingList extends Component<Props, {}> {
    render() {
        return (
            <div className="standing-list-container">
                <Header />
                {this.props.items.map((item, index) =>
                    (<Item item={item} key={index.toString()}
                        onItemClicked={event => this.props.onItemClicked(event)} />))}
            </div>
        );
    }
}

/** Item row properties */
interface ItemProps {
    item: Standing;
    key: string;
    onItemClicked: (season: number) => void;
}
/** Component for each item row */
class Item extends Component<ItemProps, {}> {
    render() {
        return (
            <div key={this.props.key} onClick={_ => this.props.onItemClicked(this.props.item.season)} className="row standing-list-item">
                <div className="season cell">
                    {this.props.item.season}
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