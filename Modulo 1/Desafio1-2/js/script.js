let users = null;
let userCount = 0;

let tabUsers = null;
let tabStatistic = null

let numberFomart = Intl.NumberFormat('pt-BR');

window.addEventListener('load', async function () {
    tabUsers = document.querySelector("#tabUsers");
    await render();
});

async function GetUsers() {
    const result = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await result.json();
    let users = json.results.map(user => {
        return {
            firstName: user.name.first,
            lastName: user.name.last,
            picture: user.picture.thumbnail,
            age: user.dob.age,
            gender: user.gender
        };
    });
    return users;
}

async function render() {
    users = await GetUsers();
    await renderUsers(users);
    await renderStatistic(users);
}

async function renderStatistic(arrayUsers) {
    let qtdMale = document.querySelector("#qtdMale");
    let qtdFemale = document.querySelector("#qtdFemale");
    let sumAge = document.querySelector("#sumAge");
    let avgAge = document.querySelector("#avgAge");

    const qtdMaleValue = await arrayUsers.filter(x => x.gender === 'male').length;
    const qtdFemaleValue = await arrayUsers.filter(x => x.gender === 'female').length;
    let sumAgeValue = 0;
    let avgAgeValue = 0;

    arrayUsers.forEach(element => {
        sumAgeValue += element.age;
    });

    avgAgeValue = sumAgeValue / arrayUsers.length;

    qtdMale.textContent = `Sexo Masculino: ${qtdMaleValue}`;
    qtdFemale.textContent = `Sexo Femino: ${qtdFemaleValue}`;
    sumAge.textContent = `Soma das idades: ${formatNumber(sumAgeValue)}`;
    avgAge.textContent = `Média das idades: ${formatNumber(avgAgeValue)}`;
}

async function renderUsers(arrayUsers) {
    let usersHtml = "<div>";

    arrayUsers.forEach(element => {
        const { firstName, lastName, picture, age } = element;

        const HTMLElement =
            `<div>
                <div class="div-principal"> 
                    <div>
                        <img src="${picture}" alt="${firstName}" class="thumbail"/>
                    </div>
                    <div>
                        ${firstName} ${lastName}, ${age}
                    </div>
                </div>
             </di>`;

        usersHtml += HTMLElement;
    });

    tabUsers.innerHTML = usersHtml;

    let countUser = document.querySelector("#countUser");
    countUser.textContent = arrayUsers.length;

}

function search() {
    let value = document.querySelector("#txtSearch").value;

    const result = users.filter(x => {
        return x.firstName.toLowerCase().includes(value.toLowerCase()) || 
               x.lastName.toLowerCase().includes(value.toLowerCase())
    });

    if(value =! "" && value != null && value != undefined ) {
        renderUsers(result);
        renderStatistic(result);
    } else {
        renderUsers(users);
        renderStatistic(users);
    }
}

function formatNumber(number) {
    return numberFomart.format(number);
}