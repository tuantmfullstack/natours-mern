import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineStar,
  HiOutlineTrendingUp,
  HiOutlineUser,
} from 'react-icons/hi';
import { ImStarEmpty, ImStarFull, ImStarHalf } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { tourImages, userImages } from '../../features/importAll.js';
import useNotification from '../../hook/useNotification.js';
import {
  loadingTour,
  loginSelector,
  tourSelector,
} from '../../redux/selector.js';
import { getTour } from '../../redux/tourSlice.js';
import Layout from '../Layout/Layout.js';
import MapTour from './MapTour.js';

const Tour = (props) => {
  const dispatch = useDispatch();
  const tour = useSelector(tourSelector);
  const params = useParams();
  const { sendNotification } = useNotification();
  const isLogin = useSelector(loginSelector);
  const isLoading = useSelector((state) => state.tours.isLoading);

  useEffect(() => {
    sendNotification(dispatch(getTour(params.slug)));
  }, []);

  if (isLoading)
    return (
      <Layout>
        <Flex width='100vw' height='100vh' justify='center' align='center'>
          <Spinner size='lg' color='green.400' />
        </Flex>
      </Layout>
    );

  if (!isLogin) {
    return <Navigate to='/login' />;
  }

  let date, cover;
  if (tour && tour.startDates && tour.startDates[0]) {
    date = new Date(tour.startDates[0]).toLocaleString('en-EN', {
      month: 'long',
      year: 'numeric',
    });
  }

  if (tour && tour.images && tour.images[0]) {
    cover = tour.images[0];
  }

  const solve = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(ImStarFull);
    }
    if (`${rating}`.includes('.')) {
      stars.push(ImStarHalf);
    }
    for (let i = Math.ceil(rating); i < 5; i++) {
      stars.push(ImStarEmpty);
    }
    return stars.map((el, idx) => <Icon as={el} color='green.300' key={idx} />);
  };

  return (
    <Layout>
      <Box height='500px' overflow='hidden' position='relative'>
        <Image
          loading='lazy'
          src={tourImages[cover]}
          objectFit={'cover'}
          filter='brightness(60%)'
        />
        <Box
          fontSize='64px'
          textTransform={'uppercase'}
          color='green.50'
          position='absolute'
          top='50%'
          left='50%'
          transform={'translateX(-50%) translateY(-50%)'}
          textAlign='center'
        >
          <Text width='500px'>{tour?.name} tour</Text>
          <Flex fontSize='16px' justify='space-around' fontWeight='600'>
            <Flex align='center' gap={'8px'}>
              <Icon as={HiOutlineClock} /> {tour?.duration} days
            </Flex>
            <Flex align='center' gap={'8px'}>
              <Icon as={HiOutlineLocationMarker} />{' '}
              {tour?.startLocation?.description}
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Flex>
        <Box bg='gray.100' p='80px' flex='1'>
          <Text
            color='green.300'
            fontWeight='600'
            fontSize='20px'
            margin='0 0 32px'
          >
            QUICK FACTS
          </Text>
          <Box>
            <Flex gap={'16px'} align='center' margin='0 0 16px'>
              <Flex gap={'12px'} align='center'>
                <Icon
                  color={'green.300'}
                  as={HiOutlineCalendar}
                  fontSize='18px'
                />
                <Text fontWeight='500'>NEXT DATE</Text>
              </Flex>
              <Text>{date}</Text>
            </Flex>
            <Flex gap={'16px'} align='center' margin='0 0 16px'>
              <Flex gap={'12px'} align='center'>
                <Icon
                  color={'green.300'}
                  as={HiOutlineTrendingUp}
                  fontSize='18px'
                />
                <Text fontWeight='500'>DIFFICULTY</Text>
              </Flex>
              <Text textTransform={'capitalize'}>{tour?.difficulty}</Text>
            </Flex>
            <Flex gap={'16px'} align='center' margin='0 0 16px'>
              <Flex gap={'12px'} align='center'>
                <Icon color={'green.300'} as={HiOutlineUser} fontSize='18px' />
                <Text fontWeight='500'>PARTICIPANTS</Text>
              </Flex>
              <Text>{tour?.maxGroupSize} People</Text>
            </Flex>
            <Flex gap={'16px'} align='center' margin='0 0 16px'>
              <Flex gap={'12px'} align='center'>
                <Icon color={'green.300'} as={HiOutlineStar} fontSize='18px' />
                <Text fontWeight='500'>RATING</Text>
              </Flex>
              <Text>{tour?.ratingsAverage} / 5</Text>
            </Flex>
          </Box>
          <Box margin='64px 0 0'>
            <Text
              color='green.300'
              fontWeight='600'
              fontSize='20px'
              margin='0 0 32px'
            >
              YOUR TOUR GUIDES
            </Text>
            {tour?.guides?.map((guide, idx) => (
              <Flex gap={'12px'} align='center' margin='0 0 12px' key={idx}>
                <Avatar src={userImages[guide.photo]} />
                <Text textTransform={'uppercase'}>{guide.role}</Text>
                <Text>{guide.name}</Text>
              </Flex>
            ))}
          </Box>
        </Box>
        <Box p='80px 60px' flex='1'>
          <Text
            fontWeight='600'
            fontSize='20px'
            color='green.300'
            margin='0 0 32px'
          >
            ABOUT THE FOREST HIKER TOUR
          </Text>
          <Text lineHeight={1.8}>{tour?.description}</Text>
        </Box>
      </Flex>
      <Flex>
        {tour?.images?.map((image, idx) => (
          <Image
            loading='lazy'
            key={idx}
            src={tourImages[image]}
            width='33.33%'
            height={'100%'}
            objectFit={'cover'}
          />
        ))}
      </Flex>
      <Box m='12px 0 60px' overflow={'hidden'} width='100%' height='80vh'>
        {/* <Box> */}
        <MapTour locations={tour.locations} />
      </Box>
      <Flex bg='green.300' p='60px' gap={'36px'} overflowX='auto'>
        {tour?.reviews?.map((review, idx) => (
          <Flex
            bg='white'
            minWidth='300px'
            maxWidth={'300px'}
            p='40px'
            borderRadius='12px'
            boxShadow='0 0 36px rgba(0,0,0,0.4)'
            margin='0 32px 0 0'
            key={idx}
            direction='column'
          >
            <Flex align='center' gap='12px' margin='0 0 24px'>
              <Avatar src={userImages[review.user.photo]} />
              <Text textTransform={'uppercase'} fontWeight='600'>
                {review.user.name}
              </Text>
            </Flex>
            <Box fontSize='14px' opacity={0.8} flex='1'>
              {review.review}
            </Box>
            <Flex margin='12px 0 0' justify='center'>
              {solve(review.rating)}
            </Flex>
          </Flex>
        ))}
      </Flex>
      <Box p='100px 32px' bg='gray.100'>
        <Flex
          bg='white'
          borderRadius='16px'
          p='100px 32px'
          position='relative'
          justify='space-between'
          align='center'
        >
          <Flex width='250px'>
            {tour?.images?.map((img, idx) => (
              <Image
                loading='lazy'
                key={idx}
                src={tourImages[img]}
                borderRadius={'full'}
                width='150px'
                height='150px'
                boxShadow='0 0 24px rgba(0,0,0,0.4)'
                position='absolute'
                left={`${100 - idx * 40}px`}
                top={'50%'}
                transform={'translateY(-50%)'}
              />
            ))}
          </Flex>
          <Box>
            <Text fontWeight='600' fontSize='24px' color='green.300'>
              WHAT ARE YOU WAITING FOR?
            </Text>
            <Text>
              5 days. 1 adventure. Infinite memories. Make it yours today!
            </Text>
          </Box>
          <Button colorScheme='green'>BOOK TOUR NOW!</Button>
        </Flex>
      </Box>
    </Layout>
  );
};

export default Tour;
