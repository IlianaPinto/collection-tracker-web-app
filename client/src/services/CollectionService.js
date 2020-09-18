import axios from axios;

const url = 'http://localhost:5000/collections/';

class CollectionService{
    // Get collection
    static getCollections(){
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(collection => ({
                        ...collection
                    }))
                );

            } catch (err) {
                reject(err);
            }
        })
    }

    // Create collection
    static insertCollection(){
        return axios.post(url, {
            data
        });
    }

    // Delete collection
    static deletCollection(id){
        return axios.delete(`${url}${id}`);
    }

    // Update collection
    static updateItem(id){
        
    }
}

export default CollectionService;