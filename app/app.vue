<template>
  <div class="app">
    <header class="header" v-if="$route.path !== '/'">
      <div class="left-side">
        <a href="/" class="logo" aria-label="Home">
          <img src="/3d.png?ver=leto" alt="Logo" />
        </a>

        <div class="widgets-column">
          <SpotifyMiniPlayer />
          <WeatherMini />
        </div>
      </div>
      <div class="social-buttons">
        <a href="https://github.com/TheNightlyGod" target="_blank" class="social-btn" aria-label="GitHub">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>

        <a href="https://t.me/lukioff" target="_blank" class="social-btn" aria-label="Telegram">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </a>

        <a :href="randomReferral.href" target="_blank" class="social-btn" aria-label="Referral">
          <img :src="randomReferral.ico" alt="Referral" />
        </a>
      </div>
    </header>

    <main class="content">
      <NuxtPage />
    </main>


  </div>
</template>

<script setup lang="ts">
const referrals = [
  { href: 'https://lukiuwu.xyz/p2g',  ico: '/iconp2g.ico' },
  { href: 'https://lukiuwu.xyz/p2gs', ico: '/iconp2gs.ico' },
  { href: 'https://lukiuwu.xyz/fh',   ico: '/iconfh.ico' },
  { href: 'https://lukiuwu.xyz/mjrp', ico: 'https://majestic-rp.ru/favicon.ico' },
]

const randomReferral = referrals[Math.floor(Math.random() * referrals.length)]
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

html, body {
  -ms-overflow-style: none;
  scrollbar-width: none;
  font-family: 'Comfortaa', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
}

* {
  scrollbar-width: none;
}
*::-webkit-scrollbar {
  display: none;
}
</style>

<style scoped>
.app {
  background: url("/back.png?ver=leto") center top / cover no-repeat fixed;
  min-height: 100vh;
  width: 100%;
}

.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  pointer-events: none;
}

.logo {
  display: flex;
  align-items: center;
  pointer-events: auto;
}

.logo img {
  width: 36px;
  height: 36px;
  border-radius: 8px;
}

.social-buttons {
  display: flex;
  gap: 12px;
  pointer-events: auto;
  justify-content: flex-end;
}

.left-side {
  display: flex;
  align-items: center;
  gap: 16px;
}

.widgets-column {
  display: flex;
  align-items: center;
  gap: 12px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: #000000;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.22s ease;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 9999px;
}

.social-btn img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 14px rgba(255, 255, 255, 0.18);
}

.social-btn:active {
  transform: translateY(0) scale(0.98);
}

.social-btn svg {
  width: 22px;
  height: 22px;
  transition: transform 0.3s ease;
}

.social-btn:hover svg {
  transform: scale(1.1);
}

.content {
  position: relative;
  min-height: 100vh;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
  }

  50% {
    box-shadow: 0 8px 30px rgba(255, 215, 0, 0.6);
  }
}

@media (max-width: 768px) {
  .header {
    padding: 15px 20px;
    align-items: flex-start;
  }

  .left-side {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .widgets-column {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    transform: scale(0.85);
    transform-origin: left top;
  }

  .social-buttons {
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
    padding-right: 5px;
  }

  .social-btn {
    width: 44px;
    height: 44px;
  }

  .social-btn svg {
    width: 20px;
    height: 20px;
  }

  .logo img {
    width: 40px;
    height: 40px;
  }
}
</style>