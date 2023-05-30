<script>
  // @ts-nocheck
  import RestService from "../../services/rest.js";
  import Calendar from "@event-calendar/core";
  import TimeGrid from "@event-calendar/time-grid";
  import DayGrid from "@event-calendar/day-grid";
  import Interaction from "@event-calendar/interaction";
  import "@event-calendar/core/index.css";
  import moment from "moment";

  import { modal, user } from "$services/store.js";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  import { onMount } from "svelte";

  let title;
  let selectedUser;

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
    try {
      let response = await RestService.getEvents();
      events = response["events"];
    } catch (err) {
      throw Error(err);
    }
  };

  const updateEvent = async info => {
    try {
      let updateEventResponse = await RestService.updateEvent(info?.event?.id, {
        ...info?.event?.extendedProps,
        startDate: info.event.start,
        endDate: info.event.end,
      });

      if (updateEventResponse["status"]) {
        syncData();
      } else {
        syncData();
        console.log("updateEvent ERROR", updateEventResponse.message);
      }
    } catch (error) {
      throw Error(error);
    }
  };

  let options = {
    locale: "tr-TR",
    view: "timeGridWeek",
    slotMinTime: "9.00",
    slotMaxTime: "21.00",
    height: "825px",
    allDaySlot: false,
    hiddenDays: [0],
    eventLongPressDelay: 1000,
    headerToolbar: {
      start: "timeGridDay timeGridWeek dayGridMonth",
      center: "today",
      end: "prev  next",
    },
    pointer: true,
    select: info => {
      startDate = moment(info?.start);
      endDate = moment(info.end);
      addEventApprove();
    },
    editable: true,
    eventContent: info => {
      return info.event.display === "auto"
        ? {
            html: `
            <div class="ec-event-title"> ${info.event.title}</div>
            <i class="bi bi-trash"></i>`,
          }
        : "";
    },
    eventClick: info => {
      console.log("eventClick---", info);

      if (info.event.display === "auto") {
        let deleteIcon = info.el.querySelector("i");
        if (info.jsEvent.target === deleteIcon) {
          deleteEvent(info);
        }
      }
    },
    eventDrop: info => {
      updateEvent(info);
    },
    eventResize: info => {
      updateEvent(info);
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

  const deleteEvent = async info => {
    console.log(info);
    try {
      let deleteEventResponse = await RestService.deleteEvent(info?.event?.id);
      if (deleteEventResponse["status"]) {
        syncData();
      }
    } catch (error) {
      throw Error(error);
    }
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
          extendedProps: { ...event },
          id: event?._id,
        };
      }),
    ];
  };
  onMount(async () => {
    syncData();
  });
</script>

<div class="m-10 sm:m-0 sm:p-10 bg-gray-50 min-h-screen">
  {#if options?.events}
    <Calendar class="w-full" {plugins} {options} />
  {/if}
</div>
