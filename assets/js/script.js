const textWriting = document.querySelector('.questionText')
const settingTyping = {
    text: 'Quer namorar comigo?', 
    mainText: 'Quer casar comigo?',
    textSpeed: 100,
    currentLetter: 0,
    isDelete: false
}

const typingText = ()=>{
    
    let mainText = settingTyping.mainText
    let currentLetter = settingTyping.currentLetter
    let isDelete = settingTyping.isDelete
    let otherText = textWriting.innerHTML

    if(currentLetter < mainText.length){
        if(otherText.indexOf('Quer casar ') != -1 || isDelete){
            
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
    }

    times++
    if(times==10){
        alert('Sério mesmo que não vai clicar no "Sim"?')
    }else if(times==30){
        alert('O que que eu te fiz?')
    }else if(times == 50){
        alert('Beleza, então é só fechar o site.😔')
        window.close()
    }
    
    buttonNo.style.position = 'absolute'
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

const acceptRequest = ()=>{
    console.log(times)
    if(times == 1){
        alert('Eu sabia que tudo era real <3')
    }else if(times > 1 && times <= 9){
        alert('kkkk, acho que você quase clicou "Não" sem querer kk')
    }else if(times >= 10 && times <= 29){
        alert('Okay, talvez você estivesse em duvida. Até parece que te obriguei kk')
    }else if(times >= 30 && times <= 48){
        alert('Você quer que eu tenha um ataque cardíaco? Sério mesmo?')
    }else if(times == 49){
        alert('Você quase rucusou por 50 vezes, agora quem não que sou eu')
        window.close()
    }
}

buttonYes.addEventListener('click', acceptRequest)