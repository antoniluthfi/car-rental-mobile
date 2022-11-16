const deepClone = (obj: any) => {
  let temp = JSON.parse(JSON.stringify(obj));
  return temp;
};

export default deepClone;
