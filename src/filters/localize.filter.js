import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locates = {
  'ru-RU': ru,
  'en-US': en
}

export default function localizeFilter(key) {
  const locate = store.getters.info.locate || 'ru-RU'
  return locates[locate][key] || `[localize error]: ${key} not found`
}
