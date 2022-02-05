 //This is for the teams of each league. id=39 Premier, id=135 Serie A, id=78 Bundesliga 1, id="162" Primera Division.
 //Tht not to use this function to much while testing. We have a limit of 100/day.
 function populateCards() {
    var leagueCall = [39, 135, 78, 162, 57, 58, 3];
    var leagues = [$("#leagueSoccer1"), $("#leagueSoccer2"), $("#leagueSoccer3"), $("#leagueSoccer4"), $("#leagueHockey1"), $("#leagueHockey2"), $("#leagueHockey3")];
    let elementIndex = 0;
    var api = "";
    var host = "";
    for (let index = 0; index < leagueCall.length; index++) {
        if (elementIndex < 4) {
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
                "x-rapidapi-key": "eb045851b7mshab1dd65c071dccap17752djsn834e9190eaa2"
            }
        };
        elementIndex++;
        $.ajax(settings).done(function (data) {
            var sport = "";
            console.log(data);
            switch (data.parameters.league) {
                case "39":
                    var leagueEl = leagues[0];
                    sport = "soccer";
                    break;
                case "135":
                    var leagueEl = leagues[1];
                    sport = "soccer";
                    break;
                case "78":
                    var leagueEl = leagues[2];
                    sport = "soccer";
                    break;
                case "162":
                    var leagueEl = leagues[3];
                    sport = "soccer";
                    break;
                case "57":
                    var leagueEl = leagues[4];
                    sport = "hockey";
                    break;
                case "58":
                    var leagueEl = leagues[5];
                    sport = "hockey";
                    break;
                case "3":
                    var leagueEl = leagues[6];
                    sport = "hockey";
                    break;
            }
            if (sport === "soccer") {
                for (let index = 0; index < data.response.length; index++) {
                    var cardEl = $("<div>");
                    cardEl.addClass("card");
                    cardEl.appendTo(leagueEl);

                    var imgEl = $("<img>");
                    imgEl.attr("src", data.response[index].team.logo);
                    imgEl.attr("id", "team-logo");
                    imgEl.appendTo(cardEl);

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

                    var listEl = $("<ul>");
                    listEl.appendTo(cardDividerEl);

                    var listItem1El = $("<li>");
                    listItem1El.appendTo(listEl);

                    var linkEl = $("<a>");
                    linkEl.attr("href", "#");
                    linkEl.text("Team website");
                    linkEl.appendTo(listItem1El);
                }
            } else if (sport === "hockey") {
                for (let index = 0; index < data.response.length; index++) {
                    var cardEl = $("<div>");
                    cardEl.addClass("card");
                    cardEl.appendTo(leagueEl);

                    var imgEl = $("<img>");
                    imgEl.attr("src", data.response[index].logo);
                    imgEl.attr("id", "team-logo");
                    imgEl.appendTo(cardEl);

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

                    var listEl = $("<ul>");
                    listEl.appendTo(cardDividerEl);

                    var listItem1El = $("<li>");
                    listItem1El.appendTo(listEl);

                    var linkEl = $("<a>");
                    linkEl.attr("href", "#");
                    linkEl.text("Team website");
                    linkEl.appendTo(listItem1El);
                }
            } else {}
        });
    }
}

function main () {
    // populateCards();
}

$("#sport1").on("click", function(){
    $("#soccer").addClass("visible");
    $("#soccer").removeClass("hide");
    $("#hockey").removeClass("visible");
    $("#hockey").addClass("hide");
})

$("#sport2").on("click", function(){
    $("#hockey").addClass("visible");
    $("#hockey").removeClass("hide");
    $("#soccer").removeClass("visible");
    $("#soccer").addClass("hide");
})


//https://api.musixmatch.com/ws/1.1/track.search%3fq_lyrics=BABY+SHARK&apikey=28e8336b7ccf4b5261bf290e9cfc6874&s_track_rating=desc&page_size=10&page=1