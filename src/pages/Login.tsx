import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "rifatswd1234",
    },
  });
  const [login, { data, error }] = useLoginMutation();
  console.log("data", data);
  console.log("error", error);
  const onSubmit = (data) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    login(userInfo);
  };
  return (
    <form style={{ margin: "20px" }} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">Id</label> <br />
        <input type="text" id="id" {...register("userId")} />
      </div>{" "}
      <br />
      <div>
        <label htmlFor="password">Password</label> <br />
        <input type="text" id="password" {...register("password")} />
      </div>{" "}
      <br />
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
