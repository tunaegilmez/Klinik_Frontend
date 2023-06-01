<script>
  import { onMount } from "svelte";
  import { user } from "../../services/store.js";
  import Card from "../../shared/Card.svelte";
  import RestService from "../../services/rest";

  let paketTur = "";
  let currentUser;

  onMount(() => {
    getUserById();
  });

  const getUserById = async () => {
    let currentUserResponse = await RestService.getUserById($user.userId);
    try {
      if (currentUserResponse["status"])
        currentUser = currentUserResponse["user"];
    } catch (error) {
      throw Error(error.message);
    }
  };
</script>

<div class="p-4">
  {#if currentUser}
    <div class="flex items-center">
      <div>
        <h1 class="text-xl font-bold">{currentUser?.fullName}</h1>
      </div>
      <div class="ml-10 bg-yellow-400 p-2">
        {currentUser.isPaid ? "Ödeme Yapıldı" : "Ödeme Yapılmadı"}
      </div>
    </div>
    <div>
      <Card>
        <div>
          <h2 class="text-lg mb-2">Bu Haftaki Programınız :</h2>
          <ul class="list-disc ml-5">
            <li>12 Mayıs Cuma | 13:00 - 14:00</li>
            <li>16 Mayıs Salı | 09:30 - 10:30</li>
            <li>18 Mayıs Perş | 18:00 - 19:30</li>
          </ul>
        </div>
        <div class="mt-10">
          <h1 class="text-lg">Paket Bilgileri</h1>
          <p class="text-base">
            Paket türü : {currentUser?.packageType} Seans
          </p>
        </div>
      </Card>
    </div>
  {/if}
</div>
