# Library Management System

### View the project deployed on heroku [here](https://library-management-system-2.herokuapp.com/)<br>
 
<br>
This project was built as part of <a href="https://frappe.io/dev-hiring-test">Frappe's Dev Hiring Test</a> .This is a Library Management System which supports:
- Basic CRUD operations on Books and Members.
- Issue a set of books to a member
- Returning set of books from a member
- Charging rent of the book taken
- Ensuring the debt does not go above Rs. 500.

Additionally, a librarian is able to maintain:
- Books
- Members
- Transactions
- Reports on popular books and highest paying members

Some Additional Features from my side😎
- Downloading a csv file for the transactions along with the date 
- Report can be viewed in a pi-chart [Using Google-react-chart]
- Deployment of both backend and frontend on heroku


## Run the Application in your machine:

- Install the React dependencies:

```
npm install
```
- Start the server:
```
npm start
```
- Open `localhost:3000` in your browser.


- Install the Backend dependencies:

```
cd main_routes
npm install
```
- Start the server:
```
npm start
```
- Backend runs on localhost:8080
- The backend can be viewed [here](https://frappebackend.herokuapp.com/books)

## Screenshots
1. Homescreen
<img src="screeshots/homescreen.PNG" alt="Home Page">

2. Manage Books
<img src="screeshots/manage-books.PNG" alt="Manage Books">

3. Edit Book
<img src="screeshots/update-book.PNG" alt="Edit Books">

4. View a book
<img src="screeshots/view-book.PNG" alt="View Books">

5. Manage Members

<img src="screeshots/manage-members.PNG" alt="Manage Member">

6. Add Member
<img src="screeshots/add-member.PNG" alt="Add Member">

7. Issue a Book
<img src="screeshots/issue-book.PNG" alt="Issue Books">

8. In case of Debt Exceeding
<img src="screeshots/debt-exceed.PNG" alt="Debt Exceeds">

10. Return Books
<img src="screeshots/return.PNG" alt="Return Books">

10. Transaction
<img src="screeshots/transactions.PNG" alt="Transactions">

11. Report [With Graphs]
<img src="screeshots/report1.PNG" alt="Report">
<img src="screeshots/report2.PNG" alt="Report">
<img src="screeshots/report3.PNG" alt="Report">






