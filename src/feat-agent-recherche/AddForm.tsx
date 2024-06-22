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
import { IconSend } from "@tabler/icons-react";
import * as yup from "yup";
import { useFormik } from "formik";
import { theme } from "../theme/theme";
import { useMediaQuery } from "@mantine/hooks";
import { constants } from "../common/constants";
import { DateInput } from "@mantine/dates";
import { useAddAgentRechercheMutation } from "../redux/features/AgentRecherche/sliceAgentRecherche";

interface InvoiceOpenProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddForm = ({ opened, setOpened }: InvoiceOpenProps) => {
  const themes = useMantineTheme();
  const [showLoading, setShowLoading] = useState(false);
  const [addAg, { isLoading }] = useAddAgentRechercheMutation();

  const theseSchema = yup.object().shape({
    prenom: yup.string().required("Requis !"),
    nom: yup.string().required("Requis !"),
    email: yup.string().email("Adresse e-mail invalide")
    .required("Entrez votre adresse e-mail"),
    role: yup.string().required("Requis !"),
  });

  const theseFormik = useFormik({
    initialValues: {
      prenom: "", 
      nom: "",
      email: "",
      role: "Agent de service de recherche",
    },
    enableReinitialize: true,
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
      await addAg({
        first_name: values?.prenom,
        last_name: values?.nom,
        email: values?.email,
        role: values?.role,
        password: "12345678",
        super_admin_id: 1,
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
        title={constants.ADD_USER}
      >
        <form onSubmit={theseFormik.handleSubmit}>
          <Container style={{ paddingBottom: "5px" }}>
            <Grid>                
              <Grid.Col xs={6}>
                <TextInput
                  name="prenom"
                  label="Prenom"
                  placeholder="Prenom"
                  withAsterisk
                  value={theseFormik?.values?.prenom}
                  onChange={theseFormik.handleChange}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.prenom && theseFormik.errors.prenom}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <TextInput
                  name="nom"
                  label="Nom"
                  placeholder="Nom"
                  withAsterisk
                  value={theseFormik?.values?.nom}
                  onChange={theseFormik.handleChange}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.nom && theseFormik.errors.nom}
                />
              </Grid.Col>
              <Grid.Col xs={12}>
                <TextInput
                  name="email"
                  label="Email"
                  placeholder="email@domain.com"
                  withAsterisk
                  value={theseFormik?.values?.email}
                  onChange={theseFormik.handleChange}
                  // onChange={(value) => {
                  //     theseFormik?.setFieldValue("email", value);
                  // }}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.email && theseFormik.errors.email}
                />
              </Grid.Col>
              
              <Grid.Col xs={12}>
                <Select
                  name="role"
                  label="Role"
                  placeholder="Role"
                  withAsterisk
                  value={"Agent service de recherche"}
                  onChange={(value) =>
                    theseFormik.setFieldValue("role", value)
                  }
                  onBlur={theseFormik.handleBlur}
                  error={
                    theseFormik.touched.role &&
                    theseFormik.errors.role
                  }
                  searchable
                  data={["Agent service de recherche"]}
                  disabled={true}
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
