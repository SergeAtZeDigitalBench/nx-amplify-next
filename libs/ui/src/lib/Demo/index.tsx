import styles from './ui.module.css';

/* eslint-disable-next-line */
export interface DemoProps {}

export function Demo(props: DemoProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Ui!</h1>
    </div>
  );
}

export default Demo;
