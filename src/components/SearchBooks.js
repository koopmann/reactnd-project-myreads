import React, { Component } from "react";
import { withRouter } from 'react-router-dom';


class SearchBooks extends Component {
    state = {
        query: "",
    };

    handleOnChanged = (event) => {
        const value = event.target.value;
        this.setState({
            query: value,
        });
        this.props.handleSearch(value);
    };
    goToRoot = () => {
        this.props.handleSearch("");
        this.props.history.push('/');
    };

    render() {
        return (
                <div className="search-books-bar">
                    <button className="close-search" onClick={this.goToRoot}>Close</button>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query}
                               onChange={this.handleOnChanged}/>

                    </div>
                </div>

        );
    }
}

export default withRouter(SearchBooks);