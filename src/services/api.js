import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "X-API-Key": import.meta.env.VITE_API_KEY },
})

export default {
  // fetch all the houses from House API
  async fetchHouses() {
    try {
      // function execution is paused until the promise is resolved
      let data = await instance.get("/")
      if (data.status !== 200) throw Error("No house was found")
      else return data.data
    } catch (e) {
      alert(e)
    }
  },
  // get information about one specific house 
  async getOneHouse(id) {
    try {
      // function execution is paused until the promise is resolved
      let data = await instance.get(`/${id}`)
      if (data.status !== 200) {
        throw Error("No house was found")
      } else {
        return data.data[0]
      }
    } catch (e) {
      alert(e)
    }
  },
  // add house and send a post request to House API
  async addHouse(body, fileName) {
    try {
      let data = await instance.post("/", body)
      const formData = new FormData()
      formData.append("image", fileName.value)
      if (data.data.id) {
        await instance.post(`/${data.data.id}/upload`, formData)
        return data.data.id
      } else {
        // when the user types in input such as 10000 for construction year, API does not
        // throw any error in the first post request but data.data.id becomes undefined, 
        // making the second post request invalid. This is to notify the user about what the 
        // problem is specifically instead of giving very general bad request error. 
        alert("house construction year is not valid")
        return -1
      }
    } catch (e) {
      alert(e)
      return -1
    }
  },
  // deleter house and send delete request to House API
  async deleteHouse(houseId) {
    try {
      await instance.delete(`/${houseId}`)
    } catch (e) {
      alert(e)
    }
  },
  // update house and send post request to House API
  async updateHouse(houseId, body, fileName) {
    try {
      await instance.post(`/${houseId}`, body)
      // we do not update house photo if user did not submit a new image
      if (fileName) {
        const formData = new FormData()
        formData.append("image", fileName)
        await instance.post(`/${houseId}/upload`, formData)
      }
    } catch (e) {
      alert(e)
    }
  },

}