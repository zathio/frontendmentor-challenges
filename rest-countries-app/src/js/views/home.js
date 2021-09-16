const html = /*html*/`
    <div class="flex items-center justify-between pb-5 md:pb-10 text-sm">
        <label for="search" class="relative w-full max-w-[29rem] text-gray-dark dark:text-gray-light">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 select-none pointer-events-none absolute left-7 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="search" id="search" placeholder="Search for a country..." class="rounded-md shadow-md bg-gray-light dark:bg-blue-light py-4 px-5 pl-[4.5rem] w-full placeholder-current outline-none ring-gray-dark/40 dark:ring-gray-light/40 hover:bg-gray-dark/10 dark:hover:bg-gray-light/10 active:bg-gray-dark/10 dark:active:bg-gray-light/10 active:ring-2 focus:ring-2 duration-100">
        </label>
        <div id="filter" class="relative">
            <button class="flex items-center justify-between select-none rounded-md shadow-md bg-gray-light dark:bg-blue-light py-4 px-5 w-48 ring-gray-dark/40 dark:ring-gray-light/40 hover:bg-gray-dark/10 dark:hover:bg-gray-light/10 active:bg-gray-dark/10 dark:active:bg-gray-light/10 active:ring-2 focus:ring-2 outline-none duration-100">
                <span id="name" data-region="">Filter by Region</span>
                <svg id="icon" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 duration-100 -mr-px" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            <ul class="invisible opacity-0 duration-100 absolute z-10 top-full left-0 mt-2 w-full rounded-md shadow-md bg-gray-light dark:bg-blue-light py-3">
                <li>
                    <button data-region="" class="block w-full text-left select-none py-1 px-5 hover:bg-gray-dark/10 dark:hover:bg-gray-light/10 active:bg-gray-dark/20 dark:active:bg-gray-light/20 duration-100">All</button>
                </li>
            </ul>
        </div>
    </div>
    <ul id="countries-list" class="list-none grid grid-cols-4 gap-16">
        ${ /*html*/`
            <li class="block rounded-md overflow-hidden bg-gray-light dark:bg-blue-light shadow-md h-[22rem] animate-pulse">
                <div class="bg-gray-dark/60 w-full h-[47%]"></div>
                <div class="p-6">
                    <div class="w-1/3 h-5 bg-gray-dark/60 rounded-sm"></div>
                    <ul class="text-sm space-y-3 mt-6">
                        <li class="w-2/3 h-3.5 bg-gray-dark/60 rounded-sm"></li>
                        <li class="w-1/2 h-3.5 bg-gray-dark/60 rounded-sm"></li>
                        <li class="w-1/4 h-3.5 bg-gray-dark/60 rounded-sm"></li>
                    </ul>
                </div>
            </li>
        `.repeat(12)}
    </ul>
`;

const card = country => /*html*/`
    <li data-name="${country.name}" data-region="${country.region}">
        <a href="/${country.name}" class="block h-[22rem] rounded-md overflow-hidden outline-none bg-gray-light dark:bg-blue-light shadow-md hover:bg-gray-dark/10 hover:-translate-y-1 will-change dark:hover:bg-gray-light/10 active:bg-gray-dark/20 dark:active:bg-gray-light/20 active:translate-y-0 ring-gray-dark/40 dark:ring-gray-light/40 focus-visible:ring duration-100">
            <img src="${country.flag}" alt="Flag" class="w-full h-[47%] object-cover bg-gray-dark/60">
            <div class="p-6">
                <p class="font-bold text-lg whitespace-nowrap overflow-hidden overflow-ellipsis">${country.name}</p>
                <ul class="text-sm space-y-1.5 mt-4">
                    <li>
                        <span class="font-semibold">Population:</span>
                        ${country.population.toLocaleString("en-US")}
                    </li>
                    <li>
                        <span class="font-semibold">Region:</span>
                        ${country.region}
                    </li>
                    <li>
                        <span class="font-semibold">Capital:</span>
                        ${country.capital || "Unknown"}
                    </li>
                </ul>
            </div>
        </a>
    </li>
`;

const app = document.querySelector("#app");
export default () => {
    app.innerHTML = html;

    let search = app.querySelector("#search"),
        filter = app.querySelector("#filter"),
        name = filter.querySelector("#name"),
        options = filter.querySelector("ul"),
        countriesList = app.querySelector("#countries-list");

    function filterCountries() {
        // All lowercase and special accents removed to avoid missing matches
        let cleanStr = str => str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        
        [...countriesList.children].forEach(el => {
            if (cleanStr(el.dataset.name).includes(cleanStr(search.value)) && cleanStr(el.dataset.region).includes(cleanStr(name.dataset.region))) {
                el.classList.remove("hidden");
            } else {
                el.classList.add("hidden")
            }
        });
    }
    
    // Search Filter
    search.oninput = () => filterCountries();

    // Region Filter
    app.addEventListener("click", e => {
        if (filter.contains(e.target)) {
            if (e.target.matches("button[data-region]")) {
                name.innerHTML = e.target.innerHTML;
                name.dataset.region = e.target.dataset.region;

                filterCountries();
            }

            filter.classList.toggle("show");
        } else {
            filter.classList.remove("show")
        }
    });

    // Get datas
    fetch("https://restcountries.eu/rest/v2/all")
        .then(res => res.json())
        .then(data => {
            countriesList.innerHTML = "";

            data.forEach(d => {
                countriesList.innerHTML += card(d);
                
                let clone = options.firstElementChild.cloneNode(true).firstElementChild;
                clone.innerHTML = d.region;
                clone.dataset.region = d.region;
                !options.innerHTML.includes(d.region) && options.appendChild(clone.parentNode);
            });
        })
    .catch(console.error);
}