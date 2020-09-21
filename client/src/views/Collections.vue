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
            <button type='button' class="btn btn-primary" data-toggle='modal' data-target="#create_collection">Get Started</button>
            <br><br>
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
            <form @submit.prevent="addCollection()">
              <div class="form-group">
                <label for="name">Collection name</label>
                <input type="text" v-model="collection.name" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter your collection's name">
              </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Submit</button>
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
        name: '',
        userId: this.$auth.user.email,
        
      },
    }
  },
  created(){
    this.getCollections();
  },
  methods: {
    getCollections(){
      //console.log(this.collection,"el array"); 
    },
    async addCollection(){
      /*fetch('http://localhost:3000/collections', {
        method: 'POST',
        body: JSON.stringify(this.collection),
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      .then(res => console.log(res, "res"));
      this.collection.name = '';
      this.collection.userId = '';*/

      try {
        this.collections = await Collections.getCollections();
        console.log(this.collections);
      } catch (error) {
      //
      }

    },
    
    isEmpty(){
      return this.collections != null;
    }
  },
  
}
</script>