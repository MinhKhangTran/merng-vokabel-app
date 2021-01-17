import React from "react";
import Layout from "../components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Table,
  Thead,
  Tbody,
  TableCaption,
  Tr,
  Th,
  Td,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { VOK_BY_ID } from "./Edit";

export const GET_VOK = gql`
  query Vokabeln {
    vokabeln {
      id
      german
      korean
      marked
    }
  }
`;

const DELETE_VOK = gql`
  mutation DeleteVok($id: ID!) {
    deleteVokabel(id: $id)
  }
`;

const TOGGLE_MARK = gql`
  mutation ToggleMark($id: ID!, $marked: Boolean) {
    toggleMark(id: $id, marked: $marked) {
      id
      german
      korean
      marked
    }
  }
`;

const List = () => {
  const history = useHistory();
  const [liked, setLiked] = React.useState();
  const { data, error, loading } = useQuery(GET_VOK);
  const [deleteVokabel] = useMutation(DELETE_VOK, {
    update: (cache, { data: { deleteVokabel } }) => {
      const data = cache.readQuery({
        query: GET_VOK,
      });
      cache.writeQuery({
        query: GET_VOK,
        data: {
          vokabeln: [deleteVokabel, ...data.vokabeln],
        },
      });
    },
  });
  const [toggleMark] = useMutation(TOGGLE_MARK);
  //   console.log(data);
  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <div>Meh ein Fehler ...</div>
      </Layout>
    );
  }
  const words = data?.vokabeln;
  return (
    <Layout>
      <Table mt={8} w={{ base: "90%", md: "75%" }} mx="auto">
        <TableCaption>Vokabel Liste</TableCaption>
        <Thead>
          <Tr>
            <Th>Deutsch</Th>
            <Th>Koreanisch</Th>
            <Th>Markiert</Th>
            <Th>Ändern/Löschen</Th>
          </Tr>
        </Thead>
        <Tbody>
          {words?.map((vok) => {
            const { id, german, korean, marked } = vok;
            return (
              <Tr textAlign="center" key={id}>
                <Td>{german}</Td>
                <Td>{korean}</Td>

                {marked ? (
                  <Td
                    onClick={() => {
                      setLiked(false);
                      toggleMark({ variables: { id, marked: liked } });
                    }}
                  >
                    {<BsHeartFill />}
                  </Td>
                ) : (
                  <Td
                    onClick={() => {
                      setLiked(true);
                      toggleMark({ variables: { id, marked: liked } });
                    }}
                  >
                    {<BsHeart />}
                  </Td>
                )}

                <Td>
                  <IconButton
                    colorScheme="green"
                    icon={<FaEdit />}
                    onClick={() => history.push(`/edit/${id}`)}
                    mr={4}
                  ></IconButton>
                  <IconButton
                    colorScheme="red"
                    variant="outline"
                    icon={<FaTrashAlt />}
                    onClick={() => {
                      console.log(id);
                      deleteVokabel({ variables: { id } });
                    }}
                  >
                    Löschen
                  </IconButton>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Layout>
  );
};
export default List;
