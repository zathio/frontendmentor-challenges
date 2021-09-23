const html = {
    base: country => /*html*/`
        <h1>${country.name}</h1>
    `
};

export default app => {
    // Get datas
    fetch("https://restcountries.com/v2/name" + location.pathname)
        .then(res => res.json())
        .then(data => {
            app.innerHTML = html.base(data[0]);
        })
    .catch(console.error);
}