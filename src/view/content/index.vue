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
    this.receiveDataToBackground();
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

      document.addEventListener('click', (event) => {

        console.log('click_highlight');
        chrome.storage.local.get(['highlight_state']).then((result) => {
          if (result.highlight_state == 'start') {
            this.highlightItems(event.target);
            const xpath = this.getXPathResult(event);
            const highlighted_URI = event.target.baseURI;

            if (xpath && highlighted_URI) {
              // display the toastr

              chrome.storage.local
                .set({
                  url: highlighted_URI,
                  xpath: xpath
                })
                .then(() => {
                  chrome.runtime.sendMessage({
                    key: 'highlighted'
                  });
                });
            }
          }

        });
      });
    },

    getXPathResult(event) {

      var childElt = event.target;
      var parentElt = event.target.parentElement;

      var c_idx = this.getEltIndex(parentElt, childElt);
      var c_tagname = childElt.localName;
      var c_id = '#' + childElt.id;
      var c_classname = '.' + childElt.className;
      var c_Elt = c_classname != '.' ? c_classname : c_id != '#' ? c_id : c_tagname;
      var xpath = c_Elt + '[' + c_idx + ']';

      while (this.checkChildCnt(childElt, parentElt)) {
        childElt = parentElt;
        parentElt = childElt.parentElement;

        c_idx = this.getEltIndex(parentElt, childElt);
        c_tagname = childElt.localName;
        c_id = '#' + childElt.id;
        c_classname = '.' + childElt.className;
        c_Elt = c_classname != '.' ? c_classname : c_id != '#' ? c_id : c_tagname;

        xpath = c_Elt + '[' + c_idx + '] ' + xpath;
      }

      return xpath;
    },

    checkChildCnt(childElt, parentElt) {

      var c_tagname = childElt.localName;
      var c_id = '#' + childElt.id;
      var c_classname = '.' + childElt.className;
      var c_Elt = c_classname != '.' ? c_classname : c_id != '#' ? c_id : c_tagname;
      const child_cnt = document.querySelectorAll(c_Elt).length;

      var p_tagname = parentElt.localName;
      var p_id = '#' + parentElt.id;
      var p_classname = '.' + parentElt.className;
      var p_Elt = p_classname != '.' ? p_classname : p_id != '#' ? p_id : p_tagname;

      if (child_cnt > 1) {

        const c_idx = this.getEltIndex(parentElt, childElt);
        const parent_cnt = document.querySelectorAll(p_Elt).length;

        if (parent_cnt > 1) {
          var i;
          var j = 0;
          const parentList = document.querySelectorAll(p_Elt);

          for (i = 0; i < parent_cnt; i++) {
            const list_Elt = parentList[i].children[c_idx].className ? '.' + parentList[i].children[c_idx].className : parentList[i].children[c_idx].id ? '#' + parentList[i].children[c_idx].id : parentList[i].children[c_idx].localName;
            if (list_Elt == c_Elt) j++;
          }
          if (j > 1) {
            return true;
          } else {
            return false;
          }

        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    getEltIndex(parentElt, childElt) {
      const index = Array.from(parentElt.children).indexOf(childElt);
      return index;
    },

    receiveDataToBackground() {
      chrome.runtime.onMessage.addListener((message) => {
        if (message.key == 'removeHighlight') {
          const highlightedItems = document.querySelectorAll('.highlighted');
          if (highlightedItems.length > 0) {
            highlightedItems.forEach(item => {
              item.classList.remove('highlighted');
            });
          }
        }
      });
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
