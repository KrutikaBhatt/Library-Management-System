import React, { useState,useEffect} from "react";
import "./css/books.css";
import { Link } from "react-router-dom";
import SingleView from "./single_book";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "../navbar/navbar";
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from "axios"


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  }));


const BookDelete = id => {
    const uri = `https://frappebackend.herokuapp.com/books/${id}`;
    if (window.confirm("The Book will be deleted from library")) {
        axios.delete(uri).then(resp =>{
            console.log(resp.data);
            window.location.reload();
        })
        .catch(error =>{
            console.log(error);
        })
    } else {
    console.log("Cancel deletion")
    }
    
}

function Manage_Books() {
    const classes = useStyles();
    const [books, setbooks] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let url = "https://frappebackend.herokuapp.com/books";
        try{
          const make_request = async()=>{
            let result = await fetch(url);
            result = await result.json();
            console.log(result);
            setbooks(result.data);
            setLoading(false);
          }
          make_request();
        }catch(err){
          console.log(err);
        }
      }, []);
    
    return (
        <>
        <NavigationBar/>
        {isLoading ?(
            <div className="center__box">
                <div className="container__box">
                    <h3>Loading ....</h3>
                </div>
            </div>
        ):(
        <>
        <div className="container__box">
            <div className={classes.root}>
            <Container className={classes.container} maxWidth="lg">    
                <Paper className={classes.paper}>
                <Box display="flex">
                    <Box flexGrow={1}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        BOOKS
                    </Typography>
                    </Box>
                    <Box>
                    <Link to="/insert">
                        <Button variant="contained" color="primary">
                        ADD NEW
                        </Button>
                    </Link>
                    </Box>
                    <Box style={{marginLeft:10}}>
                    <Link to="/import">
                        <Button variant="contained" color="default">
                        IMPORT BOOKS
                        </Button>
                    </Link>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Total Quantity</TableCell>
                        <TableCell align="center">Availability</TableCell>
                        <TableCell align="center">Action</TableCell>
                        <TableCell align="center">View</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {books.map((book) => (
                        <TableRow key={book._id}>
                            <TableCell align="center">{book._id.slice(-4)}</TableCell>
                        
                            <TableCell align="left">{book.title}</TableCell>
                            <TableCell align="center">{book.quantity_total}</TableCell>
                            <TableCell align="center">{book.quantity_in_library}</TableCell>
                            <TableCell align="center">
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button><Link to={`/update/book/${book._id}`}>Edit</Link></Button>
                                <Button onClick={() => BookDelete(book._id)}>Delete</Button>
                                </ButtonGroup>
                            </TableCell>
                            <TableCell align="center">
                                <Link to={`/book/${book._id}`}><VisibilityIcon className="view__more"/></Link>
                            </TableCell>
                        </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </Paper>
        </Container>
    </div>
    </div>
    </>
    )}
    </>
    );
}

export default Manage_Books;