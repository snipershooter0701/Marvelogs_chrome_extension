<script>
import axios from 'axios';
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
    // this.index();
    this.handlerClickEvent();
  },
  unmounted() {

  },
  data() {
    return {
      higlist: [],
    };
  },
  methods: {
    handlerClickEvent() {
      const _this = this;
      document.addEventListener('click', (event) => {
        _this.highlightItems(event.target);
        _this.getXPathResult(event.target);
      });
    },

    getXPathResult(element) {
      const xpath = this.getXPathChild(element);
      const highlighted_URI = element.baseURI;

      // Content script or inline script in the webpage
      // If using a content script, ensure it is properly injected into the webpage

      const message = {
        data: 'Your message data here',
      };

      // Send the message to the extension
      chrome.runtime.sendMessage(message, function (response) {
        // Handle the response from the extension (if any)
        console.log('Response from extension:', response);
      });


      axios.post('https://app.marvelogs.com/path', {
        url: highlighted_URI,
        path: xpath
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });

    },

    getXPathChild(child) {
      if (child) {
        const parentElement = child.parentNode;
        if (parentElement) {
          const index = Array.from(parentElement.children).indexOf(child);
          const xpath = this.parseClassName(parentElement.className, child.className, index);
          return xpath;
        }
      }
    },

    parseClassName(parent, child, index) {
      const parseParentClassName = parent.replace(' ', '.');
      const parseChildClassName = child.replace(' ', '.');
      const parse_xpath = `.${parseParentClassName} .${parseChildClassName}[${index}]`;
      return parse_xpath;
    },

    checkXPathCount(xpath) {
      const items = document.querySelectorAll(xpath);
      return items.length;
    },

    highlightItems(element) {
      const highlightedItems = document.querySelectorAll('.highlighted');
      if (highlightedItems.length > 0) {
        highlightedItems.forEach(item => {
          item.classList.remove('highlighted');
        });
      }
      element.classList.add('highlighted');
    },

    index() {
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
