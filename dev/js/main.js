'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var myHeaders = {
    headers: new Headers({
        'Ocp-Apim-Subscription-Key': 'b2d428251c6d491d92dd5b9d093a1e3f'
    })
};

var teamsPromise = fetch('https://api.fantasydata.net/v3/nba/stats/JSON/teams', myHeaders);
var arenasPromise = fetch('https://api.fantasydata.net/v3/nba/stats/JSON/Stadiums', myHeaders);

var result = void 0;

// Shorthand Method
// Promise
//     .all([teamsPromise, arenasPromise])
//     .then(responses => {
//         return Promise.all(responses.map(res => res.json()))
//     })
//     .then(responses => {
//         let [teamsData, arenasData] = responses;
//         result = teamsData.filter(team => arenasData.filter(arena => team.StadiumID === arena.StadiumID ? team.StadiumID = arena : false ));
//     });


// Conditional Statement Version
// Promise
//     .all([teamsPromise, arenasPromise])
//     .then(responses => {
//         return Promise.all(responses.map(res => res.json()))
//     })
//     .then(responses => {
//         let [teamsData, arenasData] = responses;
//         result = teamsData.filter(team => {
//             return arenasData.filter(arena => {
//                 if(team.StadiumID === arena.StadiumID) {
//                     team.StadiumID = arena;
//                 }
//             })
//         });
//     });

var htmlContainer = document.querySelector('.container');

Promise.all([teamsPromise, arenasPromise]).then(function (responses) {
    return Promise.all(responses.map(function (res) {
        return res.json();
    }));
}).then(function (responses) {
    var _responses = _slicedToArray(responses, 2),
        teamsData = _responses[0],
        arenasData = _responses[1];

    return teamsData.filter(function (team) {
        return arenasData.filter(function (arena) {
            return team.StadiumID === arena.StadiumID ? team.StadiumID = arena : false;
        });
    });
}).then(function (teams) {
    teams.map(function (team) {
        var htmlString = '\n            <div class="col-lg-4" style="background-color: #' + team.PrimaryColor + '; color: #' + team.SecondaryColor + ';">\n                <img class="img-circle center-block" src="' + team.WikipediaLogoUrl + '" alt="' + team.Name + 'Logo" width="140" height="140" style="background-color: #' + (team.TertiaryColor || team.SecondaryColor) + ';">\n                <h2>' + team.City + ' ' + team.Name + '</h2>\n                <h4>' + team.StadiumID.Name + '</h4>\n                <address>' + team.StadiumID.Address + ' ' + team.StadiumID.City + ', ' + team.StadiumID.State + ' ' + team.StadiumID.Zip + '</address>\n            </div>\n            ';
        htmlContainer.innerHTML += htmlString;
    });
});
//# sourceMappingURL=main.js.map
