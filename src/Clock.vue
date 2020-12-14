<template>
  <div>{{ display }}</div>
</template>

<script>
export default {
  data() {
    return {
      time: Date.now()
    }
  },
  computed: {
    display() {
      let hour = this.time.getHours()
      let minute = this.time.getMinutes()
      let second = this.time.getSeconds()

      return `${this.prefixNum(hour)}${this.prefixNum(minute)}${this.prefixNum(second)}`
    }
  },
  created() {
    setInterval(() => {
      this.time = Date.now()
    }, 1000)
  },
  methods: {
    prefixNum(num, strLen) {
      return (Array(strLen).join(0) + num).slice(-strLen)
    }
  },
}
</script>
