import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadingTour, toursSelector } from '../../redux/selector.js';
import { getAllTours } from '../../redux/tourSlice.js';
import Layout from '../Layout/Layout.js';

import TourItem from './TourItem.js';

const Home = () => {
  const dispatch = useDispatch();
  const tours = useSelector(toursSelector);
  const isLoading = useSelector(loadingTour);

  useEffect(() => {
    dispatch(getAllTours());
  }, []);

  if (isLoading)
    return (
      <Layout>
        <Flex width='100vw' height='80vh' justify='center' align='center'>
          <Spinner size={'lg'} color='green' />
        </Flex>
      </Layout>
    );

  return (
    <Layout>
      <Box p='64px'>
        <Flex justify='space-between' flexWrap={'wrap'} gap='64px'>
          {tours.map((tour, idx) => (
            <TourItem
              key={idx}
              name={tour.name}
              duration={tour.duration}
              difficulty={tour.difficulty}
              summary={tour.summary}
              place={tour.startLocation.description}
              stops={tour.locations.length}
              start={tour.startDates[0]}
              group={tour.maxGroupSize}
              price={tour.price}
              ratingsAverage={tour.ratingsAverage}
              ratingsQuantity={tour.ratingsQuantity}
              slug={tour.slug}
              img={tour.images[0]}
            />
          ))}
        </Flex>
      </Box>
    </Layout>
  );
};

export default Home;
