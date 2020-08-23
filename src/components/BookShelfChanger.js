import React, {Component} from "react";

class BookShelfChanger extends Component {

    state = {
        value: this.props.value,
    };

    componentDidMount() {
        this.setState({
            value: this.props.value,
        });
    }

    dealWithChange = (event) => {
        const {value} = event.target;
        this.setState({value});
        this.props.onChanged(this.props.book, value);
    };

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.value} onChange={this.dealWithChange}>
                    <option value="move" disabled>
                        Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

export default BookShelfChanger;