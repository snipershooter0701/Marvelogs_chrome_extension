import { createApp } from 'vue'
import App from '../view/content/index.vue'

const root = document.createElement('div');
root.setAttribute("id", "chatgpt_extension_app");
document.body.insertAdjacentElement("afterend", root);

createApp(App).mount('#chatgpt_extension_app')
