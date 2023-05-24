<template>
  <div v-if="sensors.length > 0">
    <h1>Список датчиков:</h1>
    <transition-group name="sensors-list">
      <sensor-item
        v-for="sensor in sensors"
        :sensor="sensor"
        :key="sensor.sensor_id"
        @remove="$emit('remove', sensor)"
        @edit="event => $emit('edit', event)"
      />
    </transition-group>
  </div>
  <h2 v-else>
    Список датчиков пуст
  </h2>
</template>

<script>
export default {
  name: 'sensors-list',
  props: {
    sensors: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.sensors-list-item {
  display: inline-block;
  margin-right: 10px;
}
.sensors-list-enter-active,
.sensors-list-leave-active {
  transition: all 0.4s ease;
}
.sensors-list-enter-from,
.sensors-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.sensors-list-move {
  transition: transform 0.4s ease;
}
</style>