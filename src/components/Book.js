import React from 'react'

function Book (props) {
	// This breakes the array of authors into a readable list.
	var authorNames = '';
	var i = 1;
	if (props.book.authors) {
		var aLength = props.book.authors.length - 1;
		authorNames = props.book.authors[0]; 
		while (i < aLength) {
			if (i !== aLength) {
				authorNames += ", " + props.book.authors[i];
			}
		i++;
		}
	if (i === aLength) {
		authorNames += " and " + props.book.authors[i];
		}
	}

	return (
		<li>
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${(props.book.imageLinks && props.book.imageLinks.thumbnail) || " "}")` }}></div>
						<div className="book-shelf-changer">
							<select value={ props.book.shelf || "none" } onChange={(e) => { props.updateBook(props.book, e.target.value) }}>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
				<div className="book-title">{ props.book.title || "(No Title)" }</div>
				<div className="book-authors">{ (authorNames && authorNames) || "(No Author)" }</div>
			</div>
		</li>
	)
}



export default Book








