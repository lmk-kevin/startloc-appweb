import { API } from "../config";

//Fonction qui permet d'extraire un les données de l'utilisateur par rapport au mail donné en params
const apiGetEmail = async (email) => {
    try {
        return fetch(`${API}/societe/email/${email}`).then(res => res.json()).then(data =>{return data})      
    } catch (error) {
      console.log("apiGetEmail error in api/api.js : ", error)
      return false
    }
  }
const apiGetCollabBySocId = async (soc_id,token) => {
      try {
        return fetch(
          `${API}/collaborateur/socid/${soc_id}`, 
          {method: 'GET',
          headers: {'Content-type': 'application/json','Authorization': `Bearer ${token}`, }})
          .then(res => res.json())
          .then(data =>{return data})      
      } catch (error) {
        console.log("apiGetEmail error in api/api.js : ", error)
        return false
      }
    
  }


  export {
    apiGetEmail,
    apiGetCollabBySocId
  }