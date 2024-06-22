import { useState } from "react";
import {
  LoadingOverlay,
  Title,
  Text,
  Anchor,
  Button,
} from "@mantine/core";
import { Grid, rem } from "@mantine/core";
import { Box } from "@mui/material";
import { IconBook, IconSchool, IconSquareKey, IconUser, IconUsers } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useMediaQuery } from "@mantine/hooks";
import styled from "@emotion/styled";
import { DateInput } from "@mantine/dates";
import { theme } from "../theme/theme";
import { useParams } from "react-router-dom";
import { useGetTheseQuery, useGetTheseUserQuery } from "../redux/features/Theses/sliceThese";
import { format } from "date-fns";
import {  useGetDepartementsQuery } from "../redux/features/Departements/sliceDepartement";
import { useGetLaboratoiresQuery } from "../redux/features/Laboratoires/sliceLaboratoire";
import { useGetUsersQuery } from "../redux/features/Users/sliceUser";
import { formatDate, formatDateFromGet } from "../utils/customFunctions";
import { useNavigate } from "react-router-dom";


const UserInformationWebAdapter = () => {
  const [showLoading, setShowLoading] = useState(false);
  const keywords = ["hello", "YES", "Checks"];
  const navigate = useNavigate();
  const {id} = useParams();
  const {
    isLoading, 
    isError,
    error,
    data: theses
  } = useGetTheseUserQuery(id);

  const {
    isLoading: isLoadingD, 
    isError: isErrorD,
    error: errorD,
    data: departements
  } = useGetDepartementsQuery({})

  const {
    isLoading: isLoadingl, 
    isError: isErrorl,
    error: errorl,
    data: laboratoires
  } = useGetLaboratoiresQuery({})
  
  const {
    isLoading: isLoadingu, 
    isError: isErroru,
    error: erroru,
    data: users
  } = useGetUsersQuery({});

  // const handleSubmit = async (values: any) => {
  //   setShowLoading(true);
  //   try {
  //     alert("COMING SOON");
  //   } catch (error) {
  //     console.log("Error Add These " + error);
  //   }
  // };

  // const handleClear = () => {
  //   theseFormik.resetForm();
  // };

  // const isMobile = useMediaQuery("(max-width: 37em)");

  return (
    <>
      {/* <form onSubmit={theseFormik.handleSubmit}> */}
      {/* <Container style={{ paddingBottom: "5px" }}> */}
      
    <Grid 
        sx={{
            margin: "100px auto",
            width: "80%",
            border: "2px solid #0A4A7A",
            // borderBottom: "2px solid #e9e9e9",
            // boxShadow: "2px 2px 2    px #e9e9e9",
            borderRadius: "10px",
            padding: "20px",
            // backgroundColor: "#EEEEEE"
        }}
    >
      {theses && theses?.data?.map((these: any) => (<These>
         <Grid.Col xs={12}>
            <Boxes>
                <IconSchool
                    // size={"sm"}
                    size={"5%"}
                    color={"#0A4A7A"}
                    // color={"b"}
                    // enableBackground={true}

                ></IconSchool>
                <Title 
                    sx={{
                        fontSize: "24px",
                        marginLeft: "20px",
                        marginTop: "10px",
                        color: "#0A4A7A",
                    }}
                >
                    {these?.titre || ""}
                </Title>
                {/* <Text 
                    sx={{
                        marginLeft: "610px",
                        marginTop: "20px"
                    }}
                >{"2024"}</Text> */}
 
            </Boxes>
            <div>
                <Text
                    sx={{
                        marginLeft: "75px",
                        // marginTop: "1px"
                    }}
                >
                    Par <Anchor<"a">
                  onClick={(event: any) => {
                    event.preventDefault();
                    navigate(`/user-information/${these?.doctorant_id}`);
                  }}
                  href="#"
                  size="sm"
                >{users?.data?.filter((u: any) => u?.role === "Doctorant" && u?.id === these?.doctorant_id).map((u: any) => 
                  `${u.first_name} ${u.last_name}`,
                  )}</Anchor> sous la direction de <Anchor<"a">
                  onClick={(event: any) => {
                    event.preventDefault();
                    navigate(`/user-information/${these?.directeur_these_id}`);
                    // handleForgotPassword();
                  }}
                  href="#"
                  size="sm"
                >{users?.data?.filter((u: any) => u?.role === "Directeur de these" && u?.id === these?.directeur_these_id).map((u: any) => 
                    `${u.first_name} ${u.last_name}`,
                    )}</Anchor>
                </Text>
            </div>
            <div>
                <Text
                    sx={{
                        marginLeft: "75px",
                        marginTop: "10px",
                    }}
                ><strong>Mots Cles :</strong> {these?.mot_cles || ""}</Text>
            </div>
            <div>
                <Text
                    sx={{
                        marginLeft: "75px",
                        marginTop: "10px",
                    }}
                ><strong>Role :</strong> {these?.roles[0] || ""}</Text>
            </div>
            <Button sx={{
                marginLeft: "730px",
                backgroundColor: "#0A4A7A",
                marginTop: "-80px"
            }}
            onClick={ () => {
              navigate(`/these-details/${these?.id}`);
              }
            }
            >
                Details
            </Button>
         </Grid.Col>
      </These>
      ))
      }
    </Grid>
      {/* ------------------------------------------------------------------- */}
      <LoadingOverlay
        visible={showLoading}
        loaderProps={{ children: "Loading..." }}
      />
    </>
  );
};

const These = styled.div`
    width: 95%;
    padding: 15px;
    margin: 5px auto;
    border: 2px solid #0A4A7A;
    // border-bottom: 1px solid #0A4A7A;
    border-radius: 10px;
    background-color: white;
    // background-color: #eeef;
`

const Personne = styled.div`
    width: 95%;
    padding: 15px;
    margin: 5px auto;
    border-top: 1px solid #0A4A7A;
    border-bottom: 1px solid #0A4A7A;
    border-radius: 10px;
    background-color: white;
`

const Boxes = styled.div`
    display: flex;
    // justify-content: space-between;
    // gap: 10px;
`

export default UserInformationWebAdapter;