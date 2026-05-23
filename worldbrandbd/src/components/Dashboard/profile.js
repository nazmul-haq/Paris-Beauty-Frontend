import { useStatus } from "@/context/contextStatus";
import postRequest from "@/lib/postRequest";
import request from "@/lib/request";
import Image from "next/image";
import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { setImage, token, setuserNo, setUserData } = useStatus();

  const [imageUrl, setimageUrl] = useState("");

  const [avatarName, setAvatarName] = useState("");

  const [address, setAddress] = useState("");

  const [phone, setPhone] = useState("");

  const [info, setInfo] = useState("");

  const [isAlive, setIsAlive] = useState(false);

  const [userProfileData, setUserProfileData] = useState({});

  const [loading, setLoading] = useState(true);

  const [gender, setGender] = useState(null);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handlePicChange = async (data) => {
    let file = data[0];
    const base64 = await convertBase64(file);
    setimageUrl(base64);
  };

  useEffect(() => {
    if (token) {
      const profileData = async () => {
        let res = await request(`my-profile`);
        setAddress(res?.data?.information);
        setAvatarName(res?.data?.name);
        setGender(res?.data?.gender);
        setPhone(res?.data?.phone);
        setInfo(res?.data?.information);
        setUserProfileData(res?.data);
        setImage(res?.data?.avatar);
        setuserNo(res?.data?.phone);
        setUserData(res?.data?.name);
        setCookie(null, "user", res?.data?.name, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });
        setCookie(null, "userNo", res?.data?.phone, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });
        setCookie(null, "image", res?.data?.avatar, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });
        setLoading(false);
      };
      profileData();
    }
  }, [isAlive]);

  // useEffect(() => {
  //   setImage(userProfileData?.avatar);
  // }, [userProfileData]);

  // console.log("userProfileData", userProfileData);

  const handleSubmit = async () => {
    if (phone) {
      var bdMobilePattern = /^(\+)?(88)?01[3-9]\d{8}$/;
      if (bdMobilePattern.test(phone)) {
      } else {
        toast.error("Not a valid phone number");

        return;
      }
    }
    let res = await postRequest(`update-profile`, {
      name: avatarName ? avatarName : "",
      information: address,
      phone: phone,
      avatar: imageUrl ? imageUrl : "",
      gender: gender,
    });
    if (res?.success) {
      toast.success(`${res?.message}`);
      setIsAlive(!isAlive);
    } else {
      toast.error(`${res?.message}`);
    }
  };

  return (
    <div className="">
      <div className="text-[13px]">Manage Profile</div>

      <div className="bg-white p-3 mt-3 rounded-md">
        <div>
          <div>
            <div className="py-4 w-[200px]">
              <label className="text-black">Your Profile Image</label>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => handlePicChange(e.target.files)}
              />
              {imageUrl ? (
                <div className="py-2">
                  <Image
                    alt="image"
                    width={100}
                    height={100}
                    src={`${imageUrl}`}
                    onError={(e) => {
                      e.target.src = "/assets/placeholder_600x.webp";
                    }}
                  />
                </div>
              ) : loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "170px",
                  }}
                >
                  {" "}
                  <ThreeDots
                    height="30"
                    width="80"
                    radius="9"
                    color="#1F2937"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                </div>
              ) : userProfileData == undefined ||
                userProfileData?.avatar == "" ? null : (
                <div className="mt-2">
                  <Image
                    src={`${userProfileData?.avatar}`}
                    className="h-[130px] w-[130px]"
                    height={130}
                    width={130}
                    alt="avatar"
                    onError={(e) => {
                      e.target.src = "/assets/placeholder_600x.webp";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="w-full">
              <div className="text-sm font-normal  py-2 text-black">Name</div>
              <input
                className=" h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black border border-tahiti-500 placeholder:text-sm text-sm"
                placeholder="Enter name..."
                defaultValue={avatarName}
                onChange={(e) => setAvatarName(e.target.value)}
              />
            </div>

            <div className="w-full">
              <div className="text-sm font-normal  py-2 text-black">Phone</div>
              <input
                className=" h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black border border-tahiti-500 placeholder:text-sm text-sm"
                placeholder="Enter phone number..."
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="w-full mt-3">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Address details
              </label>
              <textarea
                defaultValue={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="please give address...."
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 outline-tahiti-500 rounded-lg border border-tahiti-500 focus:ring-tahiti-500 focus:border-tahiti-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
          </div>
          <div className="mt-2 flex justify-end">
            <button
              className="bg-tahiti-500 shadow-md text-white hover:bg-black  hover:text-white px-8 py-1  cursor-pointer"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
