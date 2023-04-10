<script>
  // @ts-nocheck
  import { user } from "$services/store.js";
</script>

<header>
  <!-- <img src="vagus.jpeg" alt="" width="100px" /> -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <h1 class="flex">
    <img class="mask mask-circle" width="60px" src="assets/images/vagus.jpeg" />
  </h1>

  <div class="icons nav">
    <span class="add-diary">
      <a href="/newDiary">
        <i
          class="bi bi-calendar2-week p-3 border-b-2 border-red-800 border-opacity-0 hover:border-opacity-100 hover:text-red-800 duration-200"
        /></a
      >
    </span>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class="cursor-pointer">
      <i
        class="bi bi-person-circle p-3 border-b-2 border-red-800 border-opacity-0 hover:border-opacity-100 hover:text-red-800 duration-200"
      />
    </span>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click={() => user.set(null)} class="cursor-pointer"> Çıkış </span>
  </div>
</header>

<style>
  header {
    background: #f7f7f7;
    margin: 8px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 1px 15px;
  }
  h1 {
    margin: 0;
    margin-left: 20px;
    text-align: left;
    color: black;
    font: bold;
    font-size: 40px;
  }
  i {
    font-size: 30px;
  }
  .add-diary {
    margin-right: 25px;
  }
  .icons {
    text-align: end;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
  }
</style>
