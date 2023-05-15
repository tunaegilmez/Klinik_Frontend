<script>
  // @ts-ignore
  import Header from "$components/Headers/Header.svelte";
  // @ts-ignore
  import Footer from "$components/Footers/Footer.svelte";
  import { Router, Route, navigate } from "svelte-navigator";
  import Users from "./views/Admin/Users.svelte";
  import Login from "./views/auth/Login.svelte";
  import Register from "./views/auth/Register.svelte";
  import Profile from "./views/user/profile.svelte";
  import { onDestroy, onMount } from "svelte";
  // @ts-ignore
  import { user } from "$services/store";
  // @ts-ignore
  import Calendar from "./views/Admin/Calendar.svelte";

  import Modal from "svelte-simple-modal";
  import { modal } from "../src/services/store.js";

  let userAuthSubscription;

  onMount(async () => {
    userAuthSubscription = user.subscribe(async auth => {
      if (!auth && window.location.pathname.indexOf("register") == -1) {
        navigate("/login");
      }
    });
  });

  onDestroy(() => {
    userAuthSubscription;
  });
</script>

<Header />

<Modal show={$modal} />

<Router primary={false}>
  <Route path="" component={Users} />
  <Route path="calendar" component={Calendar} />
  <Route path="login" component={Login} />
  <Route path="register" component={Register} />
  <Route path="profile" component={Profile} />
</Router>

<Footer />
