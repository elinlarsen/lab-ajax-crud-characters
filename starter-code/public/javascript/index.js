

import APIHandler from "./APIHandler.js";
const BASE_URL="http://localhost:8080";
const charactersAPI = new APIHandler(BASE_URL);



function createCard(char){
  const {id, name, occupation, weapon, cartoon}=char
  const newCard=`
  <div class="characters-container">
      <div class="character-info">
      <div class="id" id=${id}> Id : ${id}</div>
        <div class="name"> Name : ${name}</div>
        <div class="occupation"> Occupation : ${occupation}</div>
        <div class="cartoon"> Cartoon : ${cartoon}</div>
        <div class="weapon"> Weapon : ${weapon}</div>
      </div>
  </div>`
  const cardEl=document.createElement("div");
  cardEl.innerHTML=newCard;
  const container=document.getElementById("chars-container");
  container.appendChild(cardEl)
  

}


function deleteCard(idChar){
  const idEl=document.getElementById(idChar);
  const parent=idEl.parentNode
  const grandParent=parent.parentNode
  grandParent.removeChild(parent)
  //parent.innerHTML=''

}


$(document).ready( () => {
  document.getElementById('clean-all').onclick = function(){
    charactersAPI.getFullList()
      .then( chars => {
        chars.forEach(char => deleteCard(char.id))
        console.log("deleting cards ;;;")
      } )
      .catch(err => {
        console.log("error while deleting all chars", err)
      })
  }


  document.getElementById('fetch-all').onclick = function(){
    charactersAPI.getFullList()
      .then( chars => {
        chars.forEach(char => createCard(char))
        console.log("creating cards ;;;")
      } )
      .catch(err => {
        console.log("error while fetching all chars", err)
      })

  }
  
  document.getElementById('fetch-one').onclick = function(){
    const ID=document.getElementById("ID-one").value
    charactersAPI.getOneRegister(ID)
      .then(char => createCard(char))
      .catch()
    
  }
  
  document.getElementById('delete-one').onclick = function(){
    const btnDelete=document.getElementById("delete-one")
    const ID=document.getElementById("ID-delete").value

    deleteCard(ID)

    charactersAPI.deleteOneRegister(ID.toString())
      .then( char => {
        console.log(char)
          
          btnDelete.style.background="green"
        })
      .catch((err) => {
        btnDelete.style.background="red"
        console.log("error while deleting in the DB : ", err)
      } )        
  }
  
  document.getElementById('edit-character-form').onsubmit = function(){
    const charsInputs=document.querySelectorAll("#edit-character-form input");
    const idToEdit=charsInputs[0].value;
    const btnEdit=document.getElementById("ID-edit");

    const updatedChar={
      id : charsInputs[0].value,
      name : charsInputs[1].value,
      occupation : charsInputs[2].value,
      weapon : charsInputs[3].value,
      cartoon : charsInputs[4].value,
    }

    charactersAPI.updateOneRegister (idToEdit, updatedChar)
      .then( () =>btnEdit.style.background="green" )
      .catch(  () => btnEdit.style.background="red" )
  
  }
  
  document.getElementById('new-character-form').onsubmit = function(){
    const characterInputs = document.querySelectorAll("#new-character-form input")
    const newChar={
      id : Math.floor(Math.random()*100 +3),
      name : characterInputs[0].value,
      occupation : characterInputs[1].value,
      weapon : characterInputs[2].value,
      cartoon : characterInputs[3].value,
    }
    createCard(newChar)
    console.log("New char object: ", newChar)
    charactersAPI.createOneRegister(newChar)
      .then( (res) =>{
        createCard(res)
        btnNew.style.background="green"} )
      .catch(() => btnNew.style.background="red")
                        
  }
})
