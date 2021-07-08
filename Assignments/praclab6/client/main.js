window.onload = function () {
    function displayLoginForm(){
        document.getElementById('product-container').style.display="none"
            document.getElementById('log-div').style.display= "block" ;
    }
    
    function displayBookContent(){
        fetchAllBooks()
        document.getElementById('product-container').style.display="block"
            document.getElementById('log-div').style.display= "none" ;
    
    }
    
        if (sessionStorage.getItem('accessToken')) {
            displayBookContent();  
        } else {
            displayLoginForm();
        }
    
    
    
    document.getElementById("logout-btn").onclick = function (){
        sessionStorage.removeItem("accessToken")
        displayLoginForm()
    }
    
    
    
    
        document.getElementById('login-btn').onclick= async function(event){
            event.preventDefault();
          let result=  await fetch('http://localhost:3000/login',{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
            username:document.getElementById('username').value,
            password:document.getElementById('password').value
            })
            }).then(res=>res.json())
            //console.log(result)
           if(result.jwtToken){
            sessionStorage.setItem('accessToken', result.jwtToken)
            displayBookContent();
    
    
    
          }else{
               document.getElementById("error-msg").innerText= result.error;
           }
         }
        
        
        
        
     
    
        document.getElementById('addBtn').onclick = function (event) {
            event.preventDefault();
            let prdId = this.dataset.id;
            if (prdId) {
                console.log("----------------")
                fetch('http://localhost:3000/books' + prdId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization" : "Bearer" + sessionStorage.getItem('accessToken')
                    },
                    body: JSON.stringify({
                        
                        title: document.getElementById('title').value,
                        isbn: document.getElementById('ISBN').value,
                        publishedDate: document.getElementById('publishedDate').value,
                        author: document.getElementById('author').value
                    })
                })
                    .then(data => data.json())
                    .then(updated => {
                        console.log(updated)
                        document.getElementById('add-forms').textContent='Add a Product'
                        document.getElementById('idfrom').reset();
                        document.getElementById('addBtn').dataset.id='';
                        location.reload()
                    })
            } else {
                createNewBook()
            }
    
        }
    }
    function createNewBook() {
        const title = document.getElementById('title').value;
        const isbn = document.getElementById('ISBN').value;
        const publishedDate = document.getElementById('publishedDate').value;
        const author = document.getElementById('author').value;
    
        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
            "Authorization" : "Bearer" + sessionStorage.getItem('accessToken')
        },
            body: JSON.stringify({
                title: title,
                isbn: isbn,
                publishedDate: publishedDate,
                author: author
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
    
                document.getElementById('idfrom').reset()
                attachSingleBook(document.getElementById('product-lits'), data)
    
            })
    }
    
    
    async function fetchAllBooks() {
        const books = await (await fetch('http://localhost:3000/books',{
        headers :{
            "Authorization" : "Bearer" + sessionStorage.getItem('accessToken')
        }
        })).json()
        const tbody = document.getElementById('product-lits')
        //console.log(books)
        books.forEach(pro => {
            attachSingleBook(tbody, pro)
        });
    
    }
    
    function attachSingleBook(parentNode, book) {
        const tr = document.createElement('tr')
    
        const titleTd = document.createElement('td')
        titleTd.textContent = book.title;
        tr.appendChild(titleTd)
    
        const isbnTd = document.createElement('td')
        isbnTd.textContent = book.isbn;
        tr.appendChild(isbnTd)
    
        const publishedDateTD = document.createElement('td')
        publishedDateTD.textContent = book.publishedDate
        tr.appendChild(publishedDateTD)
    
        const authorTD = document.createElement('td')
        authorTD.textContent = book.author
        tr.appendChild(authorTD)
    
        const actionTd = document.createElement('td')
        let deleteButton = document.createElement('button')
        //deleteButton.className='btn btn-primary'
        deleteButton.innerText = 'DELETE'
        deleteButton.dataset.id = book.id;
        actionTd.appendChild(deleteButton)
    
        const updateButton = document.createElement('button')
        updateButton.innerText = "UPDATE"
        updateButton.dataset.id = book.id;
        actionTd.appendChild(updateButton)
    
        tr.appendChild(actionTd)
    
        deleteButton.addEventListener('click', function () {
            // console.log(" buttun is clicked")
            fetch('http://localhost:3000/books' + book.id, {
                method: "DELETE",
                headers:{
                    "Authorization" : "Bearer" + sessionStorage.getItem('accessToken')
                }
            }).then(data => {
                tr.remove()
            })
    
        })
    
        updateButton.addEventListener('click', function () {
            fetch('http://localhost:3000/books' + book.id,{
                headers:{
                    "Authorization" : "Bearer" + sessionStorage.getItem('accessToken')
                }
            })
                .then(data => data.json())
                .then(data => {
                    console.log(data)
                    document.getElementById('add-forms').textContent = 'Edit a Product'
                    document.getElementById('title').value = book.title
                    document.getElementById('ISBN').value = book.isbn;
                    document.getElementById('publishedDate').value = book.publishedDate;
                    document.getElementById('author').value = book.author;
                })
        })
    
    
        parentNode.appendChild(tr)
    }