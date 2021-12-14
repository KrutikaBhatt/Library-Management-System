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


function ImportBooks() {
    const [title,settitle] = useState("");
    const [authors,setAuthors] = useState("");
    const [publisher,setpublisher] = useState("");
    const [page,setpage] = useState("");
    const [numbook,setnumbooks] = useState("");
    
    function importBooks(){
        var order ={
            title:title,
            authors:authors,
            publisher :publisher,
            page :page,
            numberOfBooks:numbook
        };
        try {
            axios.post('http://localhost:8080/books/import',order).then(resp=>{
                console.log(resp.data);
                window.alert("Books imported :\n\n"+resp.data.books);
                window.location.href='/books';
            })
            .catch(error=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
        <NavigationBar />
        <div className="container__box">
            <h3>Import Books from Frappe server</h3>
            <p>You can select and fill any number of parameters you want</p>
            <Container>
            <Form style={{marginTop:40}}>
            <Form.Group controlId="formName" style={{marginTop:20}}>
                <Form.Label style={{fontSize:20}}>Book Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Book Title" onChange={(e) => settitle(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formName" style={{marginTop:20}}>
                <Form.Label style={{fontSize:20}}>Authors</Form.Label>
                <Form.Control type="text" placeholder="Enter Author names" style={{width:"600px"}} onChange={(e) => setAuthors(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formName" style={{marginTop:20}}>
                <Form.Label style={{fontSize:20}}>Publishers</Form.Label>
                <Form.Control type="text" placeholder="Enter publisher names" style={{width:"400px"}} onChange={(e) => setpublisher(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formName" style={{marginTop:20}}>
                <Form.Label style={{fontSize:20}}>Page</Form.Label>
                <Form.Control type="number" placeholder="Enter pages" style={{width:"400px"}} onChange={(e) => setpage(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formName" style={{marginTop:20}}>
                <Form.Label style={{fontSize:20}}>Number of books to import</Form.Label>
                <Form.Control type="number" placeholder="Default - 20" style={{width:"400px"}} onChange={(e) => setnumbooks(e.target.value)} />
            </Form.Group>
            </Form>
            </Container>
            <Modal.Footer style={{marginTop:20}}>
            <Box style={{marginLeft:20}}>
                <Button variant="contained" color="primary" style={{fontSize:20}} onClick={()=>importBooks()}>
                IMPORT
                </Button>
            </Box>

            <Box style={{marginLeft:20,fontSize:10}}>
                <Link to="/books">
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

export default ImportBooks;
