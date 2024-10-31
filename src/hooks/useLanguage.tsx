import { useEffect } from 'react'

export type Language = {
  label: string
  value: string
}

const languageKey = 'languageKey'

const languages: Language[] = [
  { label: 'English', value: 'en-US' },
  { label: 'Romanian', value: 'ro-RO' },
]

export const useLanguage = () => {
  useEffect(() => {
    if (!localStorage.getItem(languageKey)) {
      localStorage.setItem(languageKey, languages[0].value)
    }
  })

  const getSelectedLanguage = () => {
    const langValue = localStorage.getItem(languageKey)
    const lang = languages.find((l) => l.value === langValue)

    return lang || languages[0]
  }

  const setSelectedLanguage = (lang: Language) => {
    localStorage.setItem(languageKey, lang.value)
  }

  const getAvailableLanguages = () => {
    return languages.slice()
  }

  return {
    getSelectedLanguage,
    setSelectedLanguage,
    getAvailableLanguages,
  }
}
