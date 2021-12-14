import React, { useState,useEffect} from "react";
import "./books/css/books.css";
import { Link } from "react-router-dom";
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
import NavigationBar from "./navbar/navbar";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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

const downLoadFile= async()=>{
  try {
    axios({
      url: 'http://localhost:8080/transaction/download',
      method: 'GET',
      responseType: 'blob', 
  }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions.csv'); //or any other extension
      document.body.appendChild(link);
      link.click();
  });
  } catch (error) {
    console.log(error);
  }
}

function AllTransactions() {
    const classes = useStyles();
    const [transaction,setTransaction] = useState([]);
   
    useEffect(() => {
      let url = "http://localhost:8080/transaction";
      try{
        const make_request = async()=>{
          let result = await fetch(url);
          result = await result.json();
          console.log(result);
          setTransaction(result.data);
        }
        make_request();
      }catch(err){
        console.log(err);
      }
    }, []);

    return (
        <>
        <NavigationBar/>
        <div className="container__box">
            <div className={classes.root}>
        <Container className={classes.container} maxWidth="lg">    
            <Paper className={classes.paper}>
            <Box display="flex">
                <Box flexGrow={1}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    ALL TRANSACTIONS
                </Typography>
                </Box>
                <Box>
                  <Button variant="contained" color="primary" onClick={downLoadFile}>
                  Download
                  </Button>
                </Box>
                <Box style={{marginLeft:15}}>
                <Link to="/" >
                    <Button variant="contained" color="default">
                    Back
                    </Button>
                </Link>
                </Box>
            </Box>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="left">Message</TableCell>
                    <TableCell align="center">Type</TableCell>
                    <TableCell align="center">Created At</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {transaction.map((trans) => (
                    <TableRow key={trans._id}>
                    <TableCell align="center">{trans._id.slice(-4)}</TableCell>
                    <TableCell align="left">
                        {trans.message}
                    </TableCell>
                    <TableCell align="center">{trans.type}</TableCell>
                    <TableCell align="center">{trans.created_at.slice(0,10)}</TableCell>
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
    );
}

export default AllTransactions;