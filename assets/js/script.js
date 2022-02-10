var searchPlayersHistoryId = 0;
var searchTopHistoryId = 0;
var searchLeagueHistoryId = 0;

//This function it used to load save items into the wenpage.
//There are three sets of saved variables, one for each type of available seaarch.
function loadSearchHistory() {
    var array = ["Players", "Top", "League"]
    for (let index = 0; index < array.length; index++) {
        var type = array[index];
    var size = JSON.parse(localStorage.getItem("size" + type));
        for (var i = 0; i < size; i++) {
            var key = "search" + array[index] + i;
            var text = JSON.parse(localStorage.getItem(key));
            var divEL = $("<div>");
            divEL.addClass("stacked-for-small button-group");
            var historyButton = $("<button>");
            historyButton.addClass("button");
            //historyButton.addClass("col-12 my-2 btn btn-secondary");
            historyButton.attr("id", key);
            historyButton.text(text);
            switch (index) {
                case 0:
                    $(".searchPlayersHistory").append(historyButton);
                    searchPlayersHistoryId++;
                    break;
                case 1:
                    $(".searchTopHistory").append(historyButton);
                    searchTopHistoryId++;
                    break;
                case 2:
                    $(".searchLeagueHistory").append(historyButton);
                    searchLeagueHistoryId++;
                    break;
                default:
                    break;
            }            
        }    
    }
    
}

loadSearchHistory();

//Function used to populate the cards for the six provided leagues on the webpage.
function populateCards() {
    var leagueCall = [39, 135, 78, 57, 3, 58];
    var leagues = [$(".premierLTCC"), $(".serieATCC"), $(".bundesliga1TCC"), $(".nHLTCC"), $(".aHLTCC"), $(".oHLTCC")];
    let elementIndex = 0;
    var api = "";
    var host = "";
    for (let index = 0; index < leagueCall.length; index++) {
        if (elementIndex < 3) {
        api = "https://api-football-v1.p.rapidapi.com/v3/teams?league=";
        host = "api-football-v1.p.rapidapi.com";
        } else {
            api = "https://api-hockey.p.rapidapi.com/teams/?league=";
            host = "api-hockey.p.rapidapi.com";
        }
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": api + leagueCall[index] + "&season=2021",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": host,
                "x-rapidapi-key": "32a781f638mshbdc6d0ae4e9348bp1611eejsn3a3dc5b6ca6b"
            }
        };
        elementIndex++;
        $.ajax(settings).done(function (data) {
            var sport = "";
            console.log(data);
            switch (data.parameters.league) {
                case "39":
                case "135":
                case "78":
                    sport = "soccer";
                    switch (data.parameters.league) {
                        case "39":
                            var leagueEl = leagues[0];
                            break;
                        case "135":
                            var leagueEl = leagues[1];
                            break;
                        case "78":
                            var leagueEl = leagues[2];
                            break;
                        }
                    break;
                case "57":
                case "58":
                case "3":
                    sport = "hockey";
                    switch (data.parameters.league) {
                        case "57":
                            var leagueEl = leagues[3];
                            break;
                        case "58":
                            var leagueEl = leagues[4];
                            break;
                        case "3":
                            var leagueEl = leagues[5];
                            break;
                    }
                    break;
            }
            
            //First Modal.
            if (sport === "soccer") {
                for (let index = 0; index < data.response.length; index++) {
                    var buttonEl = $("<button>");
                    buttonEl.addClass("button");
                        var helper = data.response[index].team.name;
                        helper = helper.replace(/\s/g, '');
                    switch (data.parameters.league) {
                        case "39":
                            buttonEl.attr("data-open", helper);
                            break;
                        case "135":
                            buttonEl.attr("data-open", helper);
                            break;
                        case "78":
                            buttonEl.attr("data-open", helper);
                            break;
                        default:
                            break;
                    }
                    //For the clickable team card.
                    buttonEl.attr("id", "team-info" + helper);
                    buttonEl.appendTo(leagueEl);

                    var cardEl = $("<article>");
                    cardEl.addClass("card");
                    cardEl.appendTo(buttonEl);

                    var logoEl = $("<img>");
                    logoEl.attr("src", data.response[index].team.logo);
                    logoEl.attr("id", "team-logo");
                    logoEl.appendTo(cardEl);

                    var cardSectionEl = $("<div>");
                    cardSectionEl.addClass("card-section");
                    cardSectionEl.appendTo(cardEl);

                    var titleEl = $("<h4>");
                    titleEl.appendTo(cardSectionEl);

                    var strongEl = $("<strong>");
                    strongEl.text(data.response[index].team.name);
                    strongEl.appendTo(cardSectionEl);

                    var cardDividerEl = $("<div>");
                    cardDividerEl.addClass("card-divider");
                    cardDividerEl.appendTo(cardEl);

                    var paraEl = $("<p>");
                    paraEl.text("Click this card for more information");
                    paraEl.appendTo(cardDividerEl);

                    //For the team information.
                    var id = "#" + helper;
                    var sectionEl = $(id);

                    var teamInfoEl = $("<p>");
                    teamInfoEl.text("Date of Foundation: " + data.response[index].team.founded);
                    teamInfoEl.appendTo(sectionEl);

                    var imgEl = $("<img>");
                    imgEl.attr("src", data.response[index].venue.image);
                    imgEl.appendTo(sectionEl);

                    var venueEl = $("<h2>");
                    venueEl.text(data.response[index].venue.name);
                    venueEl.appendTo(sectionEl);

                    var venueInfoEl = $("<p>");
                    venueInfoEl.html("Capacity of venue: " + data.response[index].venue.capacity +
                    "<br>" + "Type of grass: " + data.response[index].venue.surface);
                    venueInfoEl.appendTo(sectionEl);
                }
            } else if (sport === "hockey") {
                for (let index = 0; index < data.response.length; index++) {
                    var buttonEl = $("<button>");
                    buttonEl.addClass("button");
                    var helper = data.response[index].name;
                        helper = helper.replace(/\s/g, '');
                        if (data.response[index].name == "St.LouisBlues") {
                            helper = "StLouisBlues"
                        } else if (data.response[index].name == "Wilkes-Barre/Scranton") {
                            helper = "WilkesBarreScranton";
                        }
                    switch (data.parameters.league) {
                        case "57":
                            buttonEl.attr("data-open", helper);
                            break;
                        case "58":
                            buttonEl.attr("data-open", helper);
                            break;
                        case "3":
                            buttonEl.attr("data-open", helper);
                            break;
                        default:
                            break;
                    }
                    buttonEl.attr("id", "team-info" + helper);
                    buttonEl.appendTo(leagueEl);

                    var cardEl = $("<article>");
                    cardEl.addClass("card");
                    cardEl.appendTo(buttonEl);

                    var logoEl = $("<img>");
                    logoEl.attr("src", data.response[index].logo);
                    logoEl.attr("id", "team-logo");
                    logoEl.appendTo(cardEl);

                    var cardSectionEl = $("<div>");
                    cardSectionEl.addClass("card-section");
                    cardSectionEl.appendTo(cardEl);

                    var titleEl = $("<h4>");
                    titleEl.appendTo(cardSectionEl);

                    var strongEl = $("<strong>");
                    strongEl.text(data.response[index].name);
                    strongEl.appendTo(cardSectionEl);

                    var cardDividerEl = $("<div>");
                    cardDividerEl.addClass("card-divider");
                    cardDividerEl.appendTo(cardEl);

                    var paraEl = $("<p>");
                    paraEl.text("Click this card for more information");
                    paraEl.appendTo(cardDividerEl);

                    var id = "#" + helper;
                    var sectionEl = $(id);

                    var logoEl = $("<img>");
                    logoEl.attr("src", data.response[index].logo);
                    logoEl.attr("id", "team-logo");
                    logoEl.appendTo(sectionEl);

                    var teamInfoEl = $("<p>");
                    teamInfoEl.html("Date of Foundation: " + data.response[index].founded + 
                    "<br>" + "Arena Name: " + data.response[index].arena.name);
                    teamInfoEl.appendTo(sectionEl);
                }
            } else {}
        });
    }
}

populateCards();

//Function used to take user input and provied an answer releted to the input.
function searchQuery(parameters, update, searchQueryType) {
    //debugger;
    if (parameters[0] === "Soccer") {
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api-football-v1.p.rapidapi.com/v3/leagues?name=" + parameters[1].trim() +"&country=" + parameters[2].trim() + "&season=2021",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "32a781f638mshbdc6d0ae4e9348bp1611eejsn3a3dc5b6ca6b"
            }
        };
        //This gives us the ID of a league.
        $.ajax(settings).done(function (data) {
            console.log(data);
            console.log("this should give me the id of the leage.");
            if (searchQueryType === "league" || searchQueryType === "players") {
                let id = data.response[0].league.id;
                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://api-football-v1.p.rapidapi.com/v3/teams?league=" + id + "&season=2021",
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                        "x-rapidapi-key": "32a781f638mshbdc6d0ae4e9348bp1611eejsn3a3dc5b6ca6b"
                    }
                };
                //This gives us the teams of the league.
                $.ajax(settings).done(function (data) {
                    if (searchQueryType === "players") {
                        for (let index = 0; index < data.response.length; index++) {
                            if (data.response[index].team.name === parameters[3].trim()) {
                                const settings = {
                                    "async": true,
                                    "crossDomain": true,
                                    "url": "https://api-football-v1.p.rapidapi.com/v3/players?team=" + data.response[index].team.id + "&league=" + id + "&season=2021",
                                    "method": "GET",
                                    "headers": {
                                        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                                        "x-rapidapi-key": "32a781f638mshbdc6d0ae4e9348bp1611eejsn3a3dc5b6ca6b"
                                    }
                                };
                                
                                $.ajax(settings).done(function (data) {
                                    if (update) {
                                        updateSearchHistory("Players");
                                        clearSearch();
                                        showQuery(data, searchQueryType);
                                        return;
                                    }else {
                                        clearSearch();
                                        showQuery(data, searchQueryType);
                                       return; 
                                    }
                                    
                                });
                            }
                            
                        }
                    }else if (searchQueryType === "league") {
                        if (update) {
                           updateSearchHistory("League");
                            clearSearch();
                            showQuery(data, searchQueryType);
                            return; 
                        }else {
                            clearSearch();
                            showQuery(data, searchQueryType);
                            return; 
                        } 
                    }
                }); 
            } else if (searchQueryType === "top") {
                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=" + data.response[0].league.id + "&season=2021",
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                        "x-rapidapi-key": "32a781f638mshbdc6d0ae4e9348bp1611eejsn3a3dc5b6ca6b"
                    }
                };
                
                $.ajax(settings).done(function (data) {
                    if (update) {
                        updateSearchHistory("Top");
                        clearSearch();
                        showQuery(data, searchQueryType);
                        return;
                    }else {
                        clearSearch();
                        showQuery(data, searchQueryType);
                       return; 
                    }
                });
            }
            
        });
    } else if (parameters[0] === "Hockey") {
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api-hockey.p.rapidapi.com/leagues/?name=" + parameters[1].trim() +"&country=" + parameters[2].trim() + "&season=2021",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-hockey.p.rapidapi.com",
                "x-rapidapi-key": "32a781f638mshbdc6d0ae4e9348bp1611eejsn3a3dc5b6ca6b"
            }
        };
        
        $.ajax(settings).done(function (data) {
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api-hockey.p.rapidapi.com/teams/?league=" + data.response[0].id + "&season=2021",
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-hockey.p.rapidapi.com",
                    "x-rapidapi-key": "32a781f638mshbdc6d0ae4e9348bp1611eejsn3a3dc5b6ca6b"
                }
            };
            $.ajax(settings).done(function (data) {
                var searchQueryType = "hockeyLeague";
                if (update) {
                    updateSearchHistory("League");
                    clearSearch(); 
                    showQuery(data,searchQueryType);
                }
                clearSearch(); 
                showQuery(data,searchQueryType);
            });
        });
    } else {
        //Room for future expansion to more sports.
    }
}

//Function used to populate the search history with valid entries from the user input.
//Limit of eight entries for each search type.
function updateSearchHistory(type) {
    var divEL = $("<div>");
    divEL.addClass("stacked-for-small button-group");
    var historyButton = $("<button>");
    historyButton.addClass("button");
    historyButton.appendTo(divEL);
    var text;
    var size;
    switch (type) {
        case "Players":
            searchId = "search" + type + searchPlayersHistoryId;
            size = searchPlayersHistoryId;
            text = $("#searchPlayersInfo").val();
            break;
        case "Top":
            searchId = "search" + type + searchTopHistoryId;
            size = searchTopHistoryId;
            text = $("#searchTopInfo").val();
            break;
        case "League":
            searchId = "search" + type + searchLeagueHistoryId;
            size = searchLeagueHistoryId;
            text = $("#searchLeagueInfo").val();
            break;
        default:
            break;
    }
    if (size > 7){
        var id = "#search" + type + "0";
        $(id).remove();
        for (var i = 0; i < 8;i++) {
            $("#search" + type + (i+1)).attr("id", "search" + type + i);
            saveSearchHistory("search" + type + i, $("#search" + type + i).text());
        }
        size = 7;
        switch (type) {
            case "Players":
                searchPlayersHistoryId = size;
                break;
            case "Top":
                searchTopHistoryId = size;
                break;
            case "League":
                searchTopHistoryId = searchLeagueHistoryId;
                break;
            default:
                break;
        }
    }
    idValue = "search" + type + size;
    historyButton.attr("id", idValue);
    historyButton.text(text);
    switch (type) {
        case "Players":
            $(".searchPlayersHistory").append(divEL);
            searchPlayersHistoryId++
            break;
        case "Top":
            $(".searchTopHistory").append(divEL);
            searchTopHistoryId++
            break;
        case "League":
            $(".searchLeagueHistory").append(divEL);
            searchLeagueHistoryId++
            break;
        default:
            break;
    }
    saveSearchHistory(idValue, text, type); 
}

//Function used to save each user input int its own variable, depending on the search type.
function saveSearchHistory(id, text, type) {
    localStorage.setItem(id, JSON.stringify(text));
    switch (type) {
        case "Players":
            localStorage.setItem("size" + type, JSON.stringify(searchPlayersHistoryId));
            break;
        case "Top":
            localStorage.setItem("size" + type, JSON.stringify(searchTopHistoryId));
            break;
        case "League":
            localStorage.setItem("size" + type, JSON.stringify(searchLeagueHistoryId));
            break;
        default:
            break;
    }
}

//Function used to clear the section of the webpage were query resuts are shown.
function clearSearch() {
    var sectionEl = $(".showResult");
    sectionEl.children().remove();
}

//Function used to display answers onto the screen.
function showQuery(data, type) {
    var sectionEl = $(".showResult");
    switch (type) {
        case "players":
            for (let index = 0; index < data.response.length; index++) {
                var articleEl = $("<article>");
                var imgEl = $("<img>");
                var playerNameEl = $("<h2>");
                var playerInfoEl = $("<p>");
                articleEl.appendTo(sectionEl);

                imgEl.attr("src", data.response[index].player.photo);
                imgEl.appendTo(articleEl);

                playerNameEl.text(data.response[index].player.name);
                playerNameEl.appendTo(articleEl);

                playerInfoEl.html("Nationality: " + data.response[index].player.nationality +
                "<br>" + "Age: " + data.response[index].player.age + "<br>" + "Height: " + 
                data.response[index].player.height + "<br>" + "Position: " + 
                data.response[index].statistics[0].games.position);
                playerInfoEl.appendTo(articleEl);
            }
            break;
        case "top":
            for (let index = 0; index < data.response.length; index++) {
                var articleEl = $("<article>");
                var imgEl = $("<img>");
                var playerNameEl = $("<h2>");
                var infoEl = $("<p>");
                articleEl.appendTo(sectionEl);

                imgEl.attr("src", data.response[index].player.photo);
                imgEl.appendTo(articleEl);

                playerNameEl.text(data.response[index].player.name);
                playerNameEl.appendTo(articleEl);
                
                infoEl.html("Team: " + data.response[index].statistics[0].team.name + 
                "<br>" + "Goals scored: " + data.response[index].statistics[0].goals.total);
                infoEl.appendTo(articleEl);
            }
            break;
        case "league":
            for (let index = 0; index < data.response.length; index++) {
                var articleEl = $("<article>");
                var logoEl = $("<img>");
                var imgEl = $("<img>");
                var teamEl = $("<h2>");
                var venueEl = $("<h2>");
                var teamInfoEl = $("<p>");
                var venueInfoEl = $("<p>");
                articleEl.appendTo(sectionEl);
                logoEl.attr("src", data.response[index].team.logo);
                logoEl.appendTo(articleEl);

                teamEl.text(data.response[index].team.name);
                teamEl.appendTo(articleEl);

                teamInfoEl.text("Date of Foundation: " + data.response[index].team.founded);
                teamInfoEl.appendTo(articleEl);

                imgEl.attr("src", data.response[index].venue.image);
                imgEl.appendTo(articleEl);

                venueEl.text(data.response[index].venue.name);
                venueEl.appendTo(articleEl);

                venueInfoEl.html("Capacity of venue: " + data.response[index].venue.capacity +
                "<br>" + "Type of grass: " + data.response[index].venue.surface);
                venueInfoEl.appendTo(articleEl);
            }
            break;
        case "hockeyLeague":
            for (let index = 0; index < data.response.length; index++) {
                var articleEl = $("<article>");
                var logoEl = $("<img>");
                var teamEl = $("<h2>");
                var venueEl = $("<h2>");
                var teamInfoEl = $("<p>");
                articleEl.appendTo(sectionEl);
                logoEl.attr("src", data.response[index].logo);
                logoEl.appendTo(articleEl);

                teamEl.text(data.response[index].name);
                teamEl.appendTo(articleEl);

                teamInfoEl.html("Date of Foundation: " + data.response[index].founded + 
                "<br>" + "Arena Name: " + data.response[index].arena.name);
                teamInfoEl.appendTo(articleEl);
            }
            break;
        default:
            break;
    }

}


//On click listner events for various buttons on the page.
$("#searchLeagueBtn").on("click", function(){
    var search = $("#searchLeagueInfo").val();
    var query = search.split(",");
    console.log(query);
    if (!search){
        alert("Please enter the name of the league/cup and country.");
    } else {
        searchQuery(query, true, "league");
    }
});

$(".searchLeagueHistory").on("click", "button", function(){
    var search = $(this).text();
    var query = search.split(",");
    // cityName = query;
    searchQuery(query, false, "league");
});

$("#searchTopBtn").on("click", function(){
    var search = $("#searchTopInfo").val();
    var query = search.split(",");
    console.log(query);
    if (!search || query[0] === "Hockey"){
        alert("Please enter the name of the league/cup and country.");
    } else {
        searchQuery(query, true, "top");
    }
});

$(".searchTopHistory").on("click", "button", function(){
    var search = $(this).text();
    var query = search.split(",");
    // cityName = query;
    searchQuery(query, false, "top");
});

$("#searchPlayersBtn").on("click", function(){
    var search = $("#searchPlayersInfo").val();
    var query = search.split(",");
    console.log(query);
    if (!search){
        alert("Please enter the name of the league/cup and country.");
    } else {
        //debugger;
        searchQuery(query, true, "players");
    }
});

$(".searchPlayersHistory").on("click", "button", function(){
    var search = $(this).text();
    var query = search.split(",");
    searchQuery(query, false, "players");
});

$("#deleteSearch").on("click", function(){
    clearSearch();
});