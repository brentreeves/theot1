<template>
  <div>
    <div>
      <div>
        <button type="drpdwn" @click="toggleFields">Toggle Fields</button>
      </div>
      <div>
        <button type="button" @click="searchTitle">Search</button>
      </div>
      <input type="text" placeholder="Search by title" v-model="title" />
    </div>
    <div>
      <h4>Dots List</h4>
      <div v-if="fieldList == 0">
        <div>
          <ul>
            <li
              :class="{ active: index == currentIndex }"
              v-for="(wit, index) in dots"
              :key="index"
              @click="setActiveTutorial(tutorial, index)"
            >
              {{ index + 1 }} {{ wit.book }} {{ wit.w }} {{ wit.witness }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="fieldList == 1">
        <div>
          <table>
            <tr>
              <th>ID</th>
              <th>Book</th>
              <th>Witness</th>
              <th>W</th>
              <th v-for="(n, index) in 10" :key="index">
                {{ n }}
              </th>
            </tr>
            <tr v-for="(wit, index) in dots" :key="index">
              <td>{{ wit.id }}</td>
              <td>{{ wit.book }}</td>
              <td>{{ wit.witness }}</td>
              <td>{{ wit.w }}</td>
              <td v-for="(cc, index) in wit.ones" :key="index">
                {{ cc }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div v-else-if="fieldList == 2">
        <div>
          <table>
            <tr>
              <th>ID</th>
              <th>Book</th>
              <th>Witness</th>
              <th>W</th>
              <th v-for="(n, index) in 10" :key="index">
                {{ n }}
              </th>
            </tr>
            <tr v-for="(wit, index) in dots" :key="index">
              <td>{{ wit.id }}</td>
              <td>{{ wit.book }}</td>
              <td>{{ wit.witness }}</td>
              <td>{{ wit.w }}</td>
              <td v-for="(cc, index) in wit.verses" :key="index">
                {{ cc }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DotsDataService from "../services/DotsDataService";

export default {
  name: "dots-list",
  data() {
    return {
      dots: [],
      fieldList: 0,
      limitedFields: [],
      dotsVerseList: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
    };
  },

  methods: {
    retrievedots() {
      DotsDataService.getAll()
        .then((response) => {
          this.dots = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // select some fields
    setLimitedFields() {},

    setFieldList(aThing) {
      this.fieldList = aThing;
    },

    refreshList() {
      this.retrievedots();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },

    removeAlldots() {
      DotsDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    toggleFields() {
      if (this.fieldList == 2) this.fieldList = 0;
      else this.fieldList++;
    },

    // should do this locally, in the cached "dots" property, not hit the database
    searchTitle() {
      DotsDataService.findByTitle(this.title)
        .then((response) => {
          this.dots = response.data;
          this.setActiveTutorial(null);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrievedots();
    this.setFieldList(0);
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
