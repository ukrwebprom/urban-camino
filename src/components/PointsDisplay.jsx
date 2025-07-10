import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import shellIcon from '../assets/logo.png';

const PointsDisplay = ({ points }) => {
    const { number } = useSpring({
      from: { number: 0 },
      to: { number: points },
      config: { duration: 600 },
    });
  
    return (
      <div style={styles.container}>
        <img src={shellIcon} alt="shell" style={styles.icon} />
        <animated.span style={styles.text}>
          {number.to(n => Math.floor(n))}
        </animated.span>
      </div>
    );
  };
  
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: '25px',
      fontWeight: '900',
    },
    icon: {
      width: '30px',
      height: '30px',
      marginRight: '5px',
    },
    text: {
      lineHeight: '30px',
    },
  };
  
  export default PointsDisplay;