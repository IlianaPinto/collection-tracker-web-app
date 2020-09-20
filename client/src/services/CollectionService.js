import axios from 'axios';

const url = 'http://localhost:3000/api/collections/';

class CollectionService{
    // Get collection
    static async getCollections(){
        const res = await axios.get(url)
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
    static insertCollection(data){
        return axios.post(url, {
            data
        });
    }

    // Delete collection
    static deletCollection(id){
        return axios.delete(`${url}${id}`);
    }

    // Update collection
    /*static updateItem(id){
        
    }*/
}

export default CollectionService;