// src/Locales/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入翻译文件
import translationEN from './en/translation.json';
import translationZH from './zh/translation.json';

// 配置资源
const resources = {
  en: {
    translation: translationEN
  },
  zh: {
    translation: translationZH
  }
};

// 初始化 i18n
i18n
  .use(initReactI18next) // 传递 i18n 实例给 react-i18next
  .init({
    resources,
    lng: 'en', // 默认语言
    fallbackLng: 'en', // 如果当前语言没有翻译，则使用英文
    interpolation: {
      escapeValue: false // React 已经安全处理了插值
    }
  });

export default i18n;
