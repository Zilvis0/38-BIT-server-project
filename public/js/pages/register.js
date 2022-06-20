import { IsValid } from "../components/IsValid.js";

const formDOM = document.querySelector('.form');
const inputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');
const notificationsDOM = formDOM.querySelector('.notifications');

if (submitDOM) {
    submitDOM.addEventListener('click', (e) => {
        e.preventDefault();

        const data = {};
        const errors = [];

        notificationsDOM.classList.remove('show');
        notificationsDOM.innerText = '';

        for (const inputDOM of inputsDOM) {
            if (inputDOM.type !== 'checkbox') {
                const rule = inputDOM.dataset.validation;
                const [err, msg] = IsValid[rule](inputDOM.value);
                if (err) {
                    errors.push(msg);
                } else {
                    notificationsDOM.classList.add('show');
                    notificationsDOM.innerHTML += `<p>${msg}</p>`;
                }
            } else {
                data[inputDOM.name] = inputDOM.checked;
            }
        }

        console.log(errors);

        // tikriname ar laukai ne tusti
        // tikriname ar geros vertes:
        //      ar vardas "tinkamas" (minimum 2 zodziai)
        //      ar email "tinkamas"
        //      ar password "tinkamas"
        //      ar repeat-password "tinkamas"
        //      ar password === repeat-password
        //      ar TOS pazymetas (check)
        //  JEI yra klaidu:
        //      klaidas atvaizduojame pranesimu bloke
        //  JEI klaidu nera:
        //      sekmes pranesima atvaizduojame pranesimu bloke

        // siunciam i backend'a (API)
        //      JEI grazino klaida
        //          klaidas atvaizduojame pranesimu bloke
        //      JEI klaidu nera:
        //          sekmes pranesima atvaizduojame pranesimu bloke
    })
}