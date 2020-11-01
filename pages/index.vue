<template>
  <div class="max-w-lg">
    <AddressSearch
      v-for="(component, index) in addressComponents"
      :key="index"
      :is="component"
      :types="types"
      @selected-address="selectedAddress"
      @new-address-component="newAddressComponent"
    ></AddressSearch>
  </div>
</template>

<script>
import AddressSearch from '@/components/AddressSearch.vue'
export default {
  components: {
    AddressSearch,
  },
  data() {
    return {
      types: ['Residential', 'Domicile', 'Legal', 'Operational'],
      addressComponents: [AddressSearch],
    }
  },
  methods: {
    newAddressComponent() {
      this.addressComponents.push(AddressSearch)
    },
    selectedAddress(val) {
      console.log(val)
    },
  },
}
</script>

<style></style>
