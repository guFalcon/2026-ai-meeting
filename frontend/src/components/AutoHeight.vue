<template>
  <div v-resize="onResize">
    <slot name="header" />
    <slot name="toolbar" />
    <slot name="filter" />
    <div ref="resizableDiv">
      <slot name="table" :table-height="tableHeight" />
    </div>
  </div>
</template>

<script type="js">
export default {
  name: 'resizable-page',
  data () {
    return {
      tableHeight: 0
    }
  },
  props: {
    footerHeight: {
      type: Number,
      default: 59 // default v-data-table footer height
    },
    correction: { default: 0 }
  },
  methods: {
    onResize () {
      this.tableHeight =
        window.innerHeight -
        this.$refs.resizableDiv.getBoundingClientRect().y -
        this.footerHeight - this.correction
    }
  }
}
</script>
