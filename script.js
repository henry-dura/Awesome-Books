const add = document.querySelector('#add');
const bookTable = document.querySelector('.book-display');
const title = document.querySelector('#title');
const author = document.querySelector('#author');



class Book{
  constructor(title,author){
    this.title = title;
    this.author = author;
  }

  static addToHtml(newBook){
    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
    <td style="width:90%">${newBook.title} by ${newBook.author}</td>
    <td><button id="${bookList.length}" class="remove" onclick="Book.removeBook(this)">Remove</button></td>`;
    bookTable.appendChild(tableRow);
  }

  static removeBook(e) {
    e.target.parentElement.parentElement.remove();
    if(bookList.length > e.target.id){
      bookList.splice(e.target.id, 1);
    }else{
      bookList.splice(-1,1);
    }
    localStorage.setItem('books', JSON.stringify(bookList));
      
  }

  
}

let bookList;
document.addEventListener('DOMContentLoaded',Book.loadBooksInStorage);

// triggered when the add button is clicked
add.addEventListener('click', () => {
  let newBook = new Book(title.value, author.value);
  Book.addToHtml(newBook);
  bookList.push(newBook);
  localStorage.setItem('books', JSON.stringify(bookList));
  Book.clearInputFields();
});

// removing book using event propogation
bookTable.addEventListener('click', Book.removeBook);
