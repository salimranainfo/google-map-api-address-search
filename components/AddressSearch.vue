<template>
  <div
    class="flex flex-row items-center flex-wrap w-full relative bg-black text-white p-10 font-display font-semibold"
  >
    <!-- Select Type Input -->
    <select
      id="selectedType"
      v-model="selectedType"
      name="selectedType"
      class="w-2/12 bg-black border-solid border-b-2 border-white focus:outline-none mr-6 font-display font-semibold"
    >
      <option
        v-for="(type, index) in types"
        :key="index"
        :value="type"
        class="outline:none font-display font-semibold text-sm bg-gray-700 opacity-75 focus:outline-none p-2"
      >
        {{ type }}
      </option>
    </select>

    <!-- Tooltip Icon -->
    <span
      class="absolute left-0 top-0"
      style="margin-left: 7.1rem; margin-top: 3.7rem"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-3 w-3 bg-white border-solid rounded-full"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
          class="text-black"
        />
      </svg>
    </span>
    <!-- Address Input Fields -->
    <div
      class="w-64"
      @mouseleave="addStreetNotoAddress"
      @mouseenter="removeStreetNoFromAddress"
    >
      <input
        ref="inputAddress"
        type="text"
        name="address"
        autocomplete="off"
        placeholder="Address"
        class="bg-black border-solid border-b-2 border-white focus:outline-none mr-2 font-display font-semibold"
        :class="addressInputWidth"
        @keyup="getSearchResult($event)"
      />
      <input
        type="text"
        v-show="showStreetNum"
        v-model="streetNum"
        name="addNum"
        autocomplete="off"
        class="w-2/12 bg-black border-solid border-b-2 border-white focus:outline-none font-display font-semibold"
      />
    </div>

    <!-- Cross and Plus Icons -->
    <button
      v-if="inputAddress"
      class="absolute left-0 top-0 focus:outline-none"
      style="margin-left: 23.5rem; margin-top: 2.2rem"
      @click="clearAddressInput"
    >
      <svg
        class="h-4 w-4 bg-black"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="gray"
      >
        <path
          class="bg-white"
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <button
      class="absolute left-0 top-0 focus:outline-none"
      style="margin-left: 24rem; margin-top: 3.6rem"
      @click="newAddressComponent"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        ></path>
      </svg>
    </button>

    <!-- Google Address Suggestions Div -->
    <div
      v-if="addresses.length > 0"
      class="absolute h-32 w-5/12 top-0 left-0 mt-10 p-2 rounded-b-lg text-xs overflow-auto font-display font-semibold scrollbar"
      style="margin-left: 8.5rem; margin-top: 5rem; background-color: #333333"
    >
      <ul>
        <li
          v-for="(address, index) in addresses"
          :key="index"
          @click="selectedAddress(address)"
          class="whitespace-no-wrap overflow-hidden hover:bg-gray-700 p-1"
          style="cursor: pointer"
        >
          {{ address.formatted_address }}
        </li>
      </ul>
    </div>

    <!-- Google Map is initialized here -->
    <div id="map" style="display: none"></div>
  </div>
</template>

<script>
export default {
  props: {
    types: {
      type: Array,
      default: () => {
        return ['Residential']
      },
    },
    locationPrompt: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  data() {
    return {
      inputAddress: '',
      streetNum: '',
      fullAddress: '',
      showStreetNum: false,
      selectedType: 'Residential',
      addresses: [],
      map: null,
      inputComponentCount: 1,
    }
  },
  mounted() {
    if (window.google) {
      if (this.locationPrompt) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }

              this.map = new window.google.maps.Map(
                window.document.getElementById('map'),
                {
                  center: pos,
                  zoom: 8,
                }
              )
            },
            (error) => {
              alert(
                'Can not get current location. To use address suggestion around you preciously, please enable current location. You can still use address suggestion without enabling current location service.'
              )

              this.map = new window.google.maps.Map(
                window.document.getElementById('map'),
                {
                  center: {
                    lat: 23.777176,
                    lng: 90.399452,
                  },
                  zoom: 8,
                }
              )
            }
          )
        } else {
          alert(
            'This browser or device does not support location service. But you can still use address suggestion service'
          )
        }
      } else {
        this.map = new window.google.maps.Map(
          window.document.getElementById('map'),
          {
            center: {
              lat: 23.777176,
              lng: 90.399452,
            },
            zoom: 8,
          }
        )
      }
    }
  },
  methods: {
    removeStreetNoFromAddress() {
      if (this.inputAddress) {
        this.showStreetNum = true
        this.$refs.inputAddress.value = this.inputAddress
      }
    },
    addStreetNotoAddress() {
      this.showStreetNum = false

      if (this.inputAddress && this.streetNum) {
        this.fullAddress = this.streetNum + ' ' + this.inputAddress
        this.$refs.inputAddress.value = this.fullAddress
      } else if (this.inputAddress && !this.streetNum) {
        this.$refs.inputAddress.value = this.inputAddress
      }
    },
    newAddressComponent() {
      this.$emit('new-address-component')
    },
    clearAddressInput() {
      this.addresses = []
      this.$refs.inputAddress.value = ''
      this.inputAddress = ''
      this.streetNum = ''
      this.fullAddress = ''
      this.showStreetNum = false
    },
    selectedAddress(address) {
      this.$emit('selected-address', address)
      this.inputAddress = address.formatted_address

      if (address.address_components.length > 0) {
        address.address_components.forEach((el) => {
          if (el.types[0] === 'street_number') {
            this.streetNum = el.short_name
          }
        })
      }

      this.addresses = []
      this.fullAddress = ''
      this.$refs.inputAddress.value = this.inputAddress
      this.showStreetNum = true
    },
    getSearchResult(event) {
      var inp = String.fromCharCode(event.keyCode)

      if (/[a-zA-Z0-9-_ ]/.test(inp)) {
        this.addresses = []
        this.inputAddress = this.$refs.inputAddress.value

        if (window.google) {
          const placeService = new window.google.maps.places.PlacesService(
            this.map
          )
          const request = {
            query: this.$refs.inputAddress.value,
            type: this.selectedType.toLowerCase(),
          }

          placeService.textSearch(request, (result, status) => {
            if (status === 'OK') {
              result.forEach((address) => {
                const placeRequest = {
                  placeId: address.place_id,
                  fields: [
                    'formatted_address',
                    'address_components',
                    'geometry.location',
                  ],
                }

                placeService.getDetails(
                  placeRequest,
                  (placeResult, placeStatus) => {
                    if (placeStatus === 'OK') {
                      const rcvdAddress = {
                        formatted_address: placeResult.formatted_address,
                        address_components: placeResult.address_components,
                        geometry: placeResult.geometry.location,
                      }

                      this.addresses.push(rcvdAddress)
                    }
                  }
                )
              })
            }
          })
        }
      }
    },
  },
  computed: {
    addressInputWidth() {
      if (this.showStreetNum) {
        return 'w-9/12'
      } else {
        return 'w-64'
      }
    },
  },
  head() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places`,
        },
      ],
    }
  },
}
</script>

<style>
.scrollbar::-webkit-scrollbar {
  @apply rounded-lg;
  background-color: #333333;
  width: 0.5rem;
  height: 70%;
  margin: 2px;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #797979;
  @apply rounded-lg;
}
.scrollbar::-webkit-scrollbar-corner {
  display: none;
}
.scrollbar::-webkit-resizer {
  display: none;
}
</style>
