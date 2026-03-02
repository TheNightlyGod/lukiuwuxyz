<script setup lang="ts">
const { weather } = useWeather(600000)
</script>

<template>
  <div class="mini-weather" v-if="weather">
    <div class="icon">{{ weather.icon || '🌤️' }}</div>

    <div class="info">
      <div class="temp-line">
        {{ weather.temperature }}°C
        <span v-if="weather.feels_like !== weather.temperature" class="feels">
          (feels like {{ weather.feels_like }}°)
        </span>
      </div>
      <div class="desc">{{ weather.description }}</div>
    </div>
  </div>

  <div v-else class="mini-weather empty">
    <div class="icon">⌛</div>
    <div class="info">
      <div class="temp-line">—°C</div>
      <div class="desc">Loading...</div>
    </div>
  </div>
</template>

<style scoped>
.mini-weather {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  background: rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 9999px;
  color: white;
  max-width: 240px;
  overflow: hidden;
  pointer-events: auto;
  white-space: nowrap;

  height: 48px;
  box-sizing: border-box;
}

.mini-weather.empty {
  opacity: 0.65;
  cursor: default;
}

.icon {
  font-size: 26px;
  line-height: 1;
  flex-shrink: 0;
  min-width: 26px;
}

.info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.15;
}

.temp-line {
  font-size: 13.5px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.feels {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.75);
  margin-left: 6px;
  font-weight: 500;
}

.desc {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 1px;
}

@media (max-width: 768px) {
  .mini-weather {
    padding: 5px 12px;
    max-width: 210px;
    gap: 8px;
    height: 44px;
  }
  .icon { font-size: 22px; }
  .temp-line { font-size: 12.5px; }
  .feels { font-size: 10.5px; }
  .desc { font-size: 10px; }
}
</style>