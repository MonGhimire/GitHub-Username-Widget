const btn = document.querySelector(".btn");
const enterText = document.querySelector(".enterText");
const main = document.querySelector("main");

// ----------------------------------------------------------Onclick Action on Button----------------------------------------------------

btn.addEventListener("click", async function () {
  const userName = enterText.value;
  const url = `https://api.github.com/users/${userName}/repos`;

  const response = await fetch(url);
  const repos = await response.json();
  console.log(repos);

  let newSortedRepos = repos.sort(function (a, b) {
    return Date.parse(b.pushed_at) - Date.parse(a.pushed_at);
  });

  newSortedRepos.forEach((repo) => {
    let beginDateOfRepos = repo.pushed_at;
    let diff = (new Date().getTime() - Date.parse(beginDateOfRepos)) / 1000;
    let properTimeDisplay = getProperTime(diff);

    const div = document.createElement("div");
    div.innerHTML = `<a class= "link" target="blank" href="${repo.svn_url}">
    <div class = "pDiv"><p>${repo.name}</p><p>${properTimeDisplay} ago</p></div>
    <p>${repo.description}<p></a>`;

    main.append(div);
    div.classList.add("repoBox");
  });
});

// -----------------------------------------------------Word Fix for single/plural values--------------------------------------------------------------------
function fixPlural(number, word) {
  return number > 1 ? number + " " + word + "s" : number + " " + word;
}

// ---------------------------------------------------------------------Proper Time Display from seconds to higher units ----------------------------------------
function getProperTime(second) {
  const timeArr = [
    { name: "second", value: 0 },
    { name: "minute", value: 60 },
    { name: "hour", value: 60 * 60 },
    { name: "day", value: 60 * 60 * 24 },
    { name: "week", value: 60 * 60 * 24 * 7 },
    { name: "month", value: 60 * 60 * 24 * 7 * 4 },
    { name: "year", value: 60 * 60 * 24 * 7 * 4 * 12 },
  ];

  let resultArr = timeArr.filter((x) => second - x.value >= 0);
  let unit = resultArr.reduce(function (prev, current) {
    return prev.y > current.y ? prev : current;
  });

  return fixPlural(Math.ceil(second / unit.value), unit.name);
}



