import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.css';
import configuration from '../build/contracts/ArtWork.json';
//import ticketImage from './image/272009556_636464824304279_2488074267861662953_n.jpg';

const createElementFromString = (string) => {
    const div = document.createElement('div');
    div.innerHTML =string.trim();
    return div.firstChild;
};

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
    Web3.givenProvider || 'http://127:0.0.1:7545'
);
const contract = new web3.eth.Contract(
    CONTRACT_ABI, 
    CONTRACT_ADDRESS
);

const ITEMS=8;
const EMPTY_ADDDRESS="0x0000000000000000000000000000000000000000"

const dateInSecs=Math.floor(new Date().getTime()/1000)
console.log(dateInSecs)

let account;

const accountEl = document.getElementById('account');
const postingsEl = document.getElementById('postings');
const buyArt = async (artpiece) => {
    await contract.methods.buyArt(artpiece.id).send({
        from: account, 
        value: artpiece.price  
    });
    await Art_refresh();
};

const Art_refresh = async () => {
    postingsEl.innerHTML='';
    for(let i=0; i < ITEMS; i++) {
        const artpiece = await contract.methods.postings(i).call();
        console.log(contract.methods.postings)
        artpiece.id=i;
        
        console.log(dateInSecs)
        if (artpiece.owner === EMPTY_ADDDRESS && dateInSecs>artpiece.exptime){
            const postingEl = createElementFromString(`
                <div class="ticket card" style="width: 18rem;">
                    <img src="${artpiece.image}" class="card-img-top" width="200" height="300" class="d-inline-block align-top" alt="...">
                    <div class="card-body" style="margin:0;">
                        <p style="margin-bottom:0;"><strong>${artpiece.name}</strong></p>
                        <p style="margin-bottom:0;"><sup><i>${artpiece.description}</i></sup></p>
                        <p style="margin-bottom:0; class="card-text"><strong>Price:</strong> ${artpiece.price/1e18} ETH</p>
                        <p style="margin-top:0; class="card-text"><strong>Owner:</strong>${artpiece.owner}</p>
                        <button type="button" class="btn btn-dark" disabled>Expired!</button>
                    </div>
                </div>
            `);
            postingsEl.appendChild(postingEl);
        }
        
        else if(artpiece.owner === EMPTY_ADDDRESS){
            const postingEl = createElementFromString(`
                <div class="ticket card" style="width: 18rem;">
                    <img src="${artpiece.image}" class="card-img-top" width="200" height="300" class="d-inline-block align-top" alt="...">
                    <div class="card-body" style="margin:0;">
                        <p style="margin-bottom:0;"><strong>${artpiece.name}</strong></p>
                        <p style="margin-bottom:0;"><sup><i>${artpiece.description}</i></sup></p>
                        <p style="margin-bottom:0; class="card-text"><strong>Price:</strong> ${artpiece.price/1e18} ETH</p>
                        <p style="margin-top:0; class="card-text"><strong>Owner:</strong>${artpiece.owner}</p>
                        <p class="card-text" id="countdown_${i}"></p>
                        <button class="btn btn-primary">Buy</button>

                    </div>
                </div>
            `);
            const button = postingEl.querySelector('button');
            button.onclick = buyArt.bind(null,artpiece);
            postingsEl.appendChild(postingEl);

            window.setInterval( function() {
                showRemaining(i, artpiece.exptime);
            }, 1000);
        }
        else{
            const postingEl = createElementFromString(`
                <div class="ticket card" style="width: 18rem;">
                    <img src="${artpiece.image}" class="card-img-top" width="200" height="300" class="d-inline-block align-top" alt="...">
                    <div class="card-body">
                        <p style="margin-bottom:0;"><strong>${artpiece.name}</strong></p>
                        <p style="margin-bottom:0;"><sup><i>${artpiece.description}</i></sup></p>
                        <p style="margin-bottom:0; class="card-text"><strong>Sold Price: ${artpiece.price/1e18} ETH </strong></p>
                        <p style="margin-top:0; class="card-text"><strong>Owner:</strong>${artpiece.owner}</p>
                        <button type="button" class="btn btn-dark" disabled>Sold!</button>
                    </div>
                </div>
            `);
            postingsEl.appendChild(postingEl);
        }
    }
};


function showRemaining(id, exptime)
{
    var server_end = exptime;
    var server_now = Math.floor(new Date().getTime()/1000);
    var client_now = new Date().getTime();
    var end = server_end - server_now + client_now; // this is the real end time

    var _second = 1;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour *24
    var timer;

    var now = new Date();
    var distance = end - now;
    if (distance < 0 ) {
        clearInterval( timer );
        document.getElementById('countdown_'+id).innerHTML = '';
        window.location.reload();
        return;
    }
    var days = Math.floor(distance / _day);
    var hours = Math.floor( (distance % _day ) / _hour );
    var minutes = Math.floor( (distance % _hour) / _minute );
    var seconds = Math.floor( (distance % _minute) / _second );

    var countdown = document.getElementById('countdown_' + id);
    // var days = document.getElementById('days_' + id);
    // var hours = document.getElementById('hours_' + id);
    // var minutes = document.getElementById('minutes_' + id);
    // var seconds = document.getElementById('seconds_' + id);
    // countdown.innerHTML = '';
    // if (days) {
    //     countdown.innerHTML += 'Days: ' + days + '<br />';
        
    // }
    countdown.innerHTML= "";

    const timerHTML = createElementFromString(`
    <div class="count-down-container">
    <div class="count-down-box">
      <div class="count-down">
        <h1 id="days">${days}</h1>
        <p>Days</p>
      </div>
    </div>
    <div class="count-down-box">
      <div class="count-down">
        <h1 id="hours">${hours}</h1>
        <p>Hours</p>
      </div>
    </div>
    <div class="count-down-box">
      <div class="count-down">
        <h1 id="minutes">${minutes}</h1>
        <p>Minutes</p>
      </div>
    </div>
    <div class="count-down-box">
      <div class="count-down">
        <h1 id="seconds">${seconds}</h1>
        <p>Seconds</p>
      </div>
    </div>
  </div>`);

    countdown.appendChild(timerHTML);

    // countdown.innerHTML += 'Minutes: ' + minutes+ '<br />';
    // countdown.innerHTML += 'Seconds: ' + seconds+ '<br />';
}
// var intervalId = window.setInterval(function(){
//     showRemaining()();
// }, 1000);

// timer = setInterval(showRemaining(0,), 1000);

window.setTimeout( function() {
    window.location.reload();
}, 30000);

const main = async () => {
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    accountEl.innerText=account;
    await Art_refresh();
};

main();