<script>
  // @ts-nocheck

  export let message = null;
  export let answer = () => {};

  let selectedPackageType;
</script>

<div class="flex justify-center">
  <h1 class="text-lg">
    {message}
  </h1>
</div>

<div class="flex justify-center mt-4">
  <select
    class="p-2 pl-3 pr-3 rounded-md border-2 border-black"
    bind:value={selectedPackageType}
  >
    <option value="">Seans</option>
    <option value="8">8 Seans</option>
    <option value="12">12 seans</option>
  </select>
</div>

<div class="flex flex-row justify-center items-center gap-4 mt-4">
  <button
    on:click={() => answer(true, selectedPackageType)}
    class="bg-green-500 hover:bg-green-600 text-white font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
    type="button"
  >
    Onayla
  </button>
  <button
    on:click={() => answer(false, selectedPackageType)}
    class="bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
    type="button"
  >
    İptal
  </button>
</div>
