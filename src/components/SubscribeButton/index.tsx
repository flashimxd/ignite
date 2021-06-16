import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

const SubscribeButton = ({ priceId }: SubscribeButtonProps) => (
  <button
    type="button"
    className={styles.subscribeButton}
  >
    Subscribe now
  </button>
)

export { SubscribeButton }