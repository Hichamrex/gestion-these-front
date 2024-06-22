import { useEffect, useState } from "react";
import {
  Button,
  LoadingOverlay,
  TextInput,
  Title,
  Text,
  Select,
  Textarea,
  Anchor,
} from "@mantine/core";
import { Grid, rem } from "@mantine/core";
import { Box } from "@mui/material";
import { IconFilter, IconSchool, IconUser, IconUsers } from "@tabler/icons-react";
import { useFormik } from "formik";
import styled from "@emotion/styled";
import { DateInput } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { useGetThesesQuery } from "../redux/features/Theses/sliceThese";
import { useGetDepartementsQuery } from "../redux/features/Departements/sliceDepartement";
import { useGetLaboratoiresQuery } from "../redux/features/Laboratoires/sliceLaboratoire";
import { useGetUsersCountsQuery, useGetUsersQuery } from "../redux/features/Users/sliceUser";


const SearchWebAdapter = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [isThese, setIsThese] = useState<boolean>(true);
  const [isPersonne, setIsPersonne] = useState<boolean>(false);
  const [thesesData, setThesesData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [filter, setFilter] = useState(false);

  const navigate = useNavigate();

  const {
    isLoading, 
    isError,
    error,
    data: theses
  } = useGetThesesQuery({});

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
  } = useGetUsersCountsQuery({});

  const newTheseData = theses?.data?.map((t: any) => ({
    "id":t.id,
    "titre": t.titre,
    "sujet": t.sujet,
    "duree": t.duree, 
    "date_publication": t.date_publication,
    "date_soutenance": t.date_soutenance,
    // "agent_recherche": users?.data?.filter((u: any) => u.role === "" && u.id === t.agent_recherche_id).map((u: any) => `${u.first_name} ${u.last_name}`)[0],
    "laboratoire": laboratoires?.data?.filter((u: any) => u.id === t.laboratoire_id).map((u: any) => u.name)[0],
    "departement": departements?.data?.filter((d: any) => d.id === laboratoires?.data?.filter((l: any) => l.id === t?.laboratoire_id).map((l: any) => l.departement_id)[0])?.map((d: any) => d.name)[0],
    // "directeur": users?.data?.filter((u: any) => u.role === "Directeur de these" && u.id === t.directeur_these_id).map((u: any) => `${u.first_name} ${u.last_name}`)[0],
    // "doctorant": users?.data?.filter((u: any) => u.role === "Doctorant" && u.id === t.doctorant_id).map((u: any) => `${u.first_name} ${u.last_name}`)[0],
    "directeur_these_id": t?.directeur_these_id,
    "doctorant_id": t?.doctorant_id,
    "mot_cles": t?.mot_cles,
    "resume": t?.resume
  }))

  const newUsersData = users?.data?.filter((u: any) => !["Super Admin", "Agent de bibliotheque", "Agent de service recherche", 
    "Equipe de recherche"]?.some(role => u?.role.includes(role))).map((t: any) => ({
    "id":t.id,
    "full_name": `${t?.first_name} ${t?.last_name?.toUpperCase()}`,
    "role": t?.role,
    "examinateur_count": t?.examinateur_count,
    "rapporteur_count": t?.rapporteur_count,
    "directeur_these_count": t?.directeur_these_count,
    "jury_count": t?.jury_count,
    "doctorant_count": t?.doctorant_count
  }))

  const theseFormik = useFormik({
    initialValues: {
        resume: "", 
        titre: "",
        datePublication: null,
        dateSoutenance: null,
        mot_cles: "",
        sujet: "",
        duree: "",
        laboratoire: "",
        departement: "",
        personne: ""
    },
    // enableReinitialize: true,
    // validationSchema: theseSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });
  
  const handleClear = () => {
    theseFormik.resetForm();
    setThesesData(newTheseData);
    setUsersData(newUsersData);
    setFilter(false);
  };

  useEffect(() => {
    if(theses?.data)
      setThesesData(newTheseData);
    if(users?.data)
      setUsersData(newUsersData);
    setIsThese(true);
  }, [theses, users]);

  const filterThese = () => {
    const fil = newTheseData
      .filter((these: any) => (theseFormik?.values?.duree ? these.duree === theseFormik?.values?.duree : true))
      .filter((these: any) => (theseFormik?.values?.departement ? these?.departement === theseFormik?.values?.departement : true))
      .filter((these: any) => (theseFormik?.values?.laboratoire ? these?.laboratoire === theseFormik?.values?.laboratoire : true))
      .filter((these: any) => these?.titre?.toLowerCase().includes(theseFormik?.values?.titre?.toLowerCase()))
      .filter((these: any) =>
        these?.sujet?.toLowerCase().includes(theseFormik?.values?.sujet?.toLowerCase())
      )
      .filter((these: any) =>
        these?.resume?.toLowerCase().includes(theseFormik?.values?.resume?.toLowerCase())
      )
      .filter((these: any) =>
        these?.mot_cles?.includes(theseFormik?.values?.mot_cles)
      )
      // .filter((these: any) => {
      //   const datePub = new Date(these?.date_publication).getTime();
      //   const formikDate = theseFormik?.values?.datePublication
      //     ? new Date(theseFormik.values.datePublication).getTime()
      //     : '';

      //   return datePub === formikDate;
        // const datePub = new Date(these?.date_publication);
        // // const debut = startDate ? new Date(startDate) : new Date("01/01/2010");
        // // const fin = endDate ? new Date(endDate) : new Date("01/01/2040");

        // return datePub === new Date(theseFormik?.values?.datePublication ? theseFormik?.values?.datePublication : new Date(""));
      // });
    setThesesData(fil);
  };

  const filterPersonne = () => {
    const fil = newUsersData
      .filter((these: any) => these.full_name.toLowerCase().includes(theseFormik?.values?.personne?.toLowerCase()))
    setUsersData(fil);
  };

  useEffect(() => {
    if(filter && isThese)
      filterThese();
  }, [theseFormik?.values?.titre, filter,
      theseFormik?.values?.sujet,
      theseFormik?.values?.resume,
      theseFormik?.values?.datePublication,
      theseFormik?.values?.dateSoutenance,
      theseFormik?.values?.departement,
      theseFormik?.values?.laboratoire,
      theseFormik?.values?.duree,
      theseFormik?.values?.mot_cles,
  ]);

  useEffect(() => {
    if(filter && isPersonne)
      filterPersonne();
  }, [theseFormik?.values?.personne, filter]);
  const handleFilter = () => {
    setFilter(true);
  };

  // salaires={filter ? filterTable(salaires) : salaires}
  console.log("Update values ", theseFormik?.values);
  console.log("Update values ", JSON.stringify(newTheseData));
  return (
    <>
      {/* <form onSubmit={theseFormik.handleSubmit}> */}
      {/* <Container style={{ paddingBottom: "5px" }}> */}
      
      <Grid 
        sx={{
            margin: "100px auto",
            width: "80%",
            border: "2px solid #0A4A7A",
            borderRadius: "10px",
            padding: "20px"
        }}
      >
        <Grid.Col xs={6}>
            <Button variant={isThese ? "light" : "subtle"} size="lg"
                sx={{
                // backgroundColor: "#0A4A7A",
                color: "#0A4A7A",
                marginLeft: "160px"
                }}
                leftIcon={
                <IconSchool />
                }
                onClick={() => {
                    setIsPersonne(false);
                    setIsThese(true);
                }}
            >
                {isThese && <span >-</span>}
                    Les theses
                {isThese && <span>-</span>}
            </Button>  
        </Grid.Col>
        <Grid.Col xs={6}>
        <Button variant={isPersonne ? "light" : "subtle"} size="lg" 
            sx={{
              // backgroundColor: "#0A4A7A",
              color: "#0A4A7A",
              marginLeft: "140px",
              backgroundColor: `${isThese} === true ? red : black`
            }}
            leftIcon={
              <IconUsers />
            }
            onClick={() => {
              setIsPersonne(true);
              setIsThese(false);
          }}
        >
            {isPersonne && <span >-</span>}
                Les Personnes
            {isPersonne && <span>-</span>}
        </Button>
        </Grid.Col>
          { isThese && <Grid.Col xs={6}>
                <TextInput
                  name="titre"
                  label="Titre"
                  placeholder="Titre"
                  
                  value={theseFormik?.values?.titre}
                  onChange={theseFormik.handleChange}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.titre && theseFormik.errors.titre}
                />
            </Grid.Col>
          }
          {isThese &&  <Grid.Col xs={6}>
                <TextInput
                  name="sujet"
                  label="Sujet"
                  placeholder="Sujet"
                  
                  value={theseFormik?.values?.sujet}
                  onChange={theseFormik.handleChange}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.sujet && theseFormik.errors.sujet}
                />
            </Grid.Col>
          }
            {isThese &&  <Grid.Col xs={4}>
                <Select
                  name="Duree"
                  label="duree"
                  placeholder="duree"
                  
                  value={theseFormik.values.duree}
                  onChange={(value) =>
                    theseFormik.setFieldValue("duree", value)
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.duree &&
                    theseFormik.errors.duree
                  }
                  searchable
                  data={["6 Mois", 
                         "12 Mois", 
                         "18 Mois"
                        ]}
                />
              </Grid.Col>
            }
            {isThese &&  <Grid.Col xs={4}>
                <DateInput
                  name="datePublication"
                  label="Date de publication"
                  placeholder="Date de publication"
                  
                  value={theseFormik.values.datePublication}
                  onChange={(value) =>
                    theseFormik.setFieldValue("datePublication", value)
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.datePublication &&
                    theseFormik.errors.datePublication
                  }
                />
              </Grid.Col>
            }
             {isThese && <Grid.Col xs={4}>
                <DateInput
                  name="dateSoutenance"
                  label="Date de soutenance"
                  placeholder="Date de soutenance"
                  
                  value={theseFormik.values.dateSoutenance}
                  onChange={(value) =>
                    theseFormik.setFieldValue("dateSoutenance", value)
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.dateSoutenance &&
                    theseFormik.errors.dateSoutenance
                  }
                />
              </Grid.Col>
            }
             {isThese && <Grid.Col xs={4}>
                <Select
                  name="laboratoire"
                  label="Laboratoire"
                  placeholder="Laboratoire"
                  allowDeselect
                  value={theseFormik.values.laboratoire}
                  onChange={(value) =>
                    theseFormik.setFieldValue("laboratoire", value)
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.laboratoire &&
                    theseFormik.errors.laboratoire
                  }
                  searchable
                  data={laboratoires ? laboratoires?.data?.map((l: any) => l.name) : []}
                />
              </Grid.Col>
}
            {isThese &&  <Grid.Col xs={4}>
                <Select
                  name="departement"
                  label="Departement"
                  placeholder="Departement"
                  allowDeselect                  
                  value={theseFormik.values.departement}
                  onChange={(value) =>
                    theseFormik.setFieldValue("departement", value)
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.departement &&
                    theseFormik.errors.departement
                  }
                  searchable
                  data={departements ? departements?.data?.map((d: any) => d.name) : []}
                />
              </Grid.Col>
            }
            {isThese &&  <Grid.Col xs={4}>
                <TextInput
                  name="mot_cles"
                  label="Mot Cles"
                  placeholder="Mot Cles"
                  value={theseFormik.values.mot_cles}
                  onChange={theseFormik?.handleChange
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.mot_cles &&
                    theseFormik.errors.mot_cles
                  }
                />
              </Grid.Col>
            }
            {isThese &&  <Grid.Col xs={12}>
                <Textarea
                  name="resume"
                  label="Resume"
                  placeholder="Resume"
                  
                  value={theseFormik.values.resume}
                  onChange={theseFormik?.handleChange
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.resume &&
                    theseFormik.errors.resume
                  }
                />
              </Grid.Col>
            }
            {isPersonne &&  <Grid.Col xs={12}>
                <TextInput
                  name="personne"
                  label="Les Personnes"
                  placeholder="Les Personnes"
                  
                  value={theseFormik.values.personne}
                  onChange={theseFormik?.handleChange
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.personne &&
                    theseFormik.errors.personne
                  }
                />
              </Grid.Col>
            }
              <Box sx={{ marginLeft: "28rem", marginTop: "2rem" }}>
                    <Button
                    variant="default"
                    color="red"
                    sx={{ marginRight: "10px" }}
                    onClick={handleClear}
                    >
                    Clear
                    </Button>
                    <Button
                    rightIcon={<IconFilter size={rem(17)} />}
                    variant="filled"
                    // color="blue"
                    type="submit"
                    sx={{
                        backgroundColor: "#0A4A7A"
                    }}
                    onClick={() => {
                      setFilter(true);
                    }}
                    >
                    Filtrer
                    </Button>
                </Box>
              </Grid>

    <Grid 
        sx={{
            margin: "-40px auto",
            width: "80%",
            border: "1px solid #0A4A7A",
            // borderBottom: "2px solid #e9e9e9",
            // boxShadow: "2px 2px 2    px #e9e9e9",
            borderRadius: "10px",
            padding: "5px",
            marginBottom: "20px"
            // backgroundColor: "#EEEEEE"
        }}
    >
      `{isThese && thesesData && thesesData?.map((these: any) => (<These>
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
      { isThese && thesesData?.length <= 0 &&
        <These>
        <Grid.Col xs={12}>
        <Boxes>
            NO DATA FOUND
          </Boxes>
        </Grid.Col>
    </These>
      }

      {/* ------------------- PERSONNES ------------------------------------- */}
      {isPersonne && usersData?.map((u: any) => (<Personne>
         <Grid.Col xs={12}>
            <Boxes>
                <IconUser
                    // size={"sm"}
                    size={"5%"}
                    color={"#0A4A7A"}
                    // color={"b"}
                    // enableBackground={true}

                ></IconUser>
                <Title 
                    sx={{
                        fontSize: "24px",
                        marginLeft: "20px",
                        marginTop: "10px",
                        color: "#0A4A7A",
                    }}
                >
                    {u?.full_name || ""}
                </Title>
            </Boxes>
            <div>
                <Text
                    sx={{
                        marginLeft: "75px",
                        // marginTop: "1px"
                    }}
                >
                Auteur / Autrice ({u?.doctorant_count || 0})
                </Text>
                <Text
                    sx={{
                        marginLeft: "75px",
                        // marginTop: "1px"
                    }}
                >
                Directeur / Directrice ({u?.directeur_these_count || 0})
                </Text>
                <Text
                    sx={{
                        marginLeft: "75px",
                        // marginTop: "1px"
                    }}
                >
                Rapporteur / Rapporteuse ({u?.rapporteur_count || 0})
                </Text>
                <Text
                    sx={{
                        marginLeft: "75px",
                        // marginTop: "1px"
                    }}
                >
                Examinateur / Examinatrice ({u?.examinateur_count || 0})
                </Text>
                <Text
                    sx={{
                        marginLeft: "75px",
                        // marginTop: "1px"
                    }}
                >
                Jury ({u?.jury_count || 0})
                </Text>
            </div>
            
            <Button sx={{
                marginLeft: "735px",
                backgroundColor: "#0A4A7A",
                marginTop: "-80px"
            }}
            onClick={() => {
              navigate(`/user-information/${u?.id}`);
            }}
            >
                Details
            </Button>
         </Grid.Col>
      </Personne>
      ))}
      { isPersonne && usersData?.length <= 0 &&
        <Personne>
        <Grid.Col xs={12}>
        <Boxes>
            NO DATA FOUND
          </Boxes>
        </Grid.Col>
    </Personne>
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
    width: 90%;
    padding: 5px;
    margin: 5px auto;
    // border-top: 1px solid #0A4A7A;
    border: 2px solid #0A4A7A;
    border-radius: 10px;
    background-color: white;
    // background-color: #eeef;
`

const Personne = styled.div`
    width: 90%;
    padding: 5px;
    margin: 5px auto;
    border: 2px solid #0A4A7A;
    // border-bottom: 1px solid #0A4A7A;
    border-radius: 10px;
    background-color: white;
`

const Boxes = styled.div`
    display: flex;
    // justify-content: space-between;
    // gap: 10px;
`

export default SearchWebAdapter;