import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

function BookShelves (props) {
    return (
      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf updateBook={props.updateBook} name="Currently Reading" books={ props.books.filter(book => book.shelf === "currentlyReading") } />
                <Shelf updateBook={props.updateBook} name="Want To Read" books={ props.books.filter(book => book.shelf === "wantToRead") } />
                <Shelf updateBook={props.updateBook} name="Read" books={ props.books.filter(book => book.shelf === "read") } />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
    )
  }



export default BookShelves