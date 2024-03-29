const html = {
    base: () => /*html*/`
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 justify-between pb-5 md:pb-10 text-sm">
            <label for="search" class="relative w-full max-w-[29rem] text-gray-dark dark:text-gray-light">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 select-none pointer-events-none absolute left-7 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="search" id="search" placeholder="Search for a country..." class="rounded-md shadow-md bg-gray-light dark:bg-blue-light py-4 px-5 pl-[4.5rem] w-full placeholder-current outline-none ring-gray-dark/40 dark:ring-gray-light/40 hover:bg-gray-dark/10 dark:hover:bg-gray-light/10 active:bg-gray-dark/10 dark:active:bg-gray-light/10 active:ring-2 focus:ring-2 duration-100 disabled:cursor-not-allowed disabled:hover:!bg-gray-light dark:disabled:hover:!bg-blue-light disabled:active:ring-0" disabled>
            </label>
            <div id="filter" class="relative w-48 flex-shrink-0">
                <button class="flex items-center justify-between select-none rounded-md shadow-md bg-gray-light dark:bg-blue-light py-4 px-5 w-full ring-gray-dark/40 dark:ring-gray-light/40 hover:bg-gray-dark/10 dark:hover:bg-gray-light/10 active:bg-gray-dark/10 dark:active:bg-gray-light/10 active:ring-2 focus:ring-2 outline-none duration-100 disabled:cursor-not-allowed disabled:hover:!bg-gray-light dark:disabled:hover:!bg-blue-light disabled:active:ring-0" disabled>
                    <span id="name" data-region="">Filter by Region</span>
                    <svg id="icon" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 duration-100 -mr-px" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
                <ul id="filter-list" class="invisible opacity-0 duration-100 absolute z-10 top-full left-0 mt-2 w-full rounded-md shadow-md bg-gray-light dark:bg-blue-light py-3">
                    ${html.option("All")}
                </ul>
            </div>
        </div>
        <ul id="countries-list" class="list-none px-3 sm:px-0 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 xl:gap-16 relative before:content-[attr(data-no-result)] before:text-lg before:absolute before:left-3 !sm:before:left-0 before:top-0 before:z-[-1]">
            ${ /*html*/`
                <li class="block rounded-md overflow-hidden bg-gray-light dark:bg-blue-light shadow-md h-[22rem] animate-pulse">
                    <div class="bg-gray-dark/60 w-full h-[47%]"></div>
                    <div class="p-6">
                        <div class="w-1/3 h-5 bg-gray-dark/60 rounded-sm"></div>
                        <div class="text-sm space-y-3 mt-6">
                            <div class="w-2/3 h-3.5 bg-gray-dark/60 rounded-sm"></div>
                            <div class="w-[40%] h-3.5 bg-gray-dark/60 rounded-sm"></div>
                            <div class="w-1/2 h-3.5 bg-gray-dark/60 rounded-sm"></div>
                        </div>
                    </div>
                </li>
            `.repeat(12)}
        </ul>
    `,
    card: country => /*html*/`
        <li>
            <a href="/${country.name.common}" data-link data-country="${country.name.common}" data-region="${country.region}" class="block h-[22rem] rounded-md overflow-hidden outline-none bg-gray-light dark:bg-blue-light shadow-md hover:bg-gray-dark/10 hover:-translate-y-1 will-change dark:hover:bg-gray-light/10 active:bg-gray-dark/20 dark:active:bg-gray-light/20 active:translate-y-0 ring-gray-dark/40 dark:ring-gray-light/40 focus-visible:ring duration-100">
                <img src="${country.flags.svg}" alt="Flag" loading="lazy" class="w-full h-1/2 lg:h-[47%] object-cover bg-gray-dark/60">
                <div class="p-6">
                    <p class="font-bold text-lg whitespace-nowrap overflow-hidden overflow-ellipsis">${country.name.common}</p>
                    <ul class="text-sm space-y-1.5 mt-4">
                        <li>
                            <span class="font-semibold">Population:</span>
                            ${country.population.toLocaleString("en-US") || "Unknown"}
                        </li>
                        <li>
                            <span class="font-semibold">Region:</span>
                            ${country.region || "Unknown"}
                        </li>
                        <li>
                            <span class="font-semibold">Capital:</span>
                            ${country.capital || "Unknown"}
                        </li>
                    </ul>
                </div>
            </a>
        </li>
    `,
    option: region => /*html*/`
        <li>
            <button data-region="${region}" class="block w-full text-left select-none py-1 px-5 hover:bg-gray-dark/10 dark:hover:bg-gray-light/10 active:bg-gray-dark/20 dark:active:bg-gray-light/20 duration-100">${region}</button>
        </li>
    `,
};

export default app => {
    app.innerHTML = html.base();

    let search = app.querySelector("#search"),
        countriesList = app.querySelector("#countries-list"),
        filter = app.querySelector("#filter"),
        name = filter.querySelector("#name"),
        options = filter.querySelector("#filter-list"),
        optionsList = [];

    // Remove all accents and convert to lowercase to avoid missing matches
    const cleanStr = str => str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

    // Filter by hiding speficied cards
    function filterCountries() {
        [...countriesList.children].forEach(el => {
            (cleanStr(el.firstElementChild.dataset.country).includes(cleanStr(search.value)) && cleanStr(el.firstElementChild.dataset.region).includes(cleanStr(name.dataset.region === "All" ? "" : name.dataset.region))) ? el.classList.remove("hidden") : el.classList.add("hidden");
        });
    };
    
    // Search Filter
    search.addEventListener("input", filterCountries);

    // Region Filter
    window.addEventListener("click", e => {
        if (filter.contains(e.target)) {
            if (e.target.matches("button[data-region]")) {
                name.textContent = e.target.textContent;
                name.dataset.region = e.target.dataset.region;
                filterCountries();
            }

            filter.classList.toggle("show");
        } else {
            filter.classList.remove("show")
        }
    });

    // Get datas
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            countriesList.innerHTML = "";
            countriesList.dataset.noResult = "No results found";
            
            data.forEach(d => {
                countriesList.insertAdjacentHTML("beforeend", html.card(d).trim());
                !optionsList.includes(d.region) && optionsList.push(d.region);
            });

            optionsList.sort() && optionsList.forEach(o => o && options.insertAdjacentHTML("beforeend", html.option(o).trim()));

            search.disabled = false;
            filter.firstElementChild.disabled = false;
        })
    .catch(console.error);
}