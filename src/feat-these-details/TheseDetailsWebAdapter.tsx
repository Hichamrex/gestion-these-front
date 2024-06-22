import { useState } from "react";
import {
  LoadingOverlay,
  Title,
  Text,
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
import { useGetTheseQuery } from "../redux/features/Theses/sliceThese";
import { format } from "date-fns";
import {  useGetDepartementsQuery } from "../redux/features/Departements/sliceDepartement";
import { useGetLaboratoiresQuery } from "../redux/features/Laboratoires/sliceLaboratoire";
import { useGetUsersQuery } from "../redux/features/Users/sliceUser";
import { formatDate, formatDateFromGet } from "../utils/customFunctions";


const TheseDetailsWebAdapter = () => {
  const [showLoading, setShowLoading] = useState(false);
  const keywords = ["hello", "YES", "Checks"];
  const {id} = useParams();
  
  const {
    isLoading, 
    isError,
    error,
    data: these
  } = useGetTheseQuery(id);

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
            width: "90%",
            // border: "2px solid #e9e9e9",
            // borderBottom: "2px solid #e9e9e9",
            // boxShadow: "2px 2px 2    px #e9e9e9",
            borderRadius: "10px",
            padding: "20px",
            // backgroundColor: "#EEEEEE"
        }}
    >
      <These>
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
                    {these?.data?.titre || ""}
                </Title>
            </Boxes>
            <Box 
                sx={{
                    marginLeft: "70px"
                }}
            >
               <Text><strong>Sujet :</strong> {these?.data?.sujet || ""}</Text>
               <hr />
               <Text><strong>Auteur / Autrice :</strong> {users?.data?.filter((u: any) => u?.role === "Doctorant" && u?.id === these?.data?.doctorant_id).map((u: any) => 
                  `${u.first_name} ${u.last_name}`,
                  )}</Text>
               <hr />
               <Text><strong>Direction :</strong> {users?.data?.filter((u: any) => u?.role === "Directeur de these" && u?.id === these?.data?.directeur_these_id).map((u: any) => 
                  `${u.first_name} ${u.last_name}`,
                  )}</Text>
               <hr />
               <Text><strong>Examinateur / Examinatrice :</strong> {users?.data?.filter((u: any) => u?.role === "Professeur" && u?.id === these?.data?.examinateur_id).map((u: any) => 
                  `${u.first_name} ${u.last_name}`,
                  )}</Text>
               <hr />
               <Text><strong>Rapporteur / Rapportrice :</strong> {users?.data?.filter((u: any) => u?.role === "Professeur" && u?.id === these?.data?.rapporteur_id).map((u: any) => 
                  `${u.first_name} ${u.last_name}`,
                  )}</Text>
               {/* <hr />
               <Text><strong>Discipline :</strong> Linguistique</Text> */}
               <hr />
               <Text><strong>Date Soutenance :</strong> le {format(formatDateFromGet(these?.data?.date_soutenance), "dd/MM/yyyy") || ""}</Text>
               <hr />
               <Text><strong>Duree :</strong> {these?.data?.duree || ""}</Text>
               <hr />
               <Text><strong>Date Publication:</strong> le {format(formatDateFromGet(these?.data?.date_publication), "dd/MM/yyyy") || ""}</Text>
               <hr />
               <Text><strong>Departement :</strong> {departements?.data?.filter((d: any) => d.id === laboratoires?.data?.filter((l: any) => l.id === these?.data?.laboratoire_id).map((l: any) => l.departement_id)[0])?.map((d: any) => d.name)[0] || ""}</Text>
               <hr />
               <Text><strong>Laboratoire :</strong> {laboratoires?.data?.filter((l: any) => l.id === these?.data?.laboratoire_id)?.map((l: any) => l.name)[0] || ""}</Text>
               <hr />
               <Text><strong>Etablissement :</strong> FSAC</Text>
            </Box>
            <hr />
            <Boxes>
                <IconSquareKey
                    // size={"sm"}
                    size={"5%"}
                    color={"#0A4A7A"}
                    // color={"b"}
                    // enableBackground={true}

                ></IconSquareKey>
                <Title 
                    sx={{
                        fontSize: "24px",
                        marginLeft: "20px",
                        marginTop: "10px",
                        color: "#0A4A7A",
                    }}
                >
                    {"Mots clés : "}
                </Title>
            </Boxes>
            <Box
                sx={{
                  marginLeft: "70px"
                }}
            >
              <Boxes>
               {these?.data?.mot_cles?.split(", ")?.map((k: string) => (
                <Text
                sx={{
                    backgroundColor: "#0A4A7A",
                    color: 'white',
                    padding: '8px', // Optional: adds some padding inside the box
                    margin: '4px', // Optional: adds some margin between boxes
                    borderRadius: '4px', // Optional: rounds the corners of the box,

                }}
                >
                {k}
                </Text>
                ))}
                </Boxes>
                </Box>
         </Grid.Col>
         <hr />
         <Grid.Col xs={12}>
            <Boxes>
                <IconBook
                    // size={"sm"}
                    size={"5%"}
                    color={"#0A4A7A"}
                    // color={"b"}
                    // enableBackground={true}

                ></IconBook>
                <Title 
                    sx={{
                        fontSize: "24px",
                        marginLeft: "20px",
                        marginTop: "10px",
                        color: "#0A4A7A",
                    }}
                >
                    {"Resume : "}
                </Title>
            </Boxes>
            <Box sx={{
              width: "80vw",
              marginLeft: "70px",
              fontFamily: theme?.mainFont,
              fontWeight: 400,
              color: "#0A4A7A"
            }}>
              <Text>
               {these?.data?.resume || ""}
              </Text>
            </Box>
            </Grid.Col>
      </These>
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

export default TheseDetailsWebAdapter;