<template>
  <div class="home">
    <Header />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Header
  },
  async mounted() {
    await this.$store.dispatch("initConfig");
    this.$bus.emit("projectChanged");
  }
};
</script>
