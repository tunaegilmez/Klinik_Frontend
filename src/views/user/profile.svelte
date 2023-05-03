<script>
  import { onMount } from "svelte";
  import { user } from "../../services/store.js";

  let userId;
  let token;

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
</div>
