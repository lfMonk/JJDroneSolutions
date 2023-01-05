'use strict';

const overlay = document.querySelector('.overlay');
const startWindow = document.querySelector('.startwindow');
const startBtn = document.querySelector('.startBtn');
const plusbutton = document.querySelector('.plusbutton');
const minusbutton = document.querySelector('.minusbutton');
const numdisks = document.querySelector('.numdisks');
const about1 = document.querySelector('.about1');
const about2 = document.querySelector('.about2');
const movesMes = document.getElementById('movesMes');
const finish = document.getElementById('finish');
const restart = document.getElementById('restartBtn');

let startClicked = false;
let disks = 3;
let moves = 7;
let minMoves = 7;
let columns = [0, 0, 0];
let current = 0;
let fromCol;


startBtn.addEventListener('click', function(){
    startWindow.classList.add('hiddenStart');
    overlay.classList.add('hidden');
    startClicked = true;
    moves = minMoves;
    movesMes.textContent = `moves: ${moves}`;
    // visable only choosen disks
    for (let i = 1; i <= 8; i++)
        if (i > disks)
            document.getElementById(`d--${i}`).classList.add('hidden');
        else
        // set column 2 value
            columns[1] =  columns[1] * 10 + i;  
    
})

startWindow.addEventListener('animationend',function(){
    if (startClicked)
        startWindow.classList.add('hidden');
})

plusbutton.addEventListener('click', function(){
    if (disks < 8){
        numdisks.textContent = ++disks;
        setMes();
    }
})

minusbutton.addEventListener('click', function(){
    if (disks > 3){
        numdisks.textContent = --disks;
        setMes();
    }
})

restart.addEventListener('click', function(){
    startClicked = false;
    disks = 3;
    moves = 7;
    columns = [0, 0, 0];
    current = 0;
    finish.classList.add('hidden');
    startWindow.classList.remove('hidden');
    startWindow.classList.remove('hiddenStart');
    numdisks.textContent = '3';
    setMes();
    for (let i = 1; i <= 8; i++){
        document.getElementById(`d--${i}`).classList.remove('c--1','c--2','c--3','h--1','h--2','h--3','h--4','h--5','h--6','h--7','h--8');
        document.getElementById(`d--${i}`).classList.add(`c--2`);
        document.getElementById(`d--${i}`).classList.add(`h--${i}`);
        document.getElementById(`d--${i}`).classList.remove(`hidden`);
        movesMes.classList.replace("redMes", "greenMes");
    }
})

document.addEventListener('mousedown', function(e){
    const xScale = window.innerWidth / 100;
    const yScale = window.innerHeight / 100;
    const clickedXScale = e.clientX / xScale;
    const clickedYScale = e.clientY / yScale;

    if (startClicked && clickedXScale > 8 && clickedXScale < 92 && clickedYScale > 30 && clickedYScale < 90){
        let colSelected = Math.trunc((clickedXScale - 10) / 26.5);
        // if disk is picked - put to new colomn
        if (current){
            if (current > columns[colSelected] % 10){
                // update columns values
                columns[colSelected] = columns[colSelected] * 10 + current;
                // check if game over
                if (columns[1] === 0 && (columns[0] === 0 || columns[2] === 0)){
                    overlay.classList.remove('hidden');
                    finish.classList.remove('hidden');
                }
                else{
                    // update spteps title
                    if (colSelected != fromCol) 
                        if(moves > 1)
                            movesMes.textContent = `moves: ${--moves}`;
                        else {
                            if (moves == 1)
                                movesMes.classList.replace("greenMes", "redMes");
                            movesMes.textContent = `moves: ${++minMoves}`;
                        }
                    }
                    

                // move disks
                document.getElementById(`d--${current}`).classList.remove('c--1','c--2','c--3','h--1','h--2','h--3','h--4','h--5','h--6','h--7','h--8');
                document.getElementById(`d--${current}`).classList.add(`c--${colSelected + 1}`);
                document.getElementById(`d--${current}`).classList.add(`h--${columns[colSelected].toString().length}`);
                document.getElementById(`d--${current}`).classList.remove('diskTrans')
                current = 0;
            }
        
        }
        // pick up disk
        else{ 
            current = columns[colSelected] % 10;
            columns[colSelected]  = Math.trunc(columns[colSelected] / 10);
            fromCol = colSelected;
            document.getElementById(`d--${current}`).classList.add('diskTrans');
        }
    }
})

document.addEventListener('mousemove', function(e){
    const xScale = window.innerWidth / 100;
    const yScale = window.innerHeight / 100;
    const clickedXScale = e.clientX / xScale;
    const clickedYScale = e.clientY / yScale;
    if (startClicked && current && clickedXScale > 8 && clickedXScale < 92 && clickedYScale > 30 && clickedYScale < 90){
        let colSelected = Math.trunc((clickedXScale - 10) / 26.5);
        if (current > columns[colSelected] % 10){
                
                document.getElementById(`d--${current}`).classList.remove('c--1','c--2','c--3','h--1','h--2','h--3','h--4','h--5','h--6','h--7','h--8');
                document.getElementById(`d--${current}`).classList.add(`c--${colSelected + 1}`);
                document.getElementById(`d--${current}`).classList.add(`h--${columns[colSelected] === 0 ? 1 : columns[colSelected].toString().length + 1}`);

        }
    }
})

function setMes()
{
    switch(disks)
    {
        case 3: 
            about1.textContent = 'very easy';
            minMoves = 7;
            break;
        case 4:
            about1.textContent = 'Easy';
            minMoves = 15;
            break;
        case 5: 
            about1.textContent = 'medium';
            minMoves = 31;
            break;
        case 6:
            about1.textContent = 'advanced';
            minMoves =  63;
            break;  
        case 7: 
            about1.textContent = 'hard';
            moves = 127;
            break;
        case 8:
            about1.textContent = 'very hard';
            minMoves = 255;
            break;             
    }
    about2.textContent = `minimun moves: ${minMoves}`;
}