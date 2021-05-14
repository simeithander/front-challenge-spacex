<template>
  <div>
    <Header />
    <div class="container">
      <div class="title-container">
        Last Launchers <i class="fas fa-rocket"></i>
      </div>
      <ul>
        <li v-for="launch in launches" :key="launch.id">
          <router-link :to="'/launch-details/' + launch.id" custom>
            <Launch
              :title="launch.mission_name"
              :description="launch.details"
              :date="launch.launch_date_local"
            />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Launch from "./Launch.vue";
import { request, gql } from "graphql-request";

export default {
  name: "LastLaunches",
  components: {
    Header,
    Launch,
  },
  data() {
    return {
      launches: [],
    };
  },
  async mounted() {
    function convertDate(date) {
      const dateSlice = date.slice(0, -15);
      const dateSplit = dateSlice.split("-");
      return dateSplit[0] + "/" + dateSplit[1] + "/" + dateSplit[2];
    }

    // Query for missions
    const query = gql`
      {
        launches(limit: 10) {
          id
          launch_date_local
          mission_name
          details
        }
      }
    `;

    try {
      const data = await request("https://api.spacex.land/graphql/", query);
      var tmp = [];
      data.launches.map((item) =>
        tmp.push({
          id: item.id,
          launch_date_local: convertDate(item.launch_date_local),
          mission_name: item.mission_name,
          details:
            item.details === null
              ? "No Details"
              : item.details.slice(0, 100) + "...",
        })
      );
      this.launches = tmp;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.spaceIcon {
  margin-left: 10px;
}

.title-container {
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: 800;
}

.date {
  font-style: italic;
}

a {
  text-decoration: none;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
