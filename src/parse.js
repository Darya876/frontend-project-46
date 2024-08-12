const parseFile = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
};

export default parseFile;