import React, { FunctionComponent } from 'react';
import styles from './index.module.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import SellercardDesktop from '../Cards/SellercardDesktop';
import SellercardMobile from '../Cards/SellercardMobile';
import { useState, useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { AppActions } from '@/redux/actions/AppActions';
import { GetAllUsers } from '@/redux/actions/users';
import { AppState } from '@/redux/store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';



interface LinkStateProps {
    users: any[];
    alert: any;
}

interface LinkDispatchProps {
    GetAllUsers: () => any
}

interface ComponentsProps {
}

type Props = LinkStateProps & LinkDispatchProps & ComponentsProps;


const Carousel: FunctionComponent<Props> = ({ GetAllUsers, users, alert }) => {

    const [width, setWidth]: any = useState(0);
    const [cardDetails, setCardDetails] = useState<Array<{ id: number; index: number; name: string; src: string; }>>([]);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    
    useEffect(() => {
            GetAllUsers();
    }, [alert]);

    useEffect(() => {
        // Create the cardDetails array from the users data
        const updatedCardDetails = users.map((user: { _id: number; username: string; profileUrl: string; }, index: number) => ({
            id: user._id,
            index: index + 1,
            src: user.profileUrl,
            name: user.username,
        }));
        setCardDetails(updatedCardDetails);
    }, [users]);


    return (
        <CarouselProvider
            className={styles.carousel}
            naturalSlideWidth={180}
            naturalSlideHeight={200}
            isIntrinsicHeight={true}
            totalSlides={Array.isArray(cardDetails) &&  width > 425 ? cardDetails.length / 4 : cardDetails.length / 2}
        >
            <Slider className={styles.slider}>
                {cardDetails.length > 0 &&cardDetails.map((card) => (
                    <Slide
                        key={card.index}
                        className={styles.slide}
                        index={card.index}
                        style={{ width: '180px', height: '200px', margin: '0rem 1rem 0rem 1rem' }}
                    >
                        <SellercardDesktop
                            index={card.index}
                            src={card.src}
                            name={card.name}
                            id={card.id}
                        />
                    </Slide>
                ))}
            </Slider>

            <Slider className={styles.mobile_slider}>
                {cardDetails.length > 0 && cardDetails.map((card) => (
                    <Slide
                        key={card.index}
                        className={styles.m_slide}
                        index={card.index}
                        style={{ width: '130px', height: '165px', margin: '0rem .7rem 0rem .7rem' }}
                    >
                        <SellercardMobile
                            index={card.index}
                            src={card.src}
                            name={card.name}
                            id={card.id}
                        />
                    </Slide>
                ))}
            </Slider>
            <div className={styles.btns}>
                <div className={styles.backBtn}>
                    <ButtonBack className={styles.customButton}><KeyboardArrowLeftIcon /></ButtonBack>
                </div>
                <div className={styles.nextBtn}>
                    <ButtonNext className={styles.customButton}><KeyboardArrowRightIcon /></ButtonNext>
                </div>
            </div>
        </CarouselProvider>
    )
}


const mapStateToProps = (state: AppState): LinkStateProps => ({
    users: state.user.users,
    alert: state.alert.alertMessage
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
    GetAllUsers: bindActionCreators(GetAllUsers, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);