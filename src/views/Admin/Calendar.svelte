<script>
  // @ts-nocheck
  import RestService from "../../services/rest.js";
  import Calendar from "@event-calendar/core";
  import TimeGrid from "@event-calendar/time-grid";
  import DayGrid from "@event-calendar/day-grid";
  import Interaction from "@event-calendar/interaction";
  import "@event-calendar/core/index.css";
  import moment from "moment";
  // import { navigate } from "svelte-navigator";

  import { modal, user } from "$services/store.js";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  import { onMount } from "svelte";

  let title;
  let selectedUser;

  // import Modal from "svelte-simple-modal";
  const addEventApprove = () => {
    modal.set(
      bind(Alert, {
        message: "Lütfen Seans için üye seçin",
        answer: (_answer, _selectedUser, _title) => {
          if (_answer) {
            selectedUser = _selectedUser;
            title = _title;
            addEvent();
          }
          modal.set(null);
        },
      })
    );
  };

  let events;

  let startDate = moment().subtract(2, "hour").startOf("hour").toISOString();
  let endDate = moment().subtract(2, "hour").endOf("hour").toISOString();

  let plugins = [TimeGrid, DayGrid, Interaction];

  const getEvents = async () => {
    let response = await RestService.getEvents();

    events = response["events"];
  };

  let options = {
    locale: "tr-TR",
    view: "timeGridWeek",
    slotMinTime: "8.00",
    slotMaxTime: "22.00",
    height: "825px",
    allDaySlot: false,
    // firstDay: 1,
    hiddenDays: [0],
    eventLongPressDelay: 1000,
    headerToolbar: {
      start: "timeGridDay timeGridWeek dayGridMonth",
      center: "today",
      end: "prev  next",
    },
    pointer: true,
    select: info => {
      // console.log("SELECTED--", info);
      startDate = moment(info?.start);
      endDate = moment(info.end);
      addEventApprove();
      console.log("selected start: ", info.start, "end: ", info.end);
      console.log(
        "startDate: ",
        startDate.toDate().toISOString(),
        "endDate",
        endDate.toDate().toISOString()
      );
    },
    // dateClick: info => {
    //   //Boş bir saate tıklanınca
    //   console.log("dateClick----", info);
    // },
    eventClick: info => {
      //eventin üzerine tıklanınca
      console.log("eventClick---", info.event);
    },
    // eventMouseEnter: info => {
    //   //Eventin üzerine gelince
    //   console.log("eventMouseEnter---", info.event);
    // },
    // eventMouseLeave: info => {
    //   //Eventin üzerinden ayrılınca
    //   console.log("eventMouseLeave---", info.event);
    // },
    eventDragStart: info => {
      console.log("ASFASDFADS-----", info);
    },
    nowIndicator: true,
    buttonText: {
      today: "Bugün",
      dayGridMonth: "Ay",
      timeGridWeek: "Hafta",
      timeGridDay: "Gün",
    },
    views: {
      timeGridWeek: { pointer: true },
      resourceTimeGridWeek: { pointer: true },
    },
    dayMaxEvents: true,
    selectable: true,
  };

  const addEvent = async () => {
    let response = await RestService.addEvent({
      user: selectedUser?._id,
      trainer: $user?.userId,
      startDate,
      endDate,
      title,
    });

    if (response["status"]) {
      // Code
      syncData();
      console.log("addEvent Success");
    } else {
      console.log("addEvent ERROR", response.message);
    }
  };

  const syncData = async () => {
    await getEvents();

    options.events = [
      ...events.map(event => {
        return {
          start: moment(event?.startDate).utcOffset("+3").toDate(),
          end: moment(event?.endDate).utcOffset("+3").toDate(),
          title: event?.title,
        };
      }),
    ];
  };
  onMount(async () => {
    syncData();
  });
</script>

<div class="m-10 sm:m-0 sm:p-10 bg-gray-50 min-h-screen">
  <button
    on:click={addEventApprove}
    class="bg-gray-300 p-3 rounded-md hover:bg-gray-400">Seans oluştur</button
  >
  <h1 class="flex justify-center text-2xl mb-5">CALENDAR</h1>

  {#if options?.events}
    <Calendar class="w-full" {plugins} {options} />
  {/if}
</div>
