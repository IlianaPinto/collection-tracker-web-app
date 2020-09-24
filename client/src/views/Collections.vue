<template>
  <div class="collections">
    <br><br>
    
    <div class = "container">
      <br><br>
      <div class="row">

          <!-- Show user profile -->
          <div class="col-3 text-center">
              <img :src="$auth.user.picture" alt="Profile Picture">
              <br><br>
              <p>{{$auth.user.nickname}}</p>
              <p>{{$auth.user.email}}</p>
              <br>
              <button type="button" class="btn btn-success" data-toggle='modal' data-target="#create_collection">Add a new collection</button>
          </div>

          <div class="col">
            <!-- Show the collections created by the user -->
            <div class="container">
              <table class= "table table-striped">
                <thead>
                  <tr>
                    <th scope="col">My Collections</th>
                    <th scope="col" class="text-right"></th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(collection, index) in collections" 
                      v-bind:item="collection"
                      v-bind:index="index"
                      v-bind:key="collection._id">
                    <td>
                        {{collection.name}}
                    </td>
                    <td class="text-right">
                      <router-link :to=" {name:'items', params: {id:collection._id,name:collection.name}} " class="badge badge-success">Add Items</router-link>{{" "}}
                      <a type="button" class="badge badge-primary" v-on:click="editCollection(collection)" data-toggle='modal' data-target="#update_collection">Edit</a>{{" "}}
                      <a type="button" v-on:click="removeCollection(collection._id)" class="badge badge-danger">Delete</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Modal to create a new collection -->
            <div class="modal fade" id="create_collection" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create a collection</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  
                  <div class="modal-body">
                    <!-- Collection form -->
                    <form @submit.prevent="addCollection">
                      <div class="form-group">
                        <label for="name">Collection name</label>
                        <input type="text" v-model="collection.name" class="form-control" id="name" placeholder="Enter your collection's name" required>
                      </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button  type="submit"  class="btn btn-success">Submit</button>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal to update a new collection -->
            <div class="modal fade" id="update_collection" tabindex="-1" role="dialog" aria-labelledby="ModalLabel2" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="ModalLabel2">Update a collection</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  
                  <div class="modal-body">
                    <!-- Collection form -->
                    <form @submit.prevent="updateCollection">
                      <div class="form-group">
                        <label for="name">Collection name</label>
                        <input type="text" v-model="collection.name" class="form-control" id="name" placeholder="Enter your collection's name" required>
                      </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button  type="submit" v-on:click="updateCollection" data-dismiss="modal" class="btn btn-success">Submit</button>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <br><br>
    </div>
    <br><br>

    

  </div>
</template>

<script>
import Collections from '../services/CollectionService';
import Items from '../services/ItemService';

export default {
  name: 'Collections',
  components:{
    
  },
  data(){
    return {
      collections: [],
      collection:{
        userId: '',
        name: '',
      },
    }
  },
  async created(){
    this.userId = await this.$auth.user.email;
    this.getCollections();
  },
  methods: {
    async addCollection(){
      this.collection.userId = this.$auth.user.email;
      await Collections.insertCollection((this.collection));
      this.getCollections();
      this.collection.name = '';
      this.collection.userId = this.$auth.user.email;
    },
    async getCollections(){
        this.collections = await Collections.getCollections(this.$auth.user.email);
    },
    async removeCollection(id){
      this.getItemsandDelete(id);
      await Collections.deleteCollection(id);
      this.getCollections();
    },
    async updateCollection(){
      console.log(this.collection)
      await Collections.updateCollection(this.collection._id,this.collection);
      this.getCollections();
    },
    async getItemsandDelete(id){
      var items_array = await Items.getItems(id);
      var i = 0;
      for(i = 0; i < items_array.length; i++){
        await Items.deleteItem(items_array[i]._id);
      }
    },
    editCollection(collection){
      this.collection = collection
    }
  },
  
}
</script>