var searchBtn = document.getElementById("search_page");

function artistSubmit() {
    console.log("hello");

  var searchInput = document.getElementById("search-input").value;
  
  var inputString = "./index.html?q=" + searchInput;

  location.assign(inputString);
}

searchBtn.addEventListener('click', artistSubmit);
