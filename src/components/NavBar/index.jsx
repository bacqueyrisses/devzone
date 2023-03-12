import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { HiOutlineLogout, HiOutlineUserCircle } from 'react-icons/hi';
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import { RxHamburgerMenu, RxPerson } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logodevzoneblack from '../../assets/images/devzonewhite.png';
import logodz from '../../assets/images/logo-dz.png';
import { logout, thunkGetUser } from '../../features/user/userSlice';
import SideBar from '../SideBar/index';

function NavBar() {
  const user = useSelector((state) => state.user.username);
  const avatar = useSelector((state) => state.user.avatar);
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();

  const userId = localStorage.getItem('userId');

  // if userId in localstorage, find the user in db to maintain the connection
  useEffect(() => {
    if (userId) {
      dispatch(thunkGetUser({ userId }));
    }
  }, [userId]);

  const [burgerMenu, setBurgerMenu] = useState();

  const handleClick = () => {
    // remove accessToken & userId from localstorage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    dispatch(logout());
  };

  return (
    <Flex
      width="100%"
      bg={useColorModeValue('blue.900', 'blue.800')}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      align="center"
      h="70px"
    >
      {/* MOBILE & TABLETTE ---- BurgerMenu */}
      <Box>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                aria-label="Menu application"
                display={{ base: 'block', md: 'none' }}
              >
                <Center outline="1px solid" p="4px">
                  {isOpen ? <CgClose size="2rem" /> : <RxHamburgerMenu size="2rem" />}
                </Center>
              </MenuButton>
              <MenuList>
                <MenuItem bg="transparent">
                  <SideBar />
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Box>

      {/* DESTKOP & GRAND ECRAN --- BurgerMenu */}
      <Box display={{ base: 'none', md: 'block' }}>
        <NavLink to="/app">
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize="sm"
            fontWeight={400}
            variant="outline"
            _hover={{
              bg: 'whiteAlpha.300',
            }}
          >
            <Text color="white">App</Text>
          </Button>
        </NavLink>
      </Box>
      <Spacer />
      <NavLink to="/">
        <Img src={logodevzoneblack} h="60px" display={{ base: 'none', md: 'block' }} />
        <Img src={logodz} h="60px" display={{ base: 'block', md: 'none' }} />
      </NavLink>

      <Spacer />
      {/* MOBILE & TABLETTE -  Profile */}
      {user ? (
        <Menu>
          <MenuButton
            display={{ base: 'block', md: 'none' }}
            as={IconButton}
            rounded="full"
            variant="link"
            cursor="pointer"
            minW={0}
          >
            <Avatar size="md" name={user} src={avatar} />
          </MenuButton>
          <MenuList>
            <NavLink to="/profile">
              <MenuItem>
                <HStack>
                  <Icon as={HiOutlineUserCircle} />
                  <Text>Profile</Text>
                </HStack>
              </MenuItem>
            </NavLink>
            <MenuItem onClick={toggleColorMode}>
              <HStack>
                <Icon as={colorMode === 'light' ? MdOutlineDarkMode : MdOutlineWbSunny} />
                <Text>{colorMode === 'light' ? 'Dark' : 'Light'} Mode</Text>
              </HStack>
            </MenuItem>
            <NavLink to="/login">
              <MenuItem onClick={handleClick}>
                <HStack>
                  <Icon as={HiOutlineLogout} />
                  <Text>Logout</Text>
                </HStack>
              </MenuItem>
            </NavLink>
          </MenuList>
        </Menu>
      ) : (
        <Menu p="2">
          <MenuButton
            as={IconButton}
            aria-label="Menu application"
            display={{ base: 'block', md: 'none' }}
          >
            <Center>
              <RxPerson size="2rem" />
            </Center>
          </MenuButton>
          <MenuList>
            <NavLink to="/login">
              <MenuItem>Login</MenuItem>
            </NavLink>
            <NavLink to="/signup">
              <MenuItem>Sign up</MenuItem>
            </NavLink>
          </MenuList>
        </Menu>
      )}
      {/* DESTKOP & GRAND ECRAN --- Profile */}

      {user ? (
        <Menu>
          <MenuButton display={{ base: 'none', md: 'block' }} rounded="full" variant="link">
            <Avatar size="md" name={user} src={avatar} />
          </MenuButton>
          <MenuList>
            <NavLink to="/profile">
              <MenuItem>
                <HStack>
                  <Icon as={HiOutlineUserCircle} />
                  <Text>Profile</Text>
                </HStack>
              </MenuItem>
            </NavLink>
            <MenuItem onClick={toggleColorMode}>
              <HStack>
                <Icon as={colorMode === 'light' ? MdOutlineDarkMode : MdOutlineWbSunny} />
                <Text>{colorMode === 'light' ? 'Dark' : 'Light'} Mode</Text>
              </HStack>
            </MenuItem>
            <NavLink to="/login">
              <MenuItem onClick={handleClick}>
                <HStack>
                  <Icon as={HiOutlineLogout} />
                  <Text>Logout</Text>
                </HStack>
              </MenuItem>
            </NavLink>
          </MenuList>
        </Menu>
      ) : (
        <HStack spacing={6} color="white">
          <NavLink to="/login">
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize="sm"
              fontWeight={400}
              variant="outline"
              _hover={{
                bg: 'whiteAlpha.300',
              }}
            >
              Login
            </Button>
          </NavLink>
          <NavLink to="/signup">
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize="sm"
              fontWeight={600}
              bg="pink.400"
              _hover={{
                bg: 'pink.300',
              }}
            >
              Sign Up
            </Button>
          </NavLink>
        </HStack>
      )}
    </Flex>
  );
}

export default NavBar;
