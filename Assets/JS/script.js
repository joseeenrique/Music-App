let searchButton = document.getElementById("search_btn");
let concertInfo = document.getElementById("concert-info");
let wikiInfo = document.getElementById("repo_3");
let bandArray = [];
let albumsList = document.getElementById("albums");
let createHistory = document.getElementById("recent_searches");
let bioButton = document.getElementById("bio-button");
let bandInformation = document.getElementById("band-info");

function loadSaved() {
    returnSearch = JSON.parse(localStorage.getItem("searched" ));
   if (returnSearch != null) {
         for (let k = 0; k < returnSearch.length; k++) {
         getConcerts(returnSearch[k]);
      }   
   }
   }

//takes in input 
function getBand() {
    let bandSearch = document.getElementById("band-search").value; 
    
    if (!bandSearch) {
      return;
    }
    
getConcerts(bandSearch);

}
//get api for concert dates 
function getConcerts(bandSearch) {
requestUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + bandSearch + "&sort=date,asc&size=5&apikey=M1YKgwcd7XLntgC0peSBEu8GBJfrre5t";

fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      concertInfo.innerHTML = "";
      for (let i = 0; i < data._embedded.events.length; i++) {
   

      eventName = data._embedded.events[i].name;
      concertDate = data._embedded.events[i].dates.start.localDate;
      concertVenue = data._embedded.events[i]._embedded.venues[0].name;
        
      let eventLine = document.createElement("li");
      let dateLine = document.createElement("li");
      let venueLine = document.createElement("li");
      let blank = document.createElement("li");
      
      eventLine.textContent = "Event: " + eventName;
      dateLine.textContent = "Date: " + concertDate;
      venueLine.textContent = "Venue: " + concertVenue;
      blank.textContent = "_______________________________";

      concertInfo.append(dateLine);
      concertInfo.append(eventLine);
      concertInfo.append(venueLine);
      concertInfo.append(blank);
      }
      wiki(bandSearch);
      })
    }
    //adding wiki bio page 
    function wiki(bandSearch){
        let requestUrl = "https://theaudiodb.com/api/v1/json/2/search.php?s=" + bandSearch;
   
        fetch(requestUrl)
        .then 
            (function (response) {
            return response.json();
    })
            .then (function (data) {
                
                let bandInfo = data.artists[0].strBiographyEN;
                bioButton.addEventListener("click", renderBio);
                
                function renderBio() {
                    wikiInfo.textContent=bandInfo;
                    wikiInfo.append(bandInfo);
                    let collapse = document.createElement("button");
                    collapse.setAttribute( "class", "button is-info");
                    collapse.innerHTML = "Shrink Bio";
                    wikiInfo.prepend(collapse);
                    collapse.addEventListener("click", function(){
                        collapse.remove();
                        wikiInfo.innerHTML = "";
                        wikiInfo.append(bioButton);
                        bioButton.addEventListener("click", renderBio);
                        
                    })
                }
                 
                albums(bandSearch);
        })

    }
    //get api data discography data
    function albums(bandSearch){
        let requestUrl = "https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=" + bandSearch;

        fetch(requestUrl)
            .then(function (response) {
            return response.json();
    })
            .then (function (data) {
                albumsList.innerHTML = "";
                console.log(data);
                for (let x = 0; x < data.album.length; x++) {
                    albumName = data.album[x].strAlbum;
                    albumEl = document.createElement("li");
                    albumEl.textContent = albumName;
                    albumsList.append(albumEl);
                    
                }
                addHistory(bandSearch);
            })
    }

//display buttons in dynamically created list element 
function addHistory(bandSearch) {
   
    let searched = document.createElement("button"); 
    searched.setAttribute("id", "searched-button");
    searched.type = "submit";
    searched.setAttribute( "class", "button is-info drop-button");
    searched.setAttribute("value", bandSearch);
    searched.innerText = bandSearch;
    createHistory.append(searched);
    
    //store searches in local sotrage 
     bandArray.push(bandSearch);
     localStorage.setItem("searched", JSON.stringify(bandArray));   
  }


searchButton.addEventListener("click", getBand);

// loadSaved();


//display in dynamically created list element  

//add links for ticket purchases
//figure out if we can click album name to display list  of songs (maybe use modal)
//consider adding youtube video