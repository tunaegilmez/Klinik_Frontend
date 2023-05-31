<script>
  import RestService from "../../services/rest";
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";

  const checkType = async () => {
    try {
      let res = await RestService.checkType();
      if (res.type == "user") navigate("/calendar");
    } catch (error) {
      throw Error(error);
    }
  };

  let users;
  let limit = 5;
  let skip = 0;
  let totalDataCount = 0;
  let currentPage = 1;
  let totalPages = 0;
  let currentPackageType = "12"; // Test variable

  const getUsers = async () => {
    try {
      let response = await RestService.getUsers(limit, skip);
      users = response["users"];
      totalDataCount = response["count"];
      totalPages = Math.ceil(totalDataCount / limit);
    } catch (error) {
      throw Error(error);
    }
  };

  const updateUserActive = async userId => {
    try {
      let response = await RestService.updateUserActive(userId);

      if (response["status"]) {
        getUsers();
      } else {
        console.log(response.message);
      }
    } catch (error) {
      throw Error(error);
    }
  };

  const updateUserPayment = async userId => {
    try {
      let response = await RestService.updateUserPayment(userId);

      if (response["status"]) {
        getUsers();
      } else {
        console.log(response.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updatePackageType = async userId => {
    try {
      let packageTypeResponse = await RestService.updatePackageType(
        userId,
        currentPackageType
      );

      if (packageTypeResponse["status"]) {
        getUsers();
      } else {
        console.log(packageTypeResponse.message);
        throw new Error(packageTypeResponse.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handlePageClick = page => {
    currentPage = page;
    skip = (currentPage - 1) * limit;
    getUsers();
  };

  onMount(() => {
    checkType();
    getUsers();
  });
</script>

<div>
  <div class="overflow-x-hidden mb-10 mt-5">
    <h1 class="flex justify-center text-2xl mb-5">USERS</h1>

    {#if users && users.length > 0}
      <div class="mx-4">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      id
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Üye mi?
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ödedi mi?
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Paket
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <!-- row 1 -->
                  {#each users as user, i}
                    {#if user.role != "admin"}
                      <tr class={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {i + 1}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {user.fullName}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {user.isActive ? "Evet" : "Hayır"}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {user.isPaid ? "Evet" : "Hayır"}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {user.packageType == "0"
                            ? "Paket Bulunmuyor"
                            : user.packageType + " Haftalık"}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"
                        >
                          <button
                            class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            on:click={() => updateUserActive(user?._id)}
                          >
                            Üye Yap
                          </button>
                          <button
                            class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            on:click={() => updateUserPayment(user?._id)}
                          >
                            Ödeme Yaptı
                          </button>
                          <button
                            class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            on:click={() => updatePackageType(user?._id)}
                          >
                            Paket Seç
                          </button>
                        </td>
                      </tr>
                    {/if}
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination" style="flex-wrap: wrap;">
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
