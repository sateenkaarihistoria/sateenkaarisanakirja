const sizes = {
  xs: 320,
  s: 420,
  m: 768,
  l: 992,
  xl: 1200,
};

const breakpoints = {
  xs: `(min-width: ${sizes.xs}px)`,
  s: `(min-width: ${sizes.s}px)`,
  m: `(min-width: ${sizes.m}px)`,
  l: `(min-width: ${sizes.l}px)`,
  xl: `(min-width: ${sizes.xl}px)`,
};

export { sizes };
export default breakpoints;
