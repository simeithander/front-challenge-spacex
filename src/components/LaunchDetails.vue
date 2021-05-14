<template>
  <div>
    <Header />
    <div class="container">
      <div class="card">
        <img
          :src="launch.links.mission_patch_small"
          class="card-img-top"
          alt="SpaceX Image"
        />
        <div class="card-body text-center">
          <h5 class="card-title ">{{ launch.mission_name }}</h5>
          <p class="card-text ">
            {{ launch.details }}
          </p>
          <a
            :href="launch.links.article_link"
            class="btn btn-primary"
            target="_blank"
            >See more</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import { request, gql } from "graphql-request";

export default {
  name: "LaunchDetails",
  components: {
    Header,
  },
  data() {
    return {
      launch: {},
      mission_id: this.$route.params.slug,
    };
  },
  async mounted() {
    // Query for missions
    const query = gql`
      {
        launch(id: ${this.mission_id}) {
          details
          mission_name
          links {
            article_link
            mission_patch_small
          }
        }
      }
    `;

    try {
      const data = await request("https://api.spacex.land/graphql/", query);
      this.launch = data.launch;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  max-width: 800px;
}

img {
  max-height: 100px;
  max-width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
</style>
