<template>
  <v-app>
    <v-app-bar class="nav-bar">
      <v-btn value="HOME" href="/">
        <v-icon>mdi-history</v-icon>

        HOME
      </v-btn>

      <v-btn value="CLASSIFICATIONS" href="/problems/classifications">
        <v-icon>mdi-heart</v-icon>

        CLASSIFICATIONS
      </v-btn>

      <v-btn value="RANDOM">
        <v-icon>mdi-map-marker</v-icon>

        RANDOM PROBLEM
      </v-btn>
    </v-app-bar>
    <div class="app-content">
      <router-view/>
    </div>
    <footer>
      <p class="owner">Developed By: Yaadata Abdalhalim</p>
    </footer>

  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

footer {
  font-weight: bold;
  color: #1A2C34;
  margin-top: 5%;
}

.app-content {
  margin-top: 13%;
}

</style>
