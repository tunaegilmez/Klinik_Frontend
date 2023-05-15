<script>
  // import { onMount } from "svelte";
  import { user } from "../../services/store.js";
  import Card from "../../shared/Card.svelte";

  let userId;
  let token;
  let paketTur = "";
  let isPaid = false;

  userId = $user.userId;
  token = $user.token;

  let fullName = $user.fullName;
  let age = 30;
  let gender = "male";
  let profileImageUrl = "https://picsum.photos/150";
</script>

<div class="p-4">
  <div class="flex items-center">
    <!-- {userId}
    {token} -->
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      class="h-16 w-16 rounded-full mr-4"
      src={profileImageUrl}
      alt="Profile Image"
    />
    <div>
      <h1 class="text-xl font-bold">{fullName}</h1>
      <p class="text-gray-500">{age} yaşında, {gender}</p>
    </div>
  </div>
  <div>
    <Card>
      <!-- <span class="flex justify-center"> -->
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
        <p class="">
          Paket türü : {paketTur ? paketTur : "Şuanda bir paket yok"}
        </p>

        <p class="">Paket ödeneği : {isPaid ? "Ödendi" : "Ödenmedi"}</p>
      </div>
      <!-- </span> -->
    </Card>
  </div>
</div>
