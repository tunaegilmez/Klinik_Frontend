<script>
  // @ts-nocheck

  import Calendar from "@event-calendar/core";
  // @ts-ignore
  import TimeGrid from "@event-calendar/time-grid";

  let plugins = [TimeGrid];
  let options = {
    view: "timeGridWeek",
    events: [
      // your list of events
    ],
  };
</script>

<div class="m-10">
  <h1 class="flex justify-center text-2xl mb-5">CALENDAR</h1>
  <Calendar {plugins} {options} />
</div>
