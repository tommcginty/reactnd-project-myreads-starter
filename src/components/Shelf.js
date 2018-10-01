import React from 'react'
import Book from './Book'

function Shelf (props) {
    return (
      <div className="bookshelf">
                  <h2 className="bookshelf-title">{ props.name }</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { props.books.map((book, key) => <Book updateBook={props.updateBook} book={book} key={key} />) }
                    </ol>
                  </div>
                </div>
    );
  }

export default Shelf
