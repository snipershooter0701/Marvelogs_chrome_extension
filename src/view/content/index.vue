<script>
// import chromeWebStoreItemProperty from "chrome-web-store-item-property";
// import puppetter from 'puppeteer'
// import Prism from 'prismjs'

export default {
  components: {

  },

  name: "mainContentView",

  created: function () {

  },

  mounted() {
    this.borderHighlight();
  },
  unmounted() {

  },
  data() {
    return {
      higlist: [],
    };
  },
  methods: {
    borderHighlight() {
      document.addEventListener('mouseover', (event) => {
        event.target.classList.add('border-red');
      });

      document.addEventListener('mouseout', (event) => {
        event.target.classList.remove('border-red');
      });
    },
  },
  watch: {},
};
</script>

<template>
  <div class="">
  </div>
</template>

<style>
.border-red {
  border: 1px solid red;
}
</style>
