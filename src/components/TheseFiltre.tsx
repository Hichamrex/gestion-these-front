import { useState } from "react";
import {
  Modal,
  Button,
  useMantineTheme,
  LoadingOverlay,
  TextInput,
  Select,
  Textarea,
} from "@mantine/core";
import { Container, Grid, rem } from "@mantine/core";
import { Box } from "@mui/material";
import { IconFilter, IconSend } from "@tabler/icons-react";
import * as yup from "yup";
import { useFormik } from "formik";
import { theme } from "../theme/theme";
import { useMediaQuery } from "@mantine/hooks";
import { constants } from "../common/constants";
import { DateInput } from "@mantine/dates";

interface InvoiceOpenProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const TheseFiltre = () => {
  const themes = useMantineTheme();
  const [showLoading, setShowLoading] = useState(false);

  //   const theseSchema = yup.object().shape({
  //     directeur: yup.string().required("Requis !"),
  //     theseDate: yup.date().required("Requis !"),
  //     doctorant: yup.string().required("Requis !"),
  //     titre: yup.string().required("Requis !"),
  //     departement: yup.string().required("Requis !"),
  //     laboratoire: yup.string().required("Requis !"),
  //     sujet: yup.string().required("Requis !"),
  //     startDate: yup.date().required("Requis !"),
  //     soutenanceDate: yup.date().required("Requis !"),
  //     publicationDate: yup.date().required("Requis !"),
  //   });

  const theseFormik = useFormik({
    initialValues: {
      directeur: "",
      doctorant: "",
      departement: "",
      laboratoire: "",
      titre: "",
      sujet: "",
      startDate: null,
      soutenanceDate: null,
      publicationDate: null,
    },
    // enableReinitialize: true,.
    // validationSchema: theseSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    setShowLoading(true);
    try {
      alert("COMING SOON");
    } catch (error) {
      console.log("Error Add These " + error);
    }
  };

  const handleClear = () => {
    theseFormik.resetForm();
  };

  //   const handleClose = () => {
  //     handleClear();
  //     setOpened(false);
  //   };

  const isMobile = useMediaQuery("(max-width: 37em)");

  return (
    <>
      {/* <form onSubmit={theseFormik.handleSubmit}> */}
      {/* <Container style={{ paddingBottom: "5px" }}> */}
      <Grid>
        <Grid.Col xs={3}>
          <Select
            name="departement"
            label="Departement"
            value={theseFormik.values.departement}
            onChange={(value) =>
              theseFormik.setFieldValue("departement", value)
            }
            onBlur={theseFormik.handleBlur}
            error={
              theseFormik.touched.departement && theseFormik.errors.departement
            }
            searchable
            data={["Departement 1", "Departement 2"]}
          />
        </Grid.Col>
        <Grid.Col xs={3}>
          <Select
            name="laboratoire"
            label="Laboratoire"
            value={theseFormik.values.laboratoire}
            onChange={(value) =>
              theseFormik.setFieldValue("laboratoire", value)
            }
            onBlur={theseFormik.handleBlur}
            error={
              theseFormik.touched.laboratoire && theseFormik.errors.laboratoire
            }
            searchable
            data={["Laboratoire 1", "Laboratoire 2"]}
          />
        </Grid.Col>
        <Grid.Col xs={3}>
          <Select
            name="directeur"
            label="Directeur"
            value={theseFormik.values.directeur}
            onChange={(value) => theseFormik.setFieldValue("directeur", value)}
            onBlur={theseFormik.handleBlur}
            error={
              theseFormik.touched.directeur && theseFormik.errors.directeur
            }
            searchable
            data={["Mounia MIYARA", "Imane EL MOURABIT"]}
          />
        </Grid.Col>
        <Grid.Col xs={3}>
          <Select
            name="doctorant"
            label="doctorant"
            value={theseFormik.values.doctorant}
            onChange={(value) => theseFormik.setFieldValue("doctorant", value)}
            onBlur={theseFormik.handleBlur}
            error={
              theseFormik.touched.doctorant && theseFormik.errors.doctorant
            }
            searchable
            data={["ICHRAQ Amine", "Oumaima ELASRI"]}
          />
        </Grid.Col>
        <Grid.Col xs={3}>
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
        <Grid.Col xs={3}>
          <DateInput
            name="startDate"
            label="La date du demarrage"
            placeholder="La date du demarrage"
            value={theseFormik?.values?.startDate}
            onChange={(date) => theseFormik.setFieldValue("startDate", date)}
            onBlur={theseFormik.handleBlur}
            error={
              theseFormik.touched.startDate && theseFormik.errors.startDate
            }
          />
        </Grid.Col>
        <Grid.Col xs={3}>
          <DateInput
            name="publicationDate"
            label="La date de publication"
            placeholder="La Date de publication"
            value={theseFormik?.values?.publicationDate}
            onChange={(date) =>
              theseFormik.setFieldValue("publicationDate", date)
            }
            onBlur={theseFormik.handleBlur}
            error={
              theseFormik.touched.publicationDate &&
              theseFormik.errors.publicationDate
            }
          />
        </Grid.Col>
        <Grid.Col xs={3}>
          <DateInput
            name="soutenanceDate"
            label="La Date de soutenance"
            placeholder="La date de soutenance"
            value={theseFormik?.values?.soutenanceDate}
            onChange={(date) =>
              theseFormik.setFieldValue("soutenanceDate", date)
            }
            onBlur={theseFormik.handleBlur}
            error={
              theseFormik.touched.soutenanceDate &&
              theseFormik.errors.soutenanceDate
            }
          />
        </Grid.Col>
      </Grid>
      {/* </Container> */}

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
          rightIcon={<IconFilter size={rem(17)} />}
          variant="filled"
          color="blue"
          type="submit"
        >
          Filtrer
        </Button>
      </Box>
      {/* </form> */}
      <LoadingOverlay
        visible={showLoading}
        loaderProps={{ children: "Loading..." }}
      />
    </>
  );
};

export default TheseFiltre;
