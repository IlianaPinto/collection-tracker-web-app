<template>
  <div class="collections">
    <br><br>
    <!-- Check if there is an item -->
    <div v-if='isEmpty()'>
      <div class="container">
          <div class="card text-center border-dark mb-3" >
            <br>
            <div class="container">
            <h5 class="card-title">
              <strong>Seems like your collection is empty</strong>
            </h5>
            <p class="card-text">Create one!</p>
            <button type='button' class="btn btn-success" data-toggle='modal' data-target="#create_item">Get Started</button>
            <br><br>
          </div>
        </div> 
      </div>
    </div>

    <div v-if='!isEmpty()' class='container'>
      <button type="button" class="btn btn-success" data-toggle='modal' data-target="#create_item">Add a new item</button>
      <br><br>
    </div>

    <!-- Show the items created by the user -->
    <div class="container">
      <div class= "table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Add Item</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" 
              v-bind:item="item"
              v-bind:index="index"
              v-bind:key="item._id">
            <td>
                {{item.name}}
            </td>
            <td>
              <button type="button" class="btn btn-success btn-sm">Add Items</button>
            </td>
            <td>
              <button type="button" data-toggle='modal' v-on:click="edit(item)" data-target="#update_item" class="btn btn-primary btn-sm">Rename Collection</button>
            </td>
            <td>
              <button type="button" v-on:click="removeItem(item._id)" class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </div>
    </div>
    
    <!-- Modal to create a new item -->
    <div class="modal fade" id="create_item" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create an item</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div class="modal-body">
            <!-- Item form -->
            <form @submit.prevent="addItem">
              <div class="form-group">
                <label for="name">Item name</label>
                <input type="text" v-model="item.name" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter the item name">
              </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button v-on:click="addItem" type="submit" data-dismiss="modal" class="btn btn-success">Submit</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Items from '../services/ItemService';

export default {
  name: 'Items',
  data(){
    return {
      items: [],
      item:{
        collectionId: '',
        name: '',
      },
    }
  },
  created(){
    this.getItems();
  },
  methods: {
    async addItem(){
      await Items.insertItem(this.item);
      this.getItems();
      this.item.name = '';
    },
    async getItems(){
        this.items = await Items.getItems();
    },
    async removeItem(id){
      await Items.deleteItem(id);
      this.getItems();
    },
     async updateItem(){
      await Items.updateItem();
      this.getItems();
      this.item.name = '';
    },
    edit(data){
      console.log(data.userID);
    },
    isEmpty(){
      return this.items.length === 0;
    }
  },
  
}
</script>