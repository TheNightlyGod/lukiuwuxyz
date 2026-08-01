<template>
  <div class="page-viewport" :class="{ 'scrolled': isScrolled }">
    <div class="scroll-content">
      <section class="section-profile">
        <div class="profile-content">
          <div class="profile-header">
            <img src="/3d.png?ver=leto" alt="Avatar" class="profile-avatar" />
            <h1 class="profile-title">TheNightlyGod</h1>
          </div>
          
          <div class="profile-socials">
            <a href="https://github.com/TheNightlyGod" target="_blank" class="social-btn-centered" aria-label="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a href="https://t.me/lukioff" target="_blank" class="social-btn-centered" aria-label="Telegram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>

            <a :href="randomReferral.href" target="_blank" class="social-btn-centered" aria-label="Referral">
              <img :src="randomReferral.ico" alt="Referral" />
            </a>
          </div>

          <div class="widgets-container">
            <SpotifyMiniPlayer />
            <WeatherMini />
          </div>
          
          <div class="scroll-indicator" @click="triggerReveal">
            <div class="mouse">
              <div class="wheel"></div>
            </div>
            <span class="scroll-text">Projects</span>
          </div>
        </div>
      </section>

      <section class="section-projects" @wheel="handleProjectsWheel">
        <div class="projects-content">
          <div class="projects-header-row">
            <button class="hide-projects-btn" @click="hideProjects">
              <svg class="up-arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 15l-6-6-6 6" />
              </svg>
              Click to hide projects
            </button>
            <h2 class="projects-title">My Projects</h2>
          </div>
          
          <div class="projects-grid">
            <div
              v-for="(p, i) in reversedProjects"
              :key="p.title"
              class="project-card-wrapper"
            >
              <a
                :href="p.link"
                target="_blank"
                class="project-card"
                @pointermove="handleTiltPointerMove($event)"
                @pointerleave="resetTiltCard($event)"
              >
                <div class="card-shine"></div>
                
                <div class="project-card-top">
                  <div class="project-card-header">
                    <img :src="p.image" :alt="p.title" class="project-card-img" />
                    <div class="project-card-title-block">
                      <h3 class="project-card-title">{{ p.title }}</h3>
                      <span class="project-card-domain">{{ p.domain }}</span>
                    </div>
                  </div>
                  <p class="project-card-desc">{{ p.description }}</p>
                </div>
                
                <div class="project-card-footer">
                  <div class="project-card-tags">
                    <span v-for="tag in p.tags" :key="tag.name" class="project-tag">
                      <Icon :name="tag.icon" class="project-tag-icon" />
                      {{ tag.name }}
                    </span>
                  </div>
                  <div class="project-card-right">
                    <span class="project-card-year">{{ p.year }}</span>
                    <span class="project-card-arrow">→</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const referrals = [
  { href: 'https://lukiuwu.xyz/p2g',  ico: '/iconp2g.ico' },
  { href: 'https://lukiuwu.xyz/p2gs', ico: '/iconp2gs.ico' },
  { href: 'https://lukiuwu.xyz/fh',   ico: '/iconfh.ico' },
  { href: 'https://lukiuwu.xyz/mjrp', ico: 'https://majestic-rp.ru/favicon.ico' },
]

const randomReferral = referrals[Math.floor(Math.random() * referrals.length)]

const projects = [
  {
    title: 'STPVAWMMER',
    domain: 'Code for spam(prank)',
    description: 'You could call this my first experience with Python ;) This code used PyAutoGui to automatically send messages to people. Of course, it wasn\'t created for malicious purposes—it was made solely to prank my friends, since this kind of spam isn\'t very effective.',
    tags: [
      { name: 'Python', icon: 'mdi:language-python' },
    ],
    year: '2021',
    image: '/404-error.png',
    link: 'https://github.com/TheNightlyGod/STPVAWMMER'
  },
  {
    title: 'ProjectDressingUp',
    domain: 'idk really',
    description: 'Some project I wrote for a class. I found it in the folder with all my class projects. I don\'t know what to say about it...',
    tags: [
      { name: 'С#', icon: 'teenyicons:c-sharp-solid' },
      { name: '.NET', icon: 'simple-icons:dotnet' },
      { name: 'WinForms', icon: 'tabler:error-404' },
    ],
    year: '2024',
    image: '/404-error.png',
    link: 'https://github.com/TheNightlyGod/ProjectDressingUp'
  },
  {
    title: 'aub64con',
    domain: 'ASCII-Unicode-Base64-and-Binary-convertor',
    description: 'ASCII, Unicode Base64 and Binary convertor!',
    tags: [
      { name: 'Python', icon: 'mdi:language-python' },
    ],
    year: '2025',
    image: '/404-error.png',
    link: 'https://github.com/TheNightlyGod/aub64con'
  },
  {
    title: 'lukiuwu_bot',
    domain: 'Ya hz',
    description: 'The bot is a suggestion for me.',
    tags: [
      { name: 'Python', icon: 'mdi:language-python' },
      { name: 'Docker', icon: 'bxl:docker' },
    ],
    year: '2025-ATM',
    image: '/lukiuwu_bot.png?ver=leto',
    link: 'https://t.me/lukiuwu_bot'
  },
  {
    title: 'reztrlbot',
    domain: 'Bot for administration',
    description: 'This bot was written for the VRGamesRUS group, but it was largely unnecessary and never made it to release. However, it does include a Google reCAPTCHA for user verification. At the time, Telegram’s Web App had just been released, and no one else had anything like it—it was different from the usual reCAPTCHAs used by bots.',
    tags: [
      { name: 'Python', icon: 'mdi:language-python' },
      { name: 'Flask', icon: 'bxl:flask' }
    ],
    year: '2025',
    image: '/reztrlbot.jpg',
    link: 'https://github.com/TheNightlyGod/reztrlbot'
  },
  {
    title: 'lukiuwuxyz',
    domain: 'lukiuwu.xyz',
    description: 'yee luki site...',
    tags: [
      { name: 'TypeScript', icon: 'bxl:typescript' },
      { name: 'Nuxt', icon: 'mdi:nuxt' },
      { name: 'Vue', icon: 'bxl:vuejs' },
      { name: 'Docker', icon: 'bxl:docker' },
    ],
    year: '2025-ATM',
    image: '/3d.png?ver=leto',
    link: 'https://github.com/TheNightlyGod/lukiuwuxyz'
  },
  {
    title: 'karmaai',
    domain: 'Bot with AI',
    description: 'This bot was written a long time ago... It was used to connect to the AI on HuggingFace. However, after HuggingFace changed its policy toward free users, the bot became obsolete and was shut down.',
    tags: [
      { name: 'Python', icon: 'mdi:language-python' },
    ],
    year: '2025',
    image: '/karmaai.jpg',
    link: 'https://github.com/TheNightlyGod/karmaai'
  },
  {
    title: 'MSBT',
    domain: 'MultiSavesBackupTool',
    description: 'A tool for backing up game saves with support for multiple games and automatic scheduling.',
    tags: [
      { name: 'С#', icon: 'teenyicons:c-sharp-solid' },
      { name: 'Avalonia', icon: 'simple-icons:avaloniaui' },
    ],
    year: '2025-2026',
    image: 'https://github.com/MultiSavesBackupTool/MSBT/blob/master/msbt_logo.png?raw=true',
    link: 'https://github.com/MultiSavesBackupTool/MSBT'
  },
  {
    title: 'NyaTime',
    domain: 'Funny Clock Widget',
    description: 'Artificial intelligence was used in the development of this project. I wanted to add the anime girls from “Moe Counter!” to a clock app—specifically, as an Android widget. Overall, it turned out pretty well. Unfortunately, the source code was lost, and only the APK file remains. It’s still installed on my phone!',
    tags: [
      { name: 'Kotlin', icon: 'mdi:language-kotlin' },
      { name: 'Android', icon: 'mdi:android' }
    ],
    year: '2025',
    image: '/NyaTime.png',
    link: 'https://github.com/TheNightlyGod/NyaTime'
  },
  {
    title: 'Pac-Man',
    domain: 'Fun copy of Pac-Man',
    description: 'This was my first school project for the “Industrial Programming” course at the Moscow School of Programmers. It was a fun Pac-Man clone.',
    tags: [
      { name: 'Python', icon: 'mdi:language-python' },
      { name: 'Pyglet', icon: 'tabler:error-404' }
    ],
    year: '2025',
    image: '/pacman.png',
    link: 'https://github.com/TheNightlyGod/pacman'
  },
  {
    title: 'ExAmigo',
    domain: 'Exam Preparation',
    description: 'I was one of the developers on this third project. This project served as the final assignment for the “Industrial Programming” course at the Moscow School of Programmers. I have nothing to say about it. However, I won\'t discard it or claim that I didn\'t participate in it.',
    tags: [
      { name: 'React', icon: 'mdi:react' },
      { name: 'Vue', icon: 'bxl:vuejs' },
      { name: 'Python', icon: 'mdi:language-python' },
      { name: 'Django', icon: 'bxl:django' },
    ],
    year: '2025',
    image: '/examigo.svg',
    link: 'https://github.com/Halcon5462/ExAmigo'
  },
  {
    title: 'lunioff_bot',
    domain: 'Make with love ❤️',
    description: 'The Luni project uses AI to create smart filters and triggers for messages. The project is actively developing.',
    tags: [
      { name: 'Python', icon: 'mdi:language-python' },
      { name: 'PostgreSQL', icon: 'bxl:postgresql' },
      { name: 'FastAPI', icon: 'bxl:fastapi' },
      { name: 'Docker', icon: 'bxl:docker' },
      { name: 'Yandex Cloud', icon: 'simple-icons:yandexcloud' },
    ],
    year: '2026-ATM',
    image: '/luni.png?ver=leto',
    link: 'https://t.me/lunioff_bot'
  },
  {
    title: 'lukidown_bot',
    domain: 'Bot for downloads media',
    description: 'This bot is designed to download various media from platforms such as YouTube / TikTok / Instagram / Pinterest / Rutube / VK / Spotify / Shazam / Yandex Music / SoundCloud / VK Music / Deezer / Apple Music / Tenor / JioSaavn / Twitch(Only clips) / Snapchat / Reddit.',
    tags: [
      { name: 'Python', icon: 'mdi:language-python' },
      { name: 'PostgreSQL', icon: 'bxl:postgresql' },
      { name: 'Deno', icon: 'bxl:deno' },
      { name: 'Redis', icon: 'devicon-plain:redis' },
      { name: 'Docker', icon: 'bxl:docker' },
    ],
    year: '2026-ATM',
    image: '/lukidown.png?ver=leto',
    link: 'https://t.me/lukidown_bot'
  },
  {
    title: 'botikpaaper',
    domain: 'Bot for Discord',
    description: 'I created this bot because I needed a way to parse the track currently playing on Spotify, since I didn\'t have Spotify Premium at the time.',
    tags: [
      { name: 'Python', icon: 'mdi:language-python' },
      { name: 'discord.py', icon: 'ic:baseline-discord' },
      { name: 'Docker', icon: 'bxl:docker' },
    ],
    year: '2026',
    image: '/botikpaaper.png',
    link: 'https://github.com/TheNightlyGod/botikpaaper'
  },
  {
    title: 'botikboot',
    domain: 'Bot for Twitch',
    description: 'This bot is currently under development. Its launch will be announced on the Telegram channel.',
    tags: [
      { name: 'Python', icon: 'mdi:language-python' },
      { name: 'PostgreSQL', icon: 'bxl:postgresql' },
      { name: 'FastAPI', icon: 'bxl:fastapi' },
      { name: 'Docker', icon: 'bxl:docker' },
      { name: 'TypeScript', icon: 'bxl:typescript' },
      { name: 'Nuxt', icon: 'mdi:nuxt' },
      { name: 'Vue', icon: 'bxl:vuejs' },
    ],
    year: 'TBA',
    image: '/botikboot.png',
    link: 'https://t.me/lukioff/333'
  },
]

const reversedProjects = [...projects].reverse()

type TiltVars = { rx: number; ry: number; shineX: number; shineY: number; scale: number }

const MAX_TILT_DEG = 5

const targetByEl = new WeakMap<HTMLElement, TiltVars>()
const currentByEl = new WeakMap<HTMLElement, TiltVars>()
const rafByEl = new WeakMap<HTMLElement, number>()
const rectByEl = new WeakMap<HTMLElement, DOMRect>()

let tiltEnabled: boolean | null = null

function canUseTilt(pointerType?: string) {
  if (pointerType === 'touch') return false
  if (typeof window === 'undefined') return false
  if (tiltEnabled === null) {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false
    tiltEnabled = !reducedMotion && !coarsePointer
  }
  return tiltEnabled
}

const DEFAULT_VARS: TiltVars = { rx: 0, ry: 0, shineX: 50, shineY: 50, scale: 1 }
const TILT_LERP = 0.15
const TILT_EPS = 0.05
const SHINE_EPS = 0.2

function applyVars(el: HTMLElement) {
  const cur = currentByEl.get(el)
  const tgt = targetByEl.get(el)
  if (!cur || !tgt) return false

  cur.rx += (tgt.rx - cur.rx) * TILT_LERP
  cur.ry += (tgt.ry - cur.ry) * TILT_LERP
  cur.shineX += (tgt.shineX - cur.shineX) * TILT_LERP
  cur.shineY += (tgt.shineY - cur.shineY) * TILT_LERP
  cur.scale += (tgt.scale - cur.scale) * TILT_LERP

  el.style.setProperty('--rx', `${cur.rx}deg`)
  el.style.setProperty('--ry', `${cur.ry}deg`)
  el.style.setProperty('--shineX', `${cur.shineX}%`)
  el.style.setProperty('--shineY', `${cur.shineY}%`)
  el.style.setProperty('--card-scale', `${cur.scale}`)

  return true
}

function isCloseToTarget(el: HTMLElement) {
  const cur = currentByEl.get(el)
  const tgt = targetByEl.get(el)
  if (!cur || !tgt) return true

  return (
    Math.abs(tgt.rx - cur.rx) < TILT_EPS &&
    Math.abs(tgt.ry - cur.ry) < TILT_EPS &&
    Math.abs(tgt.shineX - cur.shineX) < SHINE_EPS &&
    Math.abs(tgt.shineY - cur.shineY) < SHINE_EPS &&
    Math.abs(tgt.scale - cur.scale) < 0.005
  )
}

function ensureLoop(el: HTMLElement) {
  if (rafByEl.has(el)) return

  const tick = () => {
    const ok = applyVars(el)
    if (!ok) {
      rafByEl.delete(el)
      return
    }

    if (el.classList.contains('is-hovering') || !isCloseToTarget(el)) {
      rafByEl.set(el, window.requestAnimationFrame(tick))
      return
    }

    const tgt = targetByEl.get(el)
    if (tgt) {
      el.style.setProperty('--rx', `${tgt.rx}deg`)
      el.style.setProperty('--ry', `${tgt.ry}deg`)
      el.style.setProperty('--shineX', `${tgt.shineX}%`)
      el.style.setProperty('--shineY', `${tgt.shineY}%`)
      el.style.setProperty('--card-scale', `${tgt.scale}`)
    }

    rafByEl.delete(el)
    targetByEl.delete(el)
    currentByEl.delete(el)
  }

  rafByEl.set(el, window.requestAnimationFrame(tick))
}

function setTarget(el: HTMLElement, nextTarget: TiltVars) {
  targetByEl.set(el, nextTarget)
  if (!currentByEl.has(el)) currentByEl.set(el, { ...DEFAULT_VARS })
  ensureLoop(el)
}

function handleTiltPointerMove(e: PointerEvent) {
  if (!canUseTilt(e.pointerType)) return

  const el = e.currentTarget as HTMLElement
  if (!el) return

  if (!rectByEl.has(el)) rectByEl.set(el, el.getBoundingClientRect())
  const rect = rectByEl.get(el)
  if (!rect || rect.width === 0 || rect.height === 0) return

  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = e.clientX - cx
  const dy = e.clientY - cy

  const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)))
  const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)))

  const rx = ny * MAX_TILT_DEG
  const ry = -nx * MAX_TILT_DEG
  const shineX = ((e.clientX - rect.left) / rect.width) * 100
  const shineY = ((e.clientY - rect.top) / rect.height) * 100

  setTarget(el, { rx, ry, shineX, shineY, scale: 1.02 })
  el.classList.add('is-hovering')
}

function resetTiltCard(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  if (!el) return

  el.classList.remove('is-hovering')
  rectByEl.delete(el)
  setTarget(el, { ...DEFAULT_VARS })
}

const isScrolled = ref(false)
const observer = ref<IntersectionObserver | null>(null)
let isAnimating = false

const triggerReveal = () => {
  if (isAnimating) return
  isAnimating = true
  isScrolled.value = true
  setTimeout(() => { isAnimating = false }, 800)
}

const hideProjects = () => {
  if (isAnimating) return
  isAnimating = true
  isScrolled.value = false
  const scrollEl = document.querySelector('.section-projects')
  if (scrollEl) {
    scrollEl.scrollTo({ top: 0 })
  }
  setTimeout(() => { isAnimating = false }, 800)
}

const handleProjectsWheel = (e: WheelEvent) => {
  if (isAnimating) return
  const el = e.currentTarget as HTMLElement
  if (el && el.scrollTop === 0 && e.deltaY < 0) {
    e.preventDefault()
    hideProjects()
  }
}

const handleGlobalWheel = (e: WheelEvent) => {
  if (isAnimating) return
  
  if (e.deltaY > 0 && !isScrolled.value) {
    e.preventDefault()
    triggerReveal()
  }
}

let touchStartY = 0
const handleTouchStart = (e: TouchEvent) => {
  touchStartY = e.touches[0].clientY
}

const handleTouchMove = (e: TouchEvent) => {
  if (isAnimating) return
  
  const touchEndY = e.touches[0].clientY
  const diffY = touchStartY - touchEndY
  
  if (!isScrolled.value && diffY > 15) {
    triggerReveal()
  } else if (isScrolled.value) {
    const scrollEl = document.querySelector('.section-projects')
    if (scrollEl && scrollEl.scrollTop === 0 && diffY < -15) {
      hideProjects()
    }
  }
}

onMounted(() => {
  window.addEventListener('wheel', handleGlobalWheel, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchmove', handleTouchMove, { passive: false })
  
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.05 })
  
  document.querySelectorAll('.project-card-wrapper').forEach(el => {
    observer.value?.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleGlobalWheel)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove', handleTouchMove)
  observer.value?.disconnect()
})
</script>

<style scoped>
.page-viewport {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.scroll-content {
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.scrolled .scroll-content {
  transform: translateY(-100vh);
}

.section-profile {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  position: relative;
  width: 100%;
  flex-shrink: 0;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 440px;
  text-align: center;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  margin-bottom: 32px;
  justify-content: center;
  width: 100%;
}

.profile-avatar {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.28));
  position: relative;
  z-index: 1;
}

.profile-title {
  font-family: Comfortaa, serif;
  font-size: 34px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  line-height: 1.1;
  letter-spacing: -0.5px;
  text-align: center;
  margin-top: -36px;
  position: relative;
  z-index: 2;
}

.profile-socials {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  justify-content: center;
}

.social-btn-centered {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: #fff;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.25s ease;
}

.social-btn-centered img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
}

.social-btn-centered:hover {
  background: rgba(255, 255, 255, 0.16);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 15px rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
}

.social-btn-centered:active {
  transform: translateY(0) scale(0.98);
}

.widgets-container {
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  justify-content: center;
}

.widgets-container :deep(.mini-player),
.widgets-container :deep(.mini-weather) {
  flex: 1;
  min-width: 0;
  max-width: 176px !important;
  width: 100% !important;
  background: rgba(0, 0, 0, 0.28) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  transition: all 0.22s ease !important;

  height: 50px !important;
  padding: 6px 14px !important;
  gap: 10px !important;
}

.widgets-container :deep(.feels) {
  display: none !important;
}

@media (max-width: 520px) {
  .widgets-container {
    flex-direction: column;
    align-items: center;
  }
  .widgets-container :deep(.mini-player),
  .widgets-container :deep(.mini-weather) {
    max-width: 240px !important;
  }
  .profile-avatar {
    width: 160px;
    height: 160px;
  }
  .profile-title {
    font-size: 28px;
    margin-top: -24px;
  }
}

.widgets-container :deep(.mini-player:hover) {
  background: rgba(30, 215, 96, 0.15) !important;
  border-color: rgba(30, 215, 96, 0.3) !important;
  box-shadow: 0 6px 15px rgba(30, 215, 96, 0.15) !important;
  transform: translateY(-1px);
}

.widgets-container :deep(.mini-weather:hover) {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 6px 15px rgba(255, 255, 255, 0.1) !important;
  transform: translateY(-1px);
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  opacity: 0.65;
  animation: bounce 2s infinite;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.mouse {
  width: 22px;
  height: 36px;
  border: 2px solid #fff;
  border-radius: 11px;
  position: relative;
}

.wheel {
  width: 4px;
  height: 8px;
  background-color: #fff;
  border-radius: 2px;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollWheel 1.5s infinite;
}

.scroll-text {
  font-family: Comfortaa, serif;
  font-size: 11px;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
}

@keyframes scrollWheel {
  0% {
    top: 6px;
    opacity: 1;
  }
  100% {
    top: 18px;
    opacity: 0;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
  60% {
    transform: translateY(-3px);
  }
}

.section-projects {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.section-projects::-webkit-scrollbar {
  display: none;
}

.projects-content {
  width: 100%;
  max-width: 1400px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
}

.projects-header-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  margin-bottom: 32px;
  flex-shrink: 0;
}

.hide-projects-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.85);
  font-family: Comfortaa, serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.22s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.hide-projects-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
}

.hide-projects-btn:active {
  transform: translateY(0);
}

.up-arrow-icon {
  transition: transform 0.22s ease;
}

.hide-projects-btn:hover .up-arrow-icon {
  transform: translateY(-2px);
}

.projects-title {
  font-family: Comfortaa, serif;
  font-size: 32px;
  color: #fff;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.project-card-wrapper {
  opacity: 0;
  transform: translateY(35px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  height: 100%;
}

.project-card-wrapper.visible {
  opacity: 1;
  transform: translateY(0);
}

.project-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 22px;
  background: rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  color: white;
  text-decoration: none;
  width: 100%;
  height: 100%;
  transition: box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
  will-change: transform;
  text-align: left;
  min-height: 200px;
  
  --rx: 0deg;
  --ry: 0deg;
  --shineX: 50%;
  --shineY: 50%;
  --card-scale: 1;
  transform: perspective(800px) rotateX(var(--rx)) rotateY(var(--ry)) scale(var(--card-scale));
}

.project-card.is-hovering {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
}

.project-card.is-hovering .card-shine {
  opacity: 0.95;
}

.card-shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
  background: radial-gradient(
    200px 100px at var(--shineX) var(--shineY),
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.02),
    transparent 50%
  );
}

.project-card-top {
  width: 100%;
}

.project-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.project-card-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.project-card-title-block {
  min-width: 0;
}

.project-card-title {
  font-family: Comfortaa, serif;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-card-domain {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.project-card-desc {
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.project-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: 12px;
  width: 100%;
}

.project-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.project-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  background: rgba(255, 255, 255, 0.08);
  padding: 1px 6px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
}

.project-tag-icon {
  width: 11px;
  height: 11px;
}

.project-card-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.project-card-year {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.08);
  padding: 2px 8px;
  border-radius: 6px;
}

.project-card-arrow {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  transition: transform 0.22s ease;
}

.project-card:hover .project-card-arrow {
  transform: translateX(4px);
  color: #fff;
}

@media (max-width: 480px) {
  .projects-title {
    font-size: 28px;
  }
  
  .project-card {
    padding: 16px;
  }
}
</style>