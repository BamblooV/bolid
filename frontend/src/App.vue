<template>
  <div class="app">

    <my-dialog v-model:show="dialogVisible">
      <sensor-form
      @add="addSensor"
      />
    </my-dialog>

    <div class="controls">
      <custom-button
      @click="loadSensors"
      >
        Загрузить датчики
      </custom-button>
      <custom-button
      @click="showDialog"
      >
        Добавить датчик
      </custom-button>
    </div>

    <div class="content">
      <h1 v-if="isSensorsLoading">Данные загружаются...</h1>
      <sensors-list
      v-else
      :sensors="sensors"
      @remove="deleteSensor"
      @edit="editSensorName"
      />
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      sensors: [],
      isSensorsLoading: false,
      dialogVisible: false,
    }
  },
  methods: {
    async loadSensors() {
      this.isSensorsLoading = true;
      const response = fetch('http://localhost:3000/');
      const data = await (await response).json();

      this.sensors = [...this.sensors, ...data]
      this.storeData();
      this.isSensorsLoading = false;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    deleteSensor(sensor) {
      this.sensors = this.sensors.filter(s => s.sensor_id !== sensor.sensor_id)
      this.storeData();
    },
    addSensor(sensor) {
      this.sensors.push(sensor)
      this.dialogVisible = false;
      this.storeData();
    },
    storeData() {
      localStorage.setItem('sensors', JSON.stringify(this.sensors));
    },
    editSensorName(event) {
      const sensor = this.sensors.find(s => s.sensor_id === event.sensor_id);
      sensor.name = event.name;
      this.storeData();
    }
  },
  mounted() {
    const storedData = localStorage.getItem('sensors');
    if (storedData) {
      this.sensors = JSON.parse(storedData);
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 20px;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;

}

.controls {
  padding: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  align-self: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
}

@media screen and (max-width: 400px) {
  .controls {
    flex-direction: column;
  }
}

.content {
  padding: 5px;
  margin-top: 15px;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>