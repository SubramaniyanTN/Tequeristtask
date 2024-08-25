import i18next, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en'

const languageResources: Resource = {
  en: {
    translation: en,
  },
}

i18next.use(initReactI18next).init({
  lng: 'en',
  resources: languageResources,
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

export default i18next
