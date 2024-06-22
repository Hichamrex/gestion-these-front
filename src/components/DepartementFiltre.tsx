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
import { useFormik } from "formik";
import { useMediaQuery } from "@mantine/hooks";

interface InvoiceOpenProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const DepartementFiltre = () => {
  const themes = useMantineTheme();
  const [showLoading, setShowLoading] = useState(false);

  const theseFormik = useFormik({
    initialValues: {
        nomDepartement: "",
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
              <Grid.Col xs={12}>
                <TextInput
                  name="nomDepartement"
                  label="Nom de departement"
                  placeholder="Nom de departement"
                  withAsterisk
                  value={theseFormik?.values?.nomDepartement}
                  onChange={theseFormik.handleChange}
                  onBlur={theseFormik.handleBlur}
                  error={theseFormik.touched.nomDepartement && theseFormik.errors.nomDepartement}
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

export default DepartementFiltre;
