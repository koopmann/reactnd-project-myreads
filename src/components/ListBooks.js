import React from "react";
import SingleBookItem from "./SingleBookItem";

export default function ListBooks(props) {
    const {items, active, handleUpdate, isSearch} = props;
    const booksToDisplay = isSearch
        ? items
        : items.filter((book) => (active === "all" ? book : book.shelf === active));

    return (
        <ol className="books-grid">
            {booksToDisplay && booksToDisplay.length > 0 ? (
                booksToDisplay.map((item) => {
                    return (
                        <li key={item.id}>
                            <SingleBookItem key={item.id} item={item} onChanged={handleUpdate}/>
                        </li>
                    );
                })
            ) : (
                <div>
                    <p>There are no items</p>
                </div>
            )}
        </ol>
    );
}
