import { Grid, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { RiFileList2Line } from "react-icons/ri";

const Layout = ({ children }) => {
  return (
    <Grid
      w="100vw"
      h="100vh"
      bgGradient="linear(to-br, blue.100,purple.100)"
      placeItems="center"
      overflowY="scroll"
    >
      <Button
        pos="absolute"
        top="1%"
        right="1%"
        variant="ghost"
        leftIcon={<RiFileList2Line />}
        colorScheme="blue"
      >
        <Link to="/liste">Liste</Link>
      </Button>
      <Text
        pos="absolute"
        top="1%"
        left="1%"
        fontSize="2xl"
        fontWeight="bold"
        color="blue.500"
      >
        <Link to="/">VokApp</Link>
      </Text>

      {children}
    </Grid>
  );
};

export default Layout;
