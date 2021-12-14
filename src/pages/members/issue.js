import React, { useState,useEffect} from "react";
import "../books/css/books.css";
import "../books/css/single.css";
import { useHistory, useParams,Link } from "react-router-dom";
import NavigationBar from "../navbar/navbar";
import axios from "axios"
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Form  from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function IssueBook(){
    const { id } = useParams();
    const [member,setMember] = useState(null);
    const [loading,setLoading] = useState(true);
    const [books,setBooks] = useState(null);
    var updateBookID =[];

    const IssueBooks=async()=>{
        try {
            const url=`https://frappebackend.herokuapp.com/members/issue/${id}`;
            console.log("UpdateBookID :",updateBookID);
            await axios.post(url,{
                books:updateBookID
            }).then(resp=>{
                console.log(resp.data);
                window.alert("The books are Issued to user");
                window.location.href="/members";
            })
            .catch(error=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange=(e)=>{
        let isChecked = e.target.checked;
        if(isChecked){
            updateBookID.push(e.target.value);
        }
    }

    useEffect(() => {
        let url = `https://frappebackend.herokuapp.com/members/${id}`;
        let url_books = 'https://frappebackend.herokuapp.com/books';;
        try{
          const make_request = async()=>{
            let result = await fetch(url);
            result = await result.json();
            console.log(result);

            let book_result = await fetch(url_books);
            book_result = await book_result.json();
            console.log("Book result");

            console.log(book_result);
            setMember(result.data);
            setBooks(book_result.data);
            setLoading(false);
          }
          make_request();
        }catch(err){
          console.log(err);
        }
      }, []);

      function matchIDS(member_book,book_id){
          for(var i=0;i<member_book.length;i++){
              var memberBook_id = member_book[i]._id;
              if(memberBook_id == book_id){
                  console.log("Same");
                  return true;
              }
          }
          return false;
      }
    return (
        <>
        <NavigationBar/>
        {loading ?(
            <div className="center__box">
                <div className="container__box">
                    <h3>Loading ....</h3>
                </div>
            </div>
        ):(
            <div className="container__box">
                <div className="Title">Issue a Book</div>
                <Modal.Header />
                <Modal.Body className="book__title">Name : {member.name}</Modal.Body>
                <Modal.Footer />

               
                <Form style={{marginTop:30,marginLeft:20}}>
                    <div className="book_issue_list">
                    {books.map((book)=>{
                        if(book.quantity_in_library >0){
                            if(matchIDS(member.books,book._id)){
                                return <Form.Check inline label={`${book.title} -  [Already Issued]`} name="group1" type="checkbox" checked style={{color:"rgb(43, 44, 44)",fontWeight:400,margin:10}} disabled value={book._id}/>
                            }
                            else if(500 - member.debt <= book.rent){
                                return <Form.Check inline label={`${book.title} -  [Debt limit Exceeded]`} name="group1" type="checkbox" disabled style={{color:"rgb(175, 25, 5)",fontWeight:400,margin:10}} value={book._id}/>
                            }
                            else{
                                return <Form.Check inline label={book.title} name="group1" type="checkbox" style={{color:"rgb(43, 44, 44)",fontWeight:400,margin:10}} value={book._id} onChange={e => handleChange(e)}/>
                            }
                        }
                    })}
                    </div>

                </Form>

                <Modal.Footer style={{marginTop:20}}>
                <Box style={{marginLeft:20}}> 
                    <Button variant="contained" color="primary" style={{fontSize:20}} onClick={IssueBooks}>
                    ISSUE BOOKS
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
    )
}

export default IssueBook;