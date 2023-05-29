<script>
  // @ts-nocheck

  import AutoComplete from "simple-svelte-autocomplete";
  import ENV from "../env.js";

  export let message = null;
  export let answer = () => {};

  let title;
  let selectedUser;

  async function getUser(keyword) {
    const url =
      `${ENV.API_URL}/user/?format=json&name=` + encodeURIComponent(keyword);

    const response = await fetch(url);
    const json = await response.json();

    return json.users;
  }
</script>

<div class="min-h-screen flex justify-center items-center bg-gray-100">
  <div class="max-w-lg mx-auto">
    <div class="bg-white shadow-lg rounded-lg p-4">
      <h2 class="text-2xl mb-2 text-center text-gray-800">{message}</h2>

      <div class="mt-4">
        <div class="mb-4">
          <AutoComplete
            class="border rounded-md px-3 py-2 w-full text-gray-800"
            searchFunction={getUser}
            delay="200"
            placeholder="User"
            maxItemsToShowInList="5"
            localFiltering={true}
            labelFieldName="fullName"
            valueFieldName="_id"
            bind:selectedItem={selectedUser}
          />
        </div>

        <div>
          <input
            bind:value={title}
            class="rounded-md border border-gray-300 px-3 py-2 w-full placeholder-italic placeholder-gray-400 text-lg text-center text-gray-800"
            type="text"
            placeholder="Not"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-4 space-x-4">
      <button
        on:click={() => answer(true, selectedUser, title)}
        class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
        type="button"
      >
        Onayla
      </button>
      <button
        on:click={() => answer(false, selectedUser, title)}
        class="bg-rose-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
        type="button"
      >
        İptal
      </button>
    </div>
  </div>
</div>
