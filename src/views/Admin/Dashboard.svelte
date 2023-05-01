<script>
  import RestService from "../../services/rest";
  import { onMount } from "svelte";

  let users;
  let limit = 2;
  let skip = 0;
  let totalDataCount = 0;
  let currentPage = 1;
  let totalPages = 0;

  const getUsers = async () => {
    let response = await RestService.getUsers(limit, skip);
    users = response["users"];
    totalDataCount = response["count"];
    totalPages = Math.ceil(totalDataCount / limit);
    console.log(response, "RESPONSE");
  };

  const updateUserActive = async userId => {
    let response = await RestService.updateUserActive(userId);
    if (response["status"]) {
      console.log(response, "success");
      getUsers();
    } else {
      console.log(response.message);
    }
  };

  const handlePageClick = page => {
    currentPage = page;
    skip = (currentPage - 1) * limit;
    getUsers();
  };

  onMount(() => {
    getUsers();
  });
</script>

<div>
  <div class="overflow-x-auto mb-16 mt-16">
    <h1 class="flex justify-center">Dashboard</h1>

    {#if users && users.length > 0}
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
              <td>
                <button
                  class="btn btn-outline btn-primary"
                  on:click={() => updateUserActive(user?._id)}>Üye Yap</button
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

      <div class="pagination">
        {#if totalPages > 1}
          {#each Array(totalPages) as _, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span
              class="pagination-item {i + 1 === currentPage ? 'active' : ''}"
              on:click={() => handlePageClick(i + 1)}>{i + 1}</span
            >
          {/each}
        {/if}
      </div>
    {:else}
      <h1>Get User Hatası</h1>
    {/if}
  </div>
</div>

<style>
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .pagination-item {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #ddd;
    margin-right: 5px;
    cursor: pointer;
  }

  .pagination-item.active {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }
</style>
