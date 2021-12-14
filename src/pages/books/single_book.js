import React, { useState,useEffect} from "react";
import "./css/books.css";
import "./css/single.css";
import { useHistory, useParams,Link } from "react-router-dom";
import NavigationBar from "../navbar/navbar";
import axios from "axios"
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRateIcon from '@material-ui/icons/StarRate';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

function SingleView(){
    const { id } = useParams();
    console.log(id);

    const [book, setbook] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let url = `http://localhost:8080/books/${id}`;
        try{
          const make_request = async()=>{
            let result = await fetch(url);
            result = await result.json();
            console.log(result);
            setbook(result.data);
            setLoading(false);
          }
          make_request();
        }catch(err){
          console.log(err);
        }
      }, []);

        
    const BookDelete = id => {
        const uri = `http://localhost:8080/books/${id}`;
        if (window.confirm("The Book will be deleted from library")) {
            axios.delete(uri).then(resp =>{
                console.log(resp.data);
                window.location.href="/books";
            })
            .catch(error =>{
                console.log(error);
            })
        } else {
        console.log("Cancel deletion")
        }
        
    }

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
                <div className="Title">Book Details</div>
                <Modal.Header />
                <Modal.Body className="book__title">Title : {book.title}</Modal.Body>
                <Modal.Footer />

                <div className="book__details">
                    <div className="column__details">
                        <h3>Author  : </h3>
                        <h3 className="second__part">{book.authors}</h3>
                    </div>

                    <div className="column__details">
                        <h3>Average Rating  : </h3>
                        <h3 className="second__part">
                        <StarRateIcon className="Icon__design"/>{book.average_rating}</h3>
                    </div>

                    <div className="column__details">
                        <h3>ISBN  : </h3>
                        <h3 className="second__part">
                        {book.isbn}</h3>
                    </div>

                    <div className="column__details">
                        <h3>ISBN13  : </h3>
                        <h3 className="second__part">
                        {book.isbn13}</h3>
                    </div>

                    <div className="column__details">
                        <h3>Rating Count : </h3>
                        <h3 className="second__part">{book.ratings_count}</h3>
                    </div>

                    <div className="column__details">
                        <h3>Number of Reviews : </h3>
                        <h3 className="second__part">
                        {book.text_reviews_count}</h3>
                    </div>

                    <div className="column__details">
                        <h3>Times Borrowed  : </h3>
                        <h3 className="second__part">
                        {book.times_borrowed}</h3>
                    </div>

                    <div className="column__details">
                        <h3 style={{color:"red"}}>Total Quantity: </h3>
                        <h3 className="second__part" style={{color:"red"}}>{book.quantity_total}</h3>
                    </div>

                    <div className="column__details">
                        <h3 style={{color:"red"}}>Availability: </h3>
                        <h3 className="second__part" style={{color:"red"}}>{book.quantity_in_library}</h3>
                    </div>

                    <div className="column__details">
                        <h3>Language  : </h3>
                        <h3 className="second__part">
                        {book.language_code}</h3>
                    </div>

                    <div className="column__details">
                        <h3>Rent  : </h3>
                        <h3 className="second__part">
                        {book.rent}</h3>
                    </div>


                    <div className="column__details">
                        <h3>Publisher  : </h3>
                        <h3 className="second__part">
                        {book.publisher}</h3>
                    </div>

                    <div className="column__details">
                        <h3>Publication Date  : </h3>
                        <h3 className="second__part">
                        {book.publication_date}</h3>
                    </div>
                </div>

                <Modal.Footer style={{marginTop:20}}>
                <Box style={{marginLeft:20}}>
                    <Link to={`/update/book/${id}`}>
                        <Button variant="contained" color="primary" style={{fontSize:20}}>
                        UPDATE
                        </Button>
                    </Link>
                </Box>

                <Box style={{marginLeft:20,fontSize:10}}>
                        <Button variant="contained" color="secondary"  style={{fontSize:20}} onClick={()=>BookDelete(id)}>
                        DELETE
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
        )}
        </>
    )
}

export default SingleView;