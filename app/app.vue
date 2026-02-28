<template>
  <div class="app">
    <header class="header">
      <a href="/" class="logo" aria-label="Home">
        <img src="/avatar.png" alt="Logo" />
      </a>
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

        <a href="/pay" class="social-btn" aria-label="Pay">
          <svg xmlns="http://www.w3.org/2000/svg" height="800px" width="800px" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
            <path d="M209.049,229.649c28.031,0,40.607,15.711,45.555,24.939c0.622,1.158,2.308,1.157,2.928-0.003  c4.931-9.228,17.438-24.937,45.467-24.937c31.928,0,60.015,21.796,60.015,61.596c0,16.106-3.282,29.902-12.392,45.3  c-18.564,31.379-79.718,72.058-92.279,80.073c-1.388,0.886-3.148,0.889-4.539,0.006c-12.572-7.977-73.738-48.454-92.446-80.079  c-9.109-15.398-12.368-29.195-12.368-45.3C148.988,251.446,177.121,229.649,209.049,229.649z"/>
            <g>
              <path d="M256.068,432.023c-3.599,0-7.11-1.02-10.155-2.95c-7.698-4.884-75.774-48.737-97.24-85.022   c-9.974-16.857-14.421-33.144-14.421-52.804c0-22.895,7.838-42.408,22.669-56.431c13.572-12.834,32.085-19.902,52.128-19.902   c22.756,0,37.668,8.65,47.004,17.599c9.318-8.95,24.208-17.599,46.944-17.599c20.043,0,38.548,7.069,52.11,19.906   c14.812,14.02,22.64,33.532,22.64,56.427c0,19.634-4.453,35.919-14.445,52.804c-21.312,36.027-89.348,80.088-97.036,84.994   C263.212,430.993,259.686,432.023,256.068,432.023z M209.049,244.385c-22.56,0-45.324,14.489-45.324,46.86   c0,14.463,2.987,25.415,10.314,37.797c13.549,22.904,56.715,54.847,82.012,71.489c25.291-16.72,68.436-48.753,81.886-71.489   c7.342-12.411,10.338-23.362,10.338-37.797c0-32.371-22.742-46.86-45.278-46.86c-19.265,0-28.29,9.324-32.468,17.145   c-2.86,5.346-8.401,8.662-14.463,8.662c-6.052,0-11.59-3.31-14.449-8.636C237.417,253.721,228.358,244.385,209.049,244.385z"/>
              <path d="M319.813,122.301c-5.17,0-10.186-2.726-12.883-7.561c-3.964-7.109-1.416-16.085,5.691-20.048   l48.69-27.155c7.107-3.963,16.084-1.416,20.048,5.691c3.964,7.107,1.416,16.085-5.691,20.048l-48.69,27.155   C324.705,121.7,322.243,122.301,319.813,122.301z"/>
              <path d="M372.442,140.885c-1.332,0-2.686-0.183-4.032-0.564l-53.633-15.227   c-7.83-2.222-12.373-10.372-10.152-18.201c2.225-7.828,10.373-12.373,18.203-10.151l53.633,15.227   c7.83,2.222,12.373,10.372,10.152,18.201C384.769,136.653,378.864,140.885,372.442,140.885z"/>
              <path d="M256,512c-105.672,0-191.643-85.971-191.643-191.643c0-44.704,16.691-89.804,49.609-134.048   c21.944-29.494,48.145-54.403,70.388-72.917L165.43,55.556c-4.272-13.06-2.097-26.928,5.968-38.052   C179.462,6.379,191.966,0,205.705,0h100.589c13.739,0,26.245,6.379,34.307,17.503c8.065,11.123,10.241,24.992,5.968,38.052   l-19.445,59.429c-2.53,7.737-10.861,11.954-18.587,9.424c-7.735-2.532-11.954-10.854-9.424-18.589l19.445-59.429   c1.3-3.976,0.638-8.198-1.817-11.586c-2.457-3.386-6.263-5.329-10.447-5.329H205.705c-4.184,0-7.99,1.942-10.447,5.329   c-2.455,3.388-3.117,7.611-1.817,11.587l16.123,49.275h2.219c6.326,0,11.947,4.038,13.967,10.034   c2.019,5.995-0.015,12.612-5.053,16.437C173.317,158.126,93.83,231.734,93.83,320.357c0,89.421,72.749,162.169,162.17,162.169   s162.169-72.749,162.169-162.169c0-37.556-13.773-75.748-40.933-113.514c-4.753-6.608-3.248-15.815,3.358-20.568   c6.608-4.754,15.818-3.246,20.568,3.358c30.842,42.882,46.479,86.864,46.479,130.723C447.643,426.029,361.672,512,256,512z"/>
              <path d="M311.148,125.138h-99.363c-8.138,0-14.737-6.598-14.737-14.737s6.599-14.737,14.737-14.737h99.363   c8.138,0,14.737,6.598,14.737,14.737S319.287,125.138,311.148,125.138z"/>
            </g>
          </svg>
        </a>
      </div>
    </header>

    <main class="content">
      <NuxtPage />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p class="footer-line">Made with love :3 using Nuxt and Vue.</p>
        <p class="footer-line">Copyright © 2025 lukiuwu. All rights reserved. No copying or editing allowed.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const referrals = [
  { href: 'https://lukiuwu.xyz/p2g',  ico: '/p2gicon.ico' },
  { href: 'https://lukiuwu.xyz/p2gs', ico: '/p2gsicon.ico' },
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
  background: url("/back.png?ver=vesna") center top / cover no-repeat fixed;
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

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.13);
  border-radius: 50%;
  color: #000000;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-btn img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.45);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
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

.footer {
  width: 100%;
  padding: 28px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-content {
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  text-align: center;
  color: #000;
}

.footer-line {
  font-family: Comfortaa, serif;
  font-size: 14px;
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

  .social-buttons {
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }

  .social-btn {
    width: 44px;
    height: 44px;
  }

  .social-btn svg {
    width: 20px;
    height: 20px;
  }

  .footer {
    padding: 20px;
  }

  .footer-line {
    font-size: 13px;
  }
}
</style>