import Image from 'next/image'
import styles from './page.module.css'
import Menubar from '@/components/Header/Menubar'
import Footer from '@/components/Footer/Footer'
import ClassificationSection from '@/components/ClassificationSection/ClassificationSection'

export default function Home() {
  return (
    <main className={styles.main}>
        <Menubar/>
        <ClassificationSection/>
        {/* <Footer/> */}
    </main>
  )
}
