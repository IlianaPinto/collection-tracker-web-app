<template>
  <div class="collections">
    <br><br>

    <!-- Show the items created by the user -->
    <div v-if='isEmpty()' class="container">
      <button type="button" v-on:click="clean" class="btn btn-success" data-toggle='modal' data-target="#create_item">Add a new item</button>
      <br><br>
      <!-- Search bar -->
      <input v-model="search" id="search" class="form-control mr-sm-2" type="search" placeholder="Search" > 
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
          <tr v-for="(item, index) in filteritem" 
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
              <a type="button" v-on:click="deleteItem(item._id)" data-target="#delete_item" data-toggle='modal' class="badge badge-danger">Delete</a>
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
                <select class="form-control" id="condition" v-model='item.condition' required >
                  <option disabled value="">Select option</option>
                  <option>Bad</option>
                  <option>Good</option>
                  <option>Excellent</option>
                </select>
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
                <input type="text" v-model="item.name" class="form-control" id="name2" placeholder="Enter the item name" required>
              </div>
              <div class="form-group">
                <label for="value">Value</label>
                <input type="number" v-model="item.value" class="form-control" id="value2" placeholder="Enter the item value" required>
              </div>
              <div class="form-group">
                <label for="year">Year</label>
                <input type="number" v-model="item.year" class="form-control" id="year2"  placeholder="Enter the item year" required>
              </div>
              <div class="form-group">
                <label for="condition">Condition</label>
                <select class="form-control" id="condition2" v-model='item.condition' required >
                  <option disabled value="">Select option</option>
                  <option>Bad</option>
                  <option>Good</option>
                  <option>Excellent</option>
                </select>
              </div>
              <div class="form-group">
                <label for="location">Location</label>
                <input type="text" v-model="item.location" class="form-control" id="location2" placeholder="Enter the item location" required>
              </div>
                <div class="modal-footer">
                  <button type="button" v-on:click="getItems" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" v-on:click="updateItem" data-dismiss="modal" class="btn btn-success">Submit</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal to delete -->
    <div class="modal fade" id="delete_item" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h4 class="text-center">Are you sure you want to delete this item?</h4>
            <p></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
            <button type="button" class="btn btn-danger" v-on:click="removeItem" data-dismiss="modal">Yes</button>
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
      routeId: '',
      search:'',
      id: ''
    }
  },
  // Search a specific item
  computed:{
    filteritem: function(){
      return this.items.filter((item) => {
        return item.name.toLocaleUpperCase().match(this.search.toLocaleUpperCase());
      });
    }
  },
  async created(){
    this.routeId = await this.$route.params.id;
    this.getItems();
  },
  methods: {
    // Create a new item
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
    // Get's the items from the DB
    async getItems(){
        this.items = await Items.getItems(this.routeId); 
    },
    // Delete a specific item
    async removeItem(){
      await Items.deleteItem(this.id);
      this.getItems();
    },
    // Modify a specific item
     async updateItem(){
      await Items.updateItem(this.item._id,this.item);
      this.getItems();
      this.item.collectionId = '';
      this.item.name = '';
      this.item.value = '';
      this.item.year = '';
      this.item.condition = '';
      this.item.location = '';
    },
    // Set an item in the inputs
    editItem(item){
      this.item = item;
      this.getItems();
    },
    // Get the id of a specific item
    deleteItem(id){
      this.id = id;
    },
    // Clean the inputs
    clean(){
      this.item.collectionId = '';
      this.item.name = '';
      this.item.value = '';
      this.item.year = '';
      this.item.condition = '';
      this.item.location = '';
    },
    // Check if there are items added
    isEmpty(){
      return this.items.length !== 0;
    }
  },
  
}
</script>