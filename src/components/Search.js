import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends Component {
  state = {
      results: [],
      query: ''
    }
  
  updateQuery = (query) => {
  	this.setState({query: query}, this.submitSearch);
  }

  submitSearch() {
  	if(this.state.query === '' || this.state.query === undefined) {
  		return this.setState({ results: [] });
  	}
  	BooksAPI.search(this.state.query.trim()).then(response => {
  		if(response.error) {
  			return this.setState({ results: [] });
  		}
  		else {
  			response.forEach(searchResults => {
          // this updates the the book if it exists on a shelf 
  				let onShelf = this.props.books.filter(myBooks => myBooks.id === searchResults.id)
  				searchResults.shelf = onShelf[0] ? onShelf.shelf : null;
  				if(onShelf[0]) {
  					searchResults.shelf = onShelf[0].shelf;
  				}
  			})
  			return this.setState({ results: response });
  		}
  	});
  }

  render () {
    return (
      <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={ this.state.query }
                	onChange={(event) => this.updateQuery(event.target.value) } />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              	{
              		this.state.results.map((book, key) => <Book updateBook={this.props.updateBook} key={key} book={book} />)
              	}
              </ol>
            </div>
          </div>
    )
  }

}

export default Search