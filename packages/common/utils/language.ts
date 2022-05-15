import { format } from 'date-fns';
import { enUS, ja } from 'date-fns/locale';

const config: { [key: string]: any } = {
  en: { dateFormat: 'yyyy/MM/dd (E)', locale: enUS },
  ja: { dateFormat: 'yoMMMMdo (E)', locale: ja },
};

const getDateFormat = (str: string, lang = 'ja') => {
  const _config = config[lang];
  return format(new Date(str), _config.dateFormat, { locale: _config.locale });
};

export const LanguageUtils = { getDateFormat };
