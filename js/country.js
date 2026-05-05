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

// 🔙 Back button
backBtn.addEventListener('click', () => {
    history.back();
});


// 1. Get country name from URL
const params = new URLSearchParams(window.location.search);
const countryName = params.get('name');

// 2. Fetch that country only
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => res.json())
    .then(data => {
    const country = data[0];
    
    // 3. Display details
    countryDetails.innerHTML = `
        <div class="country-info">
            <div>
                <img src="${country.flags.svg}" width="1000">
            </div>
            <div class="country-details-text">
                <h2>${country.name.common}</h2>
                <p><b>Official Name:</b> ${country.name.official}</p>
                <p><b>Population:</b> ${country.population.toLocaleString()}</p>
                <p><b>Region:</b> ${country.region}</p>
                <p><b>Subregion:</b> ${country.subregion}</p>
                <p><b>Capital:</b> ${country.capital}</p>
                <p><b>Languages:</b> ${Object.values(country.languages || {}).join(', ')}</p>
                <p><b>Currencies:</b> ${
                Object.values(country.currencies || {})
                    .map(c => c.name)
                    .join(', ')
                }</p>
            </div>
        </div>
    `;

    // ⏳ Hide loader and show details
    loader.classList.add('hidden');
    countryDetails.classList.remove('hidden');
    })
    .catch(err => {
        loader.classList.add('hidden');
        console.error(err);
    });


darkModeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');


    if (body.classList.contains('dark')) {
        modeLabel.textContent = 'Light Mode';
    }else
    {
        modeLabel.textContent = 'Dark Mode';
    }

     // Save globally
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