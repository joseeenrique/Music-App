let searchButton = document.getElementById("search-button");
let concertInfo = document.getElementById("concert-info");
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
      for (let i = 0; i < data._embedded.events.length; i++) {
      
      eventName = data._embedded.events[i].name;
      concertDate = data._embedded.events[i].dates.start.localDate;
      concertVenue = data._embedded.events[i]._embedded.venues[0].name

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


      console.log(eventName);
      console.log(concertDate);
      console.log(concertVenue);
      }
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
    bandArray.push(bandSearch);
    localStorage.setItem("searched", JSON.stringify(bandArray));
    buttonGroup.append(searched);
    
  }





//get api data discography data
//display in dynamically created list element  
//create button after each search 
//store searches in local sotrage 
//add links for ticket purchases
//figure out if we can click album name to display list  of songs 
//consider adding youtube video
//adding wiki bio page 
searchButton.addEventListener("click", getBand);