export const add = (a: number, b: number) => a + b;

export const addRandom = () => {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  return add(a, b) + add(a, b);
};
