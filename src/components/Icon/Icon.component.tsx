import * as AllIcons from './icons';
import { IconProps } from './Icon.types';

const Icon = ({ name, ...svgProps }: IconProps) => {
  const Component = AllIcons[name];
  return <Component {...svgProps} />;
};

export default Icon;
