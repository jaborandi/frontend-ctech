
<template>
	<div>
		<div v-if="showHeader" class="">
			<div class="row row q-col-gutter-md justify-between">
				<div class="text-h6 col-md-auto" v-if="headerTitle">Calender</div>
				<div v-if="dateControls" class="col-md-auto">
					<q-btn flat dense icon="date_range" class="q-mx-md" @click="setToday"></q-btn>
					<q-btn flat dense round icon="arrow_back" @click="onPrev"></q-btn>
					<q-btn flat dense round icon="arrow_forward" @click="onNext"></q-btn>
				</div>
				<div class="col-md-auto text-h6">
					{{ currentDateTitle }}
				</div>
				<div class="col-md-2" v-if="modeChange">
					<nice-select
						v-model="calendarMode"
						:options="modeOptions"
						outlined
						dense
						options-dense
						emit-value
						map-options
					></nice-select>
				</div>
				<div class="col-md-2" v-if="viewChange">
					<nice-select
						v-model="calendarView"
						:options="viewOptions"
						:disable="calendarMode === 'month'"
						outlined
						dense
						options-dense
						emit-value
						map-options
					></nice-select>
				</div>
			</div>
		</div>
		<div></div>
		<q-separator class="q-my-md" />
		<div style="">
			<q-calendar
			:mode="calendarMode"
			:max-days="14" :mini-mode="false" :day-min-height="60" :no-scroll="false" :hour24-format="false"
			ref="calendar"
			:view="calendarView"
			:animated="false"
			class="calendar"
			v-model="selectedDate"
			@click-time="addEvent"
			@click-time2="addEvent"
			@click-date="addEvent"
			@click:date2="addEvent"
			@click:day="addEvent"
			>
				
		<!-- Template for calendar header-->
		<template v-if="calendarMode!=='agenda'" #head-day-event="{ scope: { timestamp } }">
            <div class="event-day-header">
				<q-card v-for="event in mapEvents[timestamp.date]" :key="event.id" :style="badgeStyles(event)" class="event-header-badge" @click="scrollToEvent(event)" />
            </div>
        </template>

		<!-- Template for calendar day event -->
        <template #day-body="{ scope: { timestamp, timeStartPos, timeDurationHeight } }">
			<q-card v-for="event in getDateEvents(timestamp.date)" :key="event.id" @click="showEvent(event)" class="event" :style="badgeStyles(event, timeStartPos, timeDurationHeight)">
				<div class="title"> 
					<q-icon v-if="event.icon" :name="event.icon" /> {{ event.title }} 
					<!-- <small v-if="event.time">{{ event.time }}</small> -->
				</div>
			</q-card>
        </template>

		<!-- Template for Agenda Event-->
        <template v-if="calendarMode === 'agenda'" #day="{ scope: { timestamp } }">
            <template v-for="agenda in getDateAgenda(timestamp.date)" :key="timestamp.date + agenda.time">
                <q-card @click="showEvent(agenda)" class="agenda text-white" :style="badgeStyles(agenda)">
                    <div v-if="agenda.image" class="row justify-center">
                        <q-avatar size="40px">
                            <image-viewer :src="agenda.image" image-size="small"/>
                        </q-avatar>
                    </div>

                    <div v-if="agenda.icon">
                        <q-icon size="lg" :name="agenda.icon" />
                    </div>
					
                    <div class="q-px-sm"><strong>{{ agenda.time }}</strong></div>
                    <div v-if="agenda.title" class="q-px-sm" style="font-size: 10px">
                        {{ agenda.title }}
                    </div>
                </q-card>
            </template>
        </template>

		<!-- Template for Day Event-->
        <template #day="{ scope: { timestamp } }" v-else>
			<q-card v-for="event in mapEvents[timestamp.date]" :key="event.id" class="event" :style="badgeStyles(event)" @click="showEvent(event)">
				<div class="title"> 
					<q-icon v-if="event.icon" :name="event.icon" /> 
					{{ event.title }}
					<!-- <small v-if="event.time">{{ event.time }}</small> -->
				</div>
			</q-card>
        </template>


			</q-calendar>
		</div>
	</div>
</template>
<script>
import { defineComponent } from "vue";

import {
  QCalendar,
  parseTimestamp,
  isBetweenDates,
  diffTimestamp
} from "@quasar/quasar-ui-qcalendar/src/index.js";
import { useApp } from 'src/composables/app';

import { date } from "quasar";
import "@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass";
import { $t } from 'src/services/i18n';

export default defineComponent({
  setup(props) {
    const app = useApp();
    
	function addEvent({scope}) {
		let pageData = {
			data_inicio:scope.timestamp.date,
			hora_inicio:scope.timestamp.time
		};
	  	let page = "agendafablab/add";
		app.openPageDialog({ page, url:page, pageData , closeBtn: true });
    }

	
	function showEvent(event) {
		let page = "agendafablab/view";
		let url = `/${page}/${event.id}`;
		app.openPageDialog({ page, url , closeBtn: true });
    }

    return { addEvent, showEvent };

  },
  components: {
    QCalendar,
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true,
    },
    modeChange: {
      type: Boolean,
      default: true,
    },
    viewChange: {
      type: Boolean,
      default: true,
    },
    dateControls: {
      type: Boolean,
      default: true,
    },
    badgeClasses: {
      type: String,
      default: "bg-accent text-white text-caption q-ma-xs text-center",
    },
    eventColor: {
      type: String,
      default: "#2f414a",
    },
    textColor: {
      type: String,
      default: "#ffffff",
    },
    records: {
      type: Array,
      default: function () {
        return [];
      },
    },
    viewOptions: {
      type: Array,
      default: function () {
        return [{value: 'week', label: 'Week'},{value: 'month', label: 'Month'}];
      },
    },
    modeOptions: {
      type: Array,
      default: function () {
        return [
			{value: 'day', label: 'Day'},
			{value: 'month', label: 'Month'},
			{value: 'agenda', label: 'Agenda'},
		];
      },
    },
  },
  beforeMount() {
    this.updateFormatters();
  },
  data() {
    return {
      selectedDate: "",
      weekdays: [0, 1, 2, 3, 4, 5, 6],
      locale: "en-us",
      calendarMode: "agenda",
      calendarView: "week",
      titleFormatter: null,
      dateFormatter: null,
    };
  },
  computed: {
    currentDateTitle() {
      if (this.titleFormatter && this.selectedDate) {
        const date = new Date(this.selectedDate);
        return this.titleFormatter.format(date);
      }
      return this.selectedDate;
    },
    mapEvents() {
      const map = {};
      this.events.forEach((event) =>
        (map[event.date] = map[event.date] || []).push(event)
      );
      return map;
    },
    events() {
      let events = [];
      this.records.forEach((event) => {
        let startDate = event['data_inicio'];
        if (startDate) {
          let startDateObj = this.parseDateStr(startDate);
          if (startDateObj) {
			let id = event['id'];
			let eventDate = startDateObj.date;
			let title = event['titulo'];
			let eventTime = event['hora_inicio'] || startDateObj.time;
			let duration = null;
			
			let endDate = event['data_termino'];
			let endDateObj = this.parseDateStr(endDate);
            if (endDateObj) {
				startDate = `${startDateObj.date} ${startDateObj.time}`;
			  endDate = `${endDateObj.date} ${event['hora_termino']}`;
              duration = Math.abs(date.getDateDiff(startDate, endDate, "minutes"));
            }

			let color = event['confirmacao'];
			let icon = null;
			let image = null;
            let eventDateObj = { id,  title,  date: eventDate, time: eventTime, duration, color, icon, image };
            let eventObj = { ...event, ...eventDateObj }; //merge page record object with event object
            events.push(eventObj);
          }
        }
      });
      return events;
    },

    intervalStart() {
      return this.intervalRange.min * (1 / this.intervalRangeStep);
    },
    intervalCount() {
      return (
        (this.intervalRange.max - this.intervalRange.min) * (1 / this.intervalRangeStep)
      );
    },
  },
  methods: {
    getDateEvents(dt) {
      const events = this.mapEvents[dt] || [];
      return events;
    },
	getDateAgenda(dt) {
      return this.mapEvents[dt] || [];
    },
    parseDateStr(datetime) {
		if(!datetime) return null;
      datetime = datetime
        .replace("T", " ")
        .replace("Z", "")
        .replace("00:00:00", "00:01:00");
      return parseTimestamp(datetime);
    },

    onPrev() {
      this.$refs.calendar.prev();
    },
    onNext() {
      this.$refs.calendar.next();
    },
    setToday() {
      this.selectedDate = this.formatDate();
    },
    scrollToEvent(event) {
      this.$refs.calendar.scrollToTime(event.time, 350);
    },
    padTime(val) {
      val = Math.floor(val);
      if (val < 10) {
        return "0" + val;
      }
      return val + "";
    },
    formatDate(date) {
      const d = date !== undefined ? new Date(date) : new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      return [year, this.padTime(month), this.padTime(day)].join("-");
    },
    badgeStyles(event, timeStartPos = undefined, timeDurationHeight = undefined) {
      const s = {};
      if (timeStartPos && timeDurationHeight) {
        s.top = timeStartPos(event.time) + "px";
        s.height = timeDurationHeight(event.duration) + "px";
      }
	  s.color = this.textColor;
	  s.backgroundColor = event.color || this.eventColor;
      s["align-items"] = "flex-start";
      return s;
    },
    updateFormatters() {
      try {
        this.dateFormatter = new Intl.DateTimeFormat(this.locale || undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "UTC",
        });
        this.titleFormatter = new Intl.DateTimeFormat(this.locale || undefined, {
          month: this.shortMonthLabel ? "short" : "long",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        });
      } catch (e) {
        // console.error('Intl.DateTimeFormat not supported')
        this.dateFormatter = undefined;
        this.titleFormatter = undefined;
      }
    },
  },
  mounted() {
    this.selectedDate = this.formatDate();
    if (this.defaultView) {
      this.calendarView = this.defaultView;
    }
  },
});
</script>

<style>
.event{
	position: absolute;
	font-size: 12px;
	justify-content: center;
	margin: 0 1px;
	text-overflow: ellipsis;
	overflow: hidden;
	cursor: pointer;
	min-height: 20px;
	background-color: #444;
	color:#fff;
	left: 0;
	width: calc(100% - 2px);
	text-align: center;
	cursor: pointer;
}
.event .title{
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
.event-day-header{
	display: flex;
	justify-content:center;
	flex-wrap: wrap;
	padding: 2px;
}
.event-header-badge{
	margin: 1px;
	width: 10px;
	max-width: 10px;
	height: 10px;
	max-height: 10px;
	cursor: pointer;
}
.agenda{
	margin: 6px;
	text-align: center;
	cursor: pointer;
	padding:10px;
}
</style>

