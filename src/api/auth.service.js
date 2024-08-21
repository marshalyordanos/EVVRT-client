import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(email, password) {
    console.log("inside login service");
    return api
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("response", response);
        if (response.data.token) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register(username, email, password) {
    return api.post("/auth/signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return TokenService.getUser();
  }

  async checkPermmision(permmission, value) {
    const res = await api.get(`/auth/checkPermmission/${permmission}/${value}`);

    return res.data?.data;
  }
}

export default new AuthService();
