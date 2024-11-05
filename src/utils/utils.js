export const calculatePosition = (angle, orbitRadius, y = 0) => [
  orbitRadius * Math.cos(angle * (Math.PI / 180)),
  y,
  orbitRadius * Math.sin(angle * (Math.PI / 180)),
];
