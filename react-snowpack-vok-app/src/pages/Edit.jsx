import React from "react";
import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useToast } from "@chakra-ui/react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_VOK } from "./List";
import { useHistory, useParams } from "react-router-dom";

export const VOK_BY_ID = gql`
  query VokById($id: ID!) {
    vokabel(id: $id) {
      german
      korean
      marked
    }
  }
`;

const UPDATE_VOK = gql`
  mutation UpdateVok($id: ID!, $german: String!, $korean: String!) {
    updateVokabel(id: $id, german: $german, korean: $korean) {
      id
      german
      korean
      marked
    }
  }
`;

export default function Edit() {
  const history = useHistory();
  const { id } = useParams();
  const toast = useToast();
  const { data } = useQuery(VOK_BY_ID, { variables: { id } });
  //   console.log(id);

  //   console.log(typeof data?.vokabel?.german);
  //   const [values, setValues] = React.useState({
  //     german: data?.vokabel.german,
  //     korean: data?.vokabel.korean,
  //   });

  const [german, setGerman] = React.useState(data && data.vokabel.german);
  const [korean, setKorean] = React.useState(data && data.vokabel.german);
  const [updateVokabel] = useMutation(UPDATE_VOK, {
    variables: { id, german, korean },
    onCompleted: () => history.push("/liste"),
  });

  //   const changeHandler = (e) => {
  //     setValues({ ...values, [e.target.name]: e.target.value });
  //   };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value);
    updateVokabel();
    toast({
      title: "Herzlichen Glückwunsch",
      description: "Erfolgreich geändert",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Layout>
      <Box w={{ base: "80%", md: "60%" }} bg="blue.50" p={8} borderRadius="lg">
        <Heading fontSize="2xl" color="blue.700">
          Änderung
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
                onChange={(e) => {
                  setGerman(e.target.value);
                }}
                name="german"
                value={german}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Koreanisch</FormLabel>
              <Input
                focusBorderColor="blue.600"
                variant="flushed"
                type="text"
                placeholder="Koreanisch"
                onChange={(e) => {
                  setKorean(e.target.value);
                }}
                name="korean"
                value={korean}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={6}>
              Ändern
            </Button>
          </Box>
        </form>
      </Box>
    </Layout>
  );
}
