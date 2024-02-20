const form = document.querySelector("form");
const titleField = document.querySelector(".title");
const nameField = document.querySelector(".name");
const pagesField = document.querySelector(".pages");
const readField = document.querySelector(".read");
const dialog = document.querySelector("dialog");
const createBookButton = document.querySelector(".create-book");
const addBookButton = document.querySelector(".add-book");
const container = document.querySelector(".container");

const myLibrary = [];

console.log(myLibrary.length);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

createBookButton.addEventListener("click", () => {
  dialog.showModal();
});
let bookID = 0;
function addBookToLibrary(title, author, pages, read) {
  addBookButton.addEventListener("click", (e) => {
    title = titleField.value;
    author = nameField.value;
    pages = pagesField.value;
    read = readField.checked;

    let book = new Book(title, author, pages, read);
    book.id = bookID++;
    myLibrary.push(book);
    displayBook();
    // Clear the input fields
    titleField.value = "";
    nameField.value = "";
    pagesField.value = "";
    readField.checked = "false";

    // e.preventDefault();
  });
}

addBookToLibrary();

function displayBook() {
  const bookList = document.querySelector(".book-list");
  bookList.innerHTML = ``;
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `<div class="book-title">${book.title}</div>
      <div class="book-author">${book.author}</div>
      <div class="book-pages">${book.pages} pages</div>
      <div class="book-read">${book.read ? "Completed" : "Not Completed"}</div>
      <button class="toggle-read" data-id="${
        book.id
      }">Toggle Read Status</button>
      <button class="delete-button" data-id="${book.id}">Delete</button>`;

    bookList.appendChild(bookCard);
  });
  // Add event listeners to the toggle read buttons
  Array.from(document.getElementsByClassName("toggle-read")).forEach(
    (button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const book = myLibrary.find((book) => book.id == id);
        if (book) {
          book.read = !book.read;
          displayBook();
        }
      });
    }
  );

  // Add event listeners to the delete buttons to delete book
  Array.from(document.getElementsByClassName("delete-button")).forEach(
    (button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const index = myLibrary.findIndex((book) => book.id == id);
        if (index != -1) {
          myLibrary.splice(index, 1);
          displayBook();
        }
      });
    }
  );
}
