import styles from './ReadyToStartLabel.module.css';
import shell from '../assets/logo-inyellow.png';
import CertificateGenerator from './CertificateGenerator';
import bg from '../assets/certificate-bg.jpg';

function GetСertificate({userName, routeName, coordinates, distance}) {
    return (
        <CertificateGenerator
            userName={userName}
            routeName={routeName}
            coordinates={coordinates}
            backgroundImage={bg}
/>
        // <div className={styles.main}>
        //     <p>{userName}</p>
        //     <p>{routeName}</p>
        //     <p>{distance}</p>
        // </div>
    )
}

export default GetСertificate;