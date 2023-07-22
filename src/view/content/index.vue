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
    this.index();
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

    index() {
      document.addEventListener('mouseup', (event) => {

        const highlightedItems = document.querySelectorAll('.highlighted');
        if (highlightedItems.length > 0) {
          highlightedItems.forEach(item => {
            item.classList.remove('highlighted');
          });
        }

        const items = document.querySelectorAll('.' + event.target.className);
        // Add an event listener to each item
        items.forEach(item => {
          item.classList.add('highlighted');
        });

      });
    },

    borderHighlight() {
      document.addEventListener('mouseover', (event) => {
        event.target.classList.add('border-yellow');
      });

      document.addEventListener('mouseout', (event) => {
        event.target.classList.remove('border-yellow');
      });
    }
  },
  watch: {},
};

</script>

<template>
  <div class="">
  </div>
</template>

<style>
.border-yellow {
  border: 2px solid yellow;
}

.highlighted {
  background-color: yellow;
}
</style>
