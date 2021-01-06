import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import axios from "axios";
import { Card, Button, Image } from "react-bootstrap"

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  useEffect( () => {
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + search)
    .then(resp => setSearchResults(resp.data.items))
    
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        {setBooks(res.data)
        console.log(res)}
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };
  // console.log(typeof books)
  console.log(searchResults)
  console.log(books)
    return (
      
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h3>Books On My List</h3>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map (book => (
              
                  <ListItem key={book._id}>
                    {/* <Link to={"/books/" + book._id}> */}
                      <strong>
                        {book.title} by {book.author}
                        <p><img src={book.thumbnail} className="float-left img-thumbnail mr-2" /></p>
                        <p>{book.synopsis}</p>
                        <br /> <br /> <p> <a href={book.link}>View Book at Google Books</a></p>
                      </strong>
                    {/* </Link> */}
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;
