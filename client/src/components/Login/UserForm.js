import { useState } from "react";

const Field = ({ children }) => (
  <>
    {children}
    <br />
  </>
);

const Input = ({ value, onChange, ...props }) => (
  <input
    {...props}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  />
);

const SubmitButton = (props) => <button {...props}>submit</button>;

const UserForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Field>
        email: <Input value={email} onChange={setEmail} />
      </Field>
      <Field>
        password:{" "}
        <Input value={password} onChange={setPassword} type="password" />
      </Field>
      <SubmitButton onClick={() => onSubmit(email, password)} />
    </>
  );
};

export default UserForm;
