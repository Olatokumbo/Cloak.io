export const getReview = (array) => {
  const total = array.reduce((a, b) => a + b, 0);
  return (total / array.length) || 0;
};
