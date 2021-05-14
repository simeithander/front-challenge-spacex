<template>
  <div class="cardContainer">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">
          {{ description }}
        </p>
        <div class="date text-end">{{ date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Launch",
  props: { title: String, description: String, date: String },
};
</script>
<style scoped>
.card {
  text-decoration: none;
  color: black;
}

.card:hover {
  color: #7f8c8d;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
}

.cardContainer {
  margin-top: 20px;
}
</style>
