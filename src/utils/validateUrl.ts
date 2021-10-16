const URL_REGEXP = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

export const validateUrl = (url: string) => {
  return URL_REGEXP.test(url);
};