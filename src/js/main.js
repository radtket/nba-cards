const myHeaders = {
	headers: new Headers({
		"Ocp-Apim-Subscription-Key": "b2d428251c6d491d92dd5b9d093a1e3f"
	})
};

const teamsPromise = fetch(
	"https://api.fantasydata.net/v3/nba/stats/JSON/teams",
	myHeaders
);

const arenasPromise = fetch(
	"https://api.fantasydata.net/v3/nba/stats/JSON/Stadiums",
	myHeaders
);

const htmlContainer = document.querySelector(".container");

Promise.all([teamsPromise, arenasPromise])
	.then(responses => Promise.all(responses.map(res => res.json())))
	.then(responses => {
		responses[1].reduce((teamsObj, arenasIter) => {
			teamsObj.filter(arenaCB => {
				if (arenaCB.StadiumID === arenasIter.StadiumID) {
					Object.assign(arenaCB, {
						StadiumInfo: arenasIter
					});
				}
				return true;
			});
			return teamsObj;
		}, responses[0]);
		return responses[0];
	})
	.then(teams => {
		teams.map(team => {
			const htmlString = `
			<div class="team--wrap" style="
				background-color: #${team.PrimaryColor};
				color: #${team.SecondaryColor};
				">
          <div class="team--wrap__content">
						<img
							class="img-circle center-block"
							src="${team.WikipediaLogoUrl}"
							alt="${team.Name} Logo" w
							width="140"
							height="140"
							style="background-color: #${team.TertiaryColor || team.SecondaryColor};"
						>
						<h2>${team.City} ${team.Name}</h2>
						<h4>${team.StadiumInfo.Name}</h4>
						<address>
						${team.StadiumInfo.Address}
						${team.StadiumInfo.City},
						${team.StadiumInfo.State}
						${team.StadiumInfo.Zip}
						</address>
					</div>
				</div>
      `;
			htmlContainer.innerHTML += htmlString;
			return htmlString;
		});
	});
