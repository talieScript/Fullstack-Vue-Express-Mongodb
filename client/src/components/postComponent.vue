<template>
  <div>
    <header class="title">
      <h1>Taliesin's Guest Book</h1>
      <hr>
    </header>
    <section id="form" class="form">
      <h3 class="form__title">Make a post:</h3>
      <div class="form-top">
        <div class="name form-section">
          <input class="name__input" type="text" id="name" v-model="name" placeholder="Whats your name?" maxlength="20">
          <label for="name" class="name__label">Name</label>
        </div>
        
        <div class="icon form-section">
          <select class="icon__input" v-model="icon" id="icon-select">
            <option disabled select value="null">Pick one!</option>
            <option value="carrot">Carrot</option>
            <option value="pawn">Pawn</option>
            <option value="child">Child</option>
            <option value="circle">Circle</option>
            <option value="cloud">Cloud</option>
            <option value="comment">Comment</option>
          </select>
          <label for="icon-select" class="icon__label">Icon</label>
        </div>
      </div>

      <div class="form-bottom">
        <div class="text form-section">
          <textarea type="textarea" id="create-post" v-model="text" placeholder="Create a post" class="text__input"></textarea>
          <label for="create-post" class="text__label">Say Somthing...</label>
        </div>  
        <button v-on:click="createPost">Post!</button>
      </div>
    </section>

    <section id="posts">
      <p class="error" v-if="error">{{ error }}</p>
      <div class="posts-container row">
        <div class="post col-1-of-4" 
          v-for="(post,index) in posts"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"
          v-on:dblclick="deletePost(post._id)"
          >
            <i v-if="post.icon === 'carrot'" class="post__icon fas fa-carrot"></i>
            <i v-if="post.icon === 'pawn'" class="post__icon fas fa-chess-pawn"></i>
            <i v-if="post.icon === 'child'" class="post__icon fas fa-child"></i>
            <i v-if="post.icon === 'circle'" class="post__icon fas fa-circle"></i>
            <i v-if="post.icon === 'cloud'" class="post__icon fas fa-cloud"></i>
            <i v-if="post.icon === 'comment'" class="post__icon fas fa-comment"></i>
            <p class="text">{{ post.text }}</p>
            <p class="text">{{ post.name }}</p>          
            {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}
                ${post.createdAt.getHours()}:${post.createdAt.getMinutes()}`}}
          </div>
      </div>
    </section>
    
  </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: '',
      icon: null
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPost();
    } catch(err) {
      this.error = err.message
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text, this.name, this.icon);
      this.posts = await PostService.getPost();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPost();
    }
  }
}
</script>

<style lang="scss" scoped>

@import url(scss/main.scss);

</style>
