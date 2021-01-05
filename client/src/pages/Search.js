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
  const [search, setSearch] = useState("cujo")
  const [searchbyAuthor, setSearchByAuthor] = useState("")
  const [searchResults, setSearchResults] = useState([])
  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  useEffect( () => {
    // console.log("https://www.googleapis.com/books/v1/volumes?q=" + search)
      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + search)
    .then(resp => {
      setBooks(resp.data.items)
      }
    )
    
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => {
        console.log(res)
        setBooks(res.data.data.items)}
        // console.log(res)
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
    // setFormObject({...formObject, [name]: value})
    console.log(event.target.value)
    setSearch(event.target.value)
    
  };

  function searchByAuthor(event) {
    const { name, value } = event.target;
    // setFormObject({...formObject, [name]: value})
    setSearchByAuthor(value)
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function addToDatabase(event, item) {
    event.preventDefault();
    console.log(item.volumeInfo)
    // if (formObject.title) {
      API.saveBook({
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors,
        synopsis: item.volumeInfo.description
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    // }
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    // console.log(books)
    // if (formObject.title) {
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + search)
        .then(res => {setBooks([...res.data.items]) 
          console.log(res)})
        
        .catch(err => console.log(err));
    // }
  };

  // console.log(typeof books)
  console.log(searchResults)
  console.log(search)
    return (
      
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h3>Search For a Book</h3>
            </Jumbotron>
            <form>
              <Input
                value={search}
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={searchbyAuthor}
                onChange={searchByAuthor}
                name="author"
                placeholder="Author (Optional)"
              />
              {/* <TextArea
                onChange={handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
              <FormBtn
                // disabled={!(formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>

        </Row>
        <div id="displayBookHere">
          {
            books.map(book => (
              <Card>
                <Card.Header as="h5" className="bg-light d-flex justify-content-between">
                 <Card.Title>{book.volumeInfo.title}
                 
                 </Card.Title>
                 <Button onClick={ (event) => addToDatabase(event, book)}>Save</Button>
                </Card.Header>
                <Card.Body>{book.volumeInfo.authors}</Card.Body>
                <Image src={book.volumeInfo.imageLinks.thumbnail} className="float-left img-thumbnail mr-2" />
                <Card.Text>{book.volumeInfo.description}</Card.Text>
              </Card>
            )
            )
          }
        </div>
      </Container>
    );
  }


export default Books;
