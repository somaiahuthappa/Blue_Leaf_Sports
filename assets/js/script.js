// var searchPlayersHistoryId = 0;
// var searchTopHistoryId = 0;
// var searchLeagueHistoryId = 0;


// function loadSearchHistory() {
//     var array = ["Players", "Top", "League"]
//     for (let index = 0; index < array.length; index++) {
//         var type = array[index];
//     var size = JSON.parse(localStorage.getItem("size" + type));
//         for (var i = 0; i < size; i++) {
//             var key = "search" + array[index] + i;
//             var text = JSON.parse(localStorage.getItem(key));
//             var historyButton = $("<button>");
//             //historyButton.addClass("col-12 my-2 btn btn-secondary");
//             historyButton.attr("id", key);
//             historyButton.text(text);
//             switch (index) {
//                 case 0:
//                     $(".searchPlayersHistory").append(historyButton);
//                     searchPlayersHistoryId++;
//                     break;
//                 case 1:
//                     $(".searchTopHistory").append(historyButton);
//                     searchTopHistoryId++;
//                     break;
//                 case 2:
//                     $(".searchLeagueHistory").append(historyButton);
//                     searchLeagueHistoryId++;
//                     break;
//                 default:
//                     break;
//             }            
//         }    
//     }
    
// }

// loadSearchHistory();

// function populateCards() {
//     var leagueCall = [39, 135, 78, 162, 57, 58, 3];
//     var leagues = [$("#leagueSoccer1"), $("#leagueSoccer2"), $("#leagueSoccer3"), $("#leagueSoccer4"), $("#leagueHockey1"), $("#leagueHockey2"), $("#leagueHockey3")];
//     let elementIndex = 0;
//     var api = "";
//     var host = "";
//     for (let index = 0; index < leagueCall.length; index++) {
//         if (elementIndex < 4) {
//         api = "https://api-football-v1.p.rapidapi.com/v3/teams?league=";
//         host = "api-football-v1.p.rapidapi.com";
//         } else {
//             api = "https://api-hockey.p.rapidapi.com/teams/?league=";
//             host = "api-hockey.p.rapidapi.com";
//         }
//         const settings = {
//             "async": true,
//             "crossDomain": true,
//             "url": api + leagueCall[index] + "&season=2021",
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": host,
//                 "x-rapidapi-key": "eb045851b7mshab1dd65c071dccap17752djsn834e9190eaa2"
//             }
//         };
//         elementIndex++;
//         $.ajax(settings).done(function (data) {
//             var sport = "";
//             console.log(data);
//             switch (data.parameters.league) {
//                 case "39":
//                 case "135":
//                 case "78":
//                 case "162":
//                     sport = "soccer";
//                     switch (data.parameters.league) {
//                         case "39":
//                             var leagueEl = leagues[0];
//                             break;
//                         case "135":
//                             var leagueEl = leagues[1];
//                             break;
//                         case "78":
//                             var leagueEl = leagues[2];
//                             break;
//                         case "162":
//                             var leagueEl = leagues[3];
//                             break;
//                         }
//                     break;
//                 case "57":
//                 case "58":
//                 case "3":
//                     sport = "hockey";
//                     switch (data.parameters.league) {
//                         case "57":
//                             var leagueEl = leagues[4];
//                             break;
//                         case "58":
//                             var leagueEl = leagues[5];
//                             break;
//                         case "3":
//                             var leagueEl = leagues[6];
//                             break;
//                     }
//                     break;
//             }
            
//             if (sport === "soccer") {
//                 for (let index = 0; index < data.response.length; index++) {
//                     var cardEl = $("<div>");
//                     cardEl.addClass("card");
//                     cardEl.appendTo(leagueEl);

//                     var imgEl = $("<img>");
//                     imgEl.attr("src", data.response[index].team.logo);
//                     imgEl.attr("id", "team-logo");
//                     imgEl.appendTo(cardEl);

//                     var cardSectionEl = $("<div>");
//                     cardSectionEl.addClass("card-section");
//                     cardSectionEl.appendTo(cardEl);

//                     var titleEl = $("<h4>");
//                     titleEl.appendTo(cardSectionEl);

//                     var strongEl = $("<strong>");
//                     strongEl.text(data.response[index].team.name);
//                     strongEl.appendTo(cardSectionEl);

//                     var cardDividerEl = $("<div>");
//                     cardDividerEl.addClass("card-divider");
//                     cardDividerEl.appendTo(cardEl);

//                     var listEl = $("<ul>");
//                     listEl.appendTo(cardDividerEl);

//                     var listItem1El = $("<li>");
//                     listItem1El.appendTo(listEl);

//                     var linkEl = $("<a>");
//                     linkEl.attr("href", "#");
//                     linkEl.text("Team website");
//                     linkEl.appendTo(listItem1El);
//                 }
//             } else if (sport === "hockey") {
//                 for (let index = 0; index < data.response.length; index++) {
//                     var cardEl = $("<div>");
//                     cardEl.addClass("card");
//                     cardEl.appendTo(leagueEl);

//                     var imgEl = $("<img>");
//                     imgEl.attr("src", data.response[index].logo);
//                     imgEl.attr("id", "team-logo");
//                     imgEl.appendTo(cardEl);

//                     var cardSectionEl = $("<div>");
//                     cardSectionEl.addClass("card-section");
//                     cardSectionEl.appendTo(cardEl);

//                     var titleEl = $("<h4>");
//                     titleEl.appendTo(cardSectionEl);

//                     var strongEl = $("<strong>");
//                     strongEl.text(data.response[index].name);
//                     strongEl.appendTo(cardSectionEl);

//                     var cardDividerEl = $("<div>");
//                     cardDividerEl.addClass("card-divider");
//                     cardDividerEl.appendTo(cardEl);

//                     var listEl = $("<ul>");
//                     listEl.appendTo(cardDividerEl);

//                     var listItem1El = $("<li>");
//                     listItem1El.appendTo(listEl);

//                     var linkEl = $("<a>");
//                     linkEl.attr("href", "#");
//                     linkEl.text("Team website");
//                     linkEl.appendTo(listItem1El);
//                 }
//             } else {}
//         });
//     }
// }

// function searchQuery(parameters, update, searchQueryType) {
//     //debugger;
//     if (parameters[0] === "Soccer") {
//         const settings = {
//             "async": true,
//             "crossDomain": true,
//             "url": "https://api-football-v1.p.rapidapi.com/v3/leagues?name=" + parameters[1].trim() +"&country=" + parameters[2].trim() + "&season=2021",
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
//                 "x-rapidapi-key": "eb045851b7mshab1dd65c071dccap17752djsn834e9190eaa2"
//             }
//         };
//         //This gives us the ID of a league.
//         $.ajax(settings).done(function (data) {
//             console.log(data);
//             console.log("this should give me the id of the leage.");
//             if (searchQueryType === "league" || searchQueryType === "players") {
//                 let id = data.response[0].league.id;
//                 const settings = {
//                     "async": true,
//                     "crossDomain": true,
//                     "url": "https://api-football-v1.p.rapidapi.com/v3/teams?league=" + id + "&season=2021",
//                     "method": "GET",
//                     "headers": {
//                         "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
//                         "x-rapidapi-key": "eb045851b7mshab1dd65c071dccap17752djsn834e9190eaa2"
//                     }
//                 };
//                 //This gives us the teams of the league.
//                 $.ajax(settings).done(function (data) {
//                     console.log(data);
//                     console.log("This should give me the teams.");
//                     if (searchQueryType === "players") {
//                         for (let index = 0; index < data.response.length; index++) {
//                             if (data.response[index].team.name === parameters[3].trim()) {
//                                 const settings = {
//                                     "async": true,
//                                     "crossDomain": true,
//                                     "url": "https://api-football-v1.p.rapidapi.com/v3/players?team=" + data.response[index].team.id + "&league=" + id + "&season=2021",
//                                     "method": "GET",
//                                     "headers": {
//                                         "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
//                                         "x-rapidapi-key": "eb045851b7mshab1dd65c071dccap17752djsn834e9190eaa2"
//                                     }
//                                 };
                                
//                                 $.ajax(settings).done(function (data) {
//                                     if (update) {
//                                         updateSearchHistory("Players");
//                                         console.log(data);
//                                         console.log("This should give me the players of the team.");
//                                         return;
//                                     }else {
//                                        return; 
//                                     }
                                    
//                                 });
//                             }
                            
//                         }
//                     }else if (searchQueryType === "league") {
//                         if (update) {
//                            updateSearchHistory("League");
//                             console.log(data);
//                             return; 
//                         }  
//                     }else {
//                        return; 
//                     }
//                 }); 
//             } else if (searchQueryType === "top") {
//                 const settings = {
//                     "async": true,
//                     "crossDomain": true,
//                     "url": "https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=" + data.response[0].league.id + "&season=2021",
//                     "method": "GET",
//                     "headers": {
//                         "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
//                         "x-rapidapi-key": "eb045851b7mshab1dd65c071dccap17752djsn834e9190eaa2"
//                     }
//                 };
                
//                 $.ajax(settings).done(function (data) {
//                     if (update) {
//                         updateSearchHistory("Top");
//                         console.log(data);
//                         return;
//                     }else {
//                        return; 
//                     }
//                 });
//             }
            
//         });
//     } else if (parameters[0] === "Hockey") {
//         const settings = {
//             "async": true,
//             "crossDomain": true,
//             "url": "https://api-hockey.p.rapidapi.com/leagues/?name=" + parameters[1].trim() +"&country=" + parameters[2].trim() + "&season=2021",
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": "api-hockey.p.rapidapi.com",
//                 "x-rapidapi-key": "eb045851b7mshab1dd65c071dccap17752djsn834e9190eaa2"
//             }
//         };
        
//         $.ajax(settings).done(function (data) {
//             const settings = {
//                 "async": true,
//                 "crossDomain": true,
//                 "url": "https://api-hockey.p.rapidapi.com/teams/?league=" + data.response[0].id + "&season=2021",
//                 "method": "GET",
//                 "headers": {
//                     "x-rapidapi-host": "api-hockey.p.rapidapi.com",
//                     "x-rapidapi-key": "eb045851b7mshab1dd65c071dccap17752djsn834e9190eaa2"
//                 }
//             };
//             $.ajax(settings).done(function (data) {
//                 if (update) {
//                     updateSearchHistory("League"); 
//                 }
//                 console.log(data);
//             });
//         });
//     } 
// }

// function updateSearchHistory(type) {
//     //debugger;
//     var historyButton = $("<button>");
//     var searchId;
//     var text;
//     var size;
//     //historyButton.addClass("");
//     switch (type) {
//         case "Players":
//             searchId = "search" + type + searchPlayersHistoryId;
//             size = searchPlayersHistoryId;
//             text = $("#searchPlayersInfo").val();
//             break;
//         case "Top":
//             searchId = "search" + type + searchTopHistoryId;
//             size = searchTopHistoryId;
//             text = $("#searchTopInfo").val();
//             break;
//         case "League":
//             searchId = "search" + type + searchLeagueHistoryId;
//             size = searchLeagueHistoryId;
//             text = $("#searchLeagueInfo").val();
//             break;
//         default:
//             break;
//     }
//     if (size > 7){
//         var id = "#search" + type + "0";
//         $(id).remove();
//         for (var i = 0; i < 8;i++) {
//             $("#search" + type + (i+1)).attr("id", "search" + type + i);
//             saveSearchHistory("search" + type + i, $("#search" + type + i).text());
//         }
//         searchId = 7;
//     }
//     idValue = searchId
//     historyButton.attr("id", idValue);
//     historyButton.text(text);
//     switch (type) {
//         case "Players":
//             //debugger;
//             $(".searchPlayersHistory").append(historyButton);
//             searchPlayersHistoryId++
//             break;
//         case "Top":
//             $(".searchTopHistory").append(historyButton);
//             searchTopHistoryId++
//             break;
//         case "League":
//             $(".searchLeagueHistory").append(historyButton);
//             searchLeagueHistoryId++
//             break;
//         default:
//             break;
//     }
//     saveSearchHistory(idValue, text, type); 
// }

// function saveSearchHistory(id, text, type) {
//     localStorage.setItem(id, JSON.stringify(text));
//     switch (type) {
//         case "Players":
//             localStorage.setItem("size" + type, JSON.stringify(searchPlayersHistoryId));
//             break;
//         case "Top":
//             localStorage.setItem("size" + type, JSON.stringify(searchTopHistoryId));
//             break;
//         case "League":
//             localStorage.setItem("size" + type, JSON.stringify(searchLeagueHistoryId));
//             break;
//         default:
//             break;
//     }
// }

// $("#searchLeagueBtn").on("click", function(){
//     var search = $("#searchLeagueInfo").val();
//     var query = search.split(",");
//     console.log(query);
//     if (!search){
//         alert("Please enter the name of the league/cup and country.");
//     } else {
//         searchQuery(query, true, "league");
//     }
// });

// $(".searchLeagueHistory").on("click", "button", function(){
//     var search = $(this).text();
//     var query = search.split(",");
//     // cityName = query;
//     searchQuery(query, false, "league");
// });

// $("#searchTopBtn").on("click", function(){
//     var search = $("#searchTopInfo").val();
//     var query = search.split(",");
//     console.log(query);
//     if (!search || query[0] === "Hockey"){
//         alert("Please enter the name of the league/cup and country.");
//     } else {
//         searchQuery(query, true, "top");
//     }
// });

// $(".searchTopHistory").on("click", "button", function(){
//     var search = $(this).text();
//     var query = search.split(",");
//     // cityName = query;
//     searchQuery(query, false, "top");
// });

// $("#searchPlayersBtn").on("click", function(){
//     var search = $("#searchPlayersInfo").val();
//     var query = search.split(",");
//     console.log(query);
//     if (!search){
//         alert("Please enter the name of the league/cup and country.");
//     } else {
//         //debugger;
//         searchQuery(query, true, "players");
//     }
// });

// $(".searchPlayersHistory").on("click", "button", function(){
//     var search = $(this).text();
//     var query = search.split(",");
//     searchQuery(query, false, "players");
// });
