import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import Homepage from '../src/pages/homepage/homepage';
import Manage_Books from "./pages/books/manage_books";
import SingleView from "./pages/books/single_book";
import UpdateBook from "./pages/books/update_book";
import ImportBooks from "./pages/books/import_books";
import InsertBook from "./pages/books/insert_book";
import ManageMembers from "./pages/members/manage_member";
import AddMember from "./pages/members/add_member";
import UpdateMember from "./pages/members/update_member";
import SingleMember from "./pages/members/single_member";
import IssueBook from "./pages/members/issue";
import ReturnBook from "./pages/members/return";
import AllTransactions from "./pages/transactions";
import Reports from "./pages/reports";

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/books" component={Manage_Books} />
        <Route exact path="/book/:id" component={SingleView}/>
        <Route exact path="/update/book/:id" component={UpdateBook}/>
        <Route exact path="/import" component={ImportBooks}/>
        <Route exact path="/insert" component={InsertBook}/>
        <Route exact path="/members" component={ManageMembers}/>
        <Route exact path="/add/member" component={AddMember}/>
        <Route exact path="/member_update/:id" component={UpdateMember}/>
        <Route exact path="/member/:id" component={SingleMember}/>
        <Route exact path="/issue/:id" component={IssueBook}/>
        <Route exact path="/return/:id" component={ReturnBook}/>
        <Route exact path="/transaction" component={AllTransactions}/>
        <Route exact path="/reports" component={Reports}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
