/* eslint-disable camelcase */
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useClipboard,
  useToast,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AiOutlineStar } from 'react-icons/ai';
import { FaClipboard, FaGithub } from 'react-icons/fa';

import { Link } from 'react-router-dom';

function GHCardResult({ result }) {
  const { name, owner, description, html_url, homepage, language, ssh_url } = result;
  const toast = useToast();

  const { onCopy } = useClipboard(ssh_url);

  const handleCopy = () => {
    toast({
      title: 'Copied!',
    });
    onCopy();
  };

  return (
    <Card
      margin="auto"
      direction="row"
      variant="elevated"
      width={{ base: '100%', md: '90%' }}
      minW="350px"
    >
      {/* <HStack padding="0.5rem" justifyContent="space-evenly">
        <Image
          src="https://logos-marques.com/wp-content/uploads/2021/03/GitHub-Logo.png"
          alt="GitHub"
          width="50px"
        />
        <Text fontSize="1rem">GitHub</Text>
        <Button>
          <AiOutlineStar />
        </Button>
      </HStack> */}

      <CardBody>
        <Flex margin="0.5rem 0">
          <Box>
            <HStack>
              <Heading size="md">
                <Link to={html_url} target="_blank">
                  {name}
                </Link>
              </Heading>
              <Button padding="0.3rem" fontSize="0.8rem" size="xs" onClick={handleCopy}>
                SSH Key
                <FaClipboard />
              </Button>
            </HStack>

            <Text>{description}</Text>

            <Text fontSize="0.8rem">Language : {language}</Text>
          </Box>
        </Flex>

        <HStack>
          <Image src={owner.avatar_url} width="1.5rem" borderRadius="full" />
          <Text>{owner.login}</Text>
        </HStack>
      </CardBody>

      <VStack margin="0.5rem" justifyContent="space-evenly">
        <Link to={html_url} target="_blank">
          <Button display={{ base: 'none', md: 'flex' }}>
            <FaGithub size="1.6rem" /> See on GitHub
          </Button>
        </Link>

        {homepage ? (
          <Link to={homepage} target="_blank">
            <Button display={{ base: 'none', md: 'flex' }}>Home</Button>
          </Link>
        ) : null}

        <Button>
          <AiOutlineStar size="1.3rem" />
        </Button>
      </VStack>
    </Card>
  );
}

GHCardResult.propTypes = {
  result: PropTypes.shape({
    description: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }),
    name: PropTypes.string,
    language: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    homepage: PropTypes.string,
    ssh_url: PropTypes.string.isRequired,
  }),
};

GHCardResult.defaultProps = {
  result: {
    homepage: null,
  },
};
export default GHCardResult;
