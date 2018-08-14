<template lang="html">
  <div id="app">
    <md-app md-waterfall md-mode="fixed">

      <md-app-toolbar>
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">{{title}}</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item to="/" @click="title = 'Color List'">
            <md-icon>list_alt</md-icon>
            <span class="md-list-item-text">Color List</span>
          </md-list-item>

          <md-list-item to="/about" @click="title = 'About'">
            <md-icon>info</md-icon>
            <span class="md-list-item-text">About</span>
          </md-list-item>

          <md-list-item>
            <md-icon>update</md-icon>
            <span class="md-list-item-text">Update</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete_outline</md-icon>
            <span class="md-list-item-text">Delete Cached Files</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    menuVisible: false,
    title: "Color List"
  })
}
</script>

<style lang="css" scoped>
.md-app {
   height: 100vh;
}
</style>
