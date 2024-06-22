import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { theme } from "../theme/theme";
import "./styles.css";
import styled from "@emotion/styled";
import axios from "axios";

export const LoginWebAdapter = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openPwd, setOpenPwd] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setShowLoading(true);
    // if(loginFormik?.values?.email === "admin@gmail.com" && loginFormik?.values?.password === "12345678") {
    //   navigate("/users");
    //   setShowLoading(false);
    //   sessionStorage.setItem("roles", "admin");
    //   return;
    // }
    try {
      axios.post("http://localhost:8000/api/login", {
        email: loginFormik?.values?.email,
        password: loginFormik?.values?.password
      })
      .then((response: any) => {
        // Handle successful login response
       console.log("Data " + JSON.stringify(response?.data?.data));
        if (response?.data?.data?.role === "Agent de service recherche") {
            navigate("/theses");
            setShowLoading(false);
            sessionStorage.setItem("roles", "research_agent");
          } else if(response?.data?.data?.role === "Super Admin") {
            navigate("/users");
            setShowLoading(false);
            sessionStorage.setItem("roles", "admin");
        }
        else if(response?.data?.data?.role === "Agent de bibliotheque") {
          navigate("/theses");
          setShowLoading(false);
          sessionStorage.setItem("roles", "agent_bibliotheque");
      }
      
      sessionStorage.setItem("full_name", `${response?.data?.data?.first_name} ${response?.data?.data?.last_name}`);
      sessionStorage.setItem("status", `${response?.data?.data?.role}`);
      })
      .catch((error: any) => {
        loginFormik?.setFieldError("email", "L'email ou le mot de passe est incorrect");
        loginFormik?.setFieldError("password", "L'email ou le mot de passe est incorrect");
        setShowLoading(false);
    });
      
    } catch (error) {
      console.error("Error in Login " + error);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationYup = {
    email: yup
      .string()
      .email("Adresse e-mail invalide")
      .required("Entrez votre adresse e-mail"),
    password: yup
      .string()
      // .min(8, "votre mot de passe doit contenir au moins 8 caractères")
      .required("Entrez votre mot de passe"),
  };

  const loginSchema = yup.object().shape(validationYup);

  const loginFormikObject = {
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values: any) => {
      handleSubmit(values);
    },
  };

  const loginFormik = useFormik(loginFormikObject);

  const handleForgotPassword = () => {
    setOpenPwd(true);
  };

  const handleSignup = () => {
    setOpen(true);
  };

  return (
    <>
      <form onSubmit={loginFormik.handleSubmit}>
        <Container size={420} my={30} style={{ marginTop: "100px" }}>
          <Paper withBorder shadow="ld" p={30} mt={30} radius="md">
            <Title
              align="center"
              sx={() => ({
                fontFamily: `${theme.mainFont}`,
                color: `${theme.mainColor}`,
                fontWeight: 900,
                marginBottom: "1rem",
                fontSize: "25px",
              })}
            >
              Connectez-vous à votre compte
            </Title>
            <TextInput
              label="Email"
              name="email"
              placeholder="email"
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              error={loginFormik.touched.email && loginFormik.errors.email}
              withAsterisk
              labelProps={{ className: "custom-text-input" }}
            />
            <PasswordInput
              label="Mot de passe"
              name="password"
              placeholder="mot de passe"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              error={
                loginFormik.touched.password && loginFormik.errors.password
              }
              mt="md"
              withAsterisk
              labelProps={{ className: "custom-text-input" }}
            />
            <Button
              fullWidth
              mt="xl"
              type="submit"
              style={{
                // borderRadius: "40px",
                backgroundColor: `${theme.mainColor}`,
                // boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              Se connecter
            </Button>
            <Group
              position="apart"
              mt="lg"
              style={{
                color: `${theme.mainColor}`,
                textDecoration: "underline",
                justifyContent: "flex-end",
              }}
            >
              {/* <Checkbox label="Remember me" sx={{ lineHeight: 1 }} /> */}
              <Anchor<"a">
                onClick={(event: any) => {
                  event.preventDefault();
                  handleForgotPassword();
                }}
                href="#"
                size="sm"
              >
                Mot de passe oublié ?
              </Anchor>
            </Group>
          </Paper>
          <SignUpZone></SignUpZone>
        </Container>
      </form>
      {/* <ForgotPassword opened={openPwd} setOpened={setOpenPwd} /> */}
      <LoadingOverlay visible={showLoading} />
    </>
  );
};
const SignUpZone = styled.div`
  display: flex;
  align-items: center;
  gap: 23px;
  margin: 32px 0;
`;
const Divider1 = styled.div`
  height: 2px;
  flex: 1 0 0;
  background: ${theme.lightColor};
  opacity: 0.5;
`;
