

const myLibrary = [];



//book constructor
function Book(id,title, author, numPages, isRead){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;

    this.info = function() {
        let info = this.title + " by " + this.author + ", " + this.numPages;
        if(isRead){
            info = info + " read";

        }else{
            info = info + " not read yet";
        }

        return info;

    };
}

function addBookToLibrary(title, author, numPages, isRead){
    const id = crypto.randomUUID();
    myLibrary.push( new Book(id, title, author, numPages, isRead));


}




function displayBooks(){


    const mainBody = document.getElementById("main-body");
    const oldBookGrid = document.getElementsByClassName("book-grid")[0];
    if (oldBookGrid) {
        mainBody.removeChild(oldBookGrid);
    }
    



    const bookGrid = document.createElement('div');
    bookGrid.setAttribute("class","book-grid");



    
    for(let i = 0; i < myLibrary.length; i++){
        console.log("looping" + i);

        const bookCard = document.createElement('div');
        bookCard.setAttribute("class", "book-card");
        const bookTitle = document.createElement('h5');
        const bookAuthor = document.createElement('p');
        bookAuthor.setAttribute("class", "p-author");
        const numPages = document.createElement('p');
        const isRead = document.createElement('p');
        bookTitle.textContent = myLibrary[i].title;
        bookAuthor.textContent = myLibrary[i].author;
        numPages.textContent = myLibrary[i].numPages + " pages";

        if(myLibrary[i].isRead == true){
            isRead.textContent = "You've read this book!";
        }else{
            isRead.textContent = "Not Read Yet!";
        }

        //delete button
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute("class", "deleteButton");
        const deleteimg = document.createElement('img');
        deleteimg.setAttribute("src", "images/trash-can-outline.svg");
        deleteButton.appendChild(deleteimg);


        bookCard.append(bookTitle,bookAuthor,numPages,isRead, deleteButton);
        bookGrid.appendChild(bookCard);

        //handling deletion
        deleteButton.addEventListener('click', function () {
            bookGrid.removeChild(bookCard);
            myLibrary.splice(i, 1);
            //avoiding array problems
            i--;

        });


        //console.log(myLibrary[i].info());
    }

   

    mainBody.appendChild(bookGrid);


}



function createForm(){
    const topDiv = document.getElementById('form-section');


    //check for and remove previous form if present
    const prevform = document.getElementsByClassName("book-form")[0];
    if(prevform){
        form-Selection.removeChild(prevform);
    }


    const form = document.createElement('form');
    form.setAttribute("class", "book-form");
    const titlelabel = document.createElement('label');
    const titleinput = document.createElement('input');
    titlelabel.setAttribute("for", "title");
    titlelabel.textContent = "Book title:";
    titleinput.setAttribute("type", "text");
    titleinput.setAttribute("id", "title");
    titleinput.setAttribute("name", "title");
    titleinput.setAttribute("placeholder", "Enter book title");
    titleinput.setAttribute("required", "true");

    const authorlabel = document.createElement('label');
    const authorinput = document.createElement('input');
    authorlabel.setAttribute("for", "author");
    authorlabel.textContent = "Author:";
    authorinput.setAttribute("type", "text");
    authorinput.setAttribute("id", "author");
    authorinput.setAttribute("name", "author");
    authorinput.setAttribute("placeholder", "Enter author name");
    authorinput.setAttribute("required", "true");

    const numPageslabel = document.createElement('label');
    const numPagesinput = document.createElement('input');
    numPageslabel.setAttribute("for", "numPages");
    numPageslabel.textContent = "Number of pages:";
    numPagesinput.setAttribute("type", "number");
    numPagesinput.setAttribute("id", "numPages");
    numPagesinput.setAttribute("name", "numPages");
    numPagesinput.setAttribute("placeholder", "Enter number of pages");
    numPagesinput.setAttribute("required", "true");

    const isReadlabel = document.createElement('label');
    const isReadinput = document.createElement('input');
    isReadlabel.setAttribute("for", "isRead");
    isReadlabel.textContent = "isRead:";
    isReadinput.setAttribute("type", "checkbox");
    isReadinput.setAttribute("id", "isRead");
    isReadinput.setAttribute("name", "isRead");
    isReadinput.setAttribute("value", "false");

    const submitButton = document.createElement('button');
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "add-book-btn");
    submitButton.textContent = "Add Book";
    form.appendChild(titlelabel);
    form.appendChild(titleinput);
    form.appendChild(authorlabel);
    form.appendChild(authorinput);
    form.appendChild(numPageslabel);
    form.appendChild(numPagesinput);
    form.appendChild(isReadlabel);
    form.appendChild(isReadinput);
    form.appendChild(submitButton);
    topDiv.appendChild(form);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = titleinput.value;
        const author = authorinput.value;
        const pages = parseInt(numPagesinput.value);
        const isRead = isReadinput.checked;
        addBookToLibrary(title,author,pages,isRead);
        displayBooks();
        topDiv.removeChild(form);
    });

   




}


//populate the library with some books
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1000, false);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1213, false);
addBookToLibrary("The Count of Monte Cristo", "Alexandre Dumasy", 1353, true);
displayBooks();
console.log("initial books addded");