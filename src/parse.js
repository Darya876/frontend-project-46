import yaml from 'js-yaml';

const parseFile = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  } else if (format === 'yaml' || format === 'yml') {
    return yaml.load(data);
  }
};

export default parseFile;
