const bookDisplay = document.querySelector('.book-display');
const title = document.querySelector('#title');
const author = document.querySelector('#author');


const bookList = [];

function addBook(title,author){
 bookList.push({title,author})
}


add.addEventListener('click',()=>{
    let count = bookList.length;
    addBook(title.value, author.value);
    const book = document.createElement('div');

    book.innerHTML = `
    <p>${bookList[bookList.length-1].title}</p>
    <p>${bookList[bookList.length-1].author}</p>
    <button id="${count}" class="push" onclick="removed(event)">Remove</button><hr>
    `;
    bookContainer.appendChild(book);
    
    localStorage.setItem("books", JSON.stringify(bookList));

});


