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
import "../books/css/books.css";
import "../books/css/update.css";
import axios from "axios"

function AddMember(){
    const[name,setName] = useState("");
    const [age,setAge] = useState("");
    const [gender,setGender] = useState("");

    const ADD = (e) => {
        e.preventDefault();
        const member1 ={
            name:name,
            age:age,
            gender:gender,
        };
        axios.post(`http://localhost:8080/members`,member1)
        .then(resp =>{
            console.log(resp.data);
            window.alert("Member Added successfully");
            window.location.href = "/members";
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return(
        <>
        <NavigationBar />
        <div className="container__box">
            <h3 style={{marginTop:30}}>Add a member :</h3>
            <p>The debt and payment done by te member will be set as 0</p>
            <Container>
                <Form style={{marginTop:40}}>
                <Form.Group controlId="formName">
                    <Form.Label style={{fontSize:20}}>Member Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter member name" onChange={(e) => setName(e.target.value)}/>
                </Form.Group>

                <div className="row__forms">
                    <Form.Group controlId="formName" >
                        <Form.Label style={{fontSize:20}}>Age</Form.Label>
                        <Form.Control type="number" placeholder="Enter member age" style={{width:"500px"}} onChange={(e) => setAge(e.target.value)}/>
                    </Form.Group>
                </div>
                <Form.Label style={{fontSize:20,marginTop:20}}>Gender</Form.Label>
                <Form.Select aria-label="Select gender" style={{width:"500px"}} onChange={(e) => setGender(e.target.value)}>
                        <option>Open this select menu</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Other</option>
                </Form.Select>
                </Form>
            </Container>
            <Modal.Footer style={{marginTop:20}}>
                <Box style={{marginLeft:20}}>
                        <Button variant="contained" color="primary" style={{fontSize:20}} onClick={ADD}>
                        SAVE
                        </Button>
                </Box>
                <Box style={{marginLeft:20,fontSize:10}}>
                    <Link to="/members">
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

export default AddMember;