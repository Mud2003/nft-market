import React from 'react'
import styles from './index.module.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useEffect, useRef } from 'react';

import Image from 'next/image';

const PaysuccesPop = ({ setPaymentSuccess, setIsOpen, imgUrl, nftName, creator}: any) => {

    const popRef = useRef<HTMLDivElement>(null);
    const image = imgUrl;

    useEffect(() => {
      const handleClickOutside: any = (event: MouseEvent) => {
        if (popRef.current && !popRef.current.contains(event.target as Node)) {
          setPaymentSuccess(false);
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [setPaymentSuccess, setIsOpen]);

  return (
    <div className={styles.pop}>
        <div className={styles.box}  ref={popRef}>
            <div className={styles.head}>
                <h2 className={styles.h2}>Payment Successful</h2>
            </div>
            <div className={styles.img_name}>
                <Image
                src={image}
                alt='NFT'
                className={styles.img}
                width={200}
                height={200}>
                </Image>
                <div className={styles.b1}>
                    <p className={styles.p1}>You successfully purchased <b>{nftName}</b> from <b>{creator}</b></p>
                </div>
            </div>
            <div className={styles.foot}>
                <h3 className={styles.h3}>Share</h3>
                <div className={styles.icons}>
                    <InstagramIcon/>
                    <TwitterIcon/>
                    <TelegramIcon/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaysuccesPop;