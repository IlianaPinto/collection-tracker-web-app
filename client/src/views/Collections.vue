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
    <div class="container">
      <div class= "row">
        <div class = "card border-dark col-md-4 text-center " 
          v-for="(collection, index) in collections" 
          v-bind:item="collection"
          v-bind:index="index"
          v-bind:key="collection._id">
            <div class="text">
              <br>
              <h3> {{ collection.name }} </h3>
              <div class="card"></div>
              <br>
                <button type="button" class="btn btn-primary btn-sm">Rename Collection</button>
                {{" "}}
                <button type="button" class="btn btn-success btn-sm">Add Items</button>
                {{" "}}
                <button type="button" class="btn btn-danger btn-sm">Delete</button>
                <br><br>
              </div>
              <div class="card-footer text-muted">
                  {{ collection.date }}
            </div>
        </div>
      </div>
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
                  <button v-on:click="addCollection" type="submit" class="btn btn-success">Submit</button>
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
      console.log(this.collection, "esta es la coleccion en el vue")
      await Collections.insertCollection((this.collection));
      this.collections = await Collections.getCollections();
    },
    async getCollections(){
      try {
        this.collections = await Collections.getCollections();
      } catch (error) {
      //
      }

    },
    
    isEmpty(){
      return this.collections.length === 0;
    }
  },
  
}
</script>