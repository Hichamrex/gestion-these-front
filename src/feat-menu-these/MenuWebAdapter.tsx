import {
    TextInput,
    Title,
    Group,
    Text,
    Button,
    Grid,
  } from "@mantine/core";
  // import "./styles.css";
  import styled from "@emotion/styled";
  
  export const MenuWebAdapter = () => {
    return (
      <>
        <Wrapper>
          <Title align="center"
            sx={{color: "#0c2135",
              fontWeight: 600, 
              fontSize: "24px"
            }}
          >
            Les Theses a venir
          </Title>
          <Grid>
            <Grid.Col xs={12}>
              <Title
              align="center"
              sx={{color: "#0c2135",
                fontWeight: 100,
                fontSize: "19px"
              }}
              >
                Sujet 1
              </Title>
              
            </Grid.Col>
          </Grid>
      </Wrapper>
      </>
    );
  };
  
  const Wrapper = styled.div`
    width: 20vw;
    margin: 100px auto;
    border: 2px solid #eee;
    borderRadius: 3px;
    // display: flex;
  `;