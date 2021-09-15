const html = /*html*/`
    <div class="flex items-center justify-between pb-5 md:pb-10">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="search" id="search" placeholder="Search for a country..." class="bg-blue-light placeholder-current">
        </div>
        <div id="filter" class="relative">
            <button class="flex items-center justify-between select-none rounded-md bg-blue-light py-4 px-5 w-52">
                <span id="name">Filter by Region</span>
                <svg id="icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 duration-100" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            <ul class="invisible opacity-0 duration-100 absolute top-full left-0 mt-1 w-full rounded-md bg-blue-light py-3">
                <li class="select-none py-1 px-5 cursor-pointer hover:bg-gray-dark">All</li>
                <li class="select-none py-1 px-5 cursor-pointer hover:bg-gray-dark">Africa</li>
                <li class="select-none py-1 px-5 cursor-pointer hover:bg-gray-dark">Americas</li>
                <li class="select-none py-1 px-5 cursor-pointer hover:bg-gray-dark">Asia</li>
                <li class="select-none py-1 px-5 cursor-pointer hover:bg-gray-dark">Europe</li>
                <li class="select-none py-1 px-5 cursor-pointer hover:bg-gray-dark">Oceania</li>
                <li class="select-none py-1 px-5 cursor-pointer hover:bg-gray-dark">Polar</li>
            </ul>
        </div>
    </div>
    <ul id="countries-list" class="list-none grid grid-cols-4 gap-16"></ul>
`;

const card = country => /*html*/`
    <li>
        <a href="/${country.name}" data-region="${country.region}" class="block h-full rounded-md overflow-hidden bg-blue-light shadow-md">
            <img src="${country.flag}" alt="Flag" class="w-full h-[47%] object-cover">
            <div class="p-6">
                <p class="font-bold text-lg">${country.name}</p>
                <ul class="text-sm space-y-1.5 mt-4">
                    <li>
                        <span class="font-semibold">Population:</span>
                        ${country.population}
                    </li>
                    <li>
                        <span class="font-semibold">Region:</span>
                        ${country.region}
                    </li>
                    <li>
                        <span class="font-semibold">Capital:</span>
                        ${country.capital}
                    </li>
                </ul>
            </div>
        </a>
    </li>
`;

function filterCountries(list, keyword, special = "") {
    // All lowercase to avoid missing matches
    list.forEach(el => {
        el.classList.remove("hidden");
        keyword.toLowerCase() !== special.toLowerCase() && (!el.innerHTML.toLowerCase().includes(keyword.toLowerCase()) && el.classList.add("hidden"));
    });
}

const app = document.querySelector("#app");

export default () => {
    app.innerHTML = html;

    let filter = app.querySelector("#filter"),
        search = app.querySelector("#search"),
        options = filter.querySelectorAll("li"),
        countriesList = app.querySelector("#countries-list");

    // Search Filter
    search.addEventListener("input", () => {
        filterCountries([...countriesList.children], search.value)
    });

    // Region Filter
    app.addEventListener("click", e => {
        filter.contains(e.target) ? filter.classList.toggle("show") : filter.classList.remove("show");
    });
    options.forEach(opt => opt.onclick = () => {
        filter.querySelector("#name").innerHTML = opt.innerHTML;
        filterCountries([...countriesList.children], opt.innerHTML, "all");
    });

    fetch("https://restcountries.eu/rest/v2/all")
        .then(res => res.json())
        .then(data => {
            for (let i=0; i<data.length; i++) {
                countriesList.innerHTML += card(data[i]);
            }
        })
    .catch(console.error);
}