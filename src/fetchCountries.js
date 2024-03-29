const API_URL = 'https://restcountries.com/v2/name/';

export function fetchCountries(name) {
    return fetch(API_URL + name + '?fields=name,capital,population,flags,languages')
        .then(response => {
            if (response.status === 404) {
                Notiflix.Notify.failure('Oops. there is no country with that name');
            }
            return response.json();
        });
}
