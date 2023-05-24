<template>
  <div class="sensor">
    <div>
      <custom-input
      v-if="editorMode"
      v-focus
      v-model="name"
      @keyup.enter="editName"
      />
      <div v-else>{{ sensor.name === "N/A" ? `ID датчика: ${sensor.sensor_id}` : sensor.name}}</div>
      <p v-if="error">{{ error }}</p>
      <div><strong>Температура:</strong> {{ sensor.temperature ? sensor.temperature : "N/A" }}</div>
      <div><strong>Влажность:</strong> {{ sensor.humidity ? sensor.humidity : "N/A" }}</div>
    </div>
    <div class="sensor__btns">
    <custom-button
      @click="$emit('remove', post)"
    >
      Удалить
    </custom-button>
    <custom-button
    v-if="editorMode"
    @click="editName"
    >
      Сохранить название
    </custom-button>
    <custom-button
    v-else
    @click="turnToEditorMode"
    >
      Переименовать
    </custom-button>
    </div>
  </div>
</template>

<script>
const maxNameLength = 10;

export default {
  name: "sensor-item",
  props: {
    sensor: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      name: '',
      editorMode: false,
      error: ''
    }
  },
  methods: {
    turnToEditorMode() {
      this.editorMode = true;
    },
    editName() {
      this.error = ''
      if (this.name.length > maxNameLength) {
        this.error = `Максимальная длинна название ${maxNameLength} символов`;
        return;
      }

      this.sensor.name = this.name;
      this.editorMode = false;
      this.$emit('edit', this.sensor, this.name)
    }
  }
}
</script>

<style scoped>
.sensor {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sensor__btns {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

@media screen and (max-width: 580px) {
  .sensor {
    flex-direction: column;
  }

  .sensor__btns {
    margin-top: 15px;
  }
}
</style>