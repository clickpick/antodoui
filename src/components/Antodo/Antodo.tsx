import type { FC, HTMLAttributes } from 'react';
import { classNames } from '@clickpick/shared';

export type AntodoProps = HTMLAttributes<HTMLHeadingElement>;

export const Antodo: FC<AntodoProps> = (props) => (
  <h1 {...props} className={classNames(props.className, 'Antodo')}>Antodo</h1>
);
