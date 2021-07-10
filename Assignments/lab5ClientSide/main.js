window.onload = function () {
    fetchAllBooks();
  document.getElementById("addBtn").onclick = function (event) {
    const btnId = this.dataset.id;
    event.preventDefault();
    if (btnId) {
        fetch('http://localhost:3000/books/' + btnId, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: document.getElementById("title").value,
                ISBN: document.getElementById("ISBN").value,
                publishDate: document.getElementById("publishDate").value,
                author: document.getElementById("author").value,
            })
        })
        .then(data => data.json())
        .then(updatedProd => {
            document.getElementById('form-title').textContent = "Add a Book";
            document.getElementById('add-form').reset();
            document.getElementById('addBtn').dataset.id = '';
            location.reload();
        })
    } else 
    addNewBook();
  }
};
async function fetchAllBooks(){
 const books=await (await fetch("http://localhost:3000/books")).json()
 const bookDisplay = document.getElementById("display-book");
 books.forEach(data => {
    displayToClient(bookDisplay,data)
 });
}
 function addNewBook(){
    {
        fetch("http://localhost:3000/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: document.getElementById("title").value,
            ISBN: document.getElementById("ISBN").value,
            publishDate: document.getElementById("publishDate").value,
            author: document.getElementById("author").value,
          }),
        })
          .then((data) => data.json())
          .then((data) => {
            const bookDisplay = document.getElementById("display-book");
            displayToClient(bookDisplay,data)
          });
      }
 }
  function displayToClient(bookDisplay,data){
    const listInfo = document.createElement("div");
    listInfo.className = "col";
    listInfo.id = data.id;
    bookDisplay.append(listInfo);
    const image = document.createElement("img");
    image.src = "./image/libraray.jpeg";
    image.alt = "image";
    image.width = "100";
    image.height = "60";
    listInfo.append(image);
    const titleH = document.createElement("h2");
    titleH.innerHTML = data.title;
    listInfo.append(titleH);
    const viewBtn = document.createElement("button");
    viewBtn.className = "btn btn-info";
    viewBtn.innerHTML = "view details";
    viewBtn.dataset.id = data.id;
    listInfo.append(viewBtn);
    bookDisplay.append(listInfo);
    document.getElementById("add-form").reset();
    viewBtn.addEventListener("click", function () {
      const viewDetail = document.getElementById(`${data.id}`);
      const isbn = document.createElement("h5");
      isbn.innerHTML = "ISBN :" + data.ISBN;
      viewDetail.appendChild(isbn);
      const publishDate = document.createElement("h5");
      publishDate.innerHTML = "Publish date: " + data.publishDate;
      viewDetail.appendChild(publishDate);
      const author = document.createElement("h5");
      author.innerHTML = "Author: " + data.author;
      viewDetail.appendChild(author);
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger";
      deleteBtn.innerHTML = "delete";
      deleteBtn.dataset.id = data.id;
      viewDetail.append(deleteBtn);
      const updateBtn = document.createElement("button");
      updateBtn.className = "btn btn-warning";
      updateBtn.innerHTML = "update";
      updateBtn.dataset.id = data.id;
      viewDetail.append(updateBtn);
      deleteBtn.addEventListener("click", function () {
        fetch("http://localhost:3000/books/" + data.id, {
          method: "DELETE",
        }).then((data) => {
          viewDetail.remove();
        });
      });
      updateBtn.addEventListener("click", function () {
        fetch("http://localhost:3000/books/" + data.id)
          .then((data) => data.json())
          .then((data) => {
            document.getElementById("form-title").textContent =
              "Edit a Product";
            document.getElementById("title").value = data.title;
            document.getElementById("ISBN").value = data.ISBN;
            document.getElementById("publishDate").value =
              data.publishDate;
            document.getElementById("author").value = data.author;
            document.getElementById("addBtn").dataset.id = data.id;
          });
      });
    });
  };
