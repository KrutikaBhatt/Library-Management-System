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


const memberDelete = id => {
    const uri = `http://localhost:8080/members/${id}`;
    if (window.confirm("The Member will be deleted from library")) {
        axios.delete(uri).then(resp =>{
            console.log(resp.data);
            window.location.href="/members";
        })
        .catch(error =>{
            console.log(error);
        })
    } else {
    console.log("Cancel deletion")
    }
    
}

function SingleMember(){
    const { id } = useParams();
    console.log(id);

    const [member, setmember] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let url = `http://localhost:8080/members/${id}`;
        try{
          const make_request = async()=>{
            let result = await fetch(url);
            result = await result.json();
            console.log(result);
            setmember(result.data);
            setLoading(false);
          }
          make_request();
        }catch(err){
          console.log(err);
        }
      }, []);

    return(
        
        <>
        <NavigationBar/>
        {isLoading ?(
            <div className="center__box">
                <div className="container__box">
                    <h3>Loading ....</h3>
                </div>
            </div>
        ):(
            <div className="container__box">
                <div className="Title">Member Details</div>
                <Modal.Header />
                <div style={{display:"flex",alignItems:"center"}}>
                <Modal.Body className="book__title">Name : {member.name}</Modal.Body>
                <Box style={{marginLeft:20,fontSize:20}}>
                    <Link to={`/issue/${id}`}>
                        ISSUE BOOK
                    </Link>
                </Box>

                <Box style={{marginLeft:20,fontSize:20}}>
                    <Link to={`/return/${id}`}>
                        RETURN BOOK
                    </Link>
                </Box>
                </div>
                <Modal.Footer />

                <div className="book__details">
                    <div className="column__details">
                        <h3>Age  : </h3>
                        <h3 className="second__part">{member.age}</h3>
                    </div>

                    <div className="column__details">
                        <h3>Gender  : </h3>
                        <h3 className="second__part">{member.gender}</h3>
                    </div>

                    <div className="column__details">
                        <h3>Debt  : </h3>
                        <h3 className="second__part">
                        {member.debt}</h3>
                    </div>

                    <div className="column__details">
                        <h3>Amount Paid  : </h3>
                        <h3 className="second__part">
                        {member.total_amount_paid}</h3>
                    </div>

                    <div className="column__details" style={{marginTop:20}}>
                        <h3>Books held  : </h3>
                    </div>
                    <div className="second__part" style={{marginTop:20}}>
                    {member.books.length == 0 &&
                        <h3 className="book_held_design">No books held by the member</h3>
                    } 
                    {member.books.map((book)=>(
                        <h3 className="book_held_design">
                            <ArrowRightIcon/>
                            {book.title}
                        </h3>
                    ))}   
                    </div>
                </div>

                <Modal.Footer style={{marginTop:20}}>
                <Box style={{marginLeft:20}}>
                    <Link to={`/member_update/${id}`}>
                        <Button variant="contained" color="primary" style={{fontSize:20}}>
                        UPDATE
                        </Button>
                    </Link>
                </Box>

                <Box style={{marginLeft:20,fontSize:10}} onClick={() => memberDelete(id)}>
                        <Button variant="contained" color="secondary"  style={{fontSize:20}}>
                        DELETE
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

export default SingleMember;