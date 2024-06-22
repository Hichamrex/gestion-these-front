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
import { useGetDepartementsQuery } from "../redux/features/Departements/sliceDepartement";
import { useAddLaboratoireMutation } from "../redux/features/Laboratoires/sliceLaboratoire";

interface InvoiceOpenProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddForm = ({ opened, setOpened }: InvoiceOpenProps) => {
  const themes = useMantineTheme();
  const [showLoading, setShowLoading] = useState(false);
  const [addLab, { isLoading }] = useAddLaboratoireMutation();

  const {
    isLoading: isLoadingD, 
    isError: isErrorD,
    error: errorD,
    data: departements
  } = useGetDepartementsQuery({});

  const theseSchema = yup.object().shape({
    nomLaboratoire: yup.string().required("Requis !"),
    departement: yup.string().required("Requis !")
  });

  const theseFormik = useFormik({
    initialValues: {
      nomLaboratoire: "", 
      departement: ""
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
    // setShowLoading(true);
    try {
      await addLab({
        name: values?.nomLaboratoire,
        departement_id: values?.departement,
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
        title={constants.ADD_LABORATOIRE}
      >
        <form onSubmit={theseFormik.handleSubmit}>
          <Container style={{ paddingBottom: "5px" }}>
            <Grid>
            <Grid.Col xs={12}>
                <Select
                  name="departement"
                  label="Nom du Departement"
                  placeholder="Nom du Departement"
                  withAsterisk
                  value={theseFormik?.values?.departement}
                  onChange={(value) => {
                    theseFormik?.setFieldValue("departement", value);
                  }}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.departement && theseFormik.errors.departement}
                  // data={departements?.data?.map((d: any) => d.name) || []}
                  data={departements?.data?.map((d: any) => ({
                    label: d.name,
                    value: d.id,
                    id: d.id,
                  }))}
                  searchable
                  nothingFound={"Ajouter un departement"}
                />
              </Grid.Col>                
              <Grid.Col xs={12}>
                <TextInput
                  name="nomLaboratoire"
                  label="Nom de laboratoire"
                  placeholder="Nom de laboratoire"
                  withAsterisk
                  value={theseFormik?.values?.nomLaboratoire}
                  onChange={theseFormik.handleChange}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.nomLaboratoire && theseFormik.errors.nomLaboratoire}
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
