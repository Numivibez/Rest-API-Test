// const countryDetails = document.querySelector('.country-details');
// const loader = document.querySelector('.loader');
// const backBtn = document.querySelector('.back-btn');
// const darkModeToggle = document.querySelector('.dark-mode');
// const modeLabel = document.querySelector('.mode-label');
// const body = document.body;

// // Apply saved theme immediately
// if (localStorage.getItem('theme') === 'dark') {
//     body.classList.add('dark');
//     if (modeLabel) modeLabel.textContent = 'Light Mode';
// }

// // Back button
// backBtn?.addEventListener('click', () => {
//     history.back();
// });

// function showLoader() {
//     if (loader) {
//         loader.classList.remove('hidden');
//         loader.setAttribute('aria-busy', 'true');
//     }
//     countryDetails?.classList.add('hidden');
// }

// function hideLoader() {
//     if (loader) {
//         loader.classList.add('hidden');
//         loader.setAttribute('aria-busy', 'false');
//     }
// }

// showLoader();

// const params = new URLSearchParams(window.location.search);
// const countryName = params.get('name');

// function showError(message) {
//     hideLoader();
//     if (countryDetails) {
//         countryDetails.innerHTML = `<p class="error-text">${message}</p>`;
//         countryDetails.classList.remove('hidden');
//     }
// }

// if (!countryName) {
//     showError('Country name is missing in the URL.');
// } else {
//     fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return res.json();
//         })
//         .then(data => {
//             const country = data[0];
//             if (!country) {
//                 throw new Error('Country not found');
//             }

//             document.title = `${country.name.common} | Country`;

//             countryDetails.innerHTML = `
//                 <div class="country-info">
//                     <div class="country-flag">
//                         <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
//                     </div>
//                     <div class="country-details-text">
//                         <h1 class="country-name">${country.name.common}</h1>
//                         <p class="country-subtitle">${country.name.official}</p>

//                         <div class="details-grid">
//                             <p><b>Population:</b> ${country.population.toLocaleString()}</p>
//                             <p><b>Region:</b> ${country.region}</p>
//                             <p><b>Subregion:</b> ${country.subregion || 'N/A'}</p>
//                             <p><b>Capital:</b> ${country.capital?.[0] || 'N/A'}</p>
//                             <p><b>Languages:</b> ${Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
//                             <p><b>Currencies:</b> ${
//                                 Object.values(country.currencies || {})
//                                     .map(c => c.name)
//                                     .join(', ') || 'N/A'
//                             }</p>
//                         </div>
//                     </div>
//                 </div>
//             `;

//             hideLoader();
//             countryDetails.classList.remove('hidden');
//         })
//         .catch(err => {
//             console.error(err);
//             showError('Error loading country details.');
//         });
// }


// darkModeToggle?.addEventListener('click', (e) => {
//     e.preventDefault();
//     body.classList.toggle('dark');
//     const isDark = body.classList.contains('dark');
//     if (modeLabel) modeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
//     localStorage.setItem('theme', isDark ? 'dark' : 'light');
// });





const countryDetails = document.querySelector('.country-details');
const loader = document.querySelector('.loader');
const backBtn = document.querySelector('.back-btn');
const darkModeToggle = document.querySelector('.dark-mode');
const modeLabel = document.querySelector('.mode-label');
const body = document.body;

// 🌙 Apply saved theme immediately
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    if (modeLabel) modeLabel.textContent = 'Light Mode';
}

// 🔙 Back button
backBtn?.addEventListener('click', () => {
    history.back();
});

// 🌍 Get country name from URL (FIXED: decode)
const params = new URLSearchParams(window.location.search);
const countryName = decodeURIComponent(params.get('name'));

// ⏳ Show loader, hide content first
loader.classList.remove('hidden');
countryDetails.classList.add('hidden');

// 🌍 Fetch country
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => res.json())
    .then(data => {
        const country = data[0];

        countryDetails.innerHTML = `
        <img src="${country.flags.svg}" width="1000">

        <div>
            <h2>${country.name.common}</h2>
            <p><b>Official Name:</b> ${country.name.official}</p>
            <p><b>Population:</b> ${country.population.toLocaleString()}</p>
            <p><b>Region:</b> ${country.region}</p>
            <p><b>Subregion:</b> ${country.subregion}</p>
            <p><b>Capital:</b> ${country.capital?.[0] || 'N/A'}</p>
            <p><b>Languages:</b> ${Object.values(country.languages || {}).join(', ')}</p>
            <p><b>Currencies:</b> ${
            Object.values(country.currencies || {})
                .map(c => c.name)
                .join(', ')
            }</p>
        </div>
        `;

        // ✅ Show content AFTER loading
        countryDetails.classList.remove('hidden');
    })
    .catch(err => {
        console.error(err);
        loader.textContent = 'Error loading country 😢';
    })
    .finally(() => {
        // ✅ ALWAYS hide loader
        loader.classList.add('hidden');
    });


    // 🌙 Dark mode toggle (safe + persistent)
    darkModeToggle?.addEventListener('click', (e) => {
    e.preventDefault();

    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');

    if (modeLabel) {
        modeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });