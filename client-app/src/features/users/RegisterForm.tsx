import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";

const RegisterForm = () => {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .register(values)
          .catch((error) => setErrors({ error: "Invalid email or password" }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Login to Reeactivities"
            color="teal"
            textAlign="center"
          />
          <TextInput placeholder="Email" name="email" />
          <TextInput placeholder="Display Name" name="displayName" />
          <TextInput placeholder="Username" name="username" />
          <TextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(RegisterForm);
