import axios from "axios";
import TokenService from "./token.service";

import { message } from "antd";
import { logout } from "../redux/auth/authSlice";

const handleErrorResponse = (errorMessage) => {
  message.error(errorMessage);
};

const instance = axios.create({
  baseURL: "https://ebtbs.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let isreFrasing = false;

const setup = (store) => {
  instance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      console.log("token", token);
      if (token) {
        config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;

  instance.interceptors.response.use(
    (res) => {
      isreFrasing = false;
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      console.log("ppppppppppppppp0000000pppp-----top", err.response);
      if (
        err?.response?.data?.message == "invalid authentication " &&
        err?.response?.status == 401
      ) {
        TokenService.removeUser();
        dispatch(logout());
      }

      if (err.code == "ERR_NETWORK") {
        message.info("the server is down retry after some time!");
      } else {
        message.info(err.response?.data?.message);
      }
      // if (originalConfig.url !== "/auth/signin" && err.response) {
      //   console.log("ppppppppppppppp0000000pppp", isreFrasing);

      //   if (err.response.status === 401 && !isreFrasing) {
      //     originalConfig._retry = true;
      //     isreFrasing = true;

      //     console.log("ppppppppppppppppppp", isreFrasing);

      //     try {
      //       const rs = await instance.post("/auth/refreshtoken", {
      //         refreshToken: TokenService.getLocalRefreshToken(),
      //       });

      //       const { accessToken, refreshToken } = rs.data;
      //       TokenService.updateLocalAccessToken(accessToken);
      //       TokenService.updateLOcalRefreshToken(refreshToken);

      //       return instance(originalConfig);
      //     } catch (_error) {
      //       TokenService.removeUser();
      //       dispatch(logout());

      //       handleErrorResponse(err.response?.data?.message || err.message);

      //       return Promise.reject(_error);
      //     }
      //   } else {
      //     return handleErrorResponse(
      //       err.response?.data?.message || err.message
      //     );
      //   }
      // } else if (
      //   err.response?.status !== 401 ||
      //   (originalConfig.url === "/auth/signin" && err.response)
      // ) {
      //   return handleErrorResponse(err.response?.data?.message || err.message);
      // }

      return Promise.reject(err);
    }
  );
};
export default instance;
export { setup };
