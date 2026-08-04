<template>
  <div class="page-viewport" :class="{ 'scrolled': isScrolled }">
    <div class="scroll-content" :style="{ transform: `translateY(-${activeSection * 100}vh)` }">
      <section class="section-profile">
        <div class="profile-content">
          <div class="profile-header">
            <img src="/3d.png?ver=leto" alt="Avatar" class="profile-avatar" />
            <h1 class="profile-title">TheNightlyGod</h1>

            <button class="expand-profile-btn" @click="isAboutExpanded = !isAboutExpanded" :aria-expanded="isAboutExpanded">
              <span>Expand</span>
              <svg class="expand-arrow" :class="{ rotated: isAboutExpanded }" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          <transition name="expand-card">
            <div v-if="isAboutExpanded" class="about-card">
              <div class="about-card-section">
                <h3 class="about-card-subtitle">About Me</h3>
                <div class="about-card-text">
                  <p>My name is Daniil, or Luki, or TheNightlyGod.</p>
                  <p>I’m a 17-year-old guy who does programming.</p>
                  <p>I might be underestimating my abilities, but I consider myself an intermediate developer.</p>
                  <p>I’ve been interested in technology and system administration since I was 6 years old.</p>
                  <p>I’m a fuckstack(This typo was included on purpose...) developer as well as a 3D artist.</p>
                  <p>I’m a music lover, so don’t be surprised by the music you see here or on my Telegram channel.</p>
                  <p>I own a Meta Quest 3, but I don’t use VR very often.</p>
                </div>
              </div>

              <div class="about-card-section">
                <h3 class="about-card-subtitle">Skillset</h3>
                <div class="skillset-tags">
                  <span class="project-tag"><Icon name="mdi:language-python" class="project-tag-icon" /> Python</span>
                  <span class="project-tag"><Icon name="teenyicons:c-sharp-solid" class="project-tag-icon" /> C#</span>
                  <span class="project-tag"><Icon name="simple-icons:typescript" class="project-tag-icon" /> TypeScript</span>
                  <span class="project-tag"><Icon name="simple-icons:vuedotjs" class="project-tag-icon" /> Vue.js</span>
                  <span class="project-tag"><Icon name="simple-icons:nuxtdotjs" class="project-tag-icon" /> Nuxt</span>
                  <span class="project-tag"><Icon name="simple-icons:nodedotjs" class="project-tag-icon" /> Node.js</span>
                  <span class="project-tag"><Icon name="simple-icons:docker" class="project-tag-icon" /> Docker</span>
                  <span class="project-tag"><Icon name="simple-icons:git" class="project-tag-icon" /> Git</span>
                </div>
              </div>
            </div>
          </transition>

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

            <div class="year-filter-row">
              <button
                  class="year-filter-btn"
                  :class="{ active: selectedYear === null }"
                  @click="selectedYear = null"
              >
                All
              </button>
              <button
                  v-for="y in allYears"
                  :key="y"
                  class="year-filter-btn"
                  :class="{ active: selectedYear === y }"
                  @click="selectedYear = selectedYear === y ? null : y"
              >
                {{ y }}
              </button>
            </div>

            <div class="status-filter-row">
              <button
                  class="status-filter-btn status-active"
                  :class="{ active: statusFilters.includes('active') }"
                  @click="toggleStatus('active')"
              >
                Active
              </button>
              <button
                  class="status-filter-btn status-frozen"
                  :class="{ active: statusFilters.includes('frozen') }"
                  @click="toggleStatus('frozen')"
              >
                Frozen
              </button>
              <button
                  class="status-filter-btn status-archived"
                  :class="{ active: statusFilters.includes('archived') }"
                  @click="toggleStatus('archived')"
              >
                Archive
              </button>
            </div>
          </div>

          <div class="projects-grid">
            <div
                v-for="(p, i) in filteredProjects"
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
                    <div class="project-card-badges">
                      <span v-if="p.archived" class="project-badge-archived">Archive</span>
                      <span v-else-if="p.frozen" class="project-badge-frozen">Frozen</span>
                      <span v-else class="project-badge-active">Active</span>
                      <span class="project-card-year">{{ p.year }}</span>
                    </div>
                    <span class="project-card-arrow">→</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="section-badges" @wheel="handleBadgesWheel">
        <div class="badges-content">
          <div class="badges-header-row">
            <button class="back-projects-btn" @click="backToProjects">
              <svg class="up-arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 15l-6-6-6 6" />
              </svg>
              Click to back to projects
            </button>
          </div>

          <div class="otoring-panel">
            <a :href="prevHref" target="_blank" class="otoring-btn otoring-prev" aria-label="Previous site">
              <img v-if="otoringData?.prev?.favicon" :src="otoringData.prev.favicon" alt="" class="otoring-favicon" />
              <span class="otoring-btn-text">{{ prevLabel }}</span>
            </a>

            <a href="https://webring.otomir23.me/" target="_blank" class="otoring-center-logo" aria-label="otoring webring">
              <span class="otoring-title">otoring</span>
              <span class="otoring-sub">webring</span>
            </a>

            <a :href="nextHref" target="_blank" class="otoring-btn otoring-next" aria-label="Next site">
              <span class="otoring-btn-text">{{ nextLabel }}</span>
              <img v-if="otoringData?.next?.favicon" :src="otoringData.next.favicon" alt="" class="otoring-favicon" />
            </a>
          </div>

          <div class="badges-panel">
            <div v-if="badges.length > 0" class="badges-flex">
              <template v-for="(b, i) in badges" :key="i">
                <a
                    v-if="b.link"
                    :href="b.link"
                    target="_blank"
                    class="badge-item"
                    :title="b.title || '88x31 badge'"
                >
                  <img :src="b.src" width="88" height="31" :alt="b.title || 'badge'" class="badge-88x31-img" />
                </a>
                <span
                    v-else
                    class="badge-item badge-item-static"
                    :title="b.title || '88x31 badge'"
                >
                  <img :src="b.src" width="88" height="31" :alt="b.title || 'badge'" class="badge-88x31-img" />
                </span>
              </template>
            </div>
            <div v-else class="badges-empty-placeholder">
              <span>88x31 Badges Panel</span>
            </div>
          </div>

          <div class="our-badge-panel">
            <span class="our-badge-title">Our Badge</span>
            <a href="https://lukiuwu.xyz" target="_blank" class="badge-item" title="lukioff">
              <img src="/badges/lukioff.gif" width="88" height="31" alt="lukioff" class="badge-88x31-img" />
            </a>
            <button class="copy-badge-code-btn" @click="copyOurBadgeCode">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy Code
            </button>
          </div>
        </div>
      </section>
    </div>

    <transition name="toast-fade">
      <div v-if="showToast" class="badge-toast">
        {{ toastText }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

const isAboutExpanded = ref(false)

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
    link: 'https://github.com/TheNightlyGod/STPVAWMMER',
    archived: true
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
    link: 'https://github.com/TheNightlyGod/ProjectDressingUp',
    archived: true
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
    link: 'https://github.com/TheNightlyGod/aub64con',
    archived: true
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
    link: 'https://t.me/lukiuwu_bot',
    active: true
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
    link: 'https://github.com/TheNightlyGod/reztrlbot',
    archived: true
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
    link: 'https://github.com/TheNightlyGod/lukiuwuxyz',
    active: true
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
    link: 'https://github.com/TheNightlyGod/karmaai',
    archived: true
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
    link: 'https://github.com/MultiSavesBackupTool/MSBT',
    frozen: true
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
    link: 'https://github.com/TheNightlyGod/NyaTime',
    archived: true
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
    link: 'https://github.com/TheNightlyGod/pacman',
    archived: true
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
    year: '2026',
    image: '/examigo.svg',
    link: 'https://github.com/Halcon5462/ExAmigo',
    frozen: true
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
    link: 'https://t.me/lunioff_bot',
    active: true
  },
  {
    title: 'lukidown_bot',
    domain: 'Bot for downloads media',
    description: 'This bot is designed to download various media from platforms such as YouTube / TikTok / Instagram / Pinterest / Rutube / VK / Spotify / Shazam / Yandex Music / SoundCloud / VK Music / Deezer / Apple Music / Tenor / JioSaavn / Twitch(Only clips) / Snapchat / Reddit / Kinopoisk.',
    tags: [
      { name: 'Python', icon: 'mdi:language-python' },
      { name: 'PostgreSQL', icon: 'bxl:postgresql' },
      { name: 'Deno', icon: 'bxl:deno' },
      { name: 'Redis', icon: 'devicon-plain:redis' },
      { name: 'Docker', icon: 'bxl:docker' },
    ],
    year: '2026-ATM',
    image: '/lukidown.png?ver=general',
    link: 'https://github.com/TheNightlyGod/lukidown_bot',
    active: true
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
    link: 'https://github.com/TheNightlyGod/botikpaaper',
    frozen: true
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
      { name: 'C++', icon: 'mdi:language-cpp' },
    ],
    year: 'TBA',
    image: '/botikboot.png',
    link: 'https://t.me/lukioff/335',
    active: true
  },
]

const reversedProjects = [...projects].reverse()

function extractYears(y: string): string[] {
  return y.match(/\d{4}/g) ?? []
}

const allYears = computed(() => {
  const set = new Set<string>()
  projects.forEach(p => extractYears(p.year).forEach(y => set.add(y)))
  return Array.from(set).sort((a, b) => Number(b) - Number(a))
})

const selectedYear = ref<string | null>(null)

const statusFilters = ref<string[]>([])

function toggleStatus(status: string) {
  const idx = statusFilters.value.indexOf(status)
  if (idx === -1) {
    statusFilters.value = [...statusFilters.value, status]
  } else {
    statusFilters.value = statusFilters.value.filter(s => s !== status)
  }
}

const filteredProjects = computed(() => {
  let list = reversedProjects

  if (selectedYear.value) {
    list = list.filter(p => extractYears(p.year).includes(selectedYear.value!))
  }

  if (statusFilters.value.length > 0) {
    list = list.filter(p => {
      return statusFilters.value.some(s => {
        if (s === 'active') return !p.archived && !p.frozen
        if (s === 'archived') return !!p.archived
        if (s === 'frozen') return !!p.frozen
        return false
      })
    })
  }

  return list
})

interface OtoringSite {
  id: number
  slug: string
  name: string
  url: string
  favicon?: string
}

interface OtoringData {
  prev?: OtoringSite
  curr?: OtoringSite
  next?: OtoringSite
}

const otoringData = ref<OtoringData | null>(null)

const prevLabel = computed(() => {
  const name = otoringData.value?.prev?.name
  return name ? `← ${name}` : '← Prev'
})

const prevHref = computed(() => {
  return otoringData.value?.prev?.url || 'https://webring.otomir23.me/lukioff/prev'
})

const nextLabel = computed(() => {
  const name = otoringData.value?.next?.name
  return name ? `${name} →` : 'Next →'
})

const nextHref = computed(() => {
  return otoringData.value?.next?.url || 'https://webring.otomir23.me/lukioff/next'
})

const fetchOtoringData = async () => {
  try {
    const res = await fetch('https://webring.otomir23.me/lukioff/data')
    if (res.ok) {
      const data: OtoringData = await res.json()
      otoringData.value = data
    }
  } catch (err) {
  }
}

interface BadgeItem {
  src: string
  link?: string
  title?: string
}

const badges = ref<BadgeItem[]>([
  { src: '/badges/any-browser-ru.png', title: 'Any Browser' },
  { src: '/badges/js.png', title: 'JavaScript' },
  { src: '/badges/webmoney.gif', title: 'WebMoney' },
  { src: '/badges/telegram.gif', link: 'https://t.me/lukioff', title: 'Telegram' },
  { src: '/badges/seedyourtorrents.gif', link: 'https://www.qbittorrent.org/', title: 'Seed Your Torrents' },
  { src: '/badges/vrchat.png', link: 'https://vrchat.com/home/user/usr_75e93365-6b40-40f5-81b7-536bee948457', title: 'VRChat Profile' },
])

const toastText = ref('')
const showToast = ref(false)
let toastTimeout: ReturnType<typeof setTimeout> | null = null

const copyOurBadgeCode = () => {
  const code = `<a href="https://lukiuwu.xyz" target="_blank"><img src="https://lukiuwu.xyz/badges/lukioff.gif" alt="lukioff" width="88" height="31" /></a>`
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      toastText.value = 'Copied lukioff badge HTML code!'
      showToast.value = true
      if (toastTimeout) clearTimeout(toastTimeout)
      toastTimeout = setTimeout(() => {
        showToast.value = false
      }, 2500)
    })
  }
}

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

const activeSection = ref(0)
const isScrolled = computed(() => activeSection.value > 0)
const observer = ref<IntersectionObserver | null>(null)
let isAnimating = false

const goToSection = (index: number) => {
  if (isAnimating || index < 0 || index > 2) return
  isAnimating = true
  activeSection.value = index

  if (index === 1) {
    const scrollEl = document.querySelector('.section-projects')
    if (scrollEl) scrollEl.scrollTop = 0
  } else if (index === 2) {
    const scrollEl = document.querySelector('.section-badges')
    if (scrollEl) scrollEl.scrollTop = 0
  }

  setTimeout(() => { isAnimating = false }, 800)
}

const triggerReveal = () => {
  goToSection(1)
}

const hideProjects = () => {
  goToSection(0)
}

const backToProjects = () => {
  goToSection(1)
}

let overscrollY = 0
let overscrollTimer: ReturnType<typeof setTimeout> | null = null
const WHEEL_OVERSCROLL_THRESHOLD = 300

const handleProjectsWheel = (e: WheelEvent) => {
  if (isAnimating) return
  const el = e.currentTarget as HTMLElement
  if (!el) return

  const isAtTop = el.scrollTop <= 0
  const isAtBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 5

  if (isAtTop && e.deltaY < 0) {
    e.preventDefault()
    overscrollY = 0
    goToSection(0)
  } else if (isAtBottom && e.deltaY > 0) {
    overscrollY += e.deltaY

    if (overscrollTimer) clearTimeout(overscrollTimer)
    overscrollTimer = setTimeout(() => {
      overscrollY = 0
    }, 450)

    if (overscrollY >= WHEEL_OVERSCROLL_THRESHOLD) {
      e.preventDefault()
      overscrollY = 0
      goToSection(2)
    }
  } else {
    overscrollY = 0
  }
}

const handleBadgesWheel = (e: WheelEvent) => {
  if (isAnimating) return
  const el = e.currentTarget as HTMLElement
  if (!el) return

  if (el.scrollTop <= 0 && e.deltaY < 0) {
    e.preventDefault()
    goToSection(1)
  }
}

const handleGlobalWheel = (e: WheelEvent) => {
  if (isAnimating) return

  if (activeSection.value === 0 && e.deltaY > 0) {
    e.preventDefault()
    goToSection(1)
  }
}

let touchStartY = 0
const handleTouchStart = (e: TouchEvent) => {
  touchStartY = e.touches[0].clientY
}

const TOUCH_OVERSCROLL_THRESHOLD = 90

const handleTouchMove = (e: TouchEvent) => {
  if (isAnimating) return

  const touchEndY = e.touches[0].clientY
  const diffY = touchStartY - touchEndY

  if (activeSection.value === 0 && diffY > 30) {
    goToSection(1)
  } else if (activeSection.value === 1) {
    const scrollEl = document.querySelector('.section-projects')
    if (scrollEl) {
      const isAtTop = scrollEl.scrollTop <= 0
      const isAtBottom = Math.ceil(scrollEl.scrollTop + scrollEl.clientHeight) >= scrollEl.scrollHeight - 5

      if (isAtTop && diffY < -30) {
        goToSection(0)
      } else if (isAtBottom && diffY > TOUCH_OVERSCROLL_THRESHOLD) {
        goToSection(2)
      }
    }
  } else if (activeSection.value === 2) {
    const scrollEl = document.querySelector('.section-badges')
    if (scrollEl && scrollEl.scrollTop <= 0 && diffY < -30) {
      goToSection(1)
    }
  }
}

onMounted(() => {
  fetchOtoringData()

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

watch(filteredProjects, () => {
  nextTick(() => {
    document.querySelectorAll('.project-card-wrapper').forEach(el => {
      observer.value?.observe(el)
    })
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
  height: 300vh;
  display: flex;
  flex-direction: column;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
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
  margin-bottom: 16px;
  justify-content: center;
  width: 100%;
}

.profile-avatar {
  width: 210px;
  height: 210px;
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
  color: var(--text-primary);
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  line-height: 1.1;
  letter-spacing: -0.5px;
  text-align: center;
  margin-top: -28px;
  position: relative;
  z-index: 2;
}

.expand-profile-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  padding: 6px 16px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 9999px;
  color: var(--text-primary);
  font-family: Comfortaa, serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.25s ease;
  user-select: none;
  position: relative;
  z-index: 2;
}

.expand-profile-btn:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-hover);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow);
}

.expand-arrow {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.expand-arrow.rotated {
  transform: rotate(180deg);
}

.about-card {
  width: 100%;
  max-width: 440px;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  color: var(--text-primary);
  text-align: left;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.about-card-section {
  margin-bottom: 14px;
}
.about-card-section:last-child {
  margin-bottom: 0;
}

.about-card-subtitle {
  font-family: Comfortaa, serif;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.9;
}

.about-card-text {
  font-size: 12.5px;
  color: var(--text-secondary);
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.about-card-text p {
  margin: 0;
}

.skillset-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.expand-card-enter-active,
.expand-card-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 600px;
  opacity: 1;
  overflow: hidden;
}

.expand-card-enter-from,
.expand-card-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
  border-color: transparent;
  transform: translateY(-8px);
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
  color: var(--social-icon-color);
  text-decoration: none;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
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
  background: var(--glass-bg-hover);
  transform: translateY(-2px) scale(1.05);
  box-shadow: var(--glass-shadow);
  border-color: var(--glass-border-hover);
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
  background: var(--glass-bg) !important;
  border: 1px solid var(--glass-border) !important;
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
  background: var(--glass-bg-hover) !important;
  border-color: var(--glass-border-hover) !important;
  box-shadow: var(--glass-shadow) !important;
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
  border: 2px solid var(--mouse-border);
  border-radius: 11px;
  position: relative;
}

.wheel {
  width: 4px;
  height: 8px;
  background-color: var(--mouse-wheel);
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
  color: var(--text-primary);
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
  gap: 20px;
  margin-bottom: 32px;
  flex-shrink: 0;
}

.year-filter-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.year-filter-btn {
  padding: 6px 16px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 9999px;
  color: var(--text-secondary);
  font-family: Comfortaa, serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.22s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.year-filter-btn:hover {
  background: var(--glass-bg-hover);
  color: var(--text-primary);
  border-color: var(--glass-border-hover);
}

.year-filter-btn.active {
  background: var(--btn-active-bg);
  color: var(--btn-active-color);
  border-color: var(--btn-active-border);
  font-weight: 700;
}

.status-filter-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.status-filter-btn {
  padding: 6px 16px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 9999px;
  color: var(--text-secondary);
  font-family: Comfortaa, serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.22s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.status-filter-btn:hover {
  background: var(--glass-bg-hover);
  color: var(--text-primary);
  border-color: var(--glass-border-hover);
}

.status-filter-btn.status-archived.active {
  background: #eab308;
  color: #1a1400;
  border-color: #eab308;
}

.status-filter-btn.status-frozen.active {
  background: #38bdf8;
  color: #052a3d;
  border-color: #38bdf8;
}

.status-filter-btn.status-active.active {
  background: #22c55e;
  color: #052e16;
  border-color: #22c55e;
}

.hide-projects-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 9999px;
  color: var(--text-secondary);
  font-family: Comfortaa, serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.22s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.hide-projects-btn:hover {
  background: var(--glass-bg-hover);
  color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow);
  border-color: var(--glass-border-hover);
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
  color: var(--text-primary);
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
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
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  color: var(--text-primary);
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
  box-shadow: var(--card-shadow-hover);
  border-color: var(--glass-border-hover);
  background: var(--card-bg-hover);
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
  background: var(--card-shine);
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
  background: var(--tag-bg);
  flex-shrink: 0;
}

.project-card-title-block {
  min-width: 0;
}

.project-card-title {
  font-family: Comfortaa, serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-card-domain {
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.project-card-desc {
  font-size: 12.5px;
  color: var(--text-secondary);
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
  background: var(--tag-bg);
  padding: 1px 6px;
  border-radius: 4px;
  color: var(--tag-color);
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

.project-card-badges {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.project-badge-archived {
  font-size: 10px;
  font-weight: 700;
  color: #1a1400;
  background: #eab308;
  padding: 2px 8px;
  border-radius: 6px;
  letter-spacing: 0.2px;
}

.project-badge-frozen {
  font-size: 10px;
  font-weight: 700;
  color: #052a3d;
  background: #38bdf8;
  padding: 2px 8px;
  border-radius: 6px;
  letter-spacing: 0.2px;
}

.project-badge-active {
  font-size: 10px;
  font-weight: 700;
  color: #052e16;
  background: #22c55e;
  padding: 2px 8px;
  border-radius: 6px;
  letter-spacing: 0.2px;
}

.project-card-year {
  font-size: 11px;
  color: var(--badge-year-color);
  background: var(--badge-year-bg);
  padding: 2px 8px;
  border-radius: 6px;
}

.project-card-arrow {
  font-size: 18px;
  color: var(--text-muted);
  transition: transform 0.22s ease;
}

.project-card:hover .project-card-arrow {
  transform: translateX(4px);
  color: var(--text-primary);
}

.section-badges {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.section-badges::-webkit-scrollbar {
  display: none;
}

.badges-content {
  width: 100%;
  max-width: 1000px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.badges-header-row {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.back-projects-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 9999px;
  color: var(--text-secondary);
  font-family: Comfortaa, serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.22s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.back-projects-btn:hover {
  background: var(--glass-bg-hover);
  color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow);
  border-color: var(--glass-border-hover);
}

.back-projects-btn:hover .up-arrow-icon {
  transform: translateY(-2px);
}

.otoring-panel {
  width: 100%;
  max-width: 860px;
  padding: 16px 24px;
  margin-bottom: 20px;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.otoring-center-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-primary);
  transition: transform 0.25s ease, opacity 0.25s ease;
  user-select: none;
}

.otoring-center-logo:hover {
  transform: scale(1.06);
}

.otoring-title {
  font-family: Comfortaa, serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #a855f7, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.otoring-sub {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: -2px;
}

.otoring-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 9999px;
  color: var(--text-secondary);
  font-family: Comfortaa, serif;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.22s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  white-space: nowrap;
}

.otoring-btn:hover {
  background: var(--glass-bg-hover);
  color: var(--text-primary);
  border-color: var(--glass-border-hover);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow);
}

.otoring-favicon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
}

.badges-panel {
  width: 100%;
  max-width: 860px;
  padding: 24px;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.badges-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.badge-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.2s ease, opacity 0.2s ease;
  border-radius: 2px;
}

.badge-item:hover {
  transform: scale(1.08);
  z-index: 2;
}

.badge-item-static {
  cursor: default;
}

.badge-88x31-img {
  width: 88px;
  height: 31px;
  object-fit: contain;
  image-rendering: pixelated;
  display: block;
}

.badges-empty-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
  color: var(--text-muted);
  font-family: Comfortaa, serif;
  font-size: 13px;
}

.our-badge-panel {
  width: 100%;
  max-width: 860px;
  margin-top: 20px;
  padding: 18px 24px;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.our-badge-title {
  font-family: Comfortaa, serif;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.copy-badge-code-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 9999px;
  color: var(--text-primary);
  font-family: Comfortaa, serif;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.22s ease;
}

.copy-badge-code-btn:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-hover);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow);
}

.badge-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  padding: 8px 18px;
  border-radius: 9999px;
  font-family: Comfortaa, serif;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--glass-shadow);
  z-index: 2000;
  pointer-events: none;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 15px);
}

@media (max-width: 520px) {
  .projects-title {
    font-size: 26px;
  }

  .project-card {
    padding: 16px;
  }

  .otoring-panel {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }

  .otoring-btn {
    width: 100%;
    justify-content: center;
  }

  .badges-panel {
    padding: 16px;
  }

  .our-badge-panel {
    padding: 16px;
  }
}
</style>