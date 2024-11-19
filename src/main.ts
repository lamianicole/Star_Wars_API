import './style.css'
import { IFilm, IFilmResult } from './interfaces/IFilm';
import { IPerson, IPersonResult } from './interfaces/IPerson'
import { IPlanet, IPlanetResult } from './interfaces/IPlanet'


// URLs 
const BASE_URL = "https://swapi.dev/api/"

const FILM_ROUTE = `${BASE_URL}/films/`

const PLANET_ROUTE = `${BASE_URL}/planets/`

const PERSON_ROUTE = `${BASE_URL}/people/`

// Konstanten ziehen
const outputElement = document.getElementById("output-wrapper") as HTMLDivElement;
console.log(outputElement);

const filmElement = document.getElementById("api-films") as HTMLAnchorElement;
console.log(filmElement);

const planetElement = document.getElementById("api-planets") as HTMLAnchorElement;
console.log(planetElement);

const personElement = document.getElementById("api-people") as HTMLAnchorElement;
console.log(personElement);

// EventListener ansprechen Kategorie Filme/Callbackfunction
// const filmElement > FILM_ROUTE
// IFilmResult
// const filmDiv > const displayFilm
filmElement?.addEventListener("click", async () => {
  try {
    const response: Response = await fetch(FILM_ROUTE)
    const data = await response.json()
    outputElement.innerHTML = ""
    console.log(data.results);
    data.results.forEach((result: IFilmResult) => { 
      const filmDiv = document.createElement("div") as HTMLDivElement;
      filmDiv.innerHTML = displayFilm(result)
      outputElement.appendChild(filmDiv)
    })
  } catch (error) {
    console.error(error);
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
// const planetElement > PLANET_ROUTE
// IPlanetResult
// const planetDiv > const displayPlanet
planetElement?.addEventListener("click", async () => {
  try {
    const response: Response = await fetch(PLANET_ROUTE)
    const data = await response.json()
    outputElement.innerHTML = ""
    console.log(data.results);
    data.results.forEach((result: IPlanetResult) => { 
      const planetDiv = document.createElement("div") as HTMLDivElement;
      planetDiv.innerHTML = displayPlanet(result)
      outputElement.appendChild(planetDiv)
    })
  } catch (error) {
    console.error(error);
  }
})

// function: Planets anzeigen lassen
function displayPlanet(planet: IPlanetResult): string {
  // erst hier beim Funktionsaufruf wird x mit Inhalt befüllt (planet.residents)
  showResidents(planet.residents);
  const resultAsString = `
    <h4>Name: ${planet.name}</h4>
    <p>Residents: ${planet.residents}</p>
    <p>Terrain: ${planet.terrain}</p>
    `
    console.log(planet.residents);
    
  return resultAsString
}

// hier Platzhalter residents dient nur als Art Hülle, um mit der function zu arbeiten (showResidents) => planet.residents
async function showResidents(residents: string[]): Promise<string> {
  residents.forEach(async(resident) => {
    console.log(resident);
    try {
      const response: Response = await fetch(resident) 
      const data = await response.json()
      console.log(data);
      

    }
    catch(error) {
    console.error(error);
    }
  })
}


// EventListener ansprechen Kategorie People/Callbackfunction
// const peopleElement > PERSON_ROUTE
// IPersonResult
// const personDiv > const displayPerson
personElement?.addEventListener("click", async () => {
  try {
    const response: Response = await fetch(PERSON_ROUTE)
    const data = await response.json()
    outputElement.innerHTML = ""
    console.log(data.results);
    data.results.forEach((result: IPersonResult) => { 
      const personDiv = document.createElement("div") as HTMLDivElement;
      personDiv.innerHTML = displayPerson(result)
      outputElement.appendChild(personDiv)
    })
  } catch (error) {
    console.error(error);
  }
})

// function: People anzeigen lassen
function displayPerson(person: IPersonResult): string {
  const resultAsString = `
    <h4>Name: ${person.name}</h4>
    // species ist link (string)
    <p>Species: ${person.species}</p>
    <p>Gender: ${person.gender}</p>
    <p>Birth Year: ${person.birth_year}</p>
    // homeworld ist link (string)
    <p>Homeworld: ${person.homeworld}</p>
    `
  return resultAsString
}




