import { defineStore } from "pinia";
import axios from "axios";
import jwt_decode from "jwt-decode";
import type { RuleForm } from "env";

export const useAuth = defineStore("auth", () => {
  const getToken = (): string => {
    let token = "";
    const cookies = document.cookie.split(";");
    cookies.forEach((item) => {
      //驗證cooke上有沒有token
      if (item.split("=")[0].trim() === "youbiketest") {
        token = item.split("=")[1];
      }
    });
    return token;
  };
  function checkauth() {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }
  const getUserid = (): RuleForm => {
    const token: string = getToken();
    const decodedToken = jwt_decode(token);
    const { person } = decodedToken as {
      person: RuleForm;
      idt: number;
      exp: number;
    };
    return person;
  };
  return { checkauth, getUserid };
});
