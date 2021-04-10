export default (quary) => {
  if (quary) {
    const quaryString = quary.split('?')[1];
    if (quaryString.length > 0) {
      const params = quaryString.split('&');
      const paramsObj = {};
      params.forEach(param => {
        const keyValue = param.split("=");
        paramsObj[keyValue[0]] = keyValue[1];
      });
      return paramsObj;
    }
  }
  return {}
}