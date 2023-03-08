/* eslint-disable camelcase */
import { Box, Button, Card, CardBody, Heading, HStack, Stack, Tag, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AiOutlineCheck, AiOutlineClose, AiOutlineStar } from 'react-icons/ai';
import { FaStackOverflow } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SOFCardResult({ result }) {
  const { tags, title, link, answer_count, is_answered } = result;

  return (
    <Card
      margin="auto"
      direction="row"
      variant="elevated"
      width={{ base: '100%', md: '90%' }}
      minW="350px"
    >
      {/* <VStack padding="0.5rem" justifyContent="space-evenly">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png"
          alt="NPM"
          width="50px"
        />
      </VStack> */}

      <CardBody>
        <Box>
          <Link to={link} target="_blank">
            <Heading size="md">{title}</Heading>
          </Link>

          <HStack>
            <Text> Is answered ? </Text>
            {is_answered ? <AiOutlineCheck color="green" /> : <AiOutlineClose color="red" />}
          </HStack>
          <Text fontSize="1rem">{answer_count} answers</Text>
          {tags.map((tag) => (
            <Tag key={tag} margin="0.3rem">
              {tag}
            </Tag>
          ))}
        </Box>
      </CardBody>

      <Stack justifyContent="center" alignItems="center">
        <Link to={link} target="_blank">
          <Button margin="0.5rem" padding="0.5rem" display={{ base: 'none', md: 'flex' }}>
            <FaStackOverflow size="1.5rem" /> Read answers on Stack Overflow
          </Button>
        </Link>
        <Button margin="0.5rem" width="1.5rem" padding="0.5rem">
          <AiOutlineStar size="1.3rem" />
        </Button>
      </Stack>
    </Card>
  );
}

SOFCardResult.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string.isRequired,
    answer_count: PropTypes.number.isRequired,
    is_answered: PropTypes.bool.isRequired,
  }).isRequired,
};

export default SOFCardResult;
