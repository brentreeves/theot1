<template>
  <div>
    <div v-if="!submitted">
      <div>
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div>
        <label for="description">Description</label>
        <input
          id="description"
          required
          v-model="tutorial.description"
          name="description"
        />
      </div>

      <button @click="saveTutorial">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
      };

      TutorialDataService.create(data)
        .then((response) => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
