const add = document.querySelector('#add');
const bookContainer = document.querySelector('.book-display');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

let bookList = [];

// Add stored books  to page when visitor returns to site
const data = JSON.parse(localStorage.getItem('books'));
if (data) {
  bookList = [...data];
  for (let i = 0; i < bookList.length; i += 1) {
    const book = document.createElement('div');

    book.innerHTML = `
    <p>${bookList[i].title}</p>
    <p>${bookList[i].author}</p>
    <button id="${i}" class="push" onclick="removed(event)">Remove</button><hr>
    `;
    bookContainer.appendChild(book);
  }
}

// function to add book
function addBook(title, author) {
  bookList.push({ title, author });
}

// triggered when the add button is clicked
add.addEventListener('click', () => {
  const count = bookList.length;
  addBook(title.value, author.value);
  const book = document.createElement('div');

  book.innerHTML = `
    <p>${bookList[bookList.length - 1].title}</p>
    <p>${bookList[bookList.length - 1].author}</p>
    <button id="${count}" class="push" onclick="removed(event)">Remove</button><hr>
    `;
  bookContainer.appendChild(book);
  title.value = '';
  author.value = '';

  localStorage.setItem('books', JSON.stringify(bookList));
});

// function to remove book
function removed(e) {
  e.target.parentElement.remove();
  bookList.splice(e.target.id, 1);
  localStorage.setItem('books', JSON.stringify(bookList));
}

// does nothing
document.createElement('t').addEventListener('submit', removed);
