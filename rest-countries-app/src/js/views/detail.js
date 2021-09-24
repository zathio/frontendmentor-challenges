const html = {
    skeleton: () => /*html*/`
        <a href="/" data-link class="inline-flex items-center select-none rounded-md shadow-md bg-gray-light dark:bg-blue-light my-6 py-2 px-10 ring-gray-dark/40 dark:ring-gray-light/40 hover:bg-gray-dark/10 dark:hover:bg-gray-light/10 active:bg-gray-dark/10 dark:active:bg-gray-light/10 active:ring-2 focus:ring-2 outline-none duration-100 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
        </a>
    `,
    base: country => /*html*/`
        <div class="flex items-center mt-10">
            <img src="${country.flags[0]}" alt="Flag" class="w-1/2 shadow-lg">
            <div class="w-1/2">
                <h1>${country.name}</h1>
                <div class="grid grid-cols-2 mt-6 mb-16">
                    <ul>
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
                            ${get(country.continent)}
                        </li>
                        <li>
                            <span class="font-semibold">Sub Regions:</span>
                            ${get(country.region)}
                        </li>
                        <li>
                            <span class="font-semibold">Capital:</span>
                            ${get(country.capital)}
                        </li>
                    </ul>
                    <ul>
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
                <span class="font-semibold">Border Countries:</span>
                ${get(country.borders)}
            </div>
        </div>
    `
};

function get(data) {
    if (!data) return "Unknown";
    if (Array.isArray(data)) return data.map(d => `<a href="/${d}">${d}</a>`).join("");
    if (typeof data[0] === "object") return data.map(d => d.name).join(", ");
    return data;
};

export default app => {
    app.innerHTML = html.skeleton();

    // Get datas
    fetch("https://restcountries.com/v2/name" + location.pathname)
        .then(res => res.json())
        .then(data => {
            console.log(data[0]);
            app.insertAdjacentHTML("beforeend", html.base(data[0]));
        })
    .catch(() => {
        // Go to home page if error in the request
        document.querySelector("[href='/']").click();
    });
}