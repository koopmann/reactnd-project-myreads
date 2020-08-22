import React from 'react'
import {BrowserRouter, Link, Route} from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from "./components/ListBooks";

class BooksApp extends React.Component {
    state = {
        booksCurrentlyAssignedToShelf: [],
        loadingBooksInProgress: false
    }

    componentDidMount() {
        this.setState({
            loadingBooksInProgress: true,
        });
        this.fetchBooks();
    }

    fetchBooks() {
        BooksAPI.getAll().then((items) => {
            this.setState(() => ({
                booksCurrentlyAssignedToShelf: items,
                loadingBooksInProgress: false,
            }));
        });
    }
    //update shelf for book
    updateShelfForBook = (book, shelf) => {
        BooksAPI.update(book, shelf);
        // ** Take Element out of the list of shelf assigned books **
        if (shelf === "none") {
            this.setState((currentState) => ({
                booksCurrentlyAssignedToShelf: currentState.booksCurrentlyAssignedToShelf.filter((b) => {
                    return b.id !== book.id;
                }),
            }));
        }
        else {
            let bookToBeUpdated = book;
            bookToBeUpdated.shelf = shelf;

            this.setState((currentState) => ({
                booksCurrentlyAssignedToShelf: currentState.booksCurrentlyAssignedToShelf
                    .filter((item) => item.id !== bookToBeUpdated.id)
                    .concat(bookToBeUpdated),
            }));
        }
    };
    //{() => history.push('/')}

    render() {
        return (
            <BrowserRouter>
                <Route exact path="/search">
                    <div className="search-books">
                        <div className="search-books-bar">
                            <button className="close-search" onClick={event =>  window.location.href='/'}>Close</button>
                            <div className="search-books-input-wrapper">
                                <input type="text" placeholder="Search by title or author"/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ListBooks
                                items={this.state.booksCurrentlyAssignedToShelf}
                                active={'all'}
                                isSearch={false}
                                error={false}
                                handleUpdate={this.updateShelfForBook}
                            />
                        </div>
                    </div>
                </Route>
                <Route exact path="/">
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>- Welcome to MyReads-App -</h1>
                        </div>
                        <div style={{float: 'right'}}>
                            <div>Search for more books <Link to="/search">here</Link></div>
                        </div>
                        {!this.state.loadingBooksInProgress ? (
                            <div className="list-books-content">
                                <div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Currently Reading</h2>
                                        <div className="bookshelf-books">
                                            <ListBooks
                                                items={this.state.booksCurrentlyAssignedToShelf}
                                                active={'currentlyReading'}
                                                isSearch={false}
                                                error={false}
                                                handleUpdate={this.updateShelfForBook}
                                            />
                                        </div>
                                    </div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Want to Read</h2>
                                        <div className="bookshelf-books">
                                          <ListBooks
                                              items={this.state.booksCurrentlyAssignedToShelf}
                                              active={'wantToRead'}
                                              isSearch={false}
                                              error={false}
                                              handleUpdate={this.updateShelfForBook}
                                          />
                                        </div>
                                    </div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Read</h2>
                                        <div className="bookshelf-books">
                                          <ListBooks
                                              items={this.state.booksCurrentlyAssignedToShelf}
                                              active={'read'}
                                              isSearch={false}
                                              error={false}
                                              handleUpdate={this.updateShelfForBook}
                                          />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>books are currently fetched via API...</p>
                        )}
                    </div>
                </Route>
            </BrowserRouter>
        );
    }
}

export default BooksApp
