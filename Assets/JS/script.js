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
        
    //   console.log(data);
    //   console.log(data._embedded.events[0]._embedded.venues[0].city.name);
    //   console.log(data._embedded.events[0]._embedded.venues[0].state.stateCode);
      if (data._embedded.events[0]._embedded.attractions[0].externalLinks.facebook[0].url != undefined) {
        let facebook = data._embedded.events[0]._embedded.attractions[0].externalLinks.facebook[0].url;
        let fLink = document.getElementById("facebook-link");
        fLink.href = facebook; 
      }
      if (data._embedded.events[0]._embedded.attractions[0].externalLinks.instagram[0].url != undefined) {
        let instagram = data._embedded.events[0]._embedded.attractions[0].externalLinks.instagram[0].url;
        let iLink = document.getElementById("instagram-link");
        iLink.href = instagram; 
      }
      if (data._embedded.events[0]._embedded.attractions[0].externalLinks.wiki[0].url != undefined) {
        let wikipedia = data._embedded.events[0]._embedded.attractions[0].externalLinks.wiki[0].url;
        let wLink = document.getElementById("wiki-link");
        wLink.href = wikipedia; 
      }
      if (data._embedded.events[0]._embedded.attractions[0].externalLinks.twitter[0].url != undefined) {
        let twitter = data._embedded.events[0]._embedded.attractions[0].externalLinks.twitter[0].url;
        let tLink = document.getElementById("twitter-link");
        tLink.href = twitter; 
      }
    

      for (let i = 0; i < data._embedded.events.length; i++) {
      artist.textContent = bandSearch;
      eventName = data._embedded.events[i].name;
      concertDate = data._embedded.events[i].dates.start.localDate;
      concertVenue = data._embedded.events[i]._embedded.venues[0].name;
      concertCity = data._embedded.events[i]._embedded.venues[0].city.name;
    //   concertState = data._embedded.events[i]._embedded.venues[0].state.stateCode;
      
      let locationLine = document.createElement("li");
      let eventLine = document.createElement("li");
      let dateLine = document.createElement("li");
      let venueLine = document.createElement("li");
      let blank = document.createElement("li");
      
      eventLine.textContent = "Event: " + eventName;
      dateLine.textContent = "Date: " + concertDate;
      venueLine.textContent = "Venue: " + concertVenue;
      locationLine.textContent = concertCity;
    //   + ", " + concertState;
      blank.textContent = "_______________________________";

      concertInfo.append(dateLine);
      concertInfo.append(eventLine);
      concertInfo.append(venueLine);
      concertInfo.append(locationLine);
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
                    bandInformation.textContent=bandInfo;
                    bandInformation.append(bandInfo);                 
                    bandInformation.addEventListener("click", function(){
                        bandInformation.innerHTML = "";
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
                
                for (let x = 0; x < data.album.length; x++) {
                    
                    albumName = data.album[x].strAlbum;
                    albumDate = data.album[x].intYearReleased;
                    albumEl = document.createElement("button");
                    lineBreak = document.createElement("br");
                    albumCover = data.album[x].strAlbumThumb
                    albumEl.setAttribute("value", albumCover);

                    albumEl.textContent = albumName + " - " + albumDate;
                    
                    albumsList.append(albumEl);
                    albumsList.append(lineBreak);
                    albumEl.addEventListener("click", addPic) 
                    function addPic(event) {
                        console.log(event.target.value)
                    }    
                    
                    
                        
                    
                }
                addHistory(bandSearch);
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
clearBtn.addEventListener("click",clearSaved);
createHistory.addEventListener("click", reRender);
function reRender(event) {
  let buttonReturn = event.target.value;
  getConcerts(buttonReturn);
}

loadSaved();






//figure out if we can click album name to display list  of songs (maybe use modal)
//consider adding youtube video

