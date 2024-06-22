import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Text,
  Button,
  LoadingOverlay,
  Grid,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { theme } from "../theme/theme";
import "./styles.css";
import styled from "@emotion/styled";
import { IconArrowRight, IconListSearch, IconSchool, IconSearch, IconUsers } from "@tabler/icons-react";

export const AccueilWebAdapter = () => {
  const navigate = useNavigate();
  const [isThese, setIsThese] = useState(true);
  const [isPersonne, setIsPersonne] = useState(false);
  
  return (
    <>
      <Wrapper>
      <Title align="center"
          sx={{color: "#0c2135",
            fontWeight: 100
          }}
        >
          Le moteur de recherche des thèses FSAC
        </Title>
        <Group position="center" mt="md">
          <Button variant="subtle" size="lg"
            sx={{
              // backgroundColor: "#0A4A7A",
              color: "#0A4A7A",
            }}
            leftIcon={
              <IconSchool />
            }
          >
            {isThese && <span >-</span>}
            Les theses
            {isThese && <span>-</span>}
          </Button>  ||
          <Button variant="subtle" size="lg" 
            sx={{
              // backgroundColor: "#0A4A7A",
              color: "#0A4A7A"
            }}
            leftIcon={
              <IconUsers />
            }
          >
            {isPersonne && <span>-</span>}
            Les Personnes
            {isPersonne && <span>-</span>}
          </Button>
        </Group>

        <Group position="center" mt="md">
          <Button variant="filled" size="lg"
            sx={{
              backgroundColor: "#0A4A7A",
              color: "#ffffff",
              borderRadius: "15px"
            }}
            leftIcon={
              <IconSchool />
            }
          >
            Les theses a Venir
          </Button>  
          <Button variant="filled" size="lg" 
            sx={{
              backgroundColor: "#0A4A7A",
              color: "#ffffff",
              borderRadius: "15px"
            }}
            leftIcon={
              <IconListSearch />
            }
            onClick={() => {
              navigate("/search");
            }}
          >
            Cliquez pour chercher
          </Button>
        </Group>
        
        {/* <TextInput
          placeholder="Rechercher des personnes, par nom ou par domaine d’expertise"
          size="md"
          mt="md"
          sx={{
            width: "600px",
            marginLeft: "210px"
          }}
          rightSection={
            <IconSearch 
              color="gray"
            />
          }
        /> */}
        {/* <Button mt="md"
          sx={{
            width: "110px",
            // left: "left",
            marginLeft: "690px",
            borderRadius: "50px",
            // color: "#eeef"
            backgroundColor: "#0A4A7A",
            color: "white"
          }}
          onClick={() => {
            navigate("/search");
          }}
        >
          Rechercher
        </Button> */}
        <Grid mt="xl" justify="center">
        <Boxes>
          <Grid.Col span={4} sx={{
            border: "1px solid #eee",
            borderRadius: "12px",
            marginRight: "12px"
          }}>
              <Text align="center" size="xl" weight={700}
              >
                3
              </Text>
              <Text align="center">Thèses soutenues</Text>
              <Button fullWidth mt="sm" variant="filled"
                sx={{
                  backgroundColor: "#0A4A7A",
                  color: "white",
                  borderRadius: "15px"
                }}
                rightIcon={<IconArrowRight />}
              >
                Explorer
              </Button>
          </Grid.Col>
          <Grid.Col span={4} sx={{
            border: "1px solid #eee",
            borderRadius: "12px",
            marginRight: "12px",
          }}>
              <Text align="center" size="xl" weight={700}>
                8
              </Text>
              <Text align="center">Personne liées aux thèses</Text>
              <Button fullWidth mt="sm" variant="filled" 
                sx={{
                  backgroundColor: "#0A4A7A",
                  color: "white",
                  borderRadius: "15px"
                }}
                rightIcon={<IconArrowRight />}
              >
                Explorer
              </Button>
          </Grid.Col>
          <Grid.Col span={4} sx={{
            border: "1px solid #eee",
            borderRadius: "12px",
          }}>
              <Text align="center" size="xl" weight={700}>
                1
              </Text>
              <Text align="center">Thèses en préparation</Text>
              <Button fullWidth mt="sm" variant="filled"
                sx={{
                  backgroundColor: "#0A4A7A",
                  color: "white",
                  borderRadius: "15px"
                }}
                rightIcon={<IconArrowRight />}
              >
                Explorer
              </Button>
          </Grid.Col>
          </Boxes>
        </Grid>
    </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 80vw;
  margin: 100px auto;
  // border: 2px solid black;
  padding: 10px;
`;

const Boxes = styled.div`
  // marginTop: 100px;
  display: flex;
  justify-content: space-between;
`
