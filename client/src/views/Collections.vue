<template>
  <div class="collections">
    <br><br>
    <!-- Check if there is a collection -->
    <div v-if='isEmpty()'>
      <div class="container">
          <div class="card text-center border-dark mb-3" >
            <br>
            <div class="container">
            <h5 class="card-title">
              <strong>Seems like your collection is empty</strong>
            </h5>
            <p class="card-text">Create one!</p>
            <button type='button' class="btn btn-success" data-toggle='modal' data-target="#create_collection">Get Started</button>
            <br><br>
          </div>
        </div> 
      </div>
    </div>

    <div v-if='!isEmpty()' class='container'>
      <button type="button" class="btn btn-success" data-toggle='modal' data-target="#create_collection">Add a new collection</button>
      <br><br>
    </div>

    <!-- Show the collections created by the user -->
    <div v-if="!isEmpty()" class="container">
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
              <a type="button" data-toggle='modal' v-on:click="edit(collection)" data-target="#update_collection" class="badge badge-primary">Edit</a>{{" "}}
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
                <input type="text" v-model="collection.name" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter your collection's name">
              </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button v-on:click="addCollection" type="submit" data-dismiss="modal" class="btn btn-success">Submit</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Collections from '../services/CollectionService';

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
  created(){
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
        this.collections = await Collections.getCollections();
    },
    async removeCollection(id){
      await Collections.deleteCollection(id);
      this.getCollections();
    },
     async updateCollection(){
      await Collections.updateCollection(this.collection.userId,this.collection);
      this.getCollections();
      this.collection.name = '';
    },
    edit(data){
      console.log(data.userID);
    },
    isEmpty(){
      return this.collections.length === 0;
    }
  },
  
}
</script>