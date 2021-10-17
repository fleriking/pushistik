let avtomat = document.getElementById('avtomat')
console.log(avtomat)
let colums = avtomat.children
console.log(colums)

let stavka = document.getElementById('stavka')
let stavka_plus = document.getElementById('stavka_plus')
let stavka_minus = document.getElementById('stavka_minus')
let multy_html = document.querySelector('.multy')
let messages = document.querySelector('.messages')

let coins = document.getElementById('coins')

let multy = 1

function addCoins(n) {
  if ((typeof n == 'number') && n > 0) {
    coins_value += n
    coins.textContent = Number(coins_value.toFixed(2))
  } else {
    alert('wrong value!')
  }
}

var urlParam = function(name, w){
  w = w || window;
  var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
      val = w.location.search.match(rx);
  return !val ? '':val[1];
}

let coins_value = coins.textContent = Number(urlParam('coins'))


let col1234 = [
  {name: '1', src: '1.jpg', chance: 0.377, position: 0},
  {name: '2', src: '2.jpg', chance: 0.363, position: 1},
  {name: '3', src: '3.jpg', chance: 0.361, position: 2},
  {name: 'smile', src: 'smile.jpg', chance: 0.29, position: 3},
  {name: 'wild', src: 'wild.jpg', chance: 0.2, position: 4}]

const cols = {
  col_0: [
    {name: '1', src: '1.jpg', chance: 0.33, position: 0},
    {name: '2', src: '2.jpg', chance: 0.2, position: 1},
    {name: '3', src: '3.jpg', chance: 0.25, position: 2},
    {name: 'smile', src: 'smile.jpg', chance: 0.24, position: 3},
    {name: 'wild', src: 'wild.jpg', chance: 0.55, position: 4},
    {name: 'x2', src: 'x2.jpg', chance: 0.8, position: 5},
    {name: 'x4', src: 'x4.jpg', chance: 0.2, position: 6},
  ],
  col_1: col1234,
  col_2: col1234,
  col_3: col1234,
  col_4: col1234,
}

const table_win = {
  JACK_POT: 250,
  JACK_POT_x4: 1000,
  JACK_POT_x2: 500,
  earn_1: 2,
  earn_2: 10,
  earn_3: 50,
  earn_smile: 100,
}
const mass_win = [
  table_win.earn_1,
  table_win.earn_2,
  table_win.earn_3,
  table_win.earn_smile]

function onClick(event) {
  console.log('click', event.target)
  if (coins_value>=multy) {
    const results_avtomat = []
    for (let i = 0; i < colums.length; i++) {
      const b = cols[`col_${i}`].length
      
      let change
      for (let num = 0; num < b; num++) {
        if (cols[`col_${i}`][num].chance >= Math.random()) {
          change = cols[`col_${i}`][num]
          num = b
        }
      }
      if (change === undefined) {
        change = cols[`col_${i}`][b - 1]
      }
      results_avtomat.push(change)
      
      colums[i].querySelector('img').src = change.src
      
    }
    console.log(results_avtomat)
    let earn_avtomat
    
    const whithoutWild = []
    for (let i = 0; i < 5; i++) {
      if (results_avtomat[i].name != 'wild') {
        whithoutWild.push(results_avtomat[i])
      }
    }
    
    if (whithoutWild.length == 0) {
      earn_avtomat = table_win.JACK_POT
    } else if (whithoutWild.length == 1 && whithoutWild[0].name ==
        'x2') { earn_avtomat = table_win.JACK_POT_x2 } else if (whithoutWild.length ==
        1 && whithoutWild[0].name ==
        'x4') { earn_avtomat = table_win.JACK_POT_x4 } else {
      // nija mistakes
      if (whithoutWild.length == 1) {
        earn_avtomat = table_win[`earn_${whithoutWild[0].name}`]
      } else {
        if (whithoutWild[0].name != 'x2' && whithoutWild[0].name != 'x4') {
          earn_avtomat = table_win[`earn_${whithoutWild[0].name}`]
          
          console.log(whithoutWild, '  !=x2x4  ', +whithoutWild[0].name[1])
          
          for (let i = 1; i < whithoutWild.length; i++) {
            if (whithoutWild[i].name != whithoutWild[0].name) {
              earn_avtomat = 0
              break
            }
          }
        } else {
          earn_avtomat = +(whithoutWild[0].name[1]) *
              table_win[`earn_${whithoutWild[1].name}`]
          
          console.log(whithoutWild, ' x2x4   ', +whithoutWild[0].name[1])
          
          for (let i = 2; i < whithoutWild.length; i++) {
            if (whithoutWild[i].name != whithoutWild[1].name) {
              earn_avtomat = 0
              break
            }
          }
        }
        
      }
    }
    
    console.log('earn_avtomat===', earn_avtomat)
    earn_avtomat
        ? messages.textContent = `You are win: ${Number(
        (earn_avtomat * multy).toFixed(2))} coins`
        : messages.textContent = 'You are looser'
    coins_value += (earn_avtomat - 1) * multy
    coins.textContent = Number(coins_value.toFixed(2))
    
  } else {
    messages.textContent = 'Buy more coins!'
  }
}

function onClickPlus(event) {
  if (multy < 5) {
    multy += 0.05
    multy = Number(multy.toFixed(2))
    multy_html.textContent = `${multy} coins`
  }
}

function onClickMinus(event) {
  if (multy > 0.05) {
    multy -= 0.05
    multy = Number(multy.toFixed(2))
    multy_html.textContent = `${multy} coins`
  }
}

function onClickPlusMany(event) {
  let x = setInterval(function tmp() {
    onClickPlus(event)
	  console.log(event)
  }, 300)
  stavka_plus.addEventListener(event.type == "mousedown"?'mouseup' :'touchend'
		  , function() {
    clearInterval(x)
  })
}

function onClickMinusMany(event) {
  let x = setInterval(function tmp() {
    onClickMinus(event)
    //stavka_minus.onmouseup = function(){
    //clearInterval(x)
    //stavka_minus.onmouseup = null
    console.log(event)
    //}
  }, 300)
	//console.log(event.type)
  stavka_minus.addEventListener(event.type == "mousedown"?'mouseup' :'touchend'
		  , function() {
    clearInterval(x)
  })
  
}

stavka.addEventListener('click', onClick)
stavka_plus.addEventListener('click', onClickPlus)
stavka_plus.addEventListener('mousedown', onClickPlusMany)
stavka_plus.addEventListener('touchstart', onClickPlusMany)

stavka_minus.addEventListener('click', onClickMinus)
stavka_minus.addEventListener('mousedown', onClickMinusMany)
stavka_minus.addEventListener('touchstart', onClickMinusMany)

function getLastPercent(elements) {
  let result = 1
  const difAll = []
  for (let i = 0; i < elements.length - 1; i++) {
    dif = result * elements[i].chance
    difAll.push(dif)
    result = result * (1 - elements[i].chance)
    console.log('dif ', elements[i].name, ':', dif, '-ostatok', result)
  }
  difAll.push(result)
  console.log('dif', elements[elements.length - 1].name, ':', result)
  return difAll
}

function getchance(col0, col1234) {
  let dif0 = col0 //getLastPercent(cols.col_0)
  let dif1234 = col1234 // getLastPercent(col1234)
  let rake = 0
  let chance_win = 0
  
  let jackpot = dif0[4] * dif1234[4] * dif1234[4] * dif1234[4] * dif1234[4]
  console.log('jackpot chance:', jackpot, '  chance*win=',
      jackpot * table_win.JACK_POT)
  
  chance_win += jackpot
  rake += jackpot * table_win.JACK_POT
  
  let jackpotx4 = dif0[6] * dif1234[4] * dif1234[4] * dif1234[4] * dif1234[4]
  console.log('jackpot_x4 chance:', jackpotx4, '  chance*win=',
      jackpotx4 * table_win.JACK_POT_x4)
  
  chance_win += jackpotx4
  rake += jackpotx4 * table_win.JACK_POT_x4
  
  let jackpotx2 = dif0[5] * dif1234[4] * dif1234[4] * dif1234[4] * dif1234[4]
  console.log('jackpot_x2 chance:', jackpotx2, '  chance*win=',
      jackpotx2 * table_win.JACK_POT_x2)
  
  chance_win += jackpotx2
  rake += jackpotx2 * table_win.JACK_POT_x2
  
  const chanceCols1 = []
  for (let i = 0; i < 4; i++) {
    chanceCols1.push((dif1234[i] + dif1234[4]) * (dif1234[i] + dif1234[4]) *
        (dif1234[i] + dif1234[4]) * (dif1234[i] + dif1234[4]))
    //console.log(i,' chance1=',chanceCols1[i])
  }
  
  const chanceCols0 = []
  for (let i = 0; i < 4; i++) {
    chanceCols0.push(chanceCols1[i] * (dif0[i] + dif0[4]) - jackpot)
    console.log(i, ' chance0=', chanceCols0[i], '  chance*win=',
        chanceCols0[i] * mass_win[i])
    chance_win += chanceCols0[i]
    rake += chanceCols0[i] * mass_win[i]
    
  }
  
  const chanceColsx2 = []
  for (let i = 0; i < 4; i++) {
    chanceColsx2.push(chanceCols1[i] * dif0[5] - jackpotx2)
    console.log(i, ' chance0x2=', chanceColsx2[i], '  chance*win=',
        chanceColsx2[i] * mass_win[i] * 2)
    chance_win += chanceColsx2[i]
    rake += chanceColsx2[i] * mass_win[i] * 2
  }
  
  const chanceColsx4 = []
  for (let i = 0; i < 4; i++) {
    chanceColsx4.push(chanceCols1[i] * dif0[6] - jackpotx4)
    console.log(i, ' chance0x4=', chanceColsx4[i], '  chance*win=',
        chanceColsx4[i] * mass_win[i] * 4)
    chance_win += chanceColsx4[i]
    rake += chanceColsx4[i] * mass_win[i] * 4
  }
  console.log('Total get back: ', rake)
  console.log('Chance to win: ', chance_win)
  
}

// console.log(getLastPercent(cols.col_0))
//console.log(getLastPercent(cols.col_1))
getchance(getLastPercent(cols.col_0), getLastPercent(col1234))

function testRake(num) {
  let totalResult = 0
  for (let x = 0; x < num; x++) {
    const results_avtomat = []
    for (let i = 0; i < colums.length; i++) {
      const b = cols[`col_${i}`].length
      
      let change
      for (let num = 0; num < b; num++) {
        if (cols[`col_${i}`][num].chance >= Math.random()) {
          change = cols[`col_${i}`][num]
          num = b
        }
      }
      if (change === undefined) {
        change = cols[`col_${i}`][b - 1]
      }
      results_avtomat.push(change)
      
      //colums[i].querySelector('img').src=change.src
      
    }
    //console.log(results_avtomat)
    let earn_avtomat
    
    const whithoutWild = []
    for (let i = 0; i < 5; i++) {
      if (results_avtomat[i].name != 'wild') {
        whithoutWild.push(results_avtomat[i])
      }
    }
    
    if (whithoutWild.length == 0) {
      earn_avtomat = table_win.JACK_POT
    } else if (whithoutWild.length == 1 && whithoutWild[0].name ==
        'x2') { earn_avtomat = table_win.JACK_POT_x2 } else if (whithoutWild.length ==
        1 && whithoutWild[0].name ==
        'x4') { earn_avtomat = table_win.JACK_POT_x4 } else {
      // nija mistakes
      if (whithoutWild.length == 1) {
        earn_avtomat = table_win[`earn_${whithoutWild[0].name}`]
      } else {
        if (whithoutWild[0].name != 'x2' && whithoutWild[0].name != 'x4') {
          earn_avtomat = table_win[`earn_${whithoutWild[0].name}`]
          
          //console.log(whithoutWild,'  !=x2x4  ',+whithoutWild[0].name[1])
          
          for (let i = 1; i < whithoutWild.length; i++) {
            if (whithoutWild[i].name != whithoutWild[0].name) {
              earn_avtomat = 0
              break
            }
          }
        } else {
          earn_avtomat = +(whithoutWild[0].name[1]) *
              table_win[`earn_${whithoutWild[1].name}`]
          
          //console.log(whithoutWild,' x2x4   ',+whithoutWild[0].name[1])
          
          for (let i = 2; i < whithoutWild.length; i++) {
            if (whithoutWild[i].name != whithoutWild[1].name) {
              earn_avtomat = 0
              break
            }
          }
        }
        
      }
    }
    
    //console.log('earn_avtomat===',earn_avtomat)
    //earn_avtomat ? messages.textContent=`You are win: ${Number(earn_avtomat.toFixed(2))} coins` : messages.textContent='You are looser'
    totalResult += (earn_avtomat - 1) * multy
    //coins.textContent=Number(coins_value.toFixed(2))
  }
  return `${Number((totalResult * 100 / num).toFixed(4))} %`
  
}