const html = document.querySelector('html');
const checkbox = document.querySelector('input[name=theme]');

const getStyle = (element,style)=> {
    window.getComputedStyle(element)
    .getPropertyValue(style);
}

//Pegando o estilo

const initialColors = {
    bg:getStyle(html,'--bg'),
    text:getStyle(html,'--text')
}

const darkMode = {
    bg:'#2b3945',
    text:'#ffffff'
}

//Mudando a função padrão
const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColors = (colors) =>{
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key),colors[key]) 
    )
}

checkbox.addEventListener('change',({target})=>{
    target.checked ? changeColors(darkMode) : changeColors(initialColors);
})


//Salvando localmente às mudanças de tema.

const isExistLocalStorage = (key) => 
  localStorage.getItem(key) != null

const createOrEditLocalStorage = (key, value) => 
  localStorage.setItem(key, JSON.stringify(value))

const getValeuLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key))

checkbox.addEventListener("change", ({target}) => {
  if (target.checked) {
    changeColors(darkMode) 
    createOrEditLocalStorage('modo','darkMode')
  } else {
    changeColors(initialColors)
    createOrEditLocalStorage('modo','initialColors')
  }
})

if(!isExistLocalStorage('modo'))
  createOrEditLocalStorage('modo', 'initialColors')


if (getValeuLocalStorage('modo') === "initialColors") {
  checkbox.removeAttribute('checked')
  changeColors(initialColors);
} else {
  checkbox.setAttribute('checked', "")
  changeColors(darkMode);
}