import './style.css'
import { IFilm, IFilmResult } from './interfaces/IFilm';
import { IPerson, IPersonResult } from './interfaces/IPerson'
import { IPlanet, IPlanetResult } from './interfaces/IPlanet'

const BASE_URL = "https://swapi.dev/api/"
const FILM_ROUTE = `${BASE_URL}/films/`
const PLANET_ROUTE = `${BASE_URL}/planets/`
const PERSON_ROUTE = `${BASE_URL}/people/`

const outputElement = document.getElementById("output-wrapper") as HTMLDivElement;
const filmElement = document.getElementById("api-films") as HTMLAnchorElement;
const planetElement = document.getElementById("api-planets") as HTMLAnchorElement;
const personElement = document.getElementById("api-people") as HTMLAnchorElement;
const inputSearchbar = document.getElementById("searchInput") as HTMLInputElement;
console.log(inputSearchbar);


// EventListener ansprechen Kategorie Filme/Callbackfunction
filmElement?.addEventListener("click", async () => {
  try {
    const response: Response = await fetch(FILM_ROUTE)
    const data = await response.json()
    outputElement.innerHTML = ""
    console.log(data.results);
    data.results.forEach((result: IFilmResult) => { 
      const filmDiv = document.createElement("div") as HTMLDivElement;
      filmDiv.className = "card";
      filmDiv.innerHTML = displayFilm(result)
      outputElement.appendChild(filmDiv)
    })
  } catch (error) {
    console.error("Error: process failed", error);
  }
})

// function: Filme anzeigen lassen
function displayFilm(film: IFilmResult): string {
  const resultAsString = `
    <h4>Title: ${film.title}</h4>
    <p>Director: ${film.director}</p>
    <p>Release Date: ${film.release_date}</p>
    `
  return resultAsString
}

// EventListener ansprechen Kategorie Planets/Callbackfunction
planetElement?.addEventListener("click", async () => {
  try {
    const response: Response = await fetch(PLANET_ROUTE)
    const data = await response.json()
    outputElement.innerHTML = ""
    console.log(data.results);
    data.results.forEach((result: IPlanetResult) => { 
      console.log(result);
      
      const planetDiv = document.createElement("div") as HTMLDivElement;
      planetDiv.className = "card";
      planetDiv.innerHTML = displayPlanet(result)
      outputElement.appendChild(planetDiv)
    })
  } catch (error) {
    console.error("Error: process failed", error);
  }
})

// function: Planets anzeigen lassen
function displayPlanet(planet: IPlanetResult): string {
  const resultAsString = `
    <h4>Name: ${planet.name}</h4>
    <p>Terrain: ${planet.terrain}</p>
    <p>Climate: ${planet.climate}</p>
    `
  return resultAsString
}

// EventListener ansprechen Kategorie People/Callbackfunction
personElement?.addEventListener("click", async () => {
  try {
    const response: Response = await fetch(PERSON_ROUTE)
    const data = await response.json()
    outputElement.innerHTML = ""
    console.log(data.results);
    data.results.forEach(async(result: IPersonResult) => { 
      const personDiv = document.createElement("div") as HTMLDivElement;
      personDiv.className = "card";
      personDiv.innerHTML = await displayPerson(result)
      outputElement.appendChild(personDiv)
    })
  } catch (error) {
    console.error("Error: process failed", error);
  }
})

// function: People anzeigen lassen
async function displayPerson(person: IPersonResult): Promise<string> {
  const homeworldVariable = await fetchHomeworld(person.homeworld)
  const resultAsString = `
    <h4>Name: ${person.name}</h4>
    <p>Gender: ${person.gender}</p>
    <p>Birth Year: ${person.birth_year}</p>
    <p>Homeworld: ${homeworldVariable}</p>
    `
  return resultAsString
}
// immer wenn ich eine async-function schreibe, brauche ich zwingend den Type Promise! Hier ist es: Promise<string>
async function fetchHomeworld(url: string): Promise<string> {
  const response: Response = await fetch(url)
  const responseData = await response.json()
  console.log(responseData);
  
  return responseData.name
} 

// function searchbar
inputSearchbar?.addEventListener("input", async () => {
  const query = inputSearchbar.value.toLowerCase();
  if (!query) {
    outputElement.innerHTML = ""; // Clear the results if the search bar is empty
    return;
  }

  try {
    // Fetch Films
    const filmResponse: Response = await fetch(FILM_ROUTE);
    const filmData: { results: IFilmResult[] } = await filmResponse.json();
    const filteredFilms = filmData.results.filter((film: IFilmResult) =>
      film.title.toLowerCase().includes(query)
    );

    // Fetch Planets
    const planetResponse: Response = await fetch(PLANET_ROUTE);
    const planetData: { results: IPlanetResult[] } = await planetResponse.json();
    const filteredPlanets = planetData.results.filter((planet: IPlanetResult) =>
      planet.name.toLowerCase().includes(query)
    );

    // Fetch People
    const personResponse: Response = await fetch(PERSON_ROUTE);
    const personData: { results: IPersonResult[] } = await personResponse.json();
    const filteredPeople = personData.results.filter((person: IPersonResult) =>
      person.name.toLowerCase().includes(query)
    );

    // Display the results
    outputElement.innerHTML = "";
    filteredFilms.forEach((film: IFilmResult) => {
      const filmDiv = document.createElement("div") as HTMLDivElement;
      filmDiv.className = "card";
      filmDiv.innerHTML = displayFilm(film);
      outputElement.appendChild(filmDiv);
    });
    filteredPlanets.forEach((planet: IPlanetResult) => {
      const planetDiv = document.createElement("div") as HTMLDivElement;
      planetDiv.className = "card";
      planetDiv.innerHTML = displayPlanet(planet);
      outputElement.appendChild(planetDiv);
    });
    filteredPeople.forEach(async (person: IPersonResult) => {
      const personDiv = document.createElement("div") as HTMLDivElement;
      personDiv.className = "card";
      personDiv.innerHTML = await displayPerson(person);
      outputElement.appendChild(personDiv);
    });

  } catch (error) {
    console.error("Error: process failed", error);
  }
});

