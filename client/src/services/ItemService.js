import axios from 'axios';

const url = 'http://localhost:3000/items/';

class ItemService{
    // Get item
    static async getItems(id){
        const res = await axios.get(url+id)
        try {
          const data = res.data
          return data.map(item => ({
            ...item,
          }))
        } catch (err) {
          return err
        }
    }

    // Create item
    static insertItem(item){
        return axios.post(url, {
            collectionID: item.collectionId,
            name: item.name,
            value: item.value,
            year:item.year,
            condition:item.condition,
            location: item.location,
        });
    }

    // Delete item
    static deleteItem(id){
        return axios.delete(`${url}${id}`);
    }

    // Update item
    static updateItem(id,data){
        return axios.put(url+id,data);
    }
}

export default ItemService;