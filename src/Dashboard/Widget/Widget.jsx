import clsx from 'clsx';

import styles from './Widget.module.scss';

export function Widget({title, className, children}) {
  return (
    <div className={styles.widget}>
      <div className={styles.title}>{title}</div>

      <div className={clsx(styles.content, className)}>
      {children}
      </div>
    </div>
  )
}
