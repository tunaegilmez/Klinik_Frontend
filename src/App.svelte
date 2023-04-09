<script>
  import Header from "$components/Headers/Header.svelte";
  import Footer from "$components/Footers/Footer.svelte";
  import { Router, Route, navigate } from "svelte-navigator";
  import Dashboard from "./views/Admin/Dashboard.svelte";
  import Login from "./views/auth/Login.svelte";
  import Register from "./views/auth/Register.svelte";
  import { onDestroy, onMount } from "svelte";
  import { user } from "$services/store";

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

<Router primary={false}>
  <Route path="" component={Dashboard} />
  <Route path="login" component={Login} />
  <Route path="register" component={Register} />
</Router>

<Footer />
