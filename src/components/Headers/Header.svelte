<script>
  // @ts-ignore
  import { user } from "$services/store.js";

  import { navigate } from "svelte-navigator";

  function goToProfile() {
    navigate("/profile");
  }
</script>

<header
  class="bg-gray-200 px-4 py-3 flex items-center justify-between shadow-md"
>
  <h1 class="text-2xl font-bold">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
      on:click={() => navigate("/")}
      class="h-12 w-12 rounded-full cursor-pointer"
      src="assets/images/vagus.jpeg"
      alt="Profile Picture"
    />
  </h1>

  <div class="flex items-center space-x-4">
    <a
      href="/calendar"
      class="p-3 rounded-full hover:bg-red-800 hover:bg-opacity-10 transition duration-300"
    >
      <i class="bi bi-calendar2-week text-xl" />
    </a>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      class="p-3 rounded-full hover:bg-red-800 hover:bg-opacity-10 transition duration-300 cursor-pointer"
      on:click={goToProfile}
    >
      <i class="bi bi-person-circle text-xl" />
    </span>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      class="p-3 rounded-full hover:bg-red-800 hover:bg-opacity-10 transition duration-300 cursor-pointer"
      on:click={() => user.set(null)}
    >
      Çıkış
    </span>
  </div>
</header>
