document.addEventListener("DOMContentLoaded", () => {
    const submitBtn =  document.querySelector("#submit-input");
    const titleInp = document.getElementById("input-book");
    const authorInp = document.getElementById("author-book");
    const yearInp = document.getElementById("year-book");
    const finishedInp = document.getElementById("finished-book");

    const finishedKey = "FINISHED_KEY";
    const unfinishedKey = "UNFINISHED_KEY";
    // localStorage.removeItem(finishedKey)
    // localStorage.removeItem(unfinishedKey)

    let arrBooks = []
    submitBtn.addEventListener("click", () => {
        if ((titleInp.value && authorInp.value && yearInp.value) != "") {
            console.log(`${titleInp.value}, ${authorInp.value}, ${typeof(Number(yearInp.value))}, ${typeof(finishedInp.checked)}`);

            const books = {
                id: generateId(),
                title: titleInp.value,
                author: authorInp.value,
                year: Number(yearInp.value),
                isComplete: finishedInp.checked
            }

            if (books.isComplete) {
                insertFinishedBooks(books);
            } else {
                insertUnfinishedBooks(books);
            }

            createFinishedBook();
            createUnfinishedBook();
        }
       
    });

    const generateId = () => Date.now();

    const getFinishedBooks = () => {
        if (typeof(Storage) !== "undefined") {
            return JSON.parse(localStorage.getItem(finishedKey)) || [];
        }
        return [];
    }

    const getUnfinishedBooks = () => {
        if (typeof(Storage) !== "undefined") {
            return JSON.parse(localStorage.getItem(unfinishedKey)) || [];
        }
        return [];
    }

    const insertFinishedBooks = (book) => {
        if (localStorage.getItem(finishedKey) !== null) {
            arrBooks = JSON.parse(localStorage.getItem(finishedKey));
        }
        arrBooks.unshift(book);
        
        if (arrBooks.length > 5) {
            arrBooks.pop();
        }

        localStorage.setItem(finishedKey, JSON.stringify(arrBooks));
    };

    const insertUnfinishedBooks = (book) => {
        if (localStorage.getItem(unfinishedKey) !== null) {
            arrBooks = JSON.parse(localStorage.getItem(unfinishedKey));
        }
        arrBooks.unshift(book);
        
        if (arrBooks.length > 5) {
            arrBooks.pop();
        }

        localStorage.setItem(unfinishedKey, JSON.stringify(arrBooks));
    };

    const createFinishedBook = () => {
        const bookShelf = getFinishedBooks();
        console.log(bookShelf);
        for (let book of bookShelf) {
            const parentSection = document.querySelector('.card-finished');
            const divCard = document.createElement('div');

            const deleteBtn = document.createElement('button');
            deleteBtn.setAttribute('type', 'submit');
            deleteBtn.setAttribute('class', 'btn-delete');
            deleteBtn.setAttribute('id', book.id);
            deleteBtn.innerText = "Delete Book"

            const unfinishedBtn = document.createElement('button');
            unfinishedBtn.setAttribute('type', 'submit');
            unfinishedBtn.setAttribute('class', 'btn-unfinished');
            unfinishedBtn.setAttribute('id', book.id);
            unfinishedBtn.innerText = "Unfinished Read"

            
            divCard.setAttribute('class', 'card-books-finished');

            divCard.innerHTML = '<h2>' + book.title + '<h2>';
            divCard.innerHTML += '<h3>' + book.author + ' - ' + book.year + '<h3>';
            divCard.innerHTML += '<i class="fa-solid fa-book fa-2xl pict-book"></i>';
            divCard.appendChild(unfinishedBtn);
            divCard.appendChild(deleteBtn);

            parentSection.appendChild(divCard);

        }

        const deleteBtnn = document.querySelectorAll('.btn-delete');
        deleteBtnn.forEach((btnDel, idx) => {
            btnDel.addEventListener("click", () => {
                btnDel.parentElement.remove();
                removeFinishedBook(idx);
            });
        });
    }

    const removeFinishedBook = (idx) => {
        arrBooks.splice(idx, 1);
        saveDataFinished();
    }

    const saveDataFinished = () => {

    }
    
    const createUnfinishedBook = () => {
        const bookShelf = getUnfinishedBooks();
        console.log(bookShelf);
        for (let book of bookShelf) {
            const parentSection = document.querySelector(".card-unfinished");
            const divCard = document.createElement('div');

            const deleteBtn = document.createElement('button');
            deleteBtn.setAttribute('type', 'submit');
            deleteBtn.setAttribute('class', 'btn-delete');
            deleteBtn.setAttribute('id', book.id);
            deleteBtn.innerText = "Delete Book"
            
            const finishedBtn = document.createElement('button');
            finishedBtn.setAttribute('type', 'submit');
            finishedBtn.setAttribute('class', 'btn-finished');
            finishedBtn.setAttribute('id', book.id);
            finishedBtn.innerText = "Finished Read"

            divCard.setAttribute("class", "card-books-finished");
            
            divCard.innerHTML = '<h2>' + book.title + '<h2>';
            divCard.innerHTML += '<h3>' + book.author + ' - ' + book.year + '<h3>';
            divCard.innerHTML += '<i class="fa-solid fa-book fa-2xl pict-book"></i>';
            divCard.appendChild(finishedBtn);
            divCard.appendChild(deleteBtn);

            parentSection.appendChild(divCard);
            
        }
    }

    window.addEventListener("load", () => {
        if (typeof(Storage) !== "undefined") {
            if ((localStorage.getItem(finishedKey) || localStorage.getItem(unfinishedKey)) !== null) {
                createFinishedBook();
                createUnfinishedBook();
            }
        }
    });

});