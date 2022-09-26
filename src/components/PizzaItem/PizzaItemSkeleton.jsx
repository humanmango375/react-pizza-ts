import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="134" cy="129" r="130" />
    <rect x="-2" y="276" rx="8" ry="8" width="280" height="27" />
    <rect x="-3" y="316" rx="8" ry="8" width="280" height="88" />
    <rect x="0" y="427" rx="0" ry="0" width="90" height="27" />
    <rect x="127" y="418" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default PizzaSkeleton;
