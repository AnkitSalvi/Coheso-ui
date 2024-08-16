import React, { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import Header from "../../Components/Header/Header";

// Validation schema using yup
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const user = await login(values.email, values.password);
        if (user) {
          navigate("/home");
        } else {
          setErrorMessage("Login failed. Please check your credentials.");
        }
      } catch (error) {
        setErrorMessage("An error occurred during login. Please try again.");
      }
    },
  });

  return (
    <>
      {" "}
      <Header />
      <div className="login-container">
        <Card className="login-card">
          <CardContent>
            <Typography variant="h5" className="login-title">
              Login
            </Typography>
            {errorMessage && (
              <Alert severity="error" className="login-error">
                {errorMessage}
              </Alert>
            )}
            <form onSubmit={formik.handleSubmit} className="login-form">
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="dense"
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                margin="dense"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="login-button"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
