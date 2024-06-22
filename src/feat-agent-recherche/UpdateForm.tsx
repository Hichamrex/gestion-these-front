import { useState } from "react";
import {
  Modal,
  Button,
  useMantineTheme,
  LoadingOverlay,
  TextInput,
  Select,
} from "@mantine/core";
import { Container, Grid, rem } from "@mantine/core";
import { Box } from "@mui/material";
import { IconSend } from "@tabler/icons-react";
import * as yup from "yup";
import { useFormik } from "formik";
import { theme } from "../theme/theme";
import { useMediaQuery } from "@mantine/hooks";
import { constants } from "../common/constants";
import { useEditAgentRechercheMutation, useGetAgentRechercheQuery } from "../redux/features/AgentRecherche/sliceAgentRecherche";

interface InvoiceOpenProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  ag_id: number
}

const UpdateForm = ({ opened, setOpened, ag_id }: InvoiceOpenProps) => {
  const themes = useMantineTheme();
  const [showLoading, setShowLoading] = useState(false);
  const [editAg, { isLoading }] = useEditAgentRechercheMutation();

  const {
    isLoading: isLoadingAG, 
    isError,
    error,
    data: agRecherche
  } = useGetAgentRechercheQuery(ag_id);

  const theseSchema = yup.object().shape({
    prenom: yup.string().required("Requis !"),
    nom: yup.string().required("Requis !"),
    email: yup.string().required("Requis !"),
    role: yup.string().required("Requis !"),
  });

  const theseFormik = useFormik({
    initialValues: {
      prenom: agRecherche?.data?.first_name || "",
      nom: agRecherche?.data?.last_name || "",
      email: agRecherche?.data?.email || "",
      role: agRecherche?.data?.role || "",
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
      await editAg({
        id: ag_id,
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
        title={constants.UPDATE_USER}
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
                  error={theseFormik.touched.prenom && theseFormik.errors.prenom ? 
                    theseFormik.touched.prenom.toString() && theseFormik.errors.prenom.toString() : ""
                  }
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
                  error={theseFormik.touched.nom && theseFormik.errors.nom ? 
                    theseFormik.touched.nom.toString() && theseFormik.errors.nom.toString() : ""
                  }
                />
              </Grid.Col>
              <Grid.Col xs={12}>
                <TextInput
                  name="emailrole"
                  label="Email"
                  placeholder="email@domain.com"
                  withAsterisk
                  value={theseFormik?.values?.email}
                  onChange={theseFormik.handleChange}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.email && theseFormik.errors.email ? 
                    theseFormik.touched.email.toString() && theseFormik.errors.email.toString()
                    : ""
                  }
                />
              </Grid.Col>
              
              <Grid.Col xs={12}>
                <Select
                  name="role"
                  label="Role"
                  placeholder="Role"
                  withAsterisk
                  value={theseFormik.values.role}
                  onChange={(value) =>
                    theseFormik.setFieldValue("role", value)
                  }
                  // onBlur={theseFormik.handleBlur}
                  error={ theseFormik.touched.role &&
                    theseFormik.errors.role ?
                    theseFormik.touched.role.toString() &&
                    theseFormik.errors.role?.toString() : ""
                  }
                  searchable
                  disabled={true}
                  data={["Agent service de recherche", 
                    ]}
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

export default UpdateForm;
