const countryDetails = document.querySelector('.country-details');
const loader = document.querySelector('.loader');
const backBtn = document.querySelector('.back-btn');
const darkModeToggle = document.querySelector('.dark-mode');
const modeLabel = document.querySelector('.mode-label');
const body = document.body;

// Apply saved theme immediately
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    if (modeLabel) modeLabel.textContent = 'Light Mode';
}

// Back button
backBtn?.addEventListener('click', () => {
    history.back();
});

function showLoader() {
    if (loader) {
        loader.classList.remove('hidden');
        loader.setAttribute('aria-busy', 'true');
    }
    countryDetails?.classList.add('hidden');
}

function hideLoader() {
    if (loader) {
        loader.classList.add('hidden');
        loader.setAttribute('aria-busy', 'false');
    }
}

showLoader();

const params = new URLSearchParams(window.location.search);
const countryName = params.get('name');

function showError(message) {
    hideLoader();
    if (countryDetails) {
        countryDetails.innerHTML = `<p class="error-text">${message}</p>`;
        countryDetails.classList.remove('hidden');
    }
}

if (!countryName) {
    showError('Country name is missing in the URL.');
} else {
    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            const country = data[0];
            if (!country) {
                throw new Error('Country not found');
            }

            document.title = `${country.name.common} | Country`;

            countryDetails.innerHTML = `
                <div class="country-info">
                    <div class="country-flag">
                        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
                    </div>
                    <div class="country-details-text">
                        <h1 class="country-name">${country.name.common}</h1>
                        <p class="country-subtitle">${country.name.official}</p>

                        <div class="details-grid">
                            <p><b>Population:</b> ${country.population.toLocaleString()}</p>
                            <p><b>Region:</b> ${country.region}</p>
                            <p><b>Subregion:</b> ${country.subregion || 'N/A'}</p>
                            <p><b>Capital:</b> ${country.capital?.[0] || 'N/A'}</p>
                            <p><b>Languages:</b> ${Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
                            <p><b>Currencies:</b> ${
                                Object.values(country.currencies || {})
                                    .map(c => c.name)
                                    .join(', ') || 'N/A'
                            }</p>
                        </div>
                    </div>
                </div>
            `;

            hideLoader();
            countryDetails.classList.remove('hidden');
        })
        .catch(err => {
            console.error(err);
            showError('Error loading country details.');
        });
}


darkModeToggle?.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    if (modeLabel) modeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});





// const countryDetails = document.querySelector('.country-details');
// const loader = document.querySelector('.loader');
// const backBtn = document.querySelector('.back-btn');

// // 🔙 Back button
// backBtn.addEventListener('click', () => {
//     history.back();
// });

// // 🌍 Get country from URL
// const params = new URLSearchParams(window.location.search);
// const countryName = params.get('name');

// // ⏳ Show loader
// loader.classList.remove('hidden');

// fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
//     .then(res => res.json())
//     .then(data => {
//         const country = data[0];

//         // 🌍 Get border countries (if any)
//         if (country.borders) {
//         return Promise.all([
//             country,
//             fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}`)
//             .then(res => res.json())
//         ]);
//         }

//         return [country, []];
//     })
//     .then(([country, borders]) => {
//         loader.classList.add('hidden');
//         countryDetails.classList.remove('hidden');

//         countryDetails.innerHTML = `
//         <img src="${country.flags.svg}" width="250">

//         <h2>${country.name.common}</h2>

//         <p><b>Official:</b> ${country.name.official}</p>
//         <p><b>Population:</b> ${country.population.toLocaleString()}</p>
//         <p><b>Region:</b> ${country.region}</p>
//         <p><b>Subregion:</b> ${country.subregion}</p>
//         <p><b>Capital:</b> ${country.capital?.[0] || 'N/A'}</p>
//         <p><b>Languages:</b> ${Object.values(country.languages || {}).join(', ')}</p>
//         <p><b>Currencies:</b> ${
//             Object.values(country.currencies || {})
//             .map(c => c.name)
//             .join(', ')
//         }</p>

//         <div class="borders">
//             <b>Border Countries:</b>
//             <div class="border-list">
//             ${
//                 borders.length
//                 ? borders.map(b => `<span class="border-country" data-name="${b.name.common}">${b.name.common}</span>`).join('')
//                 : 'None'
//             }
//             </div>
//         </div>
//         `;

//         // 🔁 Click border country → reload page with new country
//         document.querySelectorAll('.border-country').forEach(btn => {
//         btn.addEventListener('click', () => {
//             const name = btn.dataset.name;
//             window.location.href = `country.html?name=${encodeURIComponent(name)}`;
//         });
//         });
//     })
//     .catch(err => {
//         loader.textContent = 'Error loading country';
//         console.error(err);
//     });
