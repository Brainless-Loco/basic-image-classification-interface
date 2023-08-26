import React from 'react'
import styles from '../../styles/Home.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <a
          href="https://github.com/Brainless-Loco"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by{' '}
          <span className={styles.logo}>
            Brainless Loco
          </span>
        </a>
      </footer>
  )
}
