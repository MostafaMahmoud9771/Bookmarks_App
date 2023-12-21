var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var bookmarksList;

if(localStorage.getItem("bookmarksList") == null){
    bookmarksList = [];
}else{
    bookmarksList = JSON.parse(localStorage.getItem("bookmarksList"));
    displayBookmarks(bookmarksList);
}

document.getElementById("addBtn").addEventListener("click" , addURL)

function addURL(){
if(checkName() == true && checkURL() == true){
var bookmark = {
    name : siteName.value,
    url : siteURL.value
}
bookmarksList.push(bookmark);
localStorage.setItem("bookmarksList" , JSON.stringify(bookmarksList));
displayBookmarks(bookmarksList);
clearInputs();}
}

function displayBookmarks(list){
    var container =``;
    for(var i=0 ; i<list.length ; i++){
        container += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td><button class="btn btn-warning"><a href="${list[i].url}" target="_blank" class="text-decoration-none text-white"><i class="fa-solid fa-eye"></i> Visit</a></button></td>
        <td><button id="deleteBtn" onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button></td>
    </tr>`
    }
    document.getElementById("tableContent").innerHTML = container;
}


function deleteBookmark(index){
    bookmarksList.splice(index,1);
    localStorage.setItem("bookmarksList" , JSON.stringify(bookmarksList));
    displayBookmarks(bookmarksList);
}

function clearInputs(){
    siteName.value = "";
    siteURL.value = "";
}

function checkName(){
    var regex = /^[a-zA-Z]{3}/;
    if(regex.test(siteName.value) == true){
        siteName.classList.remove("is-invalid")
        document.getElementById("nameError").classList.add("d-none")
        return true;
    }else{
        siteName.classList.add("is-invalid")
        document.getElementById("nameError").classList.remove("d-none")
        return false;
    }
}

function checkURL(){
    var regex = /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    if(regex.test(siteURL.value) == true){
        siteURL.classList.remove("is-invalid")
        document.getElementById("urlError").classList.add("d-none")
        return true;
    }else{
        siteURL.classList.add("is-invalid")
        document.getElementById("urlError").classList.remove("d-none")
        return false;
    }
}
