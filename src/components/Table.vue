<template>
  <div>
    <md-table :value="equivalences" md-fixed-header>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Ref. GC">{{item.ref_gc}}</md-table-cell>
        <md-table-cell md-label="Game Color">{{item.gc}}</md-table-cell>
        <md-table-cell md-label="Ref. GA">{{item.ref_ga}}</md-table-cell>
        <md-table-cell md-label="Game Air">{{item.ga}}</md-table-cell>
        <md-table-cell md-label="Ref. Cit.">{{item.ref_cit}}</md-table-cell>
        <md-table-cell md-label="Citadel">{{item.cit}}</md-table-cell>
        <md-table-cell md-label="Ref. Old Cit.">{{item.ref_old_cit}}</md-table-cell>
        <md-table-cell md-label="Old Citadel">{{item.old_cit}}</md-table-cell>
        <md-table-cell md-label="Ref. Reap.">{{item.ref_reap}}</md-table-cell>
        <md-table-cell md-label="Reaper">{{item.reap}}</md-table-cell>
        <md-table-cell md-label="Ref. MC">{{item.ref_mc}}</md-table-cell>
        <md-table-cell md-label="Model Color">{{item.mc}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'equivalences'
  ])
}
</script>

<style>

</style>
