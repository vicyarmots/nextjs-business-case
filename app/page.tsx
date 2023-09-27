import styles from './page.module.css'
import NavigationButtonLarge from './components/navigationButtonLarge/NavigationButtonLarge';

export default function Home() {

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>
        Next.js Интервью
      </h1>
      <NavigationButtonLarge title="СТРАНИЦА ПЕДАГОГОВ" route="/instructors" />
    </main>
  )
}
