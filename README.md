# Fooditizer
This app provides a food inventory organizer

##Tools
[Total.js](https://www.totaljs.com/?language=en)
[Vue.js](https://vuejs.org/)
[Nuxt](https://nuxtjs.org/)
[Vuetify](https://vuetifyjs.com/)
[Vue-Router](https://router.vuejs.org/en/)
[QuaggaJS](https://serratus.github.io/quaggaJS/)
 

## Installation

1. Install the total.js in project directory
  
  ```
npm install 
  ```

2. Install the dependencies in /vue

  ```
npm install
  ```

3. Start the server in debug mode with server side rendering

  ```
  npm run dev
  ```

4. Start the server in production mode

  ```
  npm run prod
  ```

6. Visit http://localhost:8000


## Very Important!!!
Fix in stylus-loader module in file patchcache.js function normalizePaths(paths) to destination source code:
  ```
function normalizePaths(paths) {
  for(var i in paths) {
    if(typeof paths[i]!=='function') 
      paths[i] = path.normalize(paths[i]);
   // else console.log('function',paths[i]);
  }
  return paths;
}
  ```