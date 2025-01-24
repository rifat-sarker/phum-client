import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "rifatswd1234",
    },
  });

  const [login, { data, error }] = useLoginMutation();
  // console.log("data", data);
  // console.log("error", error);

  const onSubmit = async (data) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken);
    console.log(user);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
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
