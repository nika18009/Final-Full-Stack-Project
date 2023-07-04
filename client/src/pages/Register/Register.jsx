import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContex";
import { LOGIN_ROUTE } from "../../routes/const";
import Input from "../../components/FormItem/FormItem";
import Button from "../../components/Button/Button";

const Register = () => {
  const { handleRegister } = useContext(UserContext);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, surname, date, email, password };
    handleRegister(user);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Your name</label>
      <Input
        //   containerClassname="form-item"
        type="text"
        placeholder="First Last"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Email</label>
      <Input
        label="Email"
        //   containerClassname="form-item"
        placeholder="you@email.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password</label>
      <Input
        label="Password"
        //   containerClassname="form-item"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="button-container">
        <Button>Register</Button>
        <Link to={LOGIN_ROUTE}>Back to Login</Link>
      </div>
    </form>
  );
};

export default Register;
