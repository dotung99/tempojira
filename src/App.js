import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  Button,
  CalendarToday,
  Draggable,
  Eventcalendar,
  SegmentedGroup,
  SegmentedItem,
  toast,
  Input,
  Popup
} from "@mobiscroll/react";
import { useCallback, useState } from "react";
import "./App.css";
// const CALENDAR_ID = 'theacidmedia.net_8l6v679q5j2f7q8lpmcjr4mm3k@group.calendar.google.com';

export default function App() {
  const now = new Date();
  const [myEvents] = useState([]);
  const [draggableMeeting, setDraggableMeeting] = useState();
  const [draggableRetreat, setDraggableRetreat] = useState();
  const [draggableBlank, setDraggableBlank] = useState();
  const [isPopupOpen, setOpen] = useState(false);

  // const openPopup = useCallback(() => {
  //   setOpen(true);
  // }, []);

  const closePopup = useCallback(() => {
    setOpen(false);
  }, []); 

  const setMeetingElm = useCallback((elm) => {
    setDraggableMeeting(elm);
  }, []);

  const setRetreatElm = useCallback((elm) => {
    setDraggableRetreat(elm);
  }, []);

  const setBlankElm = useCallback((elm) => {
    setDraggableBlank(elm);
  }, []);

  const meetingData = {
    title: "QA meeting",
    color: "#cf4343",
    start: now,
    end: now,
  };

  const retreatData = {
    title: "Team retreat",
    color: "#1064b0",
    start: now,
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
  };

  // useEffect(() => {
  //   getJson(
  //     "https://trial.mobiscroll.com/events/?vers=5",
  //     (events) => {
  //       setEvents(events);
  //       console.log(events);
  //     },
  //     "jsonp"
  //   );
  // }, []);

  const onEventCreate = useCallback((event) => {
    toast({
      message: "Event dropped",
    });
  }, []);
  const [view, setView] = useState("month");
  const [calView, setCalView] = useState({
    calendar: { labels: true },
  });
  // const firstDay = useRef();
  // const lastDay = useRef();

  // const onError = useCallback((resp) => {
  //     toast({
  //         message: resp.error ? resp.error : resp.result.error.message
  //     });
  // }, []);

  // const loadEvents = useCallback(() => {
  //     setLoading(true);
  //     googleCalendarSync.getEvents(CALENDAR_ID, firstDay.current, lastDay.current)
  //         .then(function (resp) {
  //             setLoading(false);
  //             setEvents(resp);
  //         }).catch(onError);
  // }, [firstDay, lastDay, onError]);

  // const onPageLoading = useCallback((event) => {
  //     const start = event.viewStart;
  //     const end = event.viewEnd;

  //     // Calculate dates
  //     // (pre-load events for previous and next pages as well)
  //     if (view === 'month') {
  //         firstDay.current = start;
  //         lastDay.current = end;
  //     } else {
  //         firstDay.current = new Date(start.getFullYear(), start.getMonth(), start.getDate() - 7);
  //         lastDay.current = new Date(end.getFullYear(), end.getMonth(), end.getDate() + 7);
  //     }

  //     loadEvents();
  // }, [loadEvents, view]);

  // useEffect(() => {
  //     googleCalendarSync.init({
  //         apiKey: '<YOUR_GOOGLE_API_KEY>',
  //         onInit: loadEvents
  //     });
  // }, [loadEvents]);

  const changeView = (event) => {
    let calView;
    switch (event.target.value) {
      case "month":
      default:
        calView = {
          calendar: { labels: true },
        };
        break;
      case "week":
        calView = {
          schedule: { type: "week" },
        };
        break;
      case "day":
        calView = {
          schedule: { type: "day" },
        };
        break;
      case "agenda":
        calView = {
          calendar: { type: "week" },
          agenda: { type: "week" },
        };
        break;
    }

    setView(event.target.value);
    setCalView(calView);
  };

  const customWithNavButtons = () => {
    return (
      <>
        <CalendarNav className="google-cal-header-nav" />
        <div className="md-spinner">
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
          <div className="md-spinner-blade"></div>
        </div>
        <div className="google-cal-header-picker">
          <SegmentedGroup value={view} onChange={changeView}>
            <SegmentedItem value="month">Month</SegmentedItem>
            <SegmentedItem value="week">Week</SegmentedItem>
            <SegmentedItem value="day">Day</SegmentedItem>
            <SegmentedItem value="agenda">Agenda</SegmentedItem>
          </SegmentedGroup>
        </div>
        <div>
          <Button startIcon="pencil">My Button</Button>
        </div>
        <CalendarPrev className="google-cal-header-prev" />
        <CalendarToday className="google-cal-header-today" />
        <CalendarNext className="google-cal-header-next" />
        <Popup isOpen={isPopupOpen} onClose={closePopup}>
          <h3>Hi</h3>
          <p>Are you feeling good today?</p>
        </Popup>
      </>
    );
  };

  return (
    <div className="mbsc-grid mbsc-no-padding">
      <div className="mbsc-row">
        <div className="mbsc-col-sm-9 external-event-calendar">
          <Eventcalendar
            theme="windows"
            themeVariant="dark"
            // clickToCreate={false}
            // dragToCreate={false}
            dragToMove={true}
            externalDrop={true}
            // dragToResize={false}
            // eventDelete={false}
            // className={"md-google-calendar " + (isLoading ? 'md-loading-events' : '')}
            exclusiveEndDates={true}
            view={calView}
            data={myEvents}
            onEventCreate={onEventCreate}
            // onPageLoading={onPageLoading}
            renderHeader={customWithNavButtons}
          />
        </div>
        <div className="mbsc-col-sm-3">
          <div className="mbsc-form-group-title title">Issues</div>
          <Input label="search" placeholder="Search issues..." />
          <div className="google-cal-header-picker">
            <SegmentedGroup>
              <SegmentedItem value="month">Recent</SegmentedItem>
              <SegmentedItem value="week">Assigned</SegmentedItem>
              <SegmentedItem value="day">Favorite</SegmentedItem>
            </SegmentedGroup>
          </div>
          <ul>
            <li>
          <div
            ref={setMeetingElm}
            className="external-drop-task"
            style={{ background: "#cf4343" }}
          >
            <div>Product team meeting</div>
            <div>1.5 h</div>
            <Draggable dragData={meetingData} element={draggableMeeting} />
          </div>
          </li>
          <li>
          <div
            ref={setRetreatElm}
            className="external-drop-task"
            style={{ background: "#1064b0" }}
          >
            <div>General orientation</div>
            <div>2 h</div>
            <Draggable dragData={retreatData} element={draggableRetreat} />
          </div>
          </li>
          <li>
          <div
            ref={setBlankElm}
            className="external-drop-task external-drop-task-blank"
          >
            <div>Blank event</div>
            <Draggable element={draggableBlank} />
          </div>
          </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
