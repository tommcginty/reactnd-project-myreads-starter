import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Book from '../Book'

  

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      results: [],
      query: ''
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(response => {
      this.setState({ books: response });
    });
  }

  updateQuery = (query) => {
  	this.setState({query: query}, this.submitSearch);
  }

  submitSearch() {
  	if(this.state.query === '' | this.state.query === undefined) {
  		return this.setState({ results: [] });
  	}
  	BooksAPI.search(this.state.query.trim()).then(response => {
  		console.log(response);
  		if(response.error) {
  			return this.setState({ results: [] });
  		}
  		else {
  			response.forEach(b => {
  				let f = this.state.books.filter(B => B.id === b.id)
  				b.shelf = f[0] ? f.shelf : null;
  				if(f[0]) {
  					b.shelf = f[0].shelf;
  				}
  			})
  			return this.setState({ results: response });
  		}
  	});
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(response => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat(([book]))
      }));
    });
  }

  render () {
    return (
      <div className="search-books">
            <div className="search-books-bar">

              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={ this.state.query }
                	onChange={(event) => this.updateQuery(event.target.value) } />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              	{
              		this.state.results.map((book, key) => <Book updateBook={this.updateBook} key={key} book={book} />)
              	}
              </ol>
            </div>
          </div>
    )
  }

}

export default Search