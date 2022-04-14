<template>
  <div>
    <div>
      <div>
        <button type="button" @click="toggleFields">Toggle Fields</button>
      </div>
      <div>
        <button type="button" @click="searchTitle">Search</button>
      </div>
      <input type="text" placeholder="Search by title" v-model="title" />
    </div>

    <!-- <div>
    <p v-if="fieldList">true</p>
    <p v-else>false</p>
  </div> -->
    <div>
      <h4>Percents List ({{ fieldList }})</h4>
      <div v-if="!fieldList">
        <div>
          <ul>
            <li
              :class="{ active: index == currentIndex }"
              v-for="(wit, index) in percents"
              :key="index"
              @click="setActiveTutorial(tutorial, index)"
            >
              {{ index + 1 }} | {{ wit[0] }} | {{ wit[1] }} |
              {{ wit[2] }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <div>
          <table border="1px">
            <tr>
              <th v-for="(c, index) in percents[0]" :key="index">
                {{ c.split(" ")[0] }}
              </th>
            </tr>
            <tr
              v-for="(wit, index) in percents.slice(1, percents.len)"
              :key="index"
            >
              <td v-for="(cc, index) in wit" :key="index">
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
import PercentsDataService from "../services/PercentsDataService";

export default {
  name: "percents-list",
  data() {
    return {
      dots: [],
      percents: [],
      fieldList: true,
      limitedFields: [],
      dotsVerseList: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
    };
  },

  methods: {
    retrievepercents() {
      PercentsDataService.getAll()
        .then((response) => {
          this.percents = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

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
      this.fieldList = !this.fieldList;
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
    // this.retrievedots();
    this.retrievepercents();
    this.setFieldList(true);
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