import React from 'react'
import {BrowserRouter, Link, Route} from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";

class BooksApp extends React.Component {
    state = {
        booksCurrentlyAssignedToShelf: [],
        loadingBooksInProgress: false,
        query: '',
        searchResults: [],
        searchError: false
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

    searchBook = (query) => {
        this.setState({
            query: query,
        });

        this.doSearch(this.state.query);
    };

    // do a search with a query
    doSearch = (query) => {
        if (query.length > 0) {
            BooksAPI.search(query).then((books) => {
                if (books.error) {
                    this.setState({searchResults: [], searchError: true});
                } else {
                    if (this.state.query.length === 0) {
                        this.setState({searchResults: [], searchError: false});
                        return;
                    }

                    this.setState({searchResults: books, searchError: false, query: query});
                }
            });
        } else {
            this.setState({searchResults: [], searchError: false});
        }
    };

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
        } else {
            let bookToBeUpdated = book;
            bookToBeUpdated.shelf = shelf;

            this.setState((currentState) => ({
                booksCurrentlyAssignedToShelf: currentState.booksCurrentlyAssignedToShelf
                    .filter((item) => item.id !== bookToBeUpdated.id)
                    .concat(bookToBeUpdated),
            }));
        }

    };

    render() {
        return (
            <BrowserRouter>
                <Route exact path="/search">
                    <div className="search-books">
                        <SearchBooks handleSearch={this.searchBook}/>
                        <div className="search-books-results">
                            <ListBooks
                                items={this.state.searchResults.map((singleSearchResult) => {
                                    const bookInShelf = this.state.booksCurrentlyAssignedToShelf.filter(
                                        (bookInShelf) => bookInShelf.id === singleSearchResult.id
                                    )[0];
                                    singleSearchResult.shelf = bookInShelf ? bookInShelf.shelf : "none";
                                    return singleSearchResult;
                                })}
                                active={'all'}
                                isSearch={true}
                                error={this.state.error}
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





