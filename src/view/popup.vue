<template>
  <div class="main_app">
    <div class="container">
      <div class="text">
        Marvelogs
      </div>
      <form action="#" v-if="showBlock">
        <div class="form-row">
          <div class="input-data">
            <input type="text" id="extension_email" required>
            <div class="underline"></div>
            <label for="">Email Address</label>
          </div>
          <div class="input-data">
            <input type="password" id="extension_pass" required>
            <div class="underline"></div>
            <label for="">Password</label>
          </div>
        </div>
        <div class="form-row">
          <div class="form-row submit-btn">
            <div class="input-data">
              <div class="inner"></div>
              <input type="submit" id="extension_submit" value="Sign In" @:click="loginUser">
            </div>
          </div>
        </div>
      </form>

      <div class="sm-text" v-else>
        {{ text }}
      </div>

      <div v-show="trackIf">
        <button class="button" @:click="trackHighlight(1)">Yes</button>
        <button class="button" @:click="trackHighlight(0)">No</button>
      </div>

      <popup v-if="isPopupVisible" :title="popupTitle" :message="popupMessage" @close="closePopup" />

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'popupView',
  data() {
    return {
      msg: 'popup',
      showBlock: true,
      trackIf: false,
      text: '',
      isPopupVisible: false,
      popupTitle: "title",
      popupMessage: "You are welcome"
    }
  },
  mounted() {
    this.receiveDataToBackground();
    this.handlerLoginedUser();
  },
  methods: {

    trackHighlight(param) {

      const _this = this;

      this.showBlock = false;
      this.trackIf = false;

      if (param == 1) {
        chrome.storage.local.get(["url", "xpath"]).then((result) => {
          console.log(result.url);
          console.log(result.xpath);

          if (result.url && result.xpath) {
            axios.post('https://app.marvelogs.com/path', {
              url: result.url,
              path: result.xpath
            })
              .then(function (response) {
                console.log(response);
                if (response.data == '1') {
                  _this.text = 'Successful';
                }
              })
              .catch(function (error) {
                console.log(error);
              })
              .finally(function () {
                // always executed
              });
          }
        });
      } else {
        chrome.storage.local.remove(['url', 'xpath'], (result) => {
          _this.text = 'Please highlight any element on the webpage that you want to track';
        });
      }
    },

    receiveDataToBackground() {
      chrome.runtime.onMessage.addListener((message) => {
        if (message.key == 'tracked') {
          this.showBlock = false;
          this.text = 'Are you sure you want to track this?';
          this.trackIf = true;
        }
      });
    },

    handlerLoginedUser() {
      chrome.storage.local.get(["token", "url", "xpath"]).then((result) => {
        if (result.token && (result.url && result.xpath)) {
          this.showBlock = false;
          this.text = 'Are you sure you want to track this?';
          this.trackIf = true;

        } else if (result.token && !(result.url && result.xpath)) {
          this.showBlock = false;
          this.trackIf = false;
          this.text = 'Please highlight any element on the webpage that you want to track';
        }
      });
    },

    loginUser(event) {
      event.preventDefault();
      const _this = this;
      const email = document.getElementById('extension_email').value;
      const pass = document.getElementById('extension_pass').value;

      axios.post('https://app.marvelogs.com/cx-login', {
        email: email,
        password: pass
      })
        .then(function (response) {
          if (response.data.token) {
            chrome.storage.local.set({ token: response.data.token }).then(() => {
              _this.showBlock = false;
              _this.trackIf = false;
              _this.text = 'Please highlight any element on the webpage that you want to track';
            });

          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 10px;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(115deg, #56d8e4 10%, #9f01ea 90%);
}

.container {
  max-width: 400px;
  background: #fff;
  width: 400px;
  height: 350px;
  padding: 25px 40px 10px 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.container .text {
  text-align: center;
  font-size: 41px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  background: -webkit-linear-gradient(right, #56d8e4, #9f01ea, #56d8e4, #9f01ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.container .sm-text {
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  background: -webkit-linear-gradient(right, #56d8e4, #9f01ea, #56d8e4, #9f01ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 40px;

}

.container form {
  padding: 30px 0 0 0;
}

.container form .form-row {
  display: flex;
  margin: 32px 0;
}

form .form-row .input-data {
  width: 100%;
  height: 40px;
  margin: 0 20px;
  position: relative;
}

form .form-row .textarea {
  height: 70px;
}

.input-data input,
.textarea textarea {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 15px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}

.input-data input:focus~label,
.textarea textarea:focus~label,
.input-data input:valid~label,
.textarea textarea:valid~label {
  transform: translateY(-20px);
  font-size: 14px;
  color: #3498db;
}

.textarea textarea {
  resize: none;
  padding-top: 10px;
}

.input-data label {
  position: absolute;
  pointer-events: none;
  bottom: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.textarea label {
  width: 100%;
  bottom: 40px;
  background: #fff;
}

.input-data .underline {
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
}

.input-data .underline:before {
  position: absolute;
  content: "";
  height: 2px;
  width: 100%;
  background: #3498db;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}

.input-data input:focus~.underline:before,
.input-data input:valid~.underline:before,
.textarea textarea:focus~.underline:before,
.textarea textarea:valid~.underline:before {
  transform: scale(1);
}

.submit-btn .input-data {
  overflow: hidden;
  height: 45px !important;
  width: 25% !important;
}

.submit-btn .input-data .inner {
  height: 100%;
  width: 300%;
  position: absolute;
  left: -100%;
  background: -webkit-linear-gradient(right, #56d8e4, #9f01ea, #56d8e4, #9f01ea);
  transition: all 0.4s;
}

.submit-btn .input-data:hover .inner {
  left: 0;
}

.submit-btn .input-data input {
  background: none;
  border: none;
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.button {
  background: -webkit-linear-gradient(right, #56d8e4, #9f01ea, #56d8e4, #9f01ea);
  transition: all 0.4s;
  border: none;
  color: white;
  padding: 12px 20%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 35px 2px;
  cursor: pointer;
  font-size: 17px;
}

@media (max-width: 700px) {
  .container .text {
    font-size: 30px;
  }

  .container form {
    padding: 10px 0 0 0;
  }

  .container form .form-row {
    display: block;
  }

  form .form-row .input-data {
    margin: 35px 0 !important;
  }

  .submit-btn .input-data {
    width: 100% !important;
  }
}
</style>
