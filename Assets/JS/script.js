let searchButton = document.getElementById("search_btn");
let concertInfo = document.getElementById("concert-info");
let wikiInfo = document.getElementById("repo_3");
let bandArray = [];



function loadSaved() {
    returnSearch = JSON.parse(localStorage.getItem("searched" ));
   if (returnSearch != null) {
         for (let o = 0; o < returnSearch.length; o++) {
         getConcerts(returnSearch[o]);
      }   
   }
   }

//takes in input 
function getBand() {
    let bandSearch = document.getElementById("band-search").value; 
    if (!bandSearch) {
      return;
    }
    console.log(bandSearch)
    
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
      console.log(data);
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

    function wiki(bandSearch){
        let requestUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/" + bandSearch;

        fetch(requestUrl)
            .then(function (response) {
            return response.json();
    })
            .then (function (data) {
                wikiInfo.innerHTML = "";
                bandInfo = data.extract;
                wikiInfo.append(bandInfo);

    
        })

    }

//display buttons in dynamically created list element 
function addHistory(bandSearch) {
   
    let searched = document.createElement("button"); 
    searched.setAttribute("id", "searched-button");
    searched.type = "submit";
    searched.setAttribute( "class", "drop-button");
    searched.setAttribute("value", bandSearch);
    searched.innerText = bandSearch;
    (TBD).append(searched);
    
    //store searches in local sotrage 
    if (bandArray.length < 5) {
        bandArray.push(bandSearch);
        localStorage.setItem("searched", JSON.stringify(bandArray));
    }
    else {
        bandArray.splice(4,1);
        bandArray.push(bandSearch);
        localStorage.setItem("searched", JSON.stringify(bandArray));
    }
    
    
  }





//get api data discography data
//display in dynamically created list element  

//add links for ticket purchases
//figure out if we can click album name to display list  of songs (maybe use modal)
//consider adding youtube video
//adding wiki bio page 
searchButton.addEventListener("click", getBand);