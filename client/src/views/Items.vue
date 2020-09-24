<template>
  <div class="collections">
    <br><br>
    <!-- Show the items created by the user -->
    <div v-if='isEmpty()' class="container">
      <button type="button" class="btn btn-success" data-toggle='modal' data-target="#create_item">Add a new item</button>
      <br><br>
      <table class= "table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Value</th>
            <th scope="col">year</th>
            <th scope="col">Condition</th>
            <th scope="col">Location</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" 
              v-bind:item="item"
              v-bind:index="index"
              v-bind:key="item._id">
            <td>{{item.name}}</td>
            <td>{{item.value}}</td>
            <td>{{item.year}}</td>
            <td>{{item.condition}}</td>
            <td>{{item.location}}</td>
            <td class="text-right">
              <a type="button" data-toggle='modal' v-on:click="editItem(item)" data-target="#update_item" class="badge badge-primary">Edit</a>{{" "}}
              <a type="button" v-on:click="removeItem(item._id)" class="badge badge-danger">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Check if there is an item -->
    <div v-else>
      <div class="container">
          <div class="card text-center border-dark mb-3" >
            <br>
            <div class="container">
            <h5 class="card-title">
              <strong>Seems like this collection is empty</strong>
            </h5>
            <p class="card-text">Add some items!</p>
            <button type='button' class="btn btn-success" data-toggle='modal' data-target="#create_item">Get Started</button>
            <br><br>
          </div>
        </div> 
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
                <label for="name">Name</label>
                <input type="text" v-model="item.name" class="form-control" id="name" placeholder="Enter the item name" required>
              </div>
              <div class="form-group">
                <label for="value">Value</label>
                <input type="number" v-model="item.value" class="form-control" id="value" placeholder="Enter the item value" required>
              </div>
              <div class="form-group">
                <label for="year">Year</label>
                <input type="number" v-model="item.year" class="form-control" id="year"  placeholder="Enter the item year" required>
              </div>
              <div class="form-group">
                <label for="condition">Condition</label>
                <input type="text" v-model="item.condition" class="form-control" id="condition" placeholder="Enter the item condition" required>
              </div>
              <div class="form-group">
                <label for="location">Location</label>
                <input type="text" v-model="item.location" class="form-control" id="location" placeholder="Enter the item location" required>
              </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-success">Submit</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal to update an item -->
    <div class="modal fade" id="update_item" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalLabel">Update an item</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div class="modal-body">
            <!-- Item form -->
            <form @submit.prevent="updateItem">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="item.name" class="form-control" id="name" placeholder="Enter the item name" required>
              </div>
              <div class="form-group">
                <label for="value">Value</label>
                <input type="number" v-model="item.value" class="form-control" id="value" placeholder="Enter the item value" required>
              </div>
              <div class="form-group">
                <label for="year">Year</label>
                <input type="number" v-model="item.year" class="form-control" id="year"  placeholder="Enter the item year" required>
              </div>
              <div class="form-group">
                <label for="condition">Condition</label>
                <input type="text" v-model="item.condition" class="form-control" id="condition" placeholder="Enter the item condition" required>
              </div>
              <div class="form-group">
                <label for="location">Location</label>
                <input type="text" v-model="item.location" class="form-control" id="location" placeholder="Enter the item location" required>
              </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" v-on:click="updateItem" data-dismiss="modal" class="btn btn-success">Submit</button>
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
        value: '',
        year:'',
        condition:'',
        location: '',
      },
      routeId: ''
    }
  },
  async created(){
    this.routeId = await this.$route.params.id;
    this.getItems();
  },
  methods: {
    async addItem(){
      this.item.collectionId = await this.routeId;
      await Items.insertItem(this.item);
      this.getItems();
      this.item.collectionId = '';
      this.item.name = '';
      this.item.value = '';
      this.item.year = '';
      this.item.condition = '';
      this.item.location = '';
    },
    async getItems(){
        this.items = await Items.getItems(this.routeId); 
    },
    async removeItem(id){
      await Items.deleteItem(id);
      this.getItems();
    },
     async updateItem(){
      await Items.updateItem(this.item._id,this.item);
      this.getItems();
    },
    editItem(item){
      this.item = item;
    },
    isEmpty(){
      return this.items.length !== 0;
    }
  },
  
}
</script>