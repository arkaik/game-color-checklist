<template lang="html">
  <div>
    <md-list class="md-double-line">
      <md-list-item v-for="prod of products" :key="prod.code">
        <md-checkbox :model="checkMap[prod.code]" @change="updateValue(prod.code, $event)"/>

        <div class="md-list-item-text">
          <span>{{prod.name}}</span>
          <span>{{prod.code}}</span>
        </div>

        <md-avatar :style="{backgroundColor: prod.color}">
          <md-icon v-if="prod.type === 'Ink'">grain</md-icon>
          <md-icon v-if="prod.type === 'Opaque'">opacity</md-icon>
          <md-icon v-if="prod.type === 'Wash'">blur_on</md-icon>
          <md-icon v-if="prod.type === 'Effect'">star_border</md-icon>
          <md-icon v-if="prod.type === 'MedVar'" :style="{color: 'black'}">layers</md-icon>
        </md-avatar>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'products',
    'checkMap'
  ]),
  methods: {
    updateValue (code, value) {
      this.$store.commit('updateValue', {code, value})
    }
  }
}
</script>

<style lang="css" scoped>

</style>
