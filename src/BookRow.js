import React from "react";

function BookRow(props) {
  const book = props.book;
  console.log("book: " + book);
  const authors = book.authors;
  console.log("autors: " + authors);

  const auth = authors.map(author => <> {author.name} </>);
  return (
    <tr>
      <td>{book.title}</td>
      <td> {auth} </td>
      <td>
        <button className="btn" style={{ backgroundColor: book.color }} />
      </td>
    </tr>
  );
}

export default BookRow;
