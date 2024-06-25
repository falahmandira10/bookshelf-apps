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

    const flagFinished = true;
    const flagUnfinished = false;


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
                insertBooks(books, flagFinished);
            } else {
                insertBooks(books, flagUnfinished);
            }

            renderFinishedBook();
            renderUnfinishedBook();
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

    const insertBooks = (book, flag) => {
        if (flag) {
            if (localStorage.getItem(finishedKey) !== null) {
                arrBooks = JSON.parse(localStorage.getItem(finishedKey));
            }
            arrBooks.unshift(book);
            
            if (arrBooks.length > 5) {
                arrBooks.pop();
            }
    
            localStorage.setItem(finishedKey, JSON.stringify(arrBooks));

        } else {
            if (localStorage.getItem(unfinishedKey) !== null) {
                arrBooks = JSON.parse(localStorage.getItem(unfinishedKey));
            }
            arrBooks.unshift(book);
            
            if (arrBooks.length > 5) {
                arrBooks.pop();
            }
    
            localStorage.setItem(unfinishedKey, JSON.stringify(arrBooks));
        }

    };

    const renderFinishedBook = () => {
        let bookShelf = getFinishedBooks();
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

            divCard.innerHTML = '<h2>' + book.title + '</h2>';
            divCard.innerHTML += '<h3>' + book.author + ' - ' + book.year + '</h3>';
            divCard.innerHTML += '<i class="fa-solid fa-book fa-2xl pict-book"></i>';
            divCard.appendChild(unfinishedBtn);
            divCard.appendChild(deleteBtn);

            parentSection.appendChild(divCard);
        }

        removeBook(bookShelf, flagFinished);
        moveBook(bookShelf, flagFinished, flagUnfinished);
    }

    const removeBook = (bookShelf, flag) => {
        const deleteBtnn = document.querySelectorAll('.btn-delete');
        deleteBtnn.forEach((btnDel, idx) => {
            btnDel.addEventListener("click", () => {
                handleRemoveBook(btnDel, bookShelf, idx, flag);
            });
        });
    }

    const handleRemoveBook = (btn, bookShelf, idx, flag) => {
        btn.parentElement.remove();
        bookShelf.splice(idx, 1);
        console.log(Array.isArray(bookShelf));
        console.log(bookShelf);
        console.log(bookShelf);
        refreshPage();
        saveData(bookShelf, flag);
    }

    const refreshPage = () => {
        location.reload();
    }
    
    const moveBook = (bookShelf, flagSource, flagDestination) => {
        const finishedBtnn = document.querySelectorAll('.btn-finished')
        finishedBtnn.forEach((btnFin, idx) => {
            btnFin.addEventListener("click", () => {
                handleRemoveBook(btnFin, bookShelf, idx, flagSource);
                
                const parents = btnFin.parentElement;
                console.log(parents);
                
                temp = [];
                for (let child of parents.children) {
                    if (child.innerText !== "") {
                        temp.push(child.innerText);
                    }
                    
                    if (temp[6] !== 'undefined' ) {
                        temp.push(child.id);
                        console.log(child.id);
                    }
                }
                const auth_year = temp[2].split("-")
                const auth = auth_year[0];
                const years = Number(auth_year[1]);

                const books = {
                    id: temp[6],
                    title: temp[0],
                    author: auth,
                    year: years,
                    isComplete: true
                }
            
                console.log("temp = ", temp)
                console.log("books = ", books)
               
                insertBooks(books, flagDestination);
            })
        })
    }

    const saveData = (data, flag) => {
        if (typeof(Storage) !== 'undefined') {
            console.log(data);
            if (flag) {
                localStorage.setItem(finishedKey, JSON.stringify(data));
            } else {
                localStorage.setItem(unfinishedKey, JSON.stringify(data));
            }
        }
    }
    
    const renderUnfinishedBook = () => {
        let bookShelf = getUnfinishedBooks();
        console.log(bookShelf);
        const flagUBook = true
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

            divCard.setAttribute("class", "card-books-unfinished");
            
            divCard.innerHTML = '<h2>' + book.title + '</h2>';
            divCard.innerHTML += '<h3>' + book.author + ' - ' + book.year + '</h3>';
            divCard.innerHTML += '<i class="fa-solid fa-book fa-2xl pict-book"></i>';
            divCard.appendChild(finishedBtn);
            divCard.appendChild(deleteBtn);

            parentSection.appendChild(divCard);
            // console.log(divCard);

        }

        removeBook(bookShelf, flagUBook);
        moveBook(bookShelf, flagUnfinished, flagFinished);
    }

    window.addEventListener("load", () => {
        if (typeof(Storage) !== "undefined") {
            if ((localStorage.getItem(finishedKey) || localStorage.getItem(unfinishedKey)) !== null) {
                renderFinishedBook();
                renderUnfinishedBook();
            }
        }
    });

});