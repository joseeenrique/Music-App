let searchButton = document.getElementById("search_btn");
let concertInfo = document.getElementById("concert-info");
let wikiInfo = document.getElementById("repo_3");
let bandArray = [];
let albumsList = document.getElementById("albums");
let createHistory = document.getElementById("recent_searches");
let bioButton = document.getElementById("bio-button");
let bandInformation = document.getElementById("band-info");
let artist = document.getElementById("artist");
let clearBtn = document.getElementById("recent_clear");
let searchPage = document.getElementById("search_page");
let enterKey = document.getElementById("band-search");

function loadSaved() {

    returnSearch = JSON.parse(localStorage.getItem("searched" ));
   if (returnSearch != null) {
         for (let k = 0; k < returnSearch.length; k++) {
         albums(returnSearch[k]);
      }   
   }
   }

//takes in input 
function getBand() {

    let inputText = document.getElementById("band-search").value; 
    let bandSearch = inputText.toUpperCase();
    if (!bandSearch) {
      return;
    } 

    albums(bandSearch);
    $('input[type="text"]').val('');
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
        console.log(data);
        
    if (data._embedded.events[0]._embedded.attractions != undefined) {
      if (data._embedded.events[0]._embedded.attractions[0].externalLinks != undefined) {
        let facebook = data._embedded.events[0]._embedded.attractions[0].externalLinks.facebook[0].url;
        let fLink = document.getElementById("facebook-link");
        fLink.href = facebook; 
      }
      if (data._embedded.events[0]._embedded.attractions[0].externalLinks != undefined) {
        let instagram = data._embedded.events[0]._embedded.attractions[0].externalLinks.instagram[0].url;
        let iLink = document.getElementById("instagram-link");
        iLink.href = instagram; 
      }
      if (data._embedded.events[0]._embedded.attractions[0].externalLinks != undefined) {
        let wikipedia = data._embedded.events[0]._embedded.attractions[0].externalLinks.wiki[0].url;
        let wLink = document.getElementById("wiki-link");
        wLink.href = wikipedia; 
      }
      if (data._embedded.events[0]._embedded.attractions[0].externalLinks != undefined) {
        let twitter = data._embedded.events[0]._embedded.attractions[0].externalLinks.twitter[0].url;
        let tLink = document.getElementById("twitter-link");
        tLink.href = twitter; 
      }
    }

      for (let i = 0; i < data._embedded.events.length; i++) {
      
      eventName = data._embedded.events[i].name;
      concertDate = data._embedded.events[i].dates.start.localDate;
      concertVenue = data._embedded.events[i]._embedded.venues[0].name;
      concertCity = data._embedded.events[i]._embedded.venues[0].city.name;
      concertUrl =  data._embedded.events[i].url
      concertCountry = data._embedded.events[i]._embedded.venues[0].country.countryCode;
      
      let locationLine = document.createElement("li");
      let eventLine = document.createElement("li");
      let dateLine = document.createElement("li");
      let venueLine = document.createElement("li");
      
      //Adding event listener
      let concertUrlLine = document.createElement("button");
      concertUrlLine.setAttribute("class", "buy-now");
      concertUrlLine.addEventListener("click", event => {
        location.href = event.target.dataset.url;
      }  );   
      
      concertUrlLine.dataset.url = concertUrl
      let blank = document.createElement("li");
      
      eventLine.textContent = "Event: " + eventName;
      dateLine.textContent = "Date: " + concertDate;
      venueLine.textContent = "Venue: " + concertVenue;
      locationLine.textContent = concertCity + ", " + concertCountry;
      concertUrlLine.textContent =  "Buy Tickets";
      blank.textContent = "________________________________________________";

      concertInfo.append(dateLine);
      concertInfo.append(eventLine);
      concertInfo.append(venueLine);
      concertInfo.append(locationLine);
      concertInfo.append(concertUrlLine)
      concertInfo.append(blank);
      

      }
      addHistory(bandSearch);
      })
    }

    function bringFrom(){
      let query = window.location.search.split("&");
      let dataIn = query[0].split('=').pop();
      capData = dataIn.toUpperCase();
      cappedData = window.decodeURIComponent(capData);
      window.history.replaceState({}, document.title, window.location.pathname);
      albums(cappedData);

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
                    bandInformation.textContent=bandInfo;
                    bandInformation.append(bandInfo);                 
                    bandInformation.addEventListener("click", function(){
                        bandInformation.innerHTML = "";
                    })
                }
                 
                getConcerts(bandSearch);
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
                artist.textContent = bandSearch;
                for (let x = 0; x < data.album.length; x++) {
                    let albumArt = document.getElementById("album-art");
                    let modal = document.getElementById("md");
                    let close = document.getElementById("close");
                    albumName = data.album[x].strAlbum;
                    albumDate = data.album[x].intYearReleased;
                    albumEl = document.createElement("button");
                    lineBreak = document.createElement("br");
                    albumCover = data.album[x].strAlbumThumb
                    albumEl.setAttribute("value", albumCover);
                    albumEl.setAttribute("class", "album-btn");
                    albumEl.textContent = albumName + " - " + albumDate;
                    albumsList.append(albumEl);
                    albumsList.append(lineBreak);
                    
                    function addPic(event) {
                        
                        let displayArt = event.target.value;
                        albumArt.src = displayArt;
                        modal.style.display = "block";
                    }    
                    
                    function closeMe() { 
                        modal.style.display = "none";
                      }
                      albumEl.addEventListener("click", addPic) 
                      close.addEventListener("click",closeMe)
                    }    
                
                wiki(bandSearch);
            })
    }

//display buttons in dynamically created list element 
function addHistory(bandSearch) {
    if (bandSearch === bandArray[0]|| bandSearch === bandArray[1] || bandSearch === bandArray[2]  || bandSearch === bandArray[3] || bandSearch === bandArray[4] || bandSearch === bandArray[5]|| bandSearch === bandArray[6] || bandSearch === bandArray[7] || bandSearch === bandArray[8]){
       
      }
      else{
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
       
  
    }}
    function clearSaved () {
        deleteSearch = JSON.parse(localStorage.getItem("searched" ));
        for (let index = 0; index < bandArray.length; index++) {    
            deleteBtn = document.getElementById("searched-button");
            if (deleteBtn != null) {
                deleteBtn.remove()
            }
         }
        localStorage.clear();
        bandArray = [];
        
    }


searchButton.addEventListener("click", getBand);


document.addEventListener("keydown", function(event) {
  if (event.key == "Enter") {
    event.preventDefault();
    console.log("hello")
    getBand();
    $('input[type="text"]').val('');
    }
}); 




clearBtn.addEventListener("click",clearSaved);
createHistory.addEventListener("click", reRender);
function reRender(event) {
  let buttonReturn = event.target.value;
  albums(buttonReturn);
}

loadSaved();
bringFrom();





//figure out if we can click album name to display list  of songs (maybe use modal)
//consider adding youtube video

