<script setup lang="ts">
import { useSpotifyNowPlaying } from '~/composables/useSpotifyNowPlaying'

const { track, animatedProgress } = useSpotifyNowPlaying()
</script>

<template>
  <a
      v-if="track?.track_url"
      :href="track.track_url"
      target="_blank"
      class="mini-player"
      aria-label="Now playing in Spotify"
  >
    <img
        v-if="track.album_cover"
        :src="track.album_cover"
        alt="Alibum cover"
        class="cover"
        width="36"
        height="36"
        loading="lazy"
    />
    <div v-else class="cover placeholder" />

    <div class="info">
      <div class="track-name">
        {{ track.track_name || '—' }}
      </div>
      <div class="artist">
        {{ track.artist || 'Spotify' }}
      </div>
    </div>

    <div class="progress-container">
      <div
          class="progress-bar"
          :style="{ width: `${animatedProgress}%` }"
      ></div>
    </div>
  </a>

  <div v-else class="mini-player empty">
    <div class="cover placeholder" />
    <div class="info">
      <div class="track-name">Nothing playing</div>
      <div class="artist">Spotify</div>
    </div>
  </div>
</template>

<style scoped>
.mini-player {
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
  text-decoration: none;
  transition: all 0.22s ease;
  max-width: 240px;
  overflow: hidden;
  pointer-events: auto;
}

.mini-player:hover {
  background: rgba(30, 215, 96, 0.16);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(30, 215, 96, 0.18);
}

.cover {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  background: #222;
}

.placeholder {
  background: linear-gradient(135deg, #333, #444);
}

.info {
  flex: 1;
  min-width: 0;
  line-height: 1.15;
}

.track-name {
  font-size: 13.5px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.artist {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.75);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progress-container {
  width: 64px;
  height: 3px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 2px;
  overflow: hidden;
  flex-shrink: 0;
}

.progress-bar {
  height: 100%;
  background: #1ed760;
  border-radius: 2px;
  transition: width 0.4s ease-out;
}

.empty {
  opacity: 0.65;
  cursor: default;
}

@media (max-width: 768px) {
  .mini-player {
    padding: 5px 11px;
    max-width: 200px;
    gap: 8px;
  }
  .cover {
    width: 32px;
    height: 32px;
  }
  .track-name {
    font-size: 12.5px;
  }
  .artist {
    font-size: 10.5px;
  }
  .progress-container {
    width: 54px;
  }
}
</style>