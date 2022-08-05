var searchBtn = document.getElementById("search_page");

function artistSubmit() {
    console.log("hello");

  var searchInput = document.getElementById("search-input").value;
  
  var inputString = "./main-page.html?q=" + searchInput;

  location.assign(inputString);
}

searchBtn.addEventListener('click', artistSubmit);

document.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
      event.preventDefault();
      
      artistSubmit();
      
      }
  }); 
