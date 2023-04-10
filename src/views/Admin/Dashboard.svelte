<script>
  import RestService from "../../services/rest";

  let users;
  let limit = 10;
  let skip = 0;
  let totalDataCount = 0;
  const getUsers = async () => {
    let response = await RestService.getUsers(limit, skip);
    users = response["users"];
    totalDataCount = response["count"];
    console.log(response, "RESPONSE");
  };
  getUsers();

  const updateUserActive = async userId => {
    console.log(userId, "component updateUserActive");
    let response = await RestService.updateUserActive(userId);
    if (response["status"]) {
      console.log(response, "success");
      getUsers();
    } else {
      console.log(response.message);
    }
  };
</script>

<div>
  <div class="overflow-x-auto mb-16 mt-16">
    <h1 class="flex justify-center">Dashborad</h1>

    {#if users && users.length > 0}
      <!-- {#each users as user} -->
      <table class="table w-full ml-10">
        <!-- head -->
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Üye mi?</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          {#each users as user, i}
            <tr>
              <th>{i + 1}</th>
              <td>{user.fullName}</td>
              <td>{user.isActive}</td>
              <td
                ><button
                  class="btn btn-outline btn-primary"
                  on:click={() => updateUserActive(user?._id)}>Üye Yap</button
                ></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
      <!-- {/each} -->
    {:else}
      <h1>Get User Hatası</h1>
    {/if}
  </div>
</div>

<style>
</style>
