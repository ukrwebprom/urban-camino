import styles from './LanguageSelector.module.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function LanguageSelector() {
    const { i18n } = useTranslation();
    
    const toggleLanguage = () => {
    const next = i18n.language === 'ua' ? 'en' : 'ua';
    i18n.changeLanguage(next);
    };

    return (
        <p className={styles.selector}
        onClick={toggleLanguage}>
            {i18n.language === 'ua' ? 'UA' : 'EN'}
        </p>
    )
}

export default LanguageSelector;