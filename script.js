const add = document.querySelector('#add');
const bookTable = document.querySelector('.book-display');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const dateShow = document.querySelector('.date'); // selector for date display
// selectors for Navigation class
const listLink = document.querySelector('.list-link');
const inputField = document.querySelector('.input-field');
const addLink = document.querySelector('.add-link');
const books = document.querySelector('.books');
const contact = document.querySelector('.contact');
const contactLink = document.querySelector('.contact-link');

function listDisplay() {
  books.style.display = 'block';
  contact.style.display = 'none';
  inputField.style.display = 'none';
}

function addDisplay() {
  inputField.style.display = 'flex';
  books.style.display = 'none';
  contact.style.display = 'none';
}

function contactDisplay() {
  contact.style.display = 'block';
  inputField.style.display = 'none';
  books.style.display = 'none';
}

addLink.addEventListener('click', addDisplay);
contactLink.addEventListener('click', contactDisplay);
listLink.addEventListener('click', listDisplay);

// function that handles date and time display in page
const currentDate = () => {
  const newDate = new Date();
  dateShow.innerHTML = `${newDate.toDateString()}, ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()} am `;
  setTimeout(currentDate, 1000); // makes date update every second
};

let bookList;
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addToHtml(newBook) {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
    <td style="width:90%">${newBook.title} by ${newBook.author}</td>
    <td><button id="${bookList.length}" class="remove" onclick="Book.removeBook(this)">Remove</button></td>`;
    bookTable.appendChild(tableRow);
  }

  static removeBook(e) {
    e.target.parentElement.parentElement.remove();
    if (bookList.length > e.target.id) {
      bookList.splice(e.target.id, 1);
    } else {
      bookList.splice(-1, 1);
    }
    localStorage.setItem('books', JSON.stringify(bookList));
  }

  static loadBooksInStorage() {
    const data = JSON.parse(localStorage.getItem('books'));
    if (data) {
      bookList = [...data];
      bookList.forEach((book) => Book.addToHtml(book));
    } else {
      bookList = [];
    }
  }

  static clearInputFields() {
    title.value = '';
    author.value = '';
  }
}

// triggered immediately the page loads
document.addEventListener('DOMContentLoaded', () => {
  Book.loadBooksInStorage();
  listDisplay();
  currentDate();
});

// triggered when the add button is clicked
add.addEventListener('click', () => {
  const newBook = new Book(title.value, author.value);
  Book.addToHtml(newBook);
  bookList.push(newBook);
  localStorage.setItem('books', JSON.stringify(bookList));
  Book.clearInputFields();
});

// removing book using event propogation
bookTable.addEventListener('click', Book.removeBook);
