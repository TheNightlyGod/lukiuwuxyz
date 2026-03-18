<template>
  <div class="main">
    <section class="hero-section">
      <a class="title">TheNightlyGod</a>
      <div class="avatar-container">
        <img src="/3d.png?ver=vesna" alt="Avatar" class="avatar" />
      </div>
    </section>

    <section id="projects" class="projects-section">
      <h2 class="projects-title">My Projects</h2>
      <div class="projects-grid">
        <div
          v-for="(p, i) in projects"
          :key="i"
          class="project-card"
          :class="{ 'single-card': projects.length % 2 !== 0 && i === projects.length - 1 }"
          @pointermove="handleTiltPointerMove($event)"
          @pointerleave="resetTiltCard($event)"
        >
          <div class="card-shine"></div>
          <div class="card-content">
            <div class="project-top">
              <div class="project-header">
                <div class="project-icon">
                  <img :src="p.image" :alt="p.title" class="project-image" />
                </div>
                <div class="project-title-block">
                  <h3 class="project-title">{{ p.title }}</h3>
                  <div class="project-domain">{{ p.domain }}</div>
                </div>
                <div class="project-year">{{ p.year }}</div>
              </div>
              <p class="project-description">{{ p.description }}</p>
            </div>
            <div class="project-bottom">
              <div class="project-languages">
                <span v-for="tag in p.tags" :key="tag.name" class="language-tag">
                  <Icon :name="tag.icon" class="language-icon" />
                  {{ tag.name }}
                </span>
              </div>
              <a :href="p.link" class="view-button">
                View <span class="arrow-icon">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="skills" class="skills-section">
      <div class="section-content">
        <h2 class="section-title">My skillset.</h2>
        <div class="skills-grid" :class="{ 'two-up': skills.length % 2 !== 0 }">
          <div
            v-for="(s, i) in skills"
            :key="s.title"
            class="skill-card"
            :class="{ 'single-card': skills.length % 2 !== 0 && i === skills.length - 1 }"
            @pointermove="handleTiltPointerMove($event)"
            @pointerleave="resetTiltCard($event)"
          >
            <div class="card-shine"></div>
            <div class="card-content">
              <div class="skill-top">
                <h3 class="skill-category-title">{{ s.title }}</h3>
                <p class="skill-description">{{ s.description }}</p>
              </div>
              <div class="skill-langs">
                <a
                  v-for="tag in s.tags"
                  :key="tag.name"
                  :href="tag.link"
                  class="skill-tag"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon :name="tag.icon" class="skill-icon" />
                  {{ tag.name }}
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
const projects = [
  {
    title: 'MSBT',
    domain: 'MultiSavesBackupTool',
    description: 'A tool for backing up game saves with support for multiple games and automatic scheduling.',
    tags: [
      { name: 'С#', icon: 'teenyicons:c-sharp-solid' },
      { name: 'Avalonia', icon: 'simple-icons:avaloniaui' }
    ],
    year: '2025',
    image: 'https://github.com/MultiSavesBackupTool/MSBT/blob/master/msbt_logo.png?raw=true',
    link: 'https://github.com/MultiSavesBackupTool/MSBT'
  },
  {
    title: 'aub64con',
    domain: 'ASCII-Unicode-Base64-and-Binary-convertor',
    description: 'ASCII, Unicode Base64 and Binary convertor!',
    tags: [
      { name: 'Python', icon: 'mdi:language-python' }
    ],
    year: '2025',
    image: '/404-error.png',
    link: 'https://github.com/TheNightlyGod/aub64con'
  },
  {
    title: 'lukiuwuxyz',
    domain: 'lukiuwu.xyz',
    description: 'yee luki site...',
    tags: [
      { name: 'TypeScript', icon: 'bxl:typescript' },
      { name: 'Nuxt', icon: 'mdi:nuxt' },
      { name: 'Vue', icon: 'bxl:vuejs' }
    ],
    year: '2025',
    image: '/avatar.png',
    link: 'https://github.com/TheNightlyGod/lukiuwuxyz'
  }
]

const skills = [
  {
    title: 'Frontend development',
    description:
      'Building responsive, accessible and performant user interfaces, component-driven architecture and state management.',
    tags: [
      { name: 'HTML', icon: 'mdi:language-html5', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { name: 'CSS', icon: 'mdi:language-css3', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
      { name: 'TypeScript', icon: 'bxl:typescript', link: 'https://www.typescriptlang.org/' },
      { name: 'Vue', icon: 'bxl:vuejs', link: 'https://vuejs.org/' },
      { name: 'Nuxt', icon: 'mdi:nuxt', link: 'https://nuxt.com/' },
      { name: 'Tailwind', icon: 'mdi:tailwind', link: 'https://tailwindcss.com/' }
    ]
  },
  {
    title: 'Backend development',
    description:
      'Designing APIs, services and data models; implementing authentication, validation and business logic; optimizing for reliability and scale.',
    tags: [
      { name: 'Node', icon: 'bxl:nodejs', link: 'https://nodejs.org/' },
      { name: 'Python (Flask / FastAPI)', icon: 'mdi:language-python', link: 'https://www.python.org/' },
      { name: 'TypeScript', icon: 'bxl:typescript', link: 'https://www.typescriptlang.org/' },
      { name: 'C# (.NET)', icon: 'teenyicons:c-sharp-solid', link: 'https://learn.microsoft.com/dotnet/csharp' },
      { name: 'C++', icon: 'simple-icons:cplusplus', link: 'https://isocpp.org/' },
      { name: 'Databases (Postgres / MySQL / MongoDB)', icon: 'mdi:database', link: 'https://www.postgresql.org/' }
    ]
  },
  {
    title: 'Environment and CI/CD',
    description:
      'Automating builds, tests and deployments; configuring environments and ensuring smooth developer workflows.',
    tags: [
      { name: 'Docker', icon: 'simple-icons:docker', link: 'https://www.docker.com/' },
      { name: 'Nginx', icon: 'cib:nginx', link: 'https://nginx.org/' },
      { name: 'GitHub', icon: 'mdi:github', link: 'https://github.com/' },
      { name: 'Caddy', icon: 'simple-icons:caddy', link: 'https://caddyserver.com/' }
    ]
  }
]

type TiltVars = { rx: number; ry: number; shineX: number; shineY: number; scale: number }

const MAX_TILT_DEG = 8

// Обновляем только CSS-переменные у конкретной карточки, минуя Vue-реактивность.
// target - куда стремимся (меняется на pointermove), current - фактическое значение (плавно "догоняет" target).
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
const TILT_LERP = 0.2
const TILT_EPS = 0.05 // deg
const SHINE_EPS = 0.2 // percent

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

    // Пока мышь "на карточке" — продолжаем анимацию, иначе отпускаем когда догнали target.
    if (el.classList.contains('is-hovering') || !isCloseToTarget(el)) {
      rafByEl.set(el, window.requestAnimationFrame(tick))
      return
    }

    // Дотягиваем до точного target, чтобы не было микродрожи.
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

  // На время наведения кэшируем геометрию, чтобы не дергать layout на каждом mousemove.
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
</script>

<style scoped>
.main {
  scroll-behavior: smooth;
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding-left: 300px;
  padding-right: 100px;
}

.title {
  font-family: Comfortaa, serif;
  font-size: 64px;
  cursor: default;
  animation: fadeIn 0.6s ease-in-out;
}

.avatar-container {
  max-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
}

.avatar {
  max-height: 80vh;
  max-width: 100%;
  height: auto;
  width: auto;
  object-fit: contain;
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skills-section {
  min-height: 25vh;
  padding: 100px 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skills-section .section-content {
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
}

.skills-section .section-title {
  text-align: center;
  margin-bottom: 20px;
}

.section-title {
  font-family: Comfortaa, serif;
  font-size: 42px;
  margin: 0;
}

.skill-category-title {
  font-family: Comfortaa, serif;
  font-size: 20px;
  margin: 0 0 8px 0;
}

.skill-description {
  margin: 0 0 12px 0;
  color: rgba(0,0,0,0.7);
  font-family: Comfortaa, serif;
}

.skill-langs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  font-size: 13px;
  color: #000;
  background: rgba(0, 0, 0, 0.08);
  padding: 6px 10px;
  border-radius: 8px;
  font-family: Comfortaa, serif;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.skill-icon {
  width: 16px;
  height: 16px;
}

.projects-section {
  min-height: 25vh;
  padding: 100px 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.projects-title {
  text-align: center;
  font-family: Comfortaa, serif;
  font-size: 42px;
  line-height: 1.5;
  margin-bottom: 40px;
}

.projects-grid {
  display: flex;
  gap: 28px;
  width: 100%;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
}

.projects-grid .project-card.single-card {
  flex: 0 1 calc(50% - 20px);
  max-width: calc(50% - 20px);
  margin: 0 auto;
}

@media (max-width: 900px) {
  .project-card {
    flex: 1 1 calc(100% - 14px);
    max-width: 100%;
    min-width: 0;
  }
}

@media (max-width: 520px) {
  .project-card {
    flex: 1 1 100%;
    max-width: 100%;
  }
}

.skill-card {
  height: 260px;
}

.project-card {
  flex: 1 1 calc(50% - 20px);
  min-width: 400px;
  max-width: calc(50% - 20px);
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 28px;
  background: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #000;
  height: 280px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  will-change: transform;

  /* Значения для tilt/shine. Меняются через JS (CSS variables). */
  --rx: 0deg;
  --ry: 0deg;
  --shineX: 50%;
  --shineY: 50%;
  --card-scale: 1;
  box-shadow: 0 18px 45px rgba(0,0,0,0.18);
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) scale(var(--card-scale));
}

.project-card.single-card {
  flex: 0 1 calc(50% - 20px);
  margin: 0 auto;
}

.project-card.is-hovering {
  box-shadow: 0 30px 60px rgba(0,0,0,0.28);
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
    400px 180px at var(--shineX) var(--shineY),
    rgba(255,255,255,0.12),
    rgba(255,255,255,0.02),
    transparent 40%
  );
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.project-top {
  flex: 1;
}

.project-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.project-icon {
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

.project-image {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.project-title-block {
  flex: 1;
}

.project-title {
  font-family: Comfortaa, serif;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #000;
  line-height: 1.2;
}

.project-domain {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  font-family: Comfortaa, serif;
}

.project-year {
  background: rgba(0, 0, 0, 0.1);
  color: #000;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 8px;
  white-space: nowrap;
  align-self: flex-start;
  backdrop-filter: blur(4px);
  font-family: Comfortaa, serif;
}

.project-description {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.75);
  margin: 0 0 16px 0;
  font-family: Comfortaa, serif;
}

.project-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: 16px;
}

.project-languages {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.language-tag {
  font-size: 13px;
  color: #000;
  background: rgba(0, 0, 0, 0.08);
  padding: 4px 10px;
  border-radius: 8px;
  font-family: Comfortaa, serif;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
}

.language-icon {
  width: 16px;
  height: 16px;
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

.skills-grid {
  display: flex;
  gap: 28px;
  width: 100%;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
}

.skill-card {
  flex: 1 1 calc(33.333% - 18px);
  min-width: 240px;
  max-width: calc(33.333% - 18px);
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 28px;
  background: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #000;
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  will-change: transform;

  /* Значения для tilt/shine. Меняются через JS (CSS variables). */
  --rx: 0deg;
  --ry: 0deg;
  --shineX: 50%;
  --shineY: 50%;
  --card-scale: 1;
  box-shadow: 0 18px 45px rgba(0,0,0,0.18);
  transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) scale(var(--card-scale));
}

.skill-card.is-hovering {
  box-shadow: 0 30px 60px rgba(0,0,0,0.28);
}

.project-card.is-hovering .card-shine,
.skill-card.is-hovering .card-shine {
  opacity: 0.95;
}

.skill-card.single-card {
  flex: 0 1 calc(50% - 20px);
  max-width: calc(50% - 20px);
  margin: 0 auto;
}

.skills-grid.two-up .skill-card {
  flex: 0 1 calc(50% - 20px);
  max-width: calc(50% - 20px);
}
@media (max-width: 900px) {
  .skill-card {
    flex: 1 1 calc(50% - 14px);
    max-width: calc(50% - 14px);
  }
}
@media (max-width: 520px) {
  .skill-card {
    flex: 1 1 100%;
    max-width: 100%;
  }
}

.skill-icon, .language-icon {
  width: 18px;
  height: 18px;
  display: inline-block;
}
@media (max-width: 1024px) {
  .hero-section,
  .projects-section,
  .skills-section {
    padding: 80px 100px;
  }

  .title {
    font-size: 48px;
  }

  .section-title {
    font-size: 36px;
  }

  .projects-title {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    padding: 60px 40px;
    justify-content: center;
    gap: 24px;
  }

  .projects-section,
  .skills-section {
    padding: 60px 40px;
  }

  .title {
    font-size: 28px;
    margin-top: 8vh;
  }

  .section-title {
    font-size: 28px;
  }

  .skills-section .section-content {
    gap: 16px;
  }

  .skills-section .section-title {
    margin-bottom: 12px;
  }

  .projects-title {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .projects-grid,
  .skills-grid {
    gap: 16px;
  }

  .project-card {
    padding: 24px;
    height: auto;
    min-width: 0;
    max-width: 100%;
    flex: 1 1 100%;
  }

  .skill-card {
    padding: 24px;
    height: auto;
    max-width: 100%;
    flex: 1 1 100%;
  }

  .project-title {
    font-size: 20px;
  }

  .project-description {
    font-size: 15px;
  }

  .view-button {
    padding: 10px 18px;
  }

  .skills-grid.two-up .skill-card,
  .skill-card.single-card {
    max-width: 100%;
    flex: 1 1 100%;
  }

  .skill-category-title {
    font-size: 22px;
  }

  .project-header {
    display: grid;
    grid-template-columns: 48px 1fr auto;
    align-items: center;
    gap: 12px;
  }

  .project-icon {
    grid-column: 1;
  }

  .project-title-block {
    grid-column: 2;
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }

  .project-domain {
    flex-basis: 100%;
  }

  .project-year {
    grid-column: 3;
    align-self: center;
    margin: 0;
  }

  .projects-grid .project-card.single-card {
    flex: 1 1 100%;
    max-width: 100%;
    margin: 0;
  }
}

@media (max-width: 480px) {
  .projects-section,
  .skills-section {
    padding: 40px 20px;
  }

  .projects-grid,
  .skills-grid {
    gap: 12px;
  }

  .title {
    font-size: 24px;
    margin-top: 10vh;
  }

  .section-title {
    font-size: 24px;
  }

  .skills-section .section-content {
    gap: 12px;
  }

  .skills-section .section-title {
    margin-bottom: 10px;
  }

  .projects-title {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .project-card,
  .skill-card {
    padding: 22px;
  }
}
</style>