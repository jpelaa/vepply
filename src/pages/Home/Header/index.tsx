import * as React from "react";
import {
  Box,
  Image,
  Heading,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/core";

export interface HeaderProps {
  userName: String;
}

const Header: React.SFC<HeaderProps> = ({ userName }) => {
  return (
    <Box d="flex" justifyContent="space-between" px="6" py="2">
      <Box d="flex" justifyContent="center" alignItems="center">
        <Image src="https://github.com/jpelaa/images/blob/master/v-shape.png?raw=true"></Image>
        <Heading color="primary.900">epply</Heading>
      </Box>
      <Box d="flex" alignItems="center" justifyContent="center">
        <Menu>
          <MenuButton as={Button}>
            {userName || "Afsal"} <Icon name="chevron-down" />
          </MenuButton>
          <MenuList>
            <MenuItem>Log out</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
