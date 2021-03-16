<template>
  <div class="login">
    <div ref="logForm" class="main login">
      <p class="sign">Sign in</p>
      <form class="form1" />
      <label>
        <input
          v-model="email"
          class="un "
          type="text"
          align="center"
          placeholder="Email"
        />
      </label>
      <label>
        <input
          v-model="password"
          class="pass"
          type="password"
          align="center"
          placeholder="Password"
        />
      </label>
      <a class="submit" @click="handleLogin()">Log in</a>
      <a class="" @click="handleChange('login')">Register</a>
    </div>
    <div ref="regForm" class="main register hidden">
      <p class="sign">Register</p>
      <form class="form1" />
      <label>
        <input
          v-model="name"
          class="un "
          type="text"
          align="center"
          placeholder="Name"
        />
      </label>
      <label>
        <input
          v-model="email"
          class="un "
          type="text"
          align="center"
          placeholder="Email"
        />
      </label>
      <label>
        <input
          v-model="password"
          class="pass"
          type="password"
          align="center"
          placeholder="Password"
        />
      </label>
      <a class="submit" @click="handleRegister('reg')">Register</a>
      <a @click="handleChange()">Log in</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getCurrentInstance, ref } from "vue";
import router from "@/router";
export default {
  name: "Login",
  setup() {
    const internalInstance = getCurrentInstance();
    const axios = internalInstance.appContext.config.globalProperties.axios;
    let email = ref(null);
    let name = ref(null);
    let password = ref(null);
    let error = ref(null);
    let regForm = ref(null);
    let logForm = ref(null);
    let handleChange = form => {
      if (form === "login") {
        logForm.value.classList.add("hidden");
        regForm.value.classList.remove("hidden");
      } else {
        regForm.value.classList.add("hidden");
        logForm.value.classList.remove("hidden");
      }
    };
    let handleLogin = () => {
      axios
        .post(`http://localhost:3001/user/login`, {
          email: email.value,
          password: password.value
        })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          router.replace({ name: "Home" });
        })
        .catch(err => {
          error.value = err.message;
          console.log(err);
        });
    };
    let handleRegister = () => {
      axios
        .post(`http://localhost:3001/user/register`, {
          name: name.value,
          email: email.value,
          password: password.value
        })
        .then(() => {
          regForm.value.classList.add("hidden");
          logForm.value.classList.remove("hidden");
        })
        .catch(err => {
          error.value = err.message;
          console.log(err);
        });
    };
    return {
      email,
      name,
      password,
      handleLogin,
      handleChange,
      handleRegister,
      regForm,
      logForm
    };
  }
};
</script>
<style>
body {
  background-color: #dce9fc;
  font-family: "Ubuntu", sans-serif;
}

.logo {
  width: 30%;
  margin-bottom: -5%;
}
header {
  text-align: center;
  img {
    max-height: 100px;
  }
}
.main {
  background-color: #ffffff;
  width: 400px;
  height: 400px;
  margin: 7em auto;
  border-radius: 1.5em;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
}

.sign {
  padding-top: 40px;
  color: #2a75bb;
  font-family: "Ubuntu", sans-serif;
  font-weight: bold;
  font-size: 23px;
}

.un {
  width: 76%;
  color: rgb(38, 50, 56);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  background: rgba(136, 126, 126, 0.04);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.02);
  margin-bottom: 50px;
  margin-left: 46px;
  text-align: center;
  margin-bottom: 27px;
  font-family: "Ubuntu", sans-serif;
}

form.form1 {
  padding-top: 40px;
}

.pass {
  width: 76%;
  color: rgb(38, 50, 56);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
  background: rgba(136, 126, 126, 0.04);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.02);
  margin-bottom: 50px;
  margin-left: 46px;
  text-align: center;
  margin-bottom: 27px;
  font-family: "Ubuntu", sans-serif;
}

.un:focus,
.pass:focus {
  border: 2px solid rgba(0, 0, 0, 0.18) !important;
}

.submit {
  cursor: pointer;
  border-radius: 5em;
  color: #fff;
  background: linear-gradient(to right, #2a75bb, #c7a008);
  border: 0;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 10px;
  padding-top: 10px;
  font-family: "Ubuntu", sans-serif;
  margin-left: 35%;
  margin-right: 2%;
  font-size: 13px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
}

a {
  text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
  color: darkblue;
  text-decoration: none;
}
</style>
