function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

export const tourImages = importAll(
  require.context('../img/tours', false, /\.(png|jpe?g|svg)$/)
);

export const userImages = importAll(
  require.context('../img/users', false, /\.(png|jpe?g|svg)$/)
);

export const images = importAll(
  require.context('../img', false, /\.(png|jpe?g|svg)$/)
);
