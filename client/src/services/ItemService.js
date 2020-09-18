import axios from axios;

const url = 'http://localhost:5000/items/';

class ItemService{
    // Get item
    static getItems(){
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(item => ({
                        ...item
                    }))
                );

            } catch (err) {
                reject(err);
            }
        })
    }

    // Create item
    static insertItem(){
        return axios.post(url, {
            data
        });
    }

    // Delete item
    static deleteItem(id){
        return axios.delete(`${url}${id}`);
    }

    // Update item
    static updateItem(id){
        
    }
}

export default ItemService;