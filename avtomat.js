let avtomat = document.getElementById('avtomat');
console.log(avtomat)
let colums = avtomat.children;
console.log(colums);

let stavka = document.getElementById('stavka');
let stavka_plus = document.getElementById('stavka_plus');
let stavka_minus = document.getElementById('stavka_minus');

let coins = document.getElementById('coins');

const cols = {
	col_0: ['1.jpg','2.jpg','3.jpg','smile.jpg','wild.jpg','x2.jpg','x4.jpg'],
	col_1: ['1.jpg','2.jpg','3.jpg','smile.jpg','wild.jpg'],
	col_2: ['1.jpg','2.jpg','3.jpg','smile.jpg','wild.jpg'],
	col_3: ['1.jpg','2.jpg','3.jpg','smile.jpg','wild.jpg'],
	col_4: ['1.jpg','2.jpg','3.jpg','smile.jpg','wild.jpg'],
}

function onClick(event){
     console.log('click', event.target)
    if (event.target.id === 'stavka') {
    	for (var i = 0; i < colums.length; i++) {
    		const b =cols[`col_${i}`].length;
    		colums[i].querySelector('img').src=cols[`col_${i}`][Math.floor(b*Math.random())]
    		//console.log(colums[i], Math.floor(3*Math.random()))
    	}
    }
  }

  stavka.addEventListener("click", onClick)