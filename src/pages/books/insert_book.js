import React,  { useState,useEffect}  from 'react';
import Form  from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useHistory, useParams,Link } from "react-router-dom";
import NavigationBar from "../navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import "./css/books.css";
import "./css/update.css";
import axios from "axios"


function InsertBook() {
    const [title,settitle] = useState("");
    const [authors,setAuthors] = useState("");
    const [rating,setRating] = useState("");
    const [isbn,setISBN] = useState("");
    const [isbn13,setISBN13] = useState("");
    const [lang,setlang] = useState("");
    const [rent,setRent] = useState("");
    const [quan,setQuant] = useState("");
    const [avai,setAvai] = useState("");
    const [borrow,setBorrowed] = useState("");
    const [numrate,setnumRate] = useState("");
    const [review,setReview] = useState("");
    const [publisher,setPublisher] = useState("");
    const [pubdate,setPubDate] = useState("");

        
    const SAVE = (e) => {
      e.preventDefault();
      const book = {
        "title": title,
        "authors": authors,
        "average_rating": rating,
        "isbn": isbn,
        "isbn13": isbn13,
        "language_code": lang,
        "ratings_count": rating,
        "text_reviews_count": review,
        "publication_date": pubdate,
        "publisher":publisher,
        "rent" :rent,
        "quantity_total": quan,
        "quantity_in_library" :avai,
        "times_borrowed" :borrow,
        "ratings_count":numrate,
      };
      axios.post(`https://frappebackend.herokuapp.com/books`, book)
      .then(response => {
        console.log(response.data)
        window.alert("Book Added successfully");
        window.location.href = "/books";
      })
      .catch(error=>{
        console.log(error)
      })
    };

    return (
    <>
    <NavigationBar />
    <div className="container__box">
    <Container>
      <Form style={{marginTop:40}}>
        <Form.Group controlId="formName">
            <Form.Label style={{fontSize:20}}>Book Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Book Title" required onChange={(e) => settitle(e.target.value)}/>
        </Form.Group>
        
        <div className="row__forms">
            <Form.Group controlId="formName" >
                <Form.Label style={{fontSize:20}}>Authors</Form.Label>
                <Form.Control type="text" placeholder="Enter Author name" style={{width:"700px"}} required onChange={(e) => setAuthors(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formName">
                <Form.Label style={{fontSize:20}}>Average rating</Form.Label>
                <Form.Control type="number" placeholder="Enter average ratings" style={{width:"400px"}}  required onChange={(e) => setRating(e.target.value)}/>
            </Form.Group>
        </div>
        <Form.Group controlId="formName" style={{marginTop:20}}>
            <Form.Label style={{fontSize:20}}>ISBN</Form.Label>
            <Form.Control type="text" placeholder="Enter isbn" style={{width:550}} onChange={(e) => setISBN(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formName" style={{marginTop:20}}>
            <Form.Label style={{fontSize:20}}>ISBN13</Form.Label>
            <Form.Control type="text" placeholder="Enter isbn13" style={{width:550}} onChange={(e) => setISBN13(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formName" style={{marginTop:20}}>
            <Form.Label style={{fontSize:20}}>Languages</Form.Label>
            <Form.Control type="text" placeholder="Enter language code" style={{width:400}} onChange={(e) => setlang(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formFile" style={{marginTop:20}}>
          <Form.Label style={{fontSize:20}}>Rent</Form.Label>
          <Form.Control type="number" style={{width:"400px"}} onChange={(e) => setRent(e.target.value)}/>
        </Form.Group>

        <div className="row__forms">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={{fontSize:20}}>Total Quantity</Form.Label>
          <Form.Control type="number" style={{width:"550px" , backgroundColor:"rgb(235, 232, 232)"}} onChange={(e) => setQuant(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={{fontSize:20}}>Availability in library</Form.Label>
          <Form.Control type="number" style={{width:"550px" , backgroundColor:"rgb(235, 232, 232)"}} onChange={(e) => setAvai(e.target.value)}/>
        </Form.Group>
        </div>

        <div className="row__forms">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={{fontSize:20}}>No. of borrowed times</Form.Label>
          <Form.Control type="number" style={{width:"350px"}} onChange={(e) => setBorrowed(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={{fontSize:20}}>Number of Ratings</Form.Label>
          <Form.Control type="number" style={{width:"350px"}} onChange={(e) => setnumRate(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={{fontSize:20}}>Number of Reviews</Form.Label>
          <Form.Control type="number" style={{width:"350px"}} onChange={(e) => setReview(e.target.value)}/>
        </Form.Group>

        </div>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={{fontSize:20}}>Publisher</Form.Label>
          <Form.Control type="text" style={{width:"500px"}} onChange={(e) => setPublisher(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formName" style={{marginTop:20}}>
            <Form.Label style={{fontSize:20}}>Publishing Date</Form.Label>
            <Form.Control type="date" name='date_of_birth' style={{width:400}} onChange={(e) => setPubDate(e.target.value)} />
        </Form.Group>
      </Form>
    </Container>

    <Modal.Footer style={{marginTop:20}}>
      <Box style={{marginLeft:20}}>
              <Button variant="contained" color="primary" style={{fontSize:20}} onClick={SAVE}>
              SAVE
              </Button>
      </Box>

      <Box style={{marginLeft:20,fontSize:10}}>
          <Link to="/create">
              <Button variant="contained" color="default"  style={{fontSize:20}}>
                  BACK
              </Button>
          </Link>
      </Box>
    </Modal.Footer>
            
    </div>
    </>
    );       
}

export default InsertBook;