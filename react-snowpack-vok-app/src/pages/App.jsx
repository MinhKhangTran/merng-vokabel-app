import React from "react";
import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useToast } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import { GET_VOK } from "./List";
import { useHistory } from "react-router-dom";

const CREATE_VOK = gql`
  mutation CreateVok($german: String!, $korean: String!) {
    createVokabel(german: $german, korean: $korean) {
      id
      german
      korean
      marked
    }
  }
`;

export default function App() {
  const history = useHistory();
  const toast = useToast();
  const [values, setValues] = React.useState();
  const [createVokabel, { error, loading }] = useMutation(CREATE_VOK, {
    variables: { ...values },
    update: (cache, { data: { createVokabel } }) => {
      const data = cache.readQuery({
        query: GET_VOK,
      });
      cache.writeQuery({
        query: GET_VOK,
        data: {
          vokabeln: [...data.vokabeln, createVokabel],
        },
      });
    },
    onCompleted: () => history.push("/liste"),
  });

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value);
    createVokabel();
    toast({
      title: "Herzlichen Glückwunsch",
      description: "Erfolgreich in die Liste hinzugefügt :D",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <Layout>
      <Box w={{ base: "80%", md: "60%" }} bg="blue.50" p={8} borderRadius="lg">
        <Heading fontSize="2xl" color="blue.700">
          Vokabel App
        </Heading>
        <form onSubmit={handleSubmit}>
          <Box mt={4}>
            <FormControl isRequired>
              <FormLabel>Deutsch</FormLabel>
              <Input
                focusBorderColor="blue.600"
                variant="flushed"
                type="text"
                placeholder="Deutsch"
                onChange={changeHandler}
                name="german"
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Koreanisch</FormLabel>
              <Input
                focusBorderColor="blue.600"
                variant="flushed"
                type="text"
                placeholder="Koreanisch"
                onChange={changeHandler}
                name="korean"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={6}>
              Hinzufügen
            </Button>
          </Box>
        </form>
      </Box>
    </Layout>
  );
}
