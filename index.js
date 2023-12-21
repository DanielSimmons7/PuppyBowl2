const span = document.querySelector('span');
const ul = document.querySelector('ul');
let events = [];

window.addEventListener('hashchange', function(){
    render();
});

const COHORT = "2309-FTB-ET-WEB-AM";
const API = "https://fsa-puppy-bowl.herokuapp.com/api/" + COHORT;

function render(){
    span.innerHTML = events.length;
    const hash = window.location.hash;
    const id = hash.slice(1)*1;
    let filtered = events;
    if(id){
        filtered = filtered.filter(function(event){
            return event.id === id;
        });
        
    }
    const html = filtered.map(function(event){
        return `
        <li>
            <h4><a href='#${event.id}'>${event.name}</a></h4>
            <img src="${event.imageUrl}">
            <p>${event.breed}</p>
        </li>
        `
    }).join('');
    ul.innerHTML = html;
};

render();

async function fetchEvents(){
    const response = await fetch(API + "/players");
    const json = await response.json();
    events = json.data.players;
    render();
};

fetchEvents();