// axios=require('axios')

export default class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
    this.API= axios.create( {baseURL: this.BASE_URL} )
  }

  getFullList () {
    return this.API.get("characters/")
      .then( res =>  res.data )
      .catch( err => console.log(err))

  }

  getOneRegister (id) {
    return this.API.get(`characters/${id}`)
      .then( res => res.data)
      .catch( err => console.log(err))
  }

  createOneRegister (params) {
    const {id,name, occupation, weapon, cartoon}=params.body
    console.log(params.body)
    return this.API.post("characters/", {id, name, occupation,  weapon, cartoon})
      .then( (res) => res.data)
      .catch(err => console.log("Error in POST request while creating new character: ", err))

  }

  updateOneRegister (id, updatedInfo) {
    return this.API.patch(`characters/${id}`, updatedInfo)
      .then((res) =>res.data)
      .catch(err => console.log("Error in DELETErequest: ", err))
  }

  deleteOneRegister (id) {
    return this.API.delete(`characters/${id}`)
      .then((res) =>res.data )
      .catch(err => console.log("Error in DELETErequest: ", err))

  }
}
