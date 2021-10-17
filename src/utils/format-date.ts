import { format as __format, formatRelative as __formatRelative, formatISO as __formatISO } from 'date-fns';
import { ru } from 'date-fns/locale';

type FnsDate = Date | number;

/**
 * Форматирование даты с учетом локализации
 * @param date - значение даты
 * @param formatStr - желаемый формат даты
 */
export function format(date: FnsDate | number, formatStr = 'dd.MM.yyyy'): string {
  return __format(date, formatStr, {
    locale: ru,
  });
}

/**
 *
 * @param date - значение даты
 */
export function formatISO(date: FnsDate | number): string {
  return __formatISO(date);
}

/**
 * Форматирование даты относительно другой даты в словах с учетом локализации
 * @desc https://date-fns.org/v2.23.0/docs/formatRelative
 * @param date - текущая дата
 * @param baseDate - дата от которой считать
 * @param options - настройки
 */
export function formatRelative(
  date: FnsDate,
  baseDate: FnsDate,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  },
): string {
  return __formatRelative(date, baseDate, { locale: { ...ru, ...options } });
}
