import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';

let searchBox = document.getElementById('search-box');
let results = document.querySelector('.country-list');

let debouncedFetch = _.debounce((name) => {
    fetchCountries(name)
        .then(countries => {
            displayResults(countries);
        })
        
}, 300);

searchBox.addEventListener('input', () => {
    let name = searchBox.value.trim();
    results.innerHTML = '';

    if (name) {
        debouncedFetch(name);
    }
});

function displayResults(countries) {
    results.innerHTML = '';
    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length > 1) {
        let list = document.createElement('div');
        countries.forEach(country => {
            let listItem = document.createElement('div');
            listItem.className = 'country-list-item';
            listItem.innerHTML = `
                <img src="${country.flags.svg}" alt="${country.name}">
                <span>${country.name}</span>
            `;
            list.appendChild(listItem);
        });
        results.appendChild(list);
    } else if (countries.length === 1) {
        let country = countries[0];
        let countryInfo = document.createElement('div');
        countryInfo.className = 'country-info';
        countryInfo.innerHTML = `
            <img style="display: inline-block;" src="${country.flags.svg}" alt="${country.name}">
            <h2 style="display: inline-block; vertical-align: middle;">${country.name}</h2>
            <div>
                <p><b>Stolica:</b> ${country.capital}</p>
                <p><b>Liczba ludności:</b> ${country.population.toLocaleString()}</p>
                <p><b>Języki:</b> ${country.languages.map(i => i.name)}</p>
            </div>
        `;
        results.appendChild(countryInfo);
    }
}

