const myHeaders = {
    headers: new Headers({
        'Ocp-Apim-Subscription-Key': 'b2d428251c6d491d92dd5b9d093a1e3f'
    })
}

const teamsPromise =  fetch('https://api.fantasydata.net/v3/nba/stats/JSON/teams', myHeaders);
const arenasPromise = fetch('https://api.fantasydata.net/v3/nba/stats/JSON/Stadiums', myHeaders);

let result;

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

const htmlContainer = document.querySelector('.container');

Promise
    .all([teamsPromise, arenasPromise])
    .then(responses => {
        return Promise.all(responses.map(res => res.json()))
    })
    .then(responses => {
        let [teamsData, arenasData] = responses;
        return teamsData.filter(team => arenasData.filter(arena => team.StadiumID === arena.StadiumID ? team.StadiumID = arena : false ));
    })
    .then(teams => {
        teams.map(team => {
            let htmlString = `
            <div class="col-lg-4" style="background-color: #${team.PrimaryColor}; color: #${team.SecondaryColor};">
                <img class="img-circle center-block" src="${team.WikipediaLogoUrl}" alt="${team.Name}Logo" width="140" height="140" style="background-color: #${team.TertiaryColor || team.SecondaryColor};">
                <h2>${team.City} ${team.Name}</h2>
                <h4>${team.StadiumID.Name}</h4>
                <address>${team.StadiumID.Address} ${team.StadiumID.City}, ${team.StadiumID.State} ${team.StadiumID.Zip}</address>
            </div>
            `;
            htmlContainer.innerHTML += htmlString;
        })
    })
