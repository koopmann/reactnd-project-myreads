import React from "react";
import BookShelfChanger from "./BookShelfChanger";

const SingleBookItem = (props) => {
    const {item, onChanged} = props;
    return (
        <div className="book" key={item.id}>
            <div className="book-top">
                <div className="book-cover" style={{width: 128, height: 190, backgroundImage: `url('${item.imageLinks.smallThumbnail}')`}}>
                </div>
                <BookShelfChanger
                    book={item}
                    value={item.shelf}
                    onChanged={onChanged}
                />
            </div>
            <div className="book-title">{item.title}</div>
            <div className="book-authors">{item.authors}</div>
        </div>
    );
};

export default SingleBookItem;
