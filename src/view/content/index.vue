<script>

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
      // const _this = this;
      document.addEventListener('click', (event) => {
        this.highlightItems(event.target);
        this.getXPathResult(event.target);
      });
    },

    getXPathResult(element) {
      const xpath = this.getXPathChild(element);
      const highlighted_URI = element.baseURI;
      console.log(xpath);
      console.log(highlighted_URI);

      if (xpath && highlighted_URI) {
        // display the toastr
        console.log('dddddd');
        
        localStorage.setItem('url', highlighted_URI);
        localStorage.setItem('xpath', xpath);

        chrome.runtime.sendMessage({
          key: 'highlighted'
        });
      }

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
