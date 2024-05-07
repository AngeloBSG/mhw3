/*Sezione barra di ricerca*/
function Ricerca(){
  const text = document.querySelector('#InputBar');
  text.value = '';
}

function NoRicerca(){
  const text = document.querySelector('#InputBar');
  if(text.value.length == 0){
    text.value = 'Inserire ricetta';
  }
}

const text = document.querySelector("#InputBar");
text.addEventListener("click", Ricerca);
text.addEventListener("blur", NoRicerca);

/*sezione menu Gestione*/
const FrecciaDs = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/forward-arrow.png';
const FrecciaGiu = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/down-arrow.png';

function toggle(event) {
  const det = document.querySelector('.Dettagli');
  const img = event.currentTarget.querySelector('#GestioneImg');
  const text = event.currentTarget.querySelector('#GestioneText');
  
  isVisible = !isVisible;
  if (isVisible) {
    det.classList.remove('Nascosti');
    img.src = FrecciaGiu;
    text.textContent = 'Nascondi Gestione Account / Impostazioni';

  } else {
    det.classList.add('Nascosti');
    img.src = FrecciaDs;
    text.textContent = 'Mostra Gestione Account / Impostazioni';

  }
}
let isVisible = false;

const DetToggle = document.querySelector('.Gestione');
DetToggle.addEventListener('click', toggle);


/*sezione menu mobile*/
function ApriChiudiMenu(){
  isVisible1 = !isVisible1;

  if(isVisible1){
    modalView.classList.remove('hidden');
  }else{
    modalView.classList.add('hidden');
  }
}

let isVisible1 = false;
const opzioni = document.querySelector("#SpazioMenu");
const modalView = document.querySelector('#modal-view');
opzioni.addEventListener("click", ApriChiudiMenu);


function MostraRicette(json){
  const listaRicette = document.querySelector('#Ricette-view');
  listaRicette.innerHTML = '';
  let risultati = json.trovati;
  if(risultati > 10)
    risultati = 10;
  for(let i=0; i<risultati; i++){
    const documento = json.docs[i];
    const titolo = doc.title;

    const cover_url = '/images/media/meals/llcbn01574260722.jpg/preview';
    const ricetta = document.createElement('div');
    ricetta.classList.add('ricetta');
    const img = document.createElement('img');
    img.src = cover_url;
    const didascalia = document.createElement('span');
    didascalia.textContent = title;
    ricetta.appendChild(img);
    ricetta.appendChild(didascalia);
    listaRicette.appendChild(ricetta);
  }
}

function onResponse(response){
  return response.json();
}

function search(event){
  event.preventDefault();
  const nomeRicetta = docuemnt.querySelector('#InputBar');
  rest_url = 'www.themealdb.com/api/json/v1/1/search.php?s='+ nomeRicetta;
  fetch(rest_url).then(onResponse).then(MostraRicette);
}

const form = document.querySelector('form');
form.addEventListener('Ricerca', search);


/*funzione per accedere*/

const client_id= '';
const client_secret= '';
let token;

function RichiestaToken(){
  const url = 'https://accounts.spotify.com/api/token';
  const response = fetch(url,{
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers:{
      'Content_Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' +  btoa(client_id + ':' + client_secret)
    }
  }).then(GotResponse, GotError).then(SaveToken);
}

function GotResponse(response){
  return response.json();
}

function GotError(error){
  console.log(error);
}

function SalvaToken(token){
  console.log(token);
  const a = document.querySelector('input').value;
  const url = /*link*/
  fetch(url,{
    method:'GET',
    headers:{
      'Authorization':'Bearer '+token.access_token
    }
  }).then(GotResponse, GotError).then(MostraRicette);
}

