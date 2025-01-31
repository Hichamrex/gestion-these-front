import { useState } from "react";
import {
  Modal,
  Button,
  useMantineTheme,
  LoadingOverlay,
  TextInput,
  Select,
  Textarea,
  MultiSelect,
} from "@mantine/core";
import { Container, Grid, rem } from "@mantine/core";
import { Box } from "@mui/material";
import { IconSend } from "@tabler/icons-react";
import * as yup from "yup";
import { useFormik } from "formik";
import { theme } from "../theme/theme";
import { useMediaQuery } from "@mantine/hooks";
import { constants } from "../common/constants";
import { DateInput } from "@mantine/dates";
import { useGetDepartementsQuery } from "../redux/features/Departements/sliceDepartement";
import { useGetLaboratoiresQuery } from "../redux/features/Laboratoires/sliceLaboratoire";
import { useGetUsersQuery } from "../redux/features/Users/sliceUser";
import { useAddthesesMutation } from "../redux/features/Theses/sliceThese";
import { addMonths, differenceInMonths, format, parseISO } from "date-fns";
import { formatDate } from "../utils/customFunctions";

interface InvoiceOpenProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddForm = ({ opened, setOpened }: InvoiceOpenProps) => {
  const themes = useMantineTheme();
  const [showLoading, setShowLoading] = useState(false);
  const [addThese, { isLoading }] = useAddthesesMutation();

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
  } = useGetUsersQuery({})

  const theseSchema = yup.object().shape({
    directeur: yup.string().required("Requis !"),
    doctorant: yup.string().required("Requis !"),
    examinateur: yup.string().required("Requis !"),
    rapporteur: yup.string().required("Requis !"),
    titre: yup.string().required("Requis !"),
    resume: yup.string().required("Requis !"),
    departement: yup.string().required("Requis !"),
    laboratoire: yup.string().required("Requis !"),
    sujet: yup.string().required("Requis !"),
    duree: yup.string().required("Requis !"),
    date_soutenance: yup.date().required("Requis !"),
    date_publication: yup.date().required("Requis !"),
    mot_cles: yup.string().required("Requis !").matches(/^\w+(, \w+)*$/, "Les mots-clés doivent être séparés par une virgule et un espace, sauf le dernier mot-clé"),
    jurys: yup.array().required("Requis !")
  });

  const theseFormik = useFormik({
    initialValues: {
      directeur: "",
      doctorant: "",
      examinateur: "",
      rapporteur: "",
      departement: "",
      laboratoire: "",
      mot_cles: "",
      resume: "",
      titre: "",
      sujet: "",
      duree: "",
      date_soutenance: null,
      date_publication: null,
      jurys: []
    },
    // enableReinitialize: true,
    validationSchema: theseSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    setShowLoading(true);
    try {
      await addThese({
        titre: values?.titre,
        sujet: values?.sujet,
        duree: values?.duree,
        resume: values?.resume,
        mot_cles: values?.mot_cles,
        date_publication: formatDate(values?.date_publication),
        date_soutenance: formatDate(values?.date_soutenance),
        agent_recherche_id: 1, //TOOD: parameterize  
        laboratoire_id: values?.laboratoire,
        directeur_these_id: values?.directeur,
        doctorant_id: values?.doctorant,
        examinateur_id: values?.examinateur,
        rapporteur_id: values?.rapporteur,
        juries: values?.jurys,
      }).unwrap().then((result: any) => {
        setShowLoading(false);
        handleClose();
      }).catch((error: any) => {
        handleClose();      
      });
    } catch (error) {
      console.log("Error Add These " + error);
    }
  };

  const handleClear = () => {
    theseFormik.resetForm();
  };

  const handleClose = () => {
    handleClear();
    setOpened(false);
  };

  const isMobile = useMediaQuery("(max-width: 37em)");

  console.log("ERROS => " + JSON.stringify(theseFormik?.errors));
  console.log("VALUES => " + JSON.stringify(theseFormik?.values));

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        size="60%"
        overlayProps={{
          color: themes.colors.gray[8],
          opacity: 0.8,
          blur: 1,
        }}
        centered
        closeOnClickOutside={false}
        styles={{
          content: {
            marginLeft: isMobile ? 0 : "-10vw",
            color: theme.mainColor,
            fontFamily: theme.mainFont,
          },
        }}
        title={constants.ADD_THESE}
      >
        <form onSubmit={theseFormik.handleSubmit}>
          <Container style={{ paddingBottom: "5px" }}>
            <Grid>
            <Grid.Col xs={12}>
                <TextInput
                  name="titre"
                  label="Titre"
                  placeholder="Titre"
                  withAsterisk
                  value={theseFormik?.values?.titre}
                  onChange={theseFormik.handleChange}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.titre && theseFormik.errors.titre}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  name="doctorant"
                  label="doctorant"
                  placeholder="Doctorant"
                  withAsterisk
                  value={theseFormik.values.doctorant}
                  onChange={(value) =>
                    theseFormik.setFieldValue("doctorant", value)
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.doctorant &&
                    theseFormik.errors.doctorant
                  }
                  searchable
                  data={users?.data?.filter((u: any) => u?.role === "Doctorant").map((u: any) => ({
                    label: `${u.first_name} ${u.last_name}`,
                    value: u.id,
                    id: u.id,
                  }))}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  name="directeur"
                  label="Directeur"
                  placeholder="Directeur"
                  withAsterisk
                  value={theseFormik.values.directeur}
                  onChange={(value) =>
                    theseFormik.setFieldValue("directeur", value)
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.directeur &&
                    theseFormik.errors.directeur
                  }
                  searchable
                  data={users?.data?.filter((u: any) => u?.role === "Directeur de these").map((u: any) => ({
                    label: `${u.first_name} ${u.last_name}`,
                    value: u.id,
                    id: u.id,
                  }))}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  name="examinateur"
                  label="Examinateur"
                  placeholder="Examinateur"
                  withAsterisk
                  value={theseFormik.values.examinateur}
                  onChange={(value) =>
                    theseFormik.setFieldValue("examinateur", value)
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.examinateur &&
                    theseFormik.errors.examinateur
                  }
                  searchable
                  data={users?.data?.filter((u: any) => u?.role === "Professeur").map((u: any) => ({
                    label: `${u.first_name} ${u.last_name}`,
                    value: u.id,
                    id: u.id,
                  }))}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  name="rapporteur"
                  label="Rapporteur"
                  placeholder="Rapporteur"
                  withAsterisk
                  value={theseFormik.values.rapporteur}
                  onChange={(value) =>
                    theseFormik.setFieldValue("rapporteur", value)
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.rapporteur &&
                    theseFormik.errors.rapporteur
                  }
                  searchable
                  data={users?.data?.filter((u: any) => u?.role === "Professeur").map((u: any) => ({
                    label: `${u.first_name} ${u.last_name}`,
                    value: u.id,
                    id: u.id,
                  }))}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  name="departement"
                  label="Departement"
                  placeholder="Departement"
                  withAsterisk
                  value={theseFormik.values.departement}
                  onChange={(value) =>
                    theseFormik.setFieldValue("departement", value)
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.departement &&
                    theseFormik.errors.departement
                  }
                  data={departements?.data?.map((d: any) => ({
                    label: d.name,
                    value: d.id,
                    id: d.id,
                  }))}
                  searchable
                  nothingFound={"Ajouter un departement"}
                  allowDeselect
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  name="laboratoire"
                  label="Laboratoire"
                  placeholder="Laboratoire"
                  withAsterisk
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
                  data={laboratoires?.data?.filter((l: any) => l.departement_id === theseFormik?.values?.departement)
                    .map((d: any) => ({
                    label: d.name,
                    value: d.id,
                    id: d.id,
                  }))}
                  allowDeselect
                />
              </Grid.Col>
              
              
              
              <Grid.Col xs={12}>
                <Textarea
                  name="sujet"
                  label="Sujet"
                  placeholder="Sujet"
                  withAsterisk
                  value={theseFormik?.values?.sujet}
                  onChange={theseFormik.handleChange}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.sujet && theseFormik.errors.sujet}
                />
              </Grid.Col>
              <Grid.Col xs={12}>
                <Textarea
                  name="resume"
                  label="Resume"
                  placeholder="Resume"
                  withAsterisk
                  value={theseFormik?.values?.resume}
                  onChange={theseFormik.handleChange}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.resume && theseFormik.errors.resume}
                />
              </Grid.Col>
              
              <Grid.Col xs={6}>
                <DateInput
                  name="date_soutenance"
                  label="La date de soutenance"
                  placeholder="La date de soutenance"
                  value={theseFormik?.values?.date_soutenance}
                  onChange={(date) => {
                    theseFormik.setFieldValue("date_soutenance", date);
                    // theseFormik.setFieldValue("date_publication", date);
                    // let months = 0;
                    if(theseFormik?.values?.duree === "6 Mois" && date) {
                      theseFormik?.setFieldValue("date_publication", addMonths(date, 6));
                      // console.log("ENTER", addMonths(theseFormik?.values?.date_soutenance, 6));
                    }
                    else if(theseFormik?.values?.duree === "12 Mois" && date)
                      theseFormik?.setFieldValue("date_publication", addMonths(date, 12));
                    else if(theseFormik?.values?.duree === "18 Mois" && date)
                      theseFormik?.setFieldValue("date_publication", addMonths(date, 18));

                  }}
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.date_soutenance &&
                    theseFormik.errors.date_soutenance
                  }
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Select
                  name="duree"
                  label="Durée"
                  placeholder="Durée"
                  value={theseFormik?.values?.duree}
                  onChange={(value) => {
                    theseFormik.setFieldValue("duree", value);
                    if(value === "6 Mois" && theseFormik?.values?.date_soutenance) {
                      theseFormik?.setFieldValue("date_publication", addMonths(theseFormik?.values?.date_soutenance, 6));
                      console.log("ENTER", addMonths(theseFormik?.values?.date_soutenance, 6));
                    }
                    else if(value === "12 Mois" && theseFormik?.values?.date_soutenance)
                      theseFormik?.setFieldValue("date_publication", addMonths(theseFormik?.values?.date_soutenance, 12));
                    else if(value === "18 Mois" && theseFormik?.values?.date_soutenance)
                      theseFormik?.setFieldValue("date_publication", addMonths(theseFormik?.values?.date_soutenance, 18));
                  }}
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.duree &&
                    theseFormik.errors.duree
                  }
                  withAsterisk

                  data={["6 Mois", "12 Mois", "18 Mois"]}
                />
              </Grid.Col>
              <Grid.Col xs={12}>
                <DateInput
                  name="date_publication"
                  label="La date de publication"
                  placeholder="La Date de publication"
                  value={theseFormik?.values?.date_publication}
                  onChange={(date) =>
                    theseFormik.setFieldValue("date_publication", date)
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.date_publication &&
                    theseFormik.errors.date_publication
                  }
                  disabled={true}
                />
              </Grid.Col>
              <Grid.Col xs={12}>
                <TextInput
                  name="mot_cles"
                  label="Mot Cles"
                  placeholder="Mot Cles"
                  withAsterisk
                  value={theseFormik?.values?.mot_cles}
                  onChange={theseFormik.handleChange}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.mot_cles && theseFormik.errors.mot_cles}
                />
              </Grid.Col>
              <Grid.Col xs={12}>
               <MultiSelect 
                data={users?.data?.filter((u: any) => u?.role === "Professeur").map((u: any) => ({
                  label: `${u.first_name} ${u.last_name}`,
                  value: u.id,
                  id: u.id,
                }))}
                label="Les jurys"
                placeholder="Selectionner les jurys de cette these"
                withAsterisk
                searchable
                  value={theseFormik?.values?.jurys}
                  onChange={(value) => {
                    theseFormik?.setFieldValue("jurys", value);
                  }}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.jurys && theseFormik.errors.jurys}
              />
              </Grid.Col>
              </Grid>
          </Container>

          {/* ------------------------------------------------------------------- */}

          {/* Adjusting submit button and clear */}
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
              rightIcon={<IconSend size={rem(17)} />}
              variant="filled"
              color="blue"
              type="submit"
            >
              Enregistrer
            </Button>
          </Box>
        </form>
      </Modal>
      <LoadingOverlay
        visible={showLoading}
        loaderProps={{ children: "Loading..." }}
      />
    </>
  );
};

export default AddForm;
