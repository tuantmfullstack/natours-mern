import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import {
  HiOutlineCalendar,
  HiOutlineFlag,
  HiOutlineLocationMarker,
  HiOutlineUser,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { tourImages } from '../../features/importAll.js';

const TourItem = (props) => {
  const start = new Date(props.start).toLocaleString('en-EN', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <Flex
      width='300px'
      bg='white'
      borderRadius='12px'
      boxShadow='0 0 36px rgba(0,0,0,0.3)'
      direction='column'
    >
      <Box>
        <Image
          loading='lazy'
          src={tourImages[`${props.img}`]}
          width='100%'
          borderTopLeftRadius={'12px'}
          borderTopRightRadius={'12px'}
        />
        <Text
          fontSize='24px'
          textTransform={'uppercase'}
          textAlign='right'
          color={'green.400'}
          fontWeight='600'
          marginRight='8px'
        >
          {props.name}
        </Text>
      </Box>
      <Box p='12px 24px' flex='1'>
        <Box
          color='blackAlpha.700'
          fontWeight='600'
          textTransform={'uppercase'}
        >
          {props.difficulty} {props.duration}-DAY TOUR
        </Box>
        <Box marginBottom='12px' minHeight={'72px'}>
          {props.summary}
        </Box>
        <Flex justify='space-between' align='center'>
          <Flex justify='center' align='center' color='blackAlpha.700'>
            <Icon
              marginRight='8px'
              as={HiOutlineLocationMarker}
              color='green.400'
            />
            <Text>{props.place}</Text>
          </Flex>
          <Flex justify='center' align='center' color='blackAlpha.700'>
            <Icon marginRight='8px' as={HiOutlineCalendar} color='green.400' />
            <Text>{start}</Text>
          </Flex>
        </Flex>
        <Flex justify='space-between' align='center' color='blackAlpha.700'>
          <Flex justify='center' align='center'>
            <Icon marginRight='8px' as={HiOutlineFlag} color='green.400' />
            <Text>{props.stops} stops</Text>
          </Flex>
          <Flex justify='center' align='center'>
            <Icon marginRight='8px' as={HiOutlineUser} color='green.400' />
            <Text>{props.group} people</Text>
          </Flex>
        </Flex>
      </Box>
      <Flex
        // justify='space-between'
        align='center'
        p='12px 20px'
        bg='blackAlpha.300'
        marginTop='12px'
        borderBottomLeftRadius='inherit'
        borderBottomRightRadius='inherit'
      >
        <Box flex='1'>
          <Box>
            <Text fontWeight='600' display={'inline-block'}>
              ${props.price} &nbsp;
            </Text>
            per person
          </Box>
          <Box>
            <Text fontWeight='600' display={'inline-block'}>
              {props.ratingsAverage}
            </Text>
            &nbsp; rating ({props.ratingsQuantity})
          </Box>
        </Box>
        <Link to={`/tours/${props.slug}`}>
          <Button colorScheme='green' color='white'>
            Details
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default TourItem;
