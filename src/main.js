import { createApp } from 'vue'
import MainApp from './MainApp.vue'
import router from './router.js'
import './styles/style.css'

createApp(MainApp).use(router).mount('#app')
