export const random = (length: number): number => {
  let list: number[] = [];
  for (let i=0; i<length; i++) {
    list.push(Math.floor(Math.random() * length));
  }
  return list[Math.floor(Math.random() * list.length)]
}