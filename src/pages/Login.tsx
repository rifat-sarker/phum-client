import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "rifatswd1234",
    },
  });

  const [login] = useLoginMutation();
  // console.log("data", data);
  // console.log("error", error);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      console.log(user);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login success", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
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
