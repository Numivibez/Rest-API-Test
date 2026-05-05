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
        countryCard.href = `./country.html?name=${encodeURIComponent(country.name.common)}`;
        // countryCard.href = `./country.html?name=${country.name.common}`;

        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.flags.alt}">
            <div class="card-text">
                <h3 class="card-title"><b>${country.name.common}</b></h3>
                <p><b>Population: </b> ${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0] || 'N/A'}</p>
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
        const name = card.querySelector('.card-title').textContent.toLowerCase();
        // card.style.display = name.includes(searchValue) ? 'block' : 'none';

        // 2. Get the Capital text (we target the paragraph containing the capital)
      // Note: Since you have multiple <p> tags, we select the last one or 
      // better yet, give your capital span/paragraph a specific class.
      const capital = card.querySelector('.card-text p:last-child').textContent.toLowerCase();
      card.style.display = (name.includes(searchValue) || capital.includes(searchValue)) ? 'block' : 'none';
        });
    });
  // .catch(err => console.error('Error fetching countries:', err));
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
