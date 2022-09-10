const textWriting = document.querySelector('.questionText')
const settingTyping = {
    text: 'Quer namorar comigo?', 
    mainText: 'Quer casar comigo?',
    hateText: 'Por que me odeia?',
    goodText: 'Sério? Eu te amo',
    textSpeed: 100,
    currentLetter: 0,
    isDelete: false
}

const typingText = ()=>{
    
    let mainText = settingTyping.mainText
    let currentLetter = settingTyping.currentLetter
    let isDelete = settingTyping.isDelete
    let otherText = textWriting.innerHTML
    console.log(mainText)
    if(currentLetter < mainText.length){
        if(otherText.indexOf('Quer casar ') != -1 || isDelete){
            console.log('error')
            settingTyping.isDelete = true
            textWriting.textContent = mainText.substring(0, otherText.length-1)
            settingTyping.textSpeed = Math.round(Math.random()*(250 - 150) + 150)
            clearInterval(interval)
            interval = setInterval(typingText, settingTyping.textSpeed)

            if(otherText == 'Quer '){
                settingTyping.isDelete = false
                settingTyping.mainText = settingTyping.text
                settingTyping.currentLetter = 4
                settingTyping.textSpeed = 100
                clearInterval(interval)
                interval = setInterval(typingText, settingTyping.textSpeed)
            }
            return
        }
        textWriting.textContent += mainText[currentLetter]
        settingTyping.currentLetter++

    }else{
        settingTyping.currentLetter = 0
        clearInterval(interval)
    }

};
var interval = setInterval(typingText, settingTyping.textSpeed)


window.addEventListener('load', ()=>{
    typingText()
})

//Buttons

const buttonNo = document.querySelector('#no');
var times = 0;

const changePosition = ()=>{
    if(times == 0){
        buttonYes.removeAttribute('hidden')
        times++
        return
    }else if(times == 1){
        buttonNo.style.position = 'absolute'
    }

    times++
    messageText.textContent = ''
    console.log(times)

    if(times==10){
        messageText.textContent = 'Sério mesmo que não vai clicar no "Sim"?'
        document.body.style.backgroundImage = 'url("assets/image/stage2.png")'
        document.body.style.backgroundPosition = 'bottom center'
        openWindow()
    }else if(times==20){
        document.body.style.backgroundImage = 'url("assets/image/stage3.jpg")'
        document.body.style.backgroundPosition = 'center center'
    }else if(times==30){
        messageText.textContent = 'Eu te fiz algo, afinal?'
        document.body.style.backgroundImage = 'url("assets/image/stage4.jpg")'
        openWindow()
    }else if(times == 50){
        messageText.textContent = 'Beleza, então é só fechar o site.😔'
        openWindow()
    }
    
    let [ posX, posY ]= calculatePosition()
    setPosition(posX, posY)
};

const calculatePosition = ()=>{
    let posX = Math.floor(Math.random()* (window.innerWidth-100))
    let posY =  Math.floor(Math.random()* (window.innerHeight-50))
    return [posX, posY]
};

const changingResize = ()=>{
    let [ posX, posY ] = calculatePosition()
    setPosition(posX, posY)
};

const setPosition = (posX, posY)=>{
    buttonNo.style.top = `${posY}px`;
    buttonNo.style.left = `${posX}px`; 
};

buttonNo.addEventListener('mouseover', changePosition);
buttonNo.addEventListener('click', changePosition);
buttonNo.addEventListener('touch', changePosition);

window.addEventListener('resize', changingResize); 

//If accept

const buttonYes = document.querySelector('#yes');
const exitButton = document.querySelector('.buttonExit');
const messageWindow = document.querySelector('.windowMessage-container');
const messageText = document.querySelector('.messageText')

const acceptRequest = ()=>{
    clearInterval(interval)
    settingTyping.isDelete = false
    settingTyping.currentLetter = 0
    messageText.textContent = ''
    if(times == 1){
        messageText.textContent = 'Eu sabia que tudo era real <3'
        openWindow()
    }else if(times > 1 && times <= 9){
        messageText.textContent = `kkkk acho que você quase clicou "Não" sem querer ${times} vezes kk`
        openWindow()
    }else if(times >= 10 && times <= 29){
        messageText.textContent = 'Okay, talvez você estivesse em duvida. Até parece que te obriguei kk'
        openWindow()
    }else if(times >= 30 && times <= 48){
        messageText.textContent = 'Você quer que eu tenha um ataque cardíaco? Sério mesmo?'
        openWindow()
    }else if(times == 49){
        messageText.textContent = 'Você quase rucusou por 50 vezes, agora quem não quer sou eu'
        openWindow()
    }

    textWriting.textContent = ''
    settingTyping.mainText = settingTyping.goodText
    interval = setInterval(typingText, settingTyping.textSpeed)
    blockAnswer()
}

const openWindow = ()=>{
    messageWindow.style.display = 'flex'
}

const closeWindow = ()=>{
    messageWindow.style.display = 'none'
}

const verifyWindow = ()=>{
    if(times >= 49){
        refusedRequest()
    }
}

const blockAnswer = ()=>{
    buttonNo.style.position = 'static'
    buttonNo.setAttribute('disabled', '')
    buttonYes.setAttribute('disabled', '')
    buttonNo.className = 'disabled'
    buttonYes.className = 'disabled'
}

const refusedRequest = ()=>{
    blockAnswer()
    textWriting.textContent = ''
    settingTyping.mainText = settingTyping.hateText
    interval = setInterval(typingText, settingTyping.textSpeed)
}

buttonYes.addEventListener('click', acceptRequest)
exitButton.addEventListener('click', closeWindow);
exitButton.addEventListener('click', verifyWindow);