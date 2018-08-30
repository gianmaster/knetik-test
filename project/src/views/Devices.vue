<template>
  <div class="container is-fluid">
    <h1 class="title">Knetik Test</h1>

    <div class="device-list-mode" v-if="!deviceDetails">
      <div class="level k-container notification">
        <div class="level-item has-text-centered">
          <div>
            <p class="subtitle">Filters:</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div class="is-fullwidth">
            <p class="heading">Connected</p>
            <div class="is-flex check-group">
              <label class="checkbox">
                <input type="checkbox" name="connected" value="false" v-model="filters.connected">
                No
              </label>
              <label class="checkbox">
                <input type="checkbox" name="connected" value="true" v-model="filters.connected">
                Yes
              </label>
            </div>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Location</p>
            <input type="text" class="input" name="location" v-model="filters.location">
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Parent Location</p>
            <input type="text" class="input" name="parentLocation" v-model="filters.parentLocation">
          </div>
        </div>
      </div>

      <div class="columns">

        <div class="column is-12 k-container">
          <table class="table is-fullwidth is-hoverable is-striped">
            <thead>
              <tr>
                <th class="has-text-centered">
                  <span class="subtitle">#</span>
                </th>
                <th class="has-text-centered">
                  <span class="subtitle">Connection Status</span>
                </th>
                <th class="has-text-centered">
                  <span class="subtitle">Location Name</span>
                </th>
                <th class="has-text-centered">
                  <span class="subtitle">Updatet at</span>
                </th>
                <!--
                <th class="has-text-centered">
                  <span class="subtitle">Signal</span>
                </th>
                -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(device, idx) in devices" :key="idx">
                <td class="has-text-centered">
                  <span class="k-text">{{idx + 1}}</span>
                </td>
                <td class="has-text-centered">
                  <span class="k-text tag" :class="{'is-success': device.connected, 'is-light': !device.connected}">{{device.connected ? 'Online' : 'Offline'}}</span>
                </td>
                <td class="has-text-centered">
                  <a class="k-text has-text-link" @click="setDeviceDetails(device)">{{device.location}}</a>
                </td>
                <td class="has-text-centered">
                  <span class="k-text">{{device.updated_at | formatDate}}</span>
                </td>
                <!--
                <td class="has-text-centered">
                  <span class="k-text">{{device.signal}}</span>
                </td>
                -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
        <span slot="no-more" v-if="options.current_page > 1">
          There is no more Devices :(
        </span>
      </infinite-loading>
    </div>

    <div class="device-details-mode" v-else>
      <div class="column">
        <div class="columns">
          <div class="column is-8">
            <div class="is-child notification">
              <div class="columns">
                <div class="column has-text-centered">
                  <div class="title">
                    <span class="has-text-grey-dark">Location </span>
                    <strong>{{deviceDetails.location}}</strong>
                    <span class="has-text-grey-dark"> Details</span>
                  </div>
                  <signal :level="deviceDetails.signal"/>
                </div>
              </div>
              <div class="columns">
                <div class="column is-6 flex-reverse">
                  <div class="tags has-addons">
                    <span class="tag is-white">Connected</span>
                    <span class="tag is-success" v-if="deviceDetails.connected">YES</span>
                    <span class="tag is-danger" v-else>NO</span>
                  </div>
                </div>
                <div class="column is-6 has-text-left">
                  <div class="tags has-addons">
                    <span class="tag is-white">Signal</span>
                    <span class="tag is-info">{{deviceDetails.signal}}</span>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-6 flex-reverse">
                  <div class="tags has-addons">
                    <span class="tag is-white">ID:</span>
                    <span class="tag">{{deviceDetails.id}}</span>
                  </div>
                </div>
                <div class="column is-6 has-text-left">
                  <div class="tags has-addons">
                    <span class="tag is-white">Updated at:</span>
                    <span class="tag">{{deviceDetails.updated_at | formatDate}}</span>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-6 flex-reverse">
                  <div class="tags has-addons">
                    <span class="tag is-white">Mac Address:</span>
                    <span class="tag">{{deviceDetails.mac_address}}</span>
                  </div>
                </div>
                <div class="column is-6 has-text-left">
                  <div class="tags has-addons">
                    <span class="tag is-white">Parent Location</span>
                    <span class="tag">{{deviceDetails.parent_location}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <article class="tile is-child notification">
              <p class="subtitle">Related Locations <span class="tag is-info">{{deviceDetails.related.length}}</span></p>
              <table class="table is-fullwidth" v-if="deviceDetails.related.length">
                <thead>
                  <tr>
                    <th class="min-header has-text-centered">Parent Location</th>
                    <th class="min-header has-text-centered">Signal</th>
                    <th class="min-header has-text-centered">Connected</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="d in deviceDetails.related" :key="d.id" class="is-link" @click="setDeviceDetails(d)">
                    <td class="has-text-centered">
                      <span class="has-text-link">{{d.parent_location}}</span>
                    </td>
                    <td class="has-text-centered">
                      <span class="has-text-link">{{d.signal}}</span>
                    </td>
                    <td class="has-text-centered">
                      <span class="tag is-success" v-if="d.connected">YES</span>
                      <span class="tag is-danger" v-else>NO</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </article>
          </div>
        </div>
      </div>
      <div class="column">
        <button class="button is-dark is-outlined" @click="setDeviceDetails(null)">Back to list</button>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          by <router-link :to="{name: 'about'}">Giancarlos Cercado</router-link>
        </p>
        <p>
          <a href="https://github.com/gianmaster/knetik-test" target="blank">git-repo</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>

import axios from 'axios'
import { api } from '@/utils'
import Signal from '@/components/Signal'
import InfiniteLoading from 'vue-infinite-loading'
import { debounce, filter } from 'lodash'

export default {
  name: 'home',
  components: {
    InfiniteLoading, Signal
  },
  data () {
    return {
      deviceDetails: null,
      devices: [],
      options: {
        total_pages: 1,
        current_page: 0
      },
      filters: {
        location: null,
        parentLocation: null,
        connected: ['true', 'false']
      },
      loading: false
    }
  },
  methods: {
    setDeviceDetails (device) {
      this.deviceDetails = device
      if (device) {
        this.deviceDetails.related = filter(this.devices, o => o.location === device.location && o.id !== device.id)
      }
    },
    getDevices (page = 1, stateHandler = null) {
      if (page > this.options.total_pages && this.options.total_pages > 0) return

      // apply filters
      let filter = []
      const {filters: {location, parentLocation, connected}} = this
      if (location) {
        filter.push(`location:${location}`)
      }
      if (parentLocation) {
        filter.push(`parent_location:${parentLocation}`)
      }
      if (connected.length === 1) {
        filter.push(`connected:${connected[0]}`)
      }

      filter = filter.join('|')

      this.options.current_page = page
      axios.get(api, {params: { page, filter }}).then(({data}) => {
        this.options.total_pages = data.total_pages
        if (stateHandler) {
          stateHandler.loaded()
          if (page === this.options.total_pages || this.options.total_pages === 0) stateHandler.complete()
        }
        this.devices = this.devices.concat(data.content)
      }).catch(err => {
        console.error(err)
        stateHandler.loaded()
        throw new Error('Request Error')
      })
    },
    infiniteHandler ($state) {
      let nextPage = this.options.current_page + 1
      this.getDevices(nextPage, $state)
    },
    changeFilters () {
      this.options.current_page = 0
      this.devices = []
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    }
  },
  watch: {
    filters: {
      handler: debounce(function () {
        this.changeFilters()
      }, 1000),
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>

.title {
  margin-top: 20px;
}

.k-text {
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.k-container {
  padding: 5px 30px;
}

.check-group {
  justify-content: space-around;
}

.is-fullwidth {
  width: 100%;
}

.level-item {
  min-height: 60px;
  align-items: baseline;
}

.separate{
  margin-left: 15px;
}

.is-link {
  cursor: pointer;
}

.min-header {
  font-size: 11px;
  color: dimgray;
  letter-spacing: 1px;
}

.circle {
  height: 10px;
  width: 10px;
  border-radius: 50%;

  &.--on {
    background-color: green;
  }

  &.--off {
    background-color: gray;
  }
}

.flex-reverse {
  display: flex;
  flex-direction: row-reverse;
}

</style>
