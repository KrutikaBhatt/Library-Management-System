import React, { useState,useEffect} from "react";
import "../books/css/books.css";
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
import NavigationBar from "../navbar/navbar";
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



const memberDelete = id => {
    const uri = `https://frappebackend.herokuapp.com/members/${id}`;
    if (window.confirm("The Member will be deleted from library")) {
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

function ManageMembers() {
    const classes = useStyles();
    const [members,setmember] = useState([]);
   
    useEffect(() => {
      let url = "https://frappebackend.herokuapp.com/members";
      try{
        const make_request = async()=>{
          let result = await fetch(url);
          result = await result.json();
          console.log(result);
          setmember(result.data);
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
                    MEMBERS
                </Typography>
                </Box>
                <Box>
                <Link to="/add/member">
                    <Button variant="contained" color="primary">
                    ADD
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
                    <TableCell align="center">Debt</TableCell>
                    <TableCell align="center">Amount Paid</TableCell>
                    <TableCell align="center">Books taken</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {members.map((member) => (
                    <TableRow key={member._id}>
                    <TableCell align="center">{member._id.slice(-4)}</TableCell>
                    <TableCell align="left">
                    <Link to={`/member/${member._id}`}>
                      <Box display="flex" justifyContent="flex-start" alignItems="center">
                        <Avatar style={{marginRight:8}} />
                        {member.name}
                      </Box>
                    </Link>
                    </TableCell>
                    <TableCell align="center">{member.debt}</TableCell>
                    <TableCell align="center">{member.total_amount_paid}</TableCell>
                    <TableCell align="center">{(member.books).length}</TableCell>
                    <TableCell align="center">
                        <DeleteIcon style={{marginRight:20,fontSize:30,color:"grey",cursor:"pointer"}} onClick={() => memberDelete(member._id)}/>

                        <Link to={`/member_update/${member._id}`}>
                        <EditIcon style={{marginRight:40,fontSize:30,color:"grey",cursor:"pointer"}} />
                        </Link>

                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button><Link to={`/issue/${member._id}`}>Issue</Link></Button>
                        <Button ><Link to={`/return/${member._id}`}>Return</Link></Button>
                        </ButtonGroup>
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
    );
}

export default ManageMembers;