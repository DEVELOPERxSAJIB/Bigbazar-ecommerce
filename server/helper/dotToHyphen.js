const replaceDotWithHeypen = (token) => {
  const updatedToken = token.replace(/\./g, 'stringversionofhyphen');
  return updatedToken;
};

const replaceHeypenWithDot = (token) => {
  const updatedToken = token.replace(/stringversionofhyphen/g, '.');
  return updatedToken;
};

module.exports = { replaceDotWithHeypen, replaceHeypenWithDot };
