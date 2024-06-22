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
import { useEditLaboratoireMutation, useGetLaboratoireQuery } from "../redux/features/Laboratoires/sliceLaboratoire";
import { ModalProps } from "./types";


const UpdateForm = ({ opened, setOpened, lab_id }: ModalProps) => {
  const themes = useMantineTheme();
  const [showLoading, setShowLoading] = useState(false);
  const [updateLab, { isLoading: updateLoading }] = useEditLaboratoireMutation();

  const theseSchema = yup.object().shape({
    nomLaboratoire: yup.string().required("Requis !"),
  });

  const {
    isLoading, 
    isError,
    error,
    data: laboratoire
  } = useGetLaboratoireQuery(lab_id);

  console.log("data " + JSON.stringify(laboratoire));
  const theseFormik = useFormik({
    initialValues: {
      name: laboratoire?.data?.name || "", 
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
      await updateLab({
        id: lab_id,
        name: values?.name,
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
        title={constants.UPDATE_LABORATOIRE}
      >
        <form onSubmit={theseFormik.handleSubmit}>
          <Container style={{ paddingBottom: "5px" }}>
            <Grid>                
              <Grid.Col xs={12}>
                <TextInput
                  name="name"
                  label="Nom de laboratoire"
                  placeholder="Nom de laboratoire"
                  withAsterisk
                  value={theseFormik?.values?.name}
                  onChange={theseFormik.handleChange}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.name && theseFormik.errors.name ? 
                    theseFormik.touched.name.toString() && theseFormik.errors.name.toString()
                     : ""
                  }
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
