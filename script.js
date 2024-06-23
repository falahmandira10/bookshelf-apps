document.addEventListener("DOMContentLoaded", () => {
    const submitBtn =  document.querySelector("#submit-input");
    const titleInp = document.getElementById("input-book");
    const authorInp = document.getElementById("author-book");
    const yearInp = document.getElementById("year-book");
    const finishedInp = document.getElementById("finished-book");

    const finishedKey = "FINISHED_KEY";
    const unfinishedKey = "UNFINISHED_KEY";

    submitBtn.addEventListener("click", () => {
        if ((titleInp.value && authorInp.value && yearInp.value) != "") {
            console.log(`${titleInp.value}, ${authorInp.value}, ${typeof(Number(yearInp.value))}, ${typeof(finishedInp.checked)}`);

            const books = {
                id: Date.now(),
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
            renderBook();
        }
       
    });

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
        let arrBooks = []
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
        let arrBooks = []
        if (localStorage.getItem(unfinishedKey) !== null) {
            arrBooks = JSON.parse(localStorage.getItem(unfinishedKey));
        }
        arrBooks.unshift(book);
        
        if (arrBooks.length > 5) {
            arrBooks.pop();
        }

        localStorage.setItem(unfinishedKey, JSON.stringify(arrBooks));
    };

    const renderFinishedBook = () => {
        const arr = getFinishedBooks();
        console.log(arr);
        for (let book of arr) {
            const parentSection = document.querySelector(".card-finished");
            const divCard = document.createElement('div');
            divCard.setAttribute("class", "card-books-finished");

            divCard.innerHTML = '<h2>' + book.title + '<h2>';
            divCard.innerHTML += '<h3>' + book.author + ' - ' + book.year + '<h3>';
            divCard.innerHTML += '<i class="fa-solid fa-book fa-2xl pict-book"></i>';
            divCard.innerHTML += '<button type="submit" class="btn-unfinished">Unfinished Read</button>';
            divCard.innerHTML += `<button type="submit" class="btn-delete" id="${book.id}">Delete Button</button>`;
            
            parentSection.appendChild(divCard);

        }
    }
    
    const renderUnfinishedBook = () => {
        const arr = getUnfinishedBooks();
        console.log(arr);
        for (let book of arr) {
            const parentSection = document.querySelector(".card-unfinished");
            const divCard = document.createElement('div');
            divCard.setAttribute("class", "card-books-unfinished");
            
            divCard.innerHTML = '<h2>' + book.title + '<h2>';
            divCard.innerHTML += '<h3>' + book.author + ' - ' + book.year + '<h3>';
            divCard.innerHTML += '<i class="fa-solid fa-book fa-2xl pict-book"></i>';
            divCard.innerHTML += '<button type="submit" class="btn-finished">Finished Read</button>';
            divCard.innerHTML += `<button type="submit" class="btn-delete" id="${book.id}">Delete Button</button>`;

            parentSection.appendChild(divCard);
            
        }
    }

    window.addEventListener("load", () => {
        if (typeof(Storage) !== "undefined") {
            if ((localStorage.getItem(finishedKey) && localStorage.getItem(unfinishedKey)) !== null) {
                renderFinishedBook();
                renderUnfinishedBook();
            }
        }
    });

});