const addCount = (list = [], action) => {
  return [...list, action.count];
};

export default addCount;
