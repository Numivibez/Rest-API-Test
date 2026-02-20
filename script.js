const countriesContainer = document.querySelector('.countries-container')
const searchInput = document.querySelector('#search');
const modeLabel = document.querySelector('.mode-label');
const darkModeToggle = document.querySelector('.dark-mode');
const body = document.body;

fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital')
.then((res)=> res.json())
.then((data) =>{ 
    // console.log(data)
    data.forEach(country => {
        // console.log(country.flags.svg)
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')

        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.flags.alt}">
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b> ${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            </div>
        `

        countriesContainer.append(countryCard)
        // console.log(countryCard)
    });

    // 👇 Now the cards exist, so we can add search functionality
    const countryCards = document.querySelectorAll('.country-card');
    
    searchInput.addEventListener('input', () => {
      const searchValue = searchInput.value.toLowerCase();

      countryCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        card.style.display = title.includes(searchValue) ? 'block' : 'none';
      });
    });

    
//   .catch(err => console.error('Error fetching countries:', err));
});

    darkModeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      body.classList.toggle('dark');

      if (body.classList.contains('dark')) {
        modeLabel.textContent = 'Light Mode';
      }else
      {
        modeLabel.textContent = 'Dark Mode';
      }
    });

// const countriesContainer = document.querySelector('.countries-container');

// fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital')
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data); // See all country objects in console

//     data.forEach(country => {
//       const countryCard = document.createElement('a');
//       countryCard.classList.add('country-card');

//       countryCard.innerHTML = `
//         <img src="${country.flags.svg}" alt="flag of ${country.name.common}">
//         <div class="card-text">
//           <h3 class="card-title">${country.name.common}</h3>
//           <p><b>Population:</b> ${country.population.toLocaleString()}</p>
//           <p><b>Region:</b> ${country.region}</p>
//           <p><b>Capital:</b> ${country.capital ? country.capital[0] : 'N/A'}</p>
//         </div>
//       `;

//       countriesContainer.append(countryCard);
//     });
//   })
//   .catch(err => console.error('Error fetching countries:', err));