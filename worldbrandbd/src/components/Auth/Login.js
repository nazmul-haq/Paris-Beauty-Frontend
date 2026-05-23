import { useStatus } from "@/context/contextStatus";
import auth from "@/Firebase/firebase.config";
import postRequest from "@/lib/postRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import * as yup from "yup";

const Login = () => {
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  const {
    setToken,
    setUserData,
    userId,
    setUserId,
    setImage,
    setuserNo,
    setPhone,
  } = useStatus();

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const toggleBtn = () => {
    setVisible(!visible);
  };

  const schema = yup.object().shape({
    phone: yup
      .string()
      .required("The field is required")
      .min(11, "Phone number should be  11 characters")
      .max(11, "Phone number should be  11 characters"),

    password: yup
      .string()
      .min(6, "Password should be at least 6 characters")
      .required("This field is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    let res = await postRequest(`login`, data);

    if (res?.success) {
      toast.success(res?.message);
      setToken(res?.token);
      setUserData(res?.user?.name);
      setUserId(res?.user?.id);
      setImage(res?.user?.avatar);
      setuserNo(res?.user?.phone);
      setPhone(res?.user?.phone);
      setCookie(null, "userId", res?.user?.id, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });

      setCookie(null, "token", res?.token, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      setCookie(null, "user", res?.user?.name, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      setCookie(null, "customerPhone", res?.user?.phone, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      setCookie(null, "image", res?.user?.avatar, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      router.push(`/`);
      reset();
    } else {
      toast.error(res?.message);
    }
  };

  const responseMessage = async (response) => {
    const decoded = jwt_decode(response.credential);
  };

  const errorMessage = (error) => {
    console.log("error", error);
  };

  const handleFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      const res = await postRequest("social-registration", {
        social_type: "facebook",
        social_id: user.accessToken,
        website: "worldbrandbd.com",
        email: user.email || "",
        phone: "",
        name: user.displayName || "",
      });
      // console.log("res", res);
      if (res?.success) {
        toast.success(res?.message);

        setToken(res?.token);
        setUserData(res?.user?.name);
        setUserId(res?.user?.id);
        setImage(res?.user?.avatar);

        setPhone(res?.user?.phone);

        setCookie(null, "userId", res?.user?.id, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        setCookie(null, "token", res?.token, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        setCookie(null, "user", res?.user?.name, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });
        setCookie(null, "customerPhone", res?.user?.phone, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });
        setCookie(null, "image", res?.user?.avatar, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        router.push(`/`);
        reset();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error("Facebook sign-in error:", error);
      toast.error("Facebook sign-in failed");
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      //  console.log(user);

      const res = await postRequest("social-registration", {
        social_type: "google", // use 'google' here
        social_id: user.accessToken,
        website: "worldbrandbd.com",
        email: user.email || "",
        phone: "",
        name: user.displayName || "",
      });

      //  console.log("res", res);

      if (res?.success) {
        toast.success(res?.message);

        setToken(res?.token);
        setUserData(res?.user?.name);
        setUserId(res?.user?.id);
        setImage(res?.user?.avatar);
        setPhone(res?.user?.phone);

        // Set cookies
        setCookie(null, "userId", res?.user?.id, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        setCookie(null, "token", res?.token, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        setCookie(null, "user", res?.user?.name, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        setCookie(null, "customerPhone", res?.user?.phone, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        setCookie(null, "image", res?.user?.avatar, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        router.push(`/`);
        reset();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="mt-4 pb-6">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="relative pb-6">
          <div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-black"
              placeholder="Phone number"
              {...register("phone")}
            />
          </div>
          <div className="absolute top-11 md:left-0 left-0 text-red-600 text-sm">
            {errors.phone?.message}
          </div>
        </div>

        <div className="relative pb-2">
          <div>
            <input
              type={visible ? "text" : "password"}
              className="bg-gray-50 border border-gray-300 text-gray-900 dark:text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter password"
              {...register("password")}
            />
            <div onClick={toggleBtn}>
              {visible ? (
                <svg
                  className="absolute top-2 right-2 text-gray-400 fill-current h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z" />
                </svg>
              ) : (
                <svg
                  className="absolute top-2 right-2 text-gray-400 fill-current h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
              )}
            </div>
          </div>
          <div className="absolute top-11 md:left-0 left-0 text-red-600 text-sm">
            {errors.password?.message}
          </div>
        </div>

        <Link href="/forgot-password">
          <div className="font-semibold text-blue-500 pt-3">
            Forgot password?
          </div>
        </Link>

        <button className="flex justify-center bg-tahiti-500 py-3 rounded-md w-full text-white font-semibold tracking-wide mt-3">
          Sign in
        </button>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleGoogle} // Replace this with your actual handler
            className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-17.4-1.4-34.1-4.1-50.3H272.1v95.1h146.9c-6.3 33.7-25 62.3-53.5 81.4v67.3h86.4c50.6-46.6 81.6-115.3 81.6-193.5z"
                fill="#4285F4"
              />
              <path
                d="M272.1 544.3c72.9 0 134-24.1 178.7-65.3l-86.4-67.3c-24.1 16.2-54.8 25.7-92.3 25.7-70.9 0-131-47.9-152.4-112.1H31.7v70.5c44.7 88.2 135.4 148.5 240.4 148.5z"
                fill="#34A853"
              />
              <path
                d="M119.7 324.4c-10.3-30.6-10.3-63.6 0-94.2V159.7H31.7c-38.2 76.5-38.2 166.4 0 242.9l88-70.5z"
                fill="#FBBC05"
              />
              <path
                d="M272.1 107.1c39.6 0 75.2 13.6 103.1 40.3l77.3-77.3C406.1 25.1 344.9 0 272.1 0 167.1 0 76.4 60.3 31.7 148.5l88 70.5c21.4-64.2 81.5-112 152.4-112z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="mt-4 ">
          <button
            type="button"
            onClick={handleFacebook}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82V14.708h-3.422V11.08h3.422V8.413c0-3.39 2.072-5.238 5.096-5.238 1.448 0 2.694.108 3.056.156v3.543h-2.098c-1.645 0-1.963.781-1.963 1.926v2.522h3.926l-.512 3.627h-3.414V24h6.692C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
            </svg>
            Sign in with Facebook
          </button>
        </div>
      </form>
      {/* <button
        className="flex justify-center bg-black py-3 rounded-md w-full text-white font-semibold tracking-wide mt-3"
        onClick={() => router.push(`/reseller-signin`)}
      >
        Re-seller sign in
      </button> */}
    </div>
  );
};

export default Login;
