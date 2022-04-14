<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" v-model="currentTutorial.title" />
      </div>
      <div>
        <label for="description">Description</label>
        <input
          type="text"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div>
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button v-if="currentTutorial.published" @click="updatePublished(false)">
      UnPublish
    </button>
    <button v-else @click="updatePublished(true)">Publish</button>

    <button @click="deleteTutorial">Delete</button>

    <button type="submit" @click="updateTutorial">Update</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorial",
  data() {
    return {
      currentTutorial: null,
      message: "",
    };
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then((response) => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status,
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then((response) => {
          console.log(response.data);
          this.currentTutorial.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
