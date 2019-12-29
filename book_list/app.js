

//Book Constructor

function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}









// UI Constructor
function UI(){

}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');

    //create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    // add row to list
    list.appendChild(row); 
}

UI.prototype.clearInputs = function(){
    
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}

UI.prototype.showAlert = function(message, type){
    //create a div
    const div = document.createElement('div');
    //add className
    div.className = `alert ${type}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');

    //insert
    container.insertBefore(div, form);

    //timeout after 3 sec
    setTimeout(() => {
        document.querySelector('.alert').remove();
    },3000);
}


//Event Listeners

document.getElementById('book-form').addEventListener('submit', function(e){
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //instantiate a book
    const book = new Book(title, author, isbn);

    //instantiate UI
    const ui = new UI();

    //validate UI
    if (title == '' || author == '' || isbn == ''){
        //error alert
        ui.showAlert('Please fill in all fields', 'error');
    }else{
        //add book to list
        ui.addBookToList(book);
        //clear fields
        ui.clearInputs();

        ui.showAlert('Book Added', 'success');
    }

   
});

//event listener for delete 

const bookList = document.getElementById('book-list');

bookList.addEventListener('click', function(e){
    e.preventDefault();
    if (e.target.classList.contains('delete')){
        const row = e.target.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }

    //instantiate ui
    const ui = new UI();
    //show alert
    ui.showAlert('Book Removed !!!', 'success');
});

