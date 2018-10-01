import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import BookShelves from './components/BookShelves'
import Search from './components/Search'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {
  state = {
    books: [],
    results: [],
    query: ''
  }
    componentDidMount() {
    BooksAPI.getAll()
    .then(response => {
      this.setState({ books: response });
    });
  }
    updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(response => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(selectedBook => selectedBook.id !== book.id).concat(([book]))
      }));
    });
  }

  render() {
    return (
      <div> 
        <Route exact path='/' render={() => (
          <BookShelves
            updateBook={this.updateBook}
            books={this.state.books}
            />        
          )}/>
        <Route exact path='/search' render={() => (
          <Search
            updateBook={this.updateBook}
            books={this.state.books}
            />        
          )}/>
      </div>
    );
  }
}

export default BooksApp
