const html = {
    skeleton: () => /*html*/`
        <a href="/" data-link class="inline-flex items-center select-none rounded-md shadow-md bg-gray-light dark:bg-blue-light my-6 py-1.5 lg:py-2 px-8 lg:px-10 ring-gray-dark/40 dark:ring-gray-light/40 hover:bg-gray-dark/10 dark:hover:bg-gray-light/10 active:bg-gray-dark/10 dark:active:bg-gray-light/10 active:ring-2 focus:ring-2 outline-none duration-100 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
        </a>
        <div class="px-3 sm:px-0 lg:flex lg:justify-between lg:items-center lg:gap-x-20 xl:gap-x-32 mt-10 animate-pulse">
            <div class="lg:w-1/2 shadow-lg mx-auto mb-14 lg:mb-0 bg-gray-dark/60" style="aspect-ratio: 4/3"></div>
            <div class="lg:w-1/2">
                <div class="w-36 h-8 bg-gray-dark/60 rounded-sm"></div>
                <div class="grid sm:grid-cols-2 gap-x-6 justify-between mt-10 mb-16">
                    <div class="space-y-5">
                        <div class="w-[58%] h-5 bg-gray-dark/60 rounded-sm"></div>
                        <div class="w-[69%] h-5 bg-gray-dark/60 rounded-sm"></div>
                        <div class="w-[38%] h-5 bg-gray-dark/60 rounded-sm"></div>
                        <div class="w-[80%] h-5 bg-gray-dark/60 rounded-sm"></div>
                        <div class="w-[42%] h-5 bg-gray-dark/60 rounded-sm"></div>
                    </div>
                    <div class="mt-10 lg:mt-0 space-y-5">
                        <div class="w-[62%] h-5 bg-gray-dark/60 rounded-sm"></div>
                        <div class="w-[45%] h-5 bg-gray-dark/60 rounded-sm"></div>
                        <div class="w-[89%] h-5 bg-gray-dark/60 rounded-sm"></div>
                    </div>
                </div>
                <div class="w-[90%] h-5 bg-gray-dark/60 rounded-sm"></div>
                <div class="w-[40%] h-5 bg-gray-dark/60 rounded-sm mt-5"></div>
            </div>
        </div>
    `,
    base: country => /*html*/`
        <div class="px-3 sm:px-0 lg:flex lg:justify-between lg:items-center lg:gap-x-20 xl:gap-x-32 mt-10">
            <img src="${country.flag}" alt="Flag" class="object-contain lg:w-1/2 shadow-lg mx-auto mb-14 lg:mb-0">
            <div class="lg:w-1/2">
                <h1 class="font-bold text-[2rem]">${country.name}</h1>
                <div class="text-lg lg:text-base grid sm:grid-cols-2 gap-x-6 justify-between mt-6 mb-16">
                    <ul class="space-y-2">
                        <li>
                            <span class="font-semibold">Native Name:</span>
                            ${get(country.nativeName)}
                        </li>
                        <li>
                            <span class="font-semibold">Population:</span>
                            ${get(country.population.toLocaleString("en-US"))}
                        </li>
                        <li>
                            <span class="font-semibold">Region:</span>
                            ${get(country.region)}
                        </li>
                        <li>
                            <span class="font-semibold">Sub Regions:</span>
                            ${get(country.subregion)}
                        </li>
                        <li>
                            <span class="font-semibold">Capital:</span>
                            ${get(country.capital)}
                        </li>
                    </ul>
                    <ul class="mt-10 lg:mt-0 space-y-2">
                        <li>
                            <span class="font-semibold">Top Level Domain:</span>
                            ${get(country.topLevelDomain)}
                        </li>
                        <li>
                            <span class="font-semibold">Currencies:</span>
                            ${get(country.currencies)}
                        </li>
                        <li>
                            <span class="font-semibold">Languages:</span>
                            ${get(country.languages)}
                        </li>
                    </ul>
                </div>
                <div>
                    <span class="font-semibold mr-4 sm:float-left">Border Countries:</span>
                    <div id="border-box" class="mt-6">
                        ${ /*html*/ `
                            <div class="inline-block mb-2 sm:-mt-1 w-[6.6rem] h-[2.1rem] mr-1.5 invisible"></div>
                        `.repeat(country.borders.length)}
                    </div>
                </div>
            </div>
        </div>
    `,
    border: name => /*html*/`
        <a href="/${name}" class="inline-block mb-2 sm:-mt-1 text-center rounded-md shadow-md bg-gray-light dark:bg-blue-light whitespace-nowrap py-[.3rem] px-2 w-[6.6rem] overflow-hidden overflow-ellipsis ring-gray-dark/40 dark:ring-gray-light/40 hover:bg-gray-dark/10 dark:hover:bg-gray-light/10 active:bg-gray-dark/10 dark:active:bg-gray-light/10 active:ring-2 focus:ring-2 outline-none duration-100 mr-1.5 animate-fade">${name}</a>
    `
};

// Treat each datas types
function get(data) {
    if (!data) return "Unknown";
    if (typeof data[0] === "object") return data.map(d => d.name).join(", ");
    if (Array.isArray(data)) return data.join(", ");
    return data;
};

// Fetch each borders countries to get name
function addBorders(codes) {
    let box = app.querySelector("#border-box");

    codes.forEach((c, i) => {
        fetch("https://restcountries.com/v2/alpha/" + c)
        .then(res => res.json())
        .then(data => {
            box.children[i].outerHTML = html.border(data.name);
        });
    });
};

export default app => {
    app.innerHTML = html.skeleton();
    
    // Get datas
    fetch("https://restcountries.com/v2/name" + location.pathname)
        .then(res => res.json())
        .then(data => {
            app.children[1].remove();
            app.insertAdjacentHTML("beforeend", html.base(data[0]));
            addBorders(data[0].borders);
        })
    .catch(() => {
        // Go to home page if error in the request
        // document.querySelector("[href='/']").click();
    });
}