<script>
  import RestService from "../../services/rest";
  import { navigate } from "svelte-navigator";
  // import { user } from "../../services/store";

  let fullNameFromUnput;
  let emailFromInput;
  let password;

  const register = async () => {
    let response = await RestService.register(
      fullNameFromUnput,
      emailFromInput,
      password
    );
    if (response && response.status) {
      console.log("REGISTER BAŞARILI");
      navigate("/login");
    } else {
      console.log("REGISTER ERROR", response);
      // fullNameFromUnput = "";
      // emailFromInput = "";
      // password = "";
    }
  };
</script>

<main>
  <h1 class="p-3 border-b-2 border-black border-opacity-100 duration-200">
    Register
  </h1>
  <div
    class="login-card flex flex-col gap-y-4 rounded-xl border border-slate-500"
  >
    <div>
      <h3 class="mt-[50px] ml-14 mb-2 text-xl flex justify-start opacity-60">
        Full Name
      </h3>
      <input
        class="text-xl p-2 border rounded-md border-slate-500"
        type="text"
        placeholder="User Name"
        bind:value={fullNameFromUnput}
      />
    </div>
    <div>
      <h3 class="mt-[50px] ml-14 mb-2 text-xl flex justify-start opacity-60">
        E-Mail
      </h3>
      <input
        class="text-xl p-2 border rounded-md border-slate-500"
        type="text"
        placeholder="E-Mail"
        bind:value={emailFromInput}
      />
    </div>
    <div>
      <h3 class="mt-[50px] ml-14 mb-2 text-xl flex justify-start opacity-60">
        Create Password
      </h3>
      <input
        class="text-xl p-2 border rounded-md border-slate-500 focus:blur-sm"
        type="password"
        placeholder="Password"
        bind:value={password}
      />
    </div>
    <div>
      <button
        class="self-end p-2 pr-5 pl-5 hover:bg-gray-300 bg-gray-400 rounded-md mb-[30px] mt-[50px]"
        on:click|preventDefault={register}>Register</button
      >
    </div>
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
