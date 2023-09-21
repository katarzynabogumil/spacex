export function getDifferenceBetweenSets (setA, setB) {
  return new Set(
    [...setA].filter(element => !setB.has(element))
  );
}