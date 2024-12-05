var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var bookMarksList = [];
var submitBtn = document.getElementById("submitBtn")
var updateBtn = document.getElementById("updateBtn")
var currentIndex;
var searchInput = document.getElementById("searchInput")

if (localStorage.getItem("bookMarksList") != null) {
    bookMarksList = JSON.parse(localStorage.getItem("bookMarksList"));
    displayBookMarkData(bookMarksList);
}

function addBookMark() {
// cheak that there are no two bookmarks with the same name
   
   var isDuplicate = false;

    for (var i = 0; i < bookMarksList.length; i++) {
        if (bookMarksList[i].siteName.toLowerCase() == bookmarkName.value.toLowerCase()) {
            isDuplicate = true;
            break;
        }
    }

    if (isDuplicate) {
        alert("The bookmark name already exists!");
    }

    // Add Bookmark 

    if (validateName() && validateUrl()) {
        var newBookMark = {
            siteName: bookmarkName.value,
            siteUrl: bookmarkURL.value
        }
        bookMarksList.push(newBookMark);
        updateLocalStorage()
        displayBookMarkData(bookMarksList);
        clearInputs()
        removeValidClass()
    }
    else {
        exampleModal.classList.remove('d-none')
    }

}

function closeModal() {
    exampleModal.classList.add("d-none")
}

function displayBookMarkData(list) {
    var cartona = ``;
    for (var i = 0; i < list.length; i++) {
        cartona += `<tr>
                        <td>${i + 1}</td>
                        <td>${list[i].newName ? list[i].newName : list[i].siteName}</td>
                        <td>
                            <a class="btn btn-visit" href="${list[i].siteUrl}" target="_blank">
                               <i class="fa-solid fa-eye pe-2"></i>
                               Visit
                            </a>
                        </td>
                        <td>
                            <button onclick="getDataToUpdate(${i})" class="btn btn-primary">
                                <i class="fa-solid fa-arrow-up-from-bracket pe-2"></i>
                               Update
                            </button>
                        </td>
                        <td>
                            <button onclick="deleteBookMark(${i})" class="btn btn-danger">
                                <i class="fa-solid fa-trash-can pe-2"></i>
                               Delete
                            </button>
                        </td>
                    </tr>`
    }
    document.getElementById("tableContent").innerHTML = cartona;

}

function clearInputs() {
    bookmarkName.value = "";
    bookmarkURL.value = "";
}

function deleteBookMark(index) {
    bookMarksList.splice(index, 1);
    updateLocalStorage()
    displayBookMarkData(bookMarksList);
}

function getDataToUpdate(index) {
    bookmarkName.value = bookMarksList[index].siteName;
    bookmarkURL.value = bookMarksList[index].siteUrl;
    currentIndex = index;
    submitBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')
}

function updateBookMark() {
    bookMarksList[currentIndex].siteName = bookmarkName.value;
    bookMarksList[currentIndex].siteUrl = bookmarkURL.value;
    updateLocalStorage();
    displayBookMarkData(bookMarksList);
    submitBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    clearInputs();
}

function updateLocalStorage() {
    localStorage.setItem("bookMarksList", JSON.stringify(bookMarksList));
}

function search(searchValue) {

    if (searchValue == "") {

        for (var i = 0; i < bookMarksList.length; i++) {
            delete bookMarksList[i].newName;
        }

        displayBookMarkData(bookMarksList);
        return;
    }

    var searchitem = [];

    for (i = 0; i < bookMarksList.length; i++) {
        if (bookMarksList[i].siteName.toLowerCase().includes(searchValue.toLowerCase())) {
            bookMarksList[i].newName = bookMarksList[i].siteName.toLowerCase().replace(searchValue, `<span class='text-danger'>${searchValue.toLowerCase()}</span>`)
            searchitem.push(bookMarksList[i]);
        }
    }
    displayBookMarkData(searchitem);
    console.log(bookMarksList);
}


// ***** Validation ******

function validateName() {
    var nameRegex = /^\w{3,}(\s+\w+)*$/;
    if (nameRegex.test(bookmarkName.value)) {
        bookmarkName.classList.add('is-valid')
        bookmarkName.classList.remove('is-invalid')
        wrongName.classList.add("d-none")
        return true;
    }
    else {
        bookmarkName.classList.remove('is-valid')
        bookmarkName.classList.add('is-invalid')
        wrongName.classList.remove("d-none")
        return false;
    }
}

function validateUrl() {
    var urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/

    if (urlRegex.test(bookmarkURL.value)) {
        bookmarkURL.classList.add('is-valid')
        bookmarkURL.classList.remove('is-invalid')
        wrongUrl.classList.add("d-none")
        return true;
    }
    else {
        bookmarkURL.classList.remove('is-valid')
        bookmarkURL.classList.add('is-invalid')
        wrongUrl.classList.remove("d-none")
        return false;
    }
}

function removeValidClass() {
    bookmarkName.classList.remove('is-valid')
    bookmarkURL.classList.remove('is-valid')
}



