<script>
  import { navigate } from "svelte-navigator";
  import RestService from "../../services/rest";
  import { user } from "../../services/store.js";

  let emailFromInput;
  let password;

  let error = "";

  const login = async () => {
    let response = await RestService.login(emailFromInput, password);
    if (response && response.status) {
      user.set({
        email: response.email,
        fullName: response.fullName,
        token: response.token,
        userId: response.userId,
      });
      console.log("LOGIN BAŞARILI");
      navigate("/dashboard");
    } else {
      console.log("LOGIN ERROR", response);
      error = response.message;
      emailFromInput = "";
      password = "";
    }
  };
</script>

<main>
  <h1 class="p-3 border-b-2 border-black border-opacity-100 duration-200">
    LOGIN
  </h1>
  <div
    class="login-card flex flex-col gap-y-4 rounded-xl border border-slate-500"
  >
    <div>
      <h3 class="mt-[50px] ml-14 mb-5 text-xl flex justify-start opacity-60">
        Email
      </h3>
      <input
        bind:value={emailFromInput}
        class="text-xl p-2 border rounded-md border-slate-500"
        type="text"
        placeholder="User Name"
      />
    </div>
    <div>
      <h3 class="mt-[50px] ml-14 mb-5 text-xl flex justify-start opacity-60">
        Password
      </h3>
      <input
        bind:value={password}
        class="text-xl p-2 border rounded-md border-slate-500 focus:blur-sm"
        type="password"
        placeholder="Password"
      />
    </div>
    <h2 class="text-red-400 pt-10">{error}</h2>
    <div>
      <button
        class="self-end p-2 pr-5 pl-5 hover:bg-gray-300 bg-gray-400 rounded-md mb-[20px] mt-[50px]"
        on:click|preventDefault={login}>Login</button
      >
    </div>
    <a class="mb-[50px] hover:text-red-800" href="/forgetPassword"
      >Forget Password</a
    >
  </div>
</main>

<style>
  main {
    max-width: 360px;
    margin: 40px auto;
    font-family: "Source Code Pro", monospace;
    text-align: center;
  }

  h1 {
    font-size: 30px;
    margin-bottom: 15px;
  }
  .login-card {
    box-shadow: 0px 3px 7px #888888;
  }
</style>
