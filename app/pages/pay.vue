<script setup lang="ts">
import { ref, computed } from 'vue'

type Region = 'ru' | 'other' | null
type Step = 'region' | 'form' | 'currency' | 'qr' | 'success' | 'failed'
type Method = 'cloudtips' | 'crypto'

const step = ref<Step>('region')
const region = ref<Region>(null)
const method = computed<Method>(() => region.value === 'ru' ? 'cloudtips' : 'crypto')
const activeMethod = ref<'tpay' | 'sbp' | 'cryptobot' | 'rocket' | 'nowpayments' | 'stars' | null>(null)

const name = ref('')
const comment = ref('')
const amount = ref('')

const qrImageBase64 = ref('')
const qrFallbackUrl = ref('')
const universalLinkUrl = ref('')
const deviceInfo = ref<{
  browser: string
  os: string
  type: number
  webview: boolean
}>({
  browser: 'Unknown',
  os: 'Unknown',
  type: 3,
  webview: false
})

const transactionId = ref<number | string | null>(null)
const loading = ref(false)
const error = ref('')

const payCurrency = ref('ton')
const rocketCurrency = ref('USDT')
const cryptoPayAmount = ref<number | null>(null)
const cryptoPayCurrency = ref('')

const currencies = [
  { id: 'ton', label: 'TON', icon: '💎' },
  { id: 'btc', label: 'Bitcoin', icon: '₿' },
  { id: 'eth', label: 'Ethereum', icon: '⟠' },
  { id: 'ltc', label: 'Litecoin', icon: '🪙' },
]
const rocketCurrencies = [
  { id: 'USDT', label: 'USDT', icon: '💵' },
  { id: 'TONCOIN', label: 'TON', icon: '💎' },
  { id: 'BTC', label: 'Bitcoin', icon: '₿' },
  { id: 'ETH', label: 'Ethereum', icon: '⟠' },
  { id: 'NOT', label: 'Notcoin', icon: '🔔' },
]

const MAX_POLL_ATTEMPTS = 60
let pollAttempts = 0
const CRYPTO_POLL_INTERVAL_MS = 4_000
let pollTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  detectDevice()
})

function detectDevice() {
  const ua = navigator.userAgent.toLowerCase()
  const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)

  deviceInfo.value.type = isMobile ? 2 : 3
  deviceInfo.value.webview = /; wv\) |webview/i.test(ua)

  if (navigator.userAgentData) {
    const hints = navigator.userAgentData
    deviceInfo.value.os = hints.platform || 'Unknown'
    deviceInfo.value.type = hints.mobile ? 2 : 3

    const brands = hints.brands || []
    const chrome = brands.find(b => b.brand === 'Google Chrome' || b.brand === 'Chromium')
    const edge   = brands.find(b => b.brand === 'Microsoft Edge' || b.brand.includes('Edge'))

    if (edge)        deviceInfo.value.browser = 'Edge'
    else if (chrome) deviceInfo.value.browser = 'Chrome'
    else if (brands.length) deviceInfo.value.browser = brands[0].brand || 'Unknown'
  } else {
    if (/edg\//.test(ua))        deviceInfo.value.browser = 'Edge'
    else if (/chrome\//.test(ua))  deviceInfo.value.browser = 'Chrome'
    else if (/firefox\//.test(ua)) deviceInfo.value.browser = 'Firefox'
    else if (/safari\//.test(ua))  deviceInfo.value.browser = 'Safari'
    else if (/opr\//.test(ua))     deviceInfo.value.browser = 'Opera'

    if (/windows/.test(ua))                 deviceInfo.value.os = 'Windows'
    else if (/mac os x|macintosh/.test(ua)) deviceInfo.value.os = 'macOS'
    else if (/android/.test(ua))            deviceInfo.value.os = 'Android'
    else if (/iphone|ipad|ipod/.test(ua))   deviceInfo.value.os = 'iOS'
    else if (/linux/.test(ua))              deviceInfo.value.os = 'Linux'
  }
}

function selectRegion(r: Region) {
  region.value = r
  step.value = 'form'
}

function goBack() {
  stopPolling()
  if (step.value === 'form') {
    step.value = 'region'
    region.value = null
  } else if (step.value === 'currency') {
    step.value = 'form'
  } else if (step.value === 'qr') {
    step.value = 'form'
  } else if (step.value === 'failed') {
    step.value = 'form'
  }
  error.value = ''
}

function restart() {
  stopPolling()
  step.value = 'region'
  region.value = null
  name.value = ''
  comment.value = ''
  amount.value = ''
  qrImageBase64.value = ''
  qrFallbackUrl.value = ''
  universalLinkUrl.value = ''
  transactionId.value = null
  error.value = ''
  payCurrency.value = 'ton'
  cryptoPayAmount.value = null
  cryptoPayCurrency.value = ''
}

function stopPolling() {
  if (pollTimer) {
    clearTimeout(pollTimer)
    pollTimer = null
  }
}

async function createBankPayment() {
  const amountVal = parseFloat(amount.value)
  if (!amountVal || amountVal <= 0) throw new Error('Введите корректную сумму')
  if (amountVal < 49) throw new Error('Минимальная сумма для доната — 49 ₽')

  const res = await $fetch<any>(`/api/${activeMethod.value}/pay`, {
    method: 'POST',
    body: {
      amount: amountVal,
      name: name.value || '',
      comment: comment.value || '',
      device: deviceInfo.value
    },
  })

  if (!res?.succeed) {
    throw new Error(res?.errors?.[0] || 'Ошибка создания платежа')
  }

  const data = res.data
  transactionId.value = data.transactionId

  const rawQr: string = data.qrImage || ''

  if (rawQr) {
    qrImageBase64.value = rawQr
    qrFallbackUrl.value = ''
  } else {
    qrImageBase64.value = ''
    qrFallbackUrl.value = ''
  }

  universalLinkUrl.value = data.universalLinkUrl || data.qrUrl || ''

  if (!qrImageBase64.value && !qrFallbackUrl.value && universalLinkUrl.value) {
    qrFallbackUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(universalLinkUrl.value)}`
  }
}

async function createCryptobotInvoice() {
  const amountVal = parseFloat(amount.value)
  if (!amountVal || amountVal <= 0) throw new Error('Введите корректную сумму')

  const res = await $fetch<any>('/api/cryptobot/invoice', {
    method: 'POST',
    body: {
      amount: amountVal,
      name: name.value || '',
      comment: comment.value || '',
    },
  })

  if (!res?.ok) throw new Error(res?.error?.name || 'Ошибка создания счёта')

  const invoice = res.result
  transactionId.value = invoice.invoice_id
  universalLinkUrl.value = invoice.pay_url || invoice.bot_invoice_url || ''

  qrImageBase64.value = ''
  qrFallbackUrl.value = universalLinkUrl.value
      ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(universalLinkUrl.value)}`
      : ''

  startPolling()
}

async function createNowpaymentsInvoice() {
  const amountVal = parseFloat(amount.value)
  if (!amountVal || amountVal <= 0) throw new Error('Введите корректную сумму')

  const res = await $fetch<any>('/api/nowpayments/invoice', {
    method: 'POST',
    body: { amount: amountVal, comment: comment.value || '', pay_currency: payCurrency.value },
  })

  transactionId.value = res.payment_id
  cryptoPayAmount.value = res.pay_amount
  cryptoPayCurrency.value = res.pay_currency?.toUpperCase() || ''

  universalLinkUrl.value = ''
  qrImageBase64.value = ''
  qrFallbackUrl.value = res.pay_address
      ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(res.pay_address)}`
      : ''

  startPolling()
}

async function createRocketInvoice() {
  const amountVal = parseFloat(amount.value)
  if (!amountVal || amountVal <= 0) throw new Error('Введите корректную сумму')

  const res = await $fetch<any>('/api/rocket/invoice', {
    method: 'POST',
    body: {
      amount: amountVal,
      currency: rocketCurrency.value,
      name: name.value || '',
      comment: comment.value || '',
    },
  })

  if (!res?.success) throw new Error('Ошибка создания счёта Rocket')

  const invoice = res.data
  transactionId.value = invoice.id
  universalLinkUrl.value = invoice.link || ''

  qrImageBase64.value = ''
  qrFallbackUrl.value = universalLinkUrl.value
      ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(universalLinkUrl.value)}`
      : ''
}

async function createStarsInvoice() {
  const amountVal = parseInt(amount.value)
  if (!amountVal || amountVal < 1) throw new Error('Минимум 1 Star')

  const res = await $fetch<any>('/api/stars/invoice', {
    method: 'POST',
    body: {
      amount: amountVal,
      name: name.value || '',
      comment: comment.value || '',
    },
  })

  transactionId.value = res.payload
  universalLinkUrl.value = res.invoice_link
  qrImageBase64.value = ''
  qrFallbackUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(res.invoice_link)}`
}

async function pollStatus() {
  if (pollAttempts++ > MAX_POLL_ATTEMPTS) {
    stopPolling()
    error.value = 'Время ожидания оплаты истекло'
    step.value = 'failed'
    return
  }

  try {
    let res
    if (method.value === 'cloudtips') {
      res = await $fetch<any>(`/api/sbp/status?transactionId=${transactionId.value}`)
      const status = res?.data?.status
      if (status === 2 || status?.toLowerCase() === 'success') {
        step.value = 'success'; stopPolling(); return
      }
      if (status === 3 || status?.toLowerCase() === 'failed') {
        step.value = 'failed'; stopPolling(); return
      }
    } else if (activeMethod.value === 'cryptobot') {
      res = await $fetch<any>(`/api/cryptobot/status?invoiceId=${transactionId.value}`)
      if (res?.ok && res.result?.items?.[0]?.status === 'paid') {
        step.value = 'success'; stopPolling(); return
      }
    } else if (activeMethod.value === 'nowpayments') {
      res = await $fetch<any>(`/api/nowpayments/status?paymentId=${transactionId.value}`)
      const status = res?.payment_status
      if (status === 'finished' || status === 'confirmed') {
        step.value = 'success'; stopPolling(); return
      }
      if (status === 'failed' || status === 'expired' || status === 'refunded') {
        step.value = 'failed'; stopPolling(); return
      }
    } else if (activeMethod.value === 'rocket') {
      res = await $fetch<any>(`/api/rocket/status?invoiceId=${transactionId.value}`)
      const status = res?.data?.status
      if (status === 'paid') {
        step.value = 'success';
        stopPolling();
        return
      }
      if (status === 'expired') {
        step.value = 'failed';
        stopPolling();
        return
      }
    } else if (activeMethod.value === 'stars') {
      res = await $fetch<any>(`/api/stars/status?payload=${transactionId.value}`)
      if (res?.status === 'paid') {
        step.value = 'success'; stopPolling(); return
      }
    }

    pollTimer = setTimeout(pollStatus, CRYPTO_POLL_INTERVAL_MS)
  } catch (err) {
    console.error('Polling error:', err)
    step.value = 'failed'
    stopPolling()
  }
}

function startPolling() {
  stopPolling()
  pollAttempts = 0
  pollTimer = setTimeout(pollStatus, 1000)
}

async function pay() {
  error.value = ''
  if (!amount.value || parseFloat(amount.value) <= 0) {
    error.value = 'Пожалуйста, укажите сумму'
    return
  }
  loading.value = true
  try {
    if (method.value === 'cloudtips') {
      await createBankPayment()
      step.value = 'qr'
      startPolling()
    } else if (activeMethod.value === 'cryptobot') {
      await createCryptobotInvoice()
      step.value = 'qr'
    } else if (activeMethod.value === 'stars') {
      await createStarsInvoice()
      step.value = 'qr'
    }
  } catch (e: any) {
    error.value = e.message || 'Произошла ошибка'
  } finally {
    loading.value = false
  }
}

async function confirmCurrency() {
  error.value = ''
  loading.value = true
  try {
    if (activeMethod.value === 'rocket') {
      await createRocketInvoice()
    } else if (activeMethod.value === 'nowpayments') {
      await createNowpaymentsInvoice()
    }
    step.value = 'qr'
    startPolling()
  } catch (e: any) {
    error.value = e.message || 'Произошла ошибка'
  } finally {
    loading.value = false
  }
}

async function payWith(m: 'tpay' | 'sbp' | 'cryptobot' | 'nowpayments' | 'rocket' | 'stars') {
  activeMethod.value = m
  if (m === 'nowpayments' || m === 'rocket') {
    if (!amount.value || parseFloat(amount.value) <= 0) {
      error.value = 'Пожалуйста, укажите сумму'
      return
    }
    error.value = ''
    step.value = 'currency'
    return
  }
  await pay()
}

const qrSrc = computed(() => {
  if (qrImageBase64.value) return `data:image/svg+xml;base64,${qrImageBase64.value}`
  if (qrFallbackUrl.value) return qrFallbackUrl.value
  return ''
})
</script>

<template>
  <div class="pay-page">
    <div class="card-wrap">
      <Transition name="fade-slide" mode="out-in">

        <div v-if="step === 'region'" key="region" class="card">
          <div class="card-icon">💜</div>
          <h1 class="card-title">Поддержать</h1>
          <p class="card-sub">Выбери удобный способ оплаты</p>
          <div class="region-grid">
            <button class="region-btn" @click="selectRegion('ru')">
              <span class="region-flag">🇷🇺</span>
              <span class="region-label">Россия</span>
              <span class="region-method">СБП · CloudTips</span>
            </button>
            <button class="region-btn" @click="selectRegion('other')">
              <span class="region-flag">🌍</span>
              <span class="region-label">Другие страны</span>
              <span class="region-method">Crypto · CryptoBot | Rocket | NOWPayments | Telegram Stars</span>
            </button>
          </div>
        </div>

        <div v-else-if="step === 'form'" key="form" class="card">
          <button class="back-btn" @click="goBack">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          <div class="method-badge">
            <span v-if="method === 'cloudtips'">🏦 СБП · CloudTips</span>
            <span v-else>₿ Crypto · CryptoBot | Rocket | NOWPayments | Telegram Stars</span>
          </div>

          <h2 class="card-title">Детали доната</h2>

          <div class="form-fields">
            <div class="field">
              <label>Имя <span class="opt">(необязательно)</span></label>
              <input v-model="name" type="text" placeholder="Ваше имя" maxlength="64" />
            </div>
            <div class="field">
              <label>Комментарий <span class="opt">(необязательно)</span></label>
              <textarea v-model="comment" placeholder="Оставьте пожелание..." rows="3" maxlength="256" />
            </div>
            <div class="field">
              <label>
                Сумма
                <span class="currency">{{ method === 'cloudtips' ? '₽' : 'USD' }}</span>
              </label>
              <div class="amount-wrap">
                <input v-model="amount" type="number" min="1" placeholder="0" />
                <span class="amount-sym">{{ method === 'cloudtips' ? '₽' : '$' }}</span>
              </div>
              <div class="quick-amounts">
                <button
                    v-for="q in (method === 'cloudtips' ? [100, 250, 500, 1000] : [1, 5, 10, 25])"
                    :key="q"
                    class="quick-btn"
                    :class="{ active: amount == String(q) }"
                    @click="amount = String(q)"
                >
                  {{ q }}{{ method === 'cloudtips' ? '₽' : '$' }}
                </button>
              </div>
            </div>
          </div>

          <p v-if="error" class="error-msg">{{ error }}</p>

          <div v-if="method === 'cloudtips'" class="sbp-buttons">
            <button class="pay-btn tpay-btn" :disabled="loading" @click="payWith('tpay')">
              <span v-if="loading && activeMethod === 'tpay'" class="spinner" />
              <template v-else>
                <img src="/tpay.svg" alt="TPay" style="height:30px;" />
              </template>
            </button>
            <button class="pay-btn sbp-btn" :disabled="loading" @click="payWith('sbp')">
              <span v-if="loading && activeMethod === 'sbp'" class="spinner" />
              <template v-else>
                <img src="/sbp.svg" alt="СБП" style="height:30px;" />
              </template>
            </button>
          </div>

          <div v-if="method === 'crypto'" class="crypto-buttons">
            <button class="pay-btn crypto" :disabled="loading" @click="payWith('cryptobot')">
              <span v-if="loading && activeMethod === 'cryptobot'" class="spinner" />
              <template v-else>
                <img src="/crypto.png" alt="Crypto" style="height:30px;" />
              </template>
            </button>
            <button class="pay-btn rocket-btn" :disabled="loading" @click="payWith('rocket')">
              <span v-if="loading && activeMethod === 'rocket'" class="spinner" />
              <template v-else>
                <img src="/rocket.svg" alt="xRocket" style="height:30px;" />
              </template>
            </button>
            <button class="pay-btn nowpayments" :disabled="loading" @click="payWith('nowpayments')">
              <span v-if="loading && activeMethod === 'nowpayments'" class="spinner" />
              <template v-else>
                <img src="https://nowpayments.io/images/embeds/donation-button-white.svg" alt="NOWPayments" style="height:30px;" />
              </template>
            </button>
            <button class="pay-btn stars-btn" :disabled="loading" @click="payWith('stars')">
              <span v-if="loading && activeMethod === 'stars'" class="spinner" />
              <template v-else>⭐ Telegram Stars</template>
            </button>
          </div>
        </div>

        <div v-else-if="step === 'currency'" key="currency" class="card">
          <button class="back-btn" @click="goBack">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          <h2 class="card-title">Выбор валюты</h2>
          <p class="card-sub">В чём хотите оплатить?</p>

          <div class="currency-grid">
            <button
                v-for="c in (activeMethod === 'rocket' ? rocketCurrencies : currencies)"
                :key="c.id"
                class="currency-btn"
                :class="{ active: (activeMethod === 'rocket' ? rocketCurrency : payCurrency) === c.id }"
                @click="activeMethod === 'rocket' ? rocketCurrency = c.id : payCurrency = c.id"
            >
              <span class="currency-icon">{{ c.icon }}</span>
              <span class="currency-label">{{ c.label }}</span>
            </button>
          </div>

          <p v-if="error" class="error-msg">{{ error }}</p>

          <button class="pay-btn nowpayments" :disabled="loading" @click="confirmCurrency">
            <span v-if="loading" class="spinner" />
            <template v-else>Оплатить в {{ currencies.find(c => c.id === payCurrency)?.label }}</template>
          </button>
        </div>

        <div v-else-if="step === 'qr'" key="qr" class="card">
          <button class="back-btn" @click="goBack">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          <h2 class="card-title">Оплата</h2>
          <p class="card-sub">
            <template v-if="method === 'cloudtips'">
              <template v-if="activeMethod === 'tpay'">Отсканируйте QR через приложение ТБанк</template>
              <template v-else>Отсканируйте QR в приложении банка через СБП</template>
            </template>
            <template v-else>
              <template v-if="activeMethod === 'nowpayments'">Отсканируйте QR в крипто кошельке</template>
              <template v-else>Отсканируйте QR или откройте в Telegram</template>
            </template>
          </p>

          <div class="qr-box">
            <div class="qr-wrapper">
              <img v-if="qrSrc" :src="qrSrc" alt="QR код для оплаты" class="qr-img" />
              <div v-else class="qr-placeholder">
                <span class="spinner large" />
              </div>
              <img v-if="activeMethod === 'tpay'" src="/tpay_qr_logo.png" alt="TPay" class="qr-overlay" />
            </div>
          </div>

          <div class="qr-meta">
            <span class="qr-amount">{{ amount }} {{ method === 'cloudtips' ? '₽' : 'USD' }}</span>
            <span v-if="name" class="qr-name">от {{ name }}</span>
          </div>

          <div v-if="activeMethod === 'nowpayments' && cryptoPayAmount" class="crypto-amount-box">
            <span class="crypto-amount-label">Отправить точно</span>
            <span class="crypto-amount-value">{{ cryptoPayAmount }} {{ cryptoPayCurrency }}</span>
            <span class="crypto-amount-hint">на указанный адрес кошелька</span>
          </div>

          <a v-if="universalLinkUrl" :href="universalLinkUrl" target="_blank" class="open-btn">
            {{ method === 'cloudtips' ? 'Открыть в приложении банка ↗' : 'Открыть в Telegram ↗' }}
          </a>

          <div class="poll-status">
            <span class="poll-dot" />
            Ожидаем оплату…
          </div>
        </div>

        <div v-else-if="step === 'success'" key="success" class="card result-card">
          <div class="result-icon">🎉</div>
          <h2 class="card-title">Спасибо!</h2>
          <p class="card-sub">Ваш донат успешно получен. Это очень важно и приятно 💛</p>
          <button class="pay-btn" @click="restart">Задонатить ещё</button>
        </div>

        <div v-else-if="step === 'failed'" key="failed" class="card result-card">
          <div class="result-icon">😔</div>
          <h2 class="card-title">Оплата не прошла</h2>
          <p class="card-sub">Что-то пошло не так. Попробуйте ещё раз.</p>
          <button class="pay-btn" @click="restart">Попробовать снова</button>
        </div>

      </Transition>
    </div>
  </div>
</template>

<style scoped>
.pay-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  font-family: Comfortaa, serif;
}

.card-wrap {
  width: 100%;
  max-width: 440px;
}

.card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 36px 32px 32px;
  background: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #000;
}

.card-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 10px;
  animation: iconBounce 2s ease-in-out infinite;
}

@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.card-title {
  font-family: Comfortaa, serif;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  color: #000;
  margin: 0 0 6px 0;
  letter-spacing: -0.5px;
}

.card-sub {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  margin-bottom: 28px;
  line-height: 1.5;
  font-family: Comfortaa, serif;
}

.region-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 4px;
}

.region-btn {
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: Comfortaa, serif;
  min-width: 0;
}

.region-btn:hover {
  background: rgba(0, 0, 0, 0.12);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.region-flag { font-size: 32px; }
.region-label { font-size: 14px; font-weight: 700; color: #000; font-family: Comfortaa, serif; }
.region-method {
  font-size: 11px;
  color: rgba(0, 0, 0, 0.5);
  font-family: Comfortaa, serif;
  text-align: center;
  line-height: 1.25;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.back-btn {
  position: absolute;
  top: 18px;
  left: 18px;
  background: rgba(0, 0, 0, 0.06);
  border: none;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  color: rgba(0, 0, 0, 0.6);
}

.back-btn:hover { background: rgba(0, 0, 0, 0.12); }
.back-btn svg { width: 16px; height: 16px; }

.method-badge {
  text-align: center;
  margin-bottom: 12px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
  font-family: Comfortaa, serif;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 8px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 13px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
  font-family: Comfortaa, serif;
}

.opt { font-weight: 400; color: rgba(0, 0, 0, 0.35); font-size: 11px; }
.currency { color: rgba(0, 0, 0, 0.5); margin-left: 4px; }

.field input,
.field textarea {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 11px 14px;
  font-family: Comfortaa, serif;
  font-size: 14px;
  color: #000;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  resize: none;
}

.field input:focus,
.field textarea:focus {
  border-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
}

.amount-wrap { position: relative; }
.amount-wrap input { width: 100%; padding-right: 36px; font-size: 20px; font-weight: 700; }
.amount-sym {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: rgba(0, 0, 0, 0.3);
  pointer-events: none;
  font-family: Comfortaa, serif;
}

.quick-amounts { display: flex; gap: 8px; flex-wrap: wrap; }

.quick-btn {
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 5px 14px;
  font-family: Comfortaa, serif;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
}

.quick-btn:hover,
.quick-btn.active {
  background: rgba(0, 0, 0, 0.14);
  border-color: rgba(0, 0, 0, 0.2);
  color: #000;
}

.error-msg {
  font-size: 13px;
  color: #c0392b;
  text-align: center;
  margin: 4px 0 8px;
  background: rgba(192, 57, 43, 0.07);
  border-radius: 10px;
  padding: 8px 12px;
  font-family: Comfortaa, serif;
}

.pay-btn {
  width: 100%;
  margin-top: 16px;
  background: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 14px;
  font-family: Comfortaa, serif;
  font-size: 15px;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  backdrop-filter: blur(4px);
}

.pay-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.pay-btn:active:not(:disabled) { transform: translateY(0); }
.pay-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.sbp-buttons,
.crypto-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

.sbp-buttons .pay-btn,
.crypto-buttons .pay-btn {
  margin-top: 0;
}

.tpay-btn {
  background: #ffdd2d !important;
  border-color: #e8c800 !important;
}

.tpay-btn:hover:not(:disabled) {
  background: #f0d000 !important;
}

.sbp-btn {
  background: #f5f1e8 !important;
  border-color: #e8e0cc !important;
}

.sbp-btn:hover:not(:disabled) {
  background: #ece4d0 !important;
}

.crypto {
  background: #51a9f0 !important;
}

.crypto:hover:not(:disabled) {
  background: #4ca2e6 !important;
}

.nowpayments {
  background: #00b259 !important;
  color: #fff !important;
}

.nowpayments:hover:not(:disabled) {
  background: #00a050 !important;
}

.rocket-btn {
  background: #f6a623 !important;
  color: #fff !important;
}
.rocket-btn:hover:not(:disabled) {
  background: #e09515 !important;
}

.currency-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.currency-btn {
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: Comfortaa, serif;
}

.currency-btn:hover,
.currency-btn.active {
  background: rgba(0, 178, 89, 0.12);
  border-color: rgba(0, 178, 89, 0.4);
  transform: translateY(-2px);
}

.currency-icon { font-size: 28px; }
.currency-label { font-size: 12px; font-weight: 700; color: #000; font-family: Comfortaa, serif; }

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

.spinner.large { width: 36px; height: 36px; border-width: 3px; }
@keyframes spin { to { transform: rotate(360deg); } }

.qr-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  min-height: 220px;
}

.qr-img {
  width: 210px;
  height: 210px;
  border-radius: 14px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  object-fit: contain;
}

.qr-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 210px;
  height: 210px;
}

.qr-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.qr-amount { font-size: 22px; font-weight: 700; color: #000; font-family: Comfortaa, serif; }
.qr-name { font-size: 13px; color: rgba(0, 0, 0, 0.5); font-family: Comfortaa, serif; }

.qr-wrapper {
  position: relative;
  display: inline-flex;
}

.qr-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  border-radius: 8px;
  pointer-events: none;
}

.crypto-amount-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: rgba(0, 178, 89, 0.08);
  border: 1px solid rgba(0, 178, 89, 0.25);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
}

.crypto-amount-label {
  font-size: 11px;
  color: rgba(0, 0, 0, 0.45);
  font-family: Comfortaa, serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.crypto-amount-value {
  font-size: 22px;
  font-weight: 700;
  color: #00a050;
  font-family: Comfortaa, serif;
}

.crypto-amount-hint {
  font-size: 11px;
  color: rgba(0, 0, 0, 0.4);
  font-family: Comfortaa, serif;
}

.open-btn {
  display: block;
  text-align: center;
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 12px;
  font-family: Comfortaa, serif;
  font-size: 14px;
  font-weight: 600;
  color: #000;
  text-decoration: none;
  transition: all 0.2s;
  margin-bottom: 10px;
}

.open-btn:hover {
  background: rgba(0, 0, 0, 0.12);
  transform: translateY(-1px);
}

.poll-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 8px;
  font-family: Comfortaa, serif;
}

.poll-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4caf50;
  animation: pollPulse 1.5s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pollPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}

.result-card { text-align: center; }

.result-icon {
  font-size: 60px;
  margin-bottom: 12px;
  animation: resultPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes resultPop {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@media (max-width: 768px) {
  .card-wrap {
    max-width: 360px;
  }

  .card {
    width: 100%;
    padding: 32px 22px 28px;
    max-height: calc(100vh - 140px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .card-icon {
    animation: none;
  }

  .card-title {
    font-size: 24px;
  }

  .region-btn {
    padding: 16px 10px;
  }

  .region-btn:hover {
    transform: none;
    box-shadow: none;
  }

  .region-flag {
    font-size: 28px;
  }

  .region-method {
    font-size: 10px;
  }

  .qr-img {
    width: 190px;
    height: 190px;
  }
}

@media (max-width: 480px) {
  .card-wrap {
    max-width: 320px;
  }
  .card { padding: 28px 18px 24px; border-radius: 14px; }
  .card-title { font-size: 22px; }
  .region-grid { gap: 10px; }
  .qr-img { width: 180px; height: 180px; }
}
</style>