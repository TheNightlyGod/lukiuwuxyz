<template>
  <div class="ref-main">
    <section class="ref-section">
      <div class="ref-container">
        <div class="ref-grid">
          <div
            v-for="(p, i) in projects"
            :key="i"
            class="ref-card"
            @mousemove="handleTiltMouseMove($event, i, cards)"
            @mouseleave="resetTiltCard(i, cards)"
            :style="getCardStyle(i, cards)"
          >
            <div class="card-shine" :style="getShineStyle(i, cards)"></div>
            <div class="card-content">
              <div class="ref-top">
                <div class="ref-header">
                  <div class="ref-icon">
                    <img :src="p.image" :alt="p.title" class="ref-image" />
                  </div>
                  <div class="ref-title-block">
                    <h3 class="ref-title">{{ p.title }}</h3>
                    <div class="ref-domain">{{ p.domain }}</div>
                  </div>
                </div>
                <p class="ref-description">{{ p.description }}</p>
              </div>
              <div class="ref-bottom">
                <a :href="p.link" class="view-button">
                  {{ p.buttontext }} <span class="arrow-icon">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const projects = [
  {
    title: 'Majestic RP',
    domain: 'Atlanta',
    description: 'Я играю на Majestic RP на сервере Atlanta. Вводи мой промокод: LUKI в игре и получай бонусы на старте. ',
    buttontext: 'Промокод: LUKI',
    image: 'https://majestic-rp.ru/favicon.ico',
    link: 'https://lukiuwu.xyz/mjrp'
  },
  {
    title: 'play2go.systems',
    domain: 'RU DEDICATED',
    description: 'Play2Go предлагает выделенные серверы для малого и крупного бизнеса с гибкими опциями развертывания.',
    buttontext: 'Посетить сайт',
    image: 'https://play2go.cloud/favicon.ico',
    link: 'https://lukiuwu.xyz/p2gs'
  },
  {
    title: 'play2go.cloud',
    domain: 'RU VDS/VPS',
    description: 'Play2Go предлагает cовременный хостинг виртуальных серверов.',
    buttontext: 'Посетить сайт',
    image: 'https://play2go.cloud/favicon.ico',
    link: 'https://lukiuwu.xyz/p2g'
  },
  {
    title: 'FREAKHOSTING',
    domain: 'EU DEDICATED/VDS/VPS/GAMING',
    description: 'FREAKHOSTING предлагает хостинг игровых серверов для популярных игр, а также премиум-хостинг VPS и выделенных серверов.',
    buttontext: 'Посетить сайт',
    image: '/iconfh.ico',
    link: 'https://lukiuwu.xyz/fg'
  },
  {
    title: 'Mitelis',
    domain: 'RU Anti-DDoS',
    description: 'Современные решения для защиты сайтов, сетей, сервисов и ИТ-инфраструктур любого размера от DDoS и хакерских атак.',
    buttontext: 'Посетить сайт',
    image: '/mitelis.webp',
    link: 'https://mitelis.net'
  },
  {
    title: 'CosmicGuard',
    domain: 'EU Anti-DDoS',
    description: 'Оставайтесь онлайн, оставайтесь быстрыми. Обеспечьте своим сетям защиту, которую они заслуживают.',
    buttontext: 'Посетить сайт',
    image: 'https://cosmicguard.com/favicon.ico',
    link: 'https://cosmicguard.com'
  },
]

const cards = reactive(projects.map(() => ({ rx: 0, ry: 0, shineX: 50, shineY: 50, hovering: false, scale: 1 })))

type TiltCard = { rx: number; ry: number; shineX: number; shineY: number; hovering: boolean; scale: number }

function handleTiltMouseMove(e: MouseEvent, i: number, arr: TiltCard[]) {
  const card = arr[i]
  if (!card) return
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = e.clientX - cx
  const dy = e.clientY - cy
  const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)))
  const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)))
  const maxTilt = 8
  card.rx = ny * maxTilt
  card.ry = -nx * maxTilt
  card.shineX = ((e.clientX - rect.left) / rect.width) * 100
  card.shineY = ((e.clientY - rect.top) / rect.height) * 100
  card.hovering = true
  card.scale = 1.02
}

function resetTiltCard(i: number, arr: TiltCard[]) {
  const card = arr[i]
  if (!card) return
  card.rx = 0
  card.ry = 0
  card.shineX = 50
  card.shineY = 50
  card.hovering = false
  card.scale = 1
}

function getCardStyle(i: number, arr: TiltCard[]) {
  const c = arr[i]
  if (!c) return {}
  return {
    transform: `perspective(900px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale(${c.scale})`,
    transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease',
    boxShadow: c.hovering ? '0 30px 60px rgba(0,0,0,0.28)' : '0 18px 45px rgba(0,0,0,0.18)'
  }
}

function getShineStyle(i: number, arr: TiltCard[]) {
  const c = arr[i]
  if (!c) return {}
  return {
    background: `radial-gradient(400px 180px at ${c.shineX}% ${c.shineY}%, rgba(255,255,255,0.12), rgba(255,255,255,0.02), transparent 40%)`,
    opacity: c.hovering ? 0.95 : 0,
    transition: 'opacity 0.3s ease, background 0.2s ease'
  }
}
</script>

<style scoped>
.ref-main {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.ref-section {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.ref-container {
  width: 100%;
  max-width: 1100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ref-grid {
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  align-items: center;
}

.ref-card {
  width: 100%;
  max-width: 650px;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 28px;
  background: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #000;
  height: 220px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card-shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0;
  transition: opacity 0.3s ease, background 0.2s ease;
  z-index: 1;
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.ref-top {
  flex: 1;
}

.ref-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.ref-icon {
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.ref-image {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.ref-title-block {
  flex: 1;
}

.ref-title {
  font-family: Comfortaa, serif;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #000;
  line-height: 1.2;
}

.ref-domain {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  font-family: Comfortaa, serif;
}

.ref-description {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.75);
  margin: 0 0 16px 0;
  font-family: Comfortaa, serif;
}

.ref-bottom {
  display: flex;
  justify-content: flex-start;
  margin-top: auto;
}

.view-button {
  font-size: 14px;
  color: #000;
  background: rgba(0, 0, 0, 0.08);
  padding: 10px 20px;
  border-radius: 12px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  backdrop-filter: blur(4px);
  white-space: nowrap;
  font-family: Comfortaa, serif;
}

.view-button:hover {
  background: rgba(0, 0, 0, 0.15);
  transform: translateX(4px);
}

.arrow-icon {
  font-size: 18px;
  font-weight: bold;
  font-family: Comfortaa, serif;
}

@media (max-width: 768px) {
  .ref-section {
    padding: 40px 20px;
  }

  .ref-card {
    max-width: 100%;
    padding: 24px;
    height: auto;
  }

  .ref-title {
    font-size: 18px;
  }

  .ref-description {
    font-size: 14px;
  }

  .view-button {
    padding: 10px 18px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .ref-section {
    padding: 30px 16px;
  }

  .ref-grid {
    gap: 20px;
  }

  .ref-card {
    padding: 20px;
    max-width: 100%;
  }

  .ref-header {
    gap: 12px;
  }

  .ref-icon {
    width: 40px;
    height: 40px;
  }

  .ref-image {
    width: 28px;
    height: 28px;
  }

  .ref-title {
    font-size: 16px;
  }

  .ref-description {
    font-size: 13px;
  }
}
</style>

