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
import Chart from "react-google-charts";

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

function Reports() {
    const classes = useStyles();
    const [popular,setPopular] = useState([]);
    const [highest,setHighest] = useState([]);
    const [chart,setchart] = useState(null);
    const [isLoading, setLoading] = useState(true);
   
    useEffect(() => {
      let url = "https://frappebackend.herokuapp.com/transaction/popular";
      let uri = "https://frappebackend.herokuapp.com/transaction/highest"
      let chart_url = "https://frappebackend.herokuapp.com/transaction/chart";

      try{
        const make_request = async()=>{
          let result = await fetch(url);
          result = await result.json();

          let hi = await fetch(uri);
          hi = await hi.json();

          let chart_result = await fetch(chart_url);
          chart_result = await chart_result.json();

          console.log(chart_result);
          
          setPopular(result.data.slice(0,5));
          setHighest(hi.data.slice(0,5));
          setchart(chart_result);
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
        <div className="container__box">
            <div className={classes.root}>
            <Container className={classes.container} maxWidth="lg">    
            <Paper className={classes.paper}>
            <Box display="flex">
                <Box flexGrow={1}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Most Popular books
                </Typography>
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
                    <TableCell align="left">Book Title</TableCell>
                    <TableCell align="center">Availability</TableCell>
                    <TableCell align="center">Total Quantity</TableCell>
                    <TableCell align="center">Rent</TableCell>
                    <TableCell align="center">Times Borrowed</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {popular.map((book) => (
                    <TableRow key={book._id}>
                    <TableCell align="center">{book._id.slice(-4)}</TableCell>
                    <TableCell align="left">
                        {book.title}
                    </TableCell>
                    <TableCell align="center">{book.quantity_in_library}</TableCell>
                    <TableCell align="center">{book.quantity_total}</TableCell>
                    <TableCell align="center">{book.rent}</TableCell>
                    <TableCell align="center">{book.times_borrowed}</TableCell>
                    </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>

    <div className={classes.root}>
            <Container className={classes.container} maxWidth="lg">    
            <Paper className={classes.paper}>
            <Box display="flex">
                <Box flexGrow={1}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Highest paying members
                </Typography>
                </Box>
            </Box>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">Age</TableCell>
                    <TableCell align="center">Books Issued</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {highest.map((member) => (
                    <TableRow key={member._id}>
                    <TableCell align="center">{member._id.slice(-4)}</TableCell>
                    <TableCell align="left">
                        {member.name}
                    </TableCell>
                    <TableCell align="center">{member.gender}</TableCell>
                    <TableCell align="center">{member.age}</TableCell>
                    <TableCell align="center">{member.books.length}</TableCell>
                   
                    </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>

    <div style={{marginTop:20,marginLeft:20}}>
        <h5 >Chart Illustrations of report</h5>
    <Chart width={'800px'} height={'500px'} chartType="PieChart" loader={<div>Loading Chart</div>}
    data={[
        ['Report', 'Number of transactions'],
        ['Books Issued', chart.issue],
        ['Books Added', chart.add],
        ['Imported from Frappe', chart.import],
        ['Books returned', chart.return],
      ]}
    options={{
        title: 'Chart of the transactions done',
    }}
    rootProps={{ 'data-testid': '1' }}
    />
    </div>
    </div>
    )}
    </>
    );
}

export default Reports;