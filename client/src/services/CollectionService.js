import axios from 'axios';

const url = 'http://localhost:3000/collections/';

class CollectionService{
    // Get collection
    static async getCollections(id){
        const res = await axios.get(url+id)
        try {
          const data = res.data
          return data.map(collection => ({
            ...collection,
          }))
        } catch (err) {
          return err
        }
    }

    // Create collection
    static insertCollection(collection){
        return axios.post(url, {
            userID: collection.userId,
            name: collection.name,
        });
    }

    // Delete collection
    static deleteCollection(id){
        return axios.delete(`${url}${id}`);
    }

    // Update collection
    static updateCollection(id,data){
        return axios.put(url+id,data);
    }
}

export default CollectionService;