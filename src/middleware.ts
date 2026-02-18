import { defineMiddleware } from 'astro:middleware';
import { THEME_CONFIG } from "~/theme.config.ts";
import { LANGUAGES } from "~/i18n.ts";

export const onRequest = defineMiddleware(async (context, next) => {
  // Adding properties in env.d.ts
  context.locals.config = THEME_CONFIG;
  const locale = context.locals.config.locale;
  context.locals.translate = (key, param) => {
    const languageData = LANGUAGES[locale as keyof typeof LANGUAGES];
    if (!languageData) {
      return key;
    }
    const translation = languageData[key as keyof typeof languageData];
    if (!translation) {
      return key;
    }
    if (param != null) {
      return translation.replace('%d', param.toString());
    }
    return translation;
  }
  return next();
});
