

//import  APIHandler  from "./public/javascript/APIHandler.js"
const BASE_URL="http://localhost:8000"
const charactersAPI = new APIHandler(BASE_URL)

const

function createCard(char){
  const {id, name, occupation, weapon, cartoon}=char
  const newCard=`
  <div class="characters-container">
      <div class="character-info">
      <div class="id" id=${id}> ${id}</div>
        <div class="name"> ${name}</div>
        <div class="occupation"> ${occupation}</div>
        <div class="cartoon"> ${cartoon}</div>
        <div class="weapon"> ${weapon}</div>
      </div>
  </div>
`
  cardEl=document.createElement("div")
  card.innerHTML=newCard

}


function deleteCard(char){
  const {id, name, occupation, weapon, cartoon}=char
  idEl=document.getElementById(id)
  parent=idEl.parentNode
  parent.innerHTML=''

}


$(document).ready( () => {
  document.getElementById('fetch-all').onclick = function(){
    charactersAPI.getFullList ()
      .then( chars => {chars.forEach(char => createCard(char))} )
      .catch()

  }
  
  document.getElementById('fetch-one').onclick = function(){
    const ID=document.getElementById("fetch-one").value
    charactersAPI.getOneRegister(ID)()
      .then(char => createCard(char))
      .catch()
    
  }
  
  document.getElementById('delete-one').onclick = function(){
    const btnDelete=document.getElementById("delete-one")
    const ID=btnDelete.value

    charactersAPI.deleteOneRegister(ID)()
      .then( char => {
          deleteCard(char)
          btnDelete.style.background="green"
        })
      .catch(() => btnDelete.style.background="red")        
  }
  
  document.getElementById('edit-character-form').onsubmit = function(){
    const charsInpus=document.querySelectorAll("#edit-character-form input")
    const idToEdit=characterInputs[0].value
    const btnEdit=document.getElementById("update-data")

    const updatedChar={
      id : characterInputs[0].value,
      name : characterInputs[1].value,
      occupation : characterInputs[2].value,
      weapon : characterInputs[3].value,
      cartoon : characterInputs[4].value,
    }

    charactersAPI.updateOneRegister (id, updatedChar)
      .then( () =>btnNew.style.background="green" )
      .catch(  () => btnNew.style.background="red" )
  
  }
  
  document.getElementById('new-character-form').onsubmit = function(){
    const characterInputs = document.querySelectorAll("#new-character-form input")
    const newChar={
      name : characterInputs[0].value,
      occupation : characterInputs[1].value,
      weapon : characterInputs[2].value,
      cartoon : characterInputs[3].value,
    }
    const btnNew=document.getElementById("send-data")
  
    charactersAPI.createOneRegister(newChar)
      .then( () =>btnNew.style.background="green" )
      .catch(() => btnNew.style.background="red")
          
                
  }
})
