<template>
  <form @submit.prevent>
    <h4>Добавить датчик</h4>
    <custom-input
      v-focus
      v-model.trim="sensor.name"
      type="text"
      placeholder="Название"
    />
    <custom-input
      v-focus
      v-model.trim="sensor.temperature"
      type="number"
      placeholder="Температура"
    />
    <custom-input
      v-focus
      v-model.trim="sensor.humidity"
      type="number"
      placeholder="Влажность"
    />
    <custom-button
      style="align-self: flex-end; margin-top: 15px"
      @click="addSensor"
    >
      Добавить
    </custom-button>
    <p v-if="errors.length">
    <b>Пожалуйста исправьте указанные ошибки:</b>
    <ul style="list-style-type: none;">
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>
  </form>
</template>

<script>
const maxNameLength = 10;

export default {
  name: "sensor-form",
  data() {
    return {
      sensor: {
        name: '',
        temperature: '',
        humidity: ''
      },
      errors: []
    }
  },
  methods: {
    validateForm() {
    if (this.sensor.name.length > maxNameLength) {
      this.errors.push(`Имя датчика должно быть не длиннее ${maxNameLength}`);
    }

    if (this.sensor.humidity && Number(this.sensor.humidity) < 0) {
      this.errors.push("Влажность не может быть отрицательной");
    }
  },
    addSensor() {
      this.errors = [];
      this.validateForm();
      if (this.errors.length > 0) {
        return;
      }

      const newSensor = {
        sensor_id: Number(Date.now()),
        name: Boolean(this.sensor.name) ? this.sensor.name : "N/A",
        temperature: this.sensor.temperature ? Number(this.sensor.temperature) : "N/A",
        humidity: this.sensor.humidity ? Number(this.sensor.humidity) : "N/A",
      }
      this.$emit('add', newSensor)
      this.sensor = {
        name: '',
        temperature: '',
        humidity: ''
      }
    }
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>