const html = {
    skeleton: () => /*html*/`

    `,
    base: country => /*html*/`
        <a href="/" data-link>Back</a>
        <h1>${country.name}</h1>
    `
};

export default app => {
    app.innerHTML = html.skeleton();

    // Get datas
    fetch("https://restcountries.com/v2/name" + location.pathname)
        .then(res => res.json())
        .then(data => {
            app.innerHTML = html.base(data[0]);
        })
    .catch(() => {
        document.querySelector("[href='/']").click();
    });
}