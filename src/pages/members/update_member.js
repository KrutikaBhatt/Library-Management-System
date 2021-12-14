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

function UpdateMember(){
    const { id } = useParams();
    const [member,setMember] = useState();
    const [isLoading, setLoading] = useState(true);
    const[name,setName] = useState("");
    const [age,setAge] = useState("");
    const [gender,setGender] = useState("");
    const [debt,setDept] = useState("");
    const [paid,setPaid] = useState("");
    const [books,setBooks] = useState([]);

    const update = (e) => {
        e.preventDefault();
        const member1 ={
            name:name,
            age:age,
            gender:gender,
            total_amount_paid:paid,
            debt:debt,
            books:books
        };
        axios.put(`http://localhost:8080/members/${id}`,member1)
        .then(resp =>{
            console.log(resp.data);
            window.alert("Member updated successfully");
            window.location.href = "/members";
        })
        .catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        let uri =  `http://localhost:8080/members/${id}`;
        try {
            const make_request = async()=>{
                let result = await fetch(uri);
                result = await result.json();
                console.log(result);
                setMember(result.data);
                setLoading(false);

                setName(result.data.name);
                setAge(result.data.age);
                setGender(result.data.gender);
                setDept(result.data.debt);
                setPaid(result.data.total_amount_paid);
                setBooks(result.data.books);
            } 
            make_request();
        } catch (error) {
            console.log(error);
        }
    },[])
    return(
        <>
        <NavigationBar />
        {isLoading ?(
            <div className="center__box">
                <div className="container__box">
                    <h3>Loading ....</h3>
                </div>
            </div>
        ):(
        <div className="container__box">
            <h3 style={{marginTop:30}}>Update the member</h3>
            <Container>
                <Form style={{marginTop:40}}>
                <Form.Group controlId="formName">
                    <Form.Label style={{fontSize:20}}>Member Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter member name" defaultValue={member.name} onChange={(e) => setName(e.target.value)}/>
                </Form.Group>

                <div className="row__forms">
                    <Form.Group controlId="formName" >
                        <Form.Label style={{fontSize:20}}>Age</Form.Label>
                        <Form.Control type="number" placeholder="Enter member age" style={{width:"500px"}} defaultValue={member.age} onChange={(e) => setAge(e.target.value)}/>
                    </Form.Group>
                </div>
                <Form.Label style={{fontSize:20,marginTop:20}}>Gender</Form.Label>
                <Form.Control aria-label="Enter gender" style={{width:"500px"}} defaultValue={member.gender} onChange={(e) => setGender(e.target.value)}>
                </Form.Control>

                <div className="row__forms">
                    <Form.Group controlId="formName" >
                        <Form.Label style={{fontSize:20}} >Debt</Form.Label>
                        <Form.Control type="number" placeholder="Debt" style={{width:"500px"}} defaultValue={member.debt} onChange={(e) => setDept(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formName" >
                        <Form.Label style={{fontSize:20}} >Total Amount Paid</Form.Label>
                        <Form.Control type="number" placeholder="Total Amount Paid" style={{width:"500px"}} defaultValue={member.total_amount_paid}  onChange={(e) => setPaid(e.target.value)}/>
                    </Form.Group>
                </div>
                </Form>
            </Container>
            <Modal.Footer style={{marginTop:20}}>
                <Box style={{marginLeft:20}}>
                    <Button variant="contained" color="primary" style={{fontSize:20}} onClick={update}>
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
        )}
        </>
    );
}

export default UpdateMember;