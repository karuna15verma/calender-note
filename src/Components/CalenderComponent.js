import React from "react";
import Calendar from "react-calendar";
import moment from "moment";

const styles = {
  calenderComponent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  addEventDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  insideAddEventDiv: {
    display: "flex",
    alignItems: "flex-end",
  },
  actionDiv: {
    borderRadius: "50%",
    border: "1px solid blue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30px",
    height: "30px",
    color: "blue",
  },
  eventListDiv: {
    display: "flex",
    flexDirection: "column",
    marginTop: "5%",
  },
  eventListSpan: { color: "blue" },
};
class CalenderComponentClass extends React.Component {
  constructor(props) {
    super(props);
    const myEvents = JSON.parse(localStorage.getItem("myEvents"));
    this.state = {
      calenderDate: new Date(),
      myEvents,
      eventValue: "",
      addEvent: false,
      myEventData: [],
    };
  }

  handleChangeDate = (value, event) => {
    const myEvents = JSON.parse(localStorage.getItem("myEvents"));
    if (myEvents !== null) {
      Object.keys(myEvents).map((singleEventDate) => {
        if (moment(value).format("l") === singleEventDate) {
          Object.entries(myEvents).map(([key, value]) => {
            var concatMyEvent = value.concat(this.state.eventValue);
            this.setState({ myEventData: concatMyEvent, eventValue: "", myEventData: [] });
          });
        }
      });
    }
    this.setState({ calenderDate: value, addEvent: true });
  };

  handleChange = (name) => (event) => {
    this.setState({
      eventValue: event.target.value,
    });
  };

  saveData = () => {
    var data = {
      [moment(this.state.calenderDate).format("l")]: [this.state.eventValue],
    };
    let myEventData = [];
    myEventData.push(data);
    console.log(this.state.myEvents);
    if (this.state.myEvents === null) {
      localStorage.setItem("myEvents", JSON.stringify([data]));
      this.setState({ myEventData: [this.state.eventValue], myEvents: [this.state.eventValue] });
    } else {
      var obj = this.state.myEvents;
      console.log(obj);

      for (const [key, value] of Object.entries(obj)) {
        console.log(value);
        if (value.hasOwnProperty(moment(this.state.calenderDate).format("l"))) {
          console.log(value);
          console.log(this.state.eventValue);
          value[moment(this.state.calenderDate).format("l")].push(this.state.eventValue);
          console.log(value);
          localStorage.setItem("myEvents", JSON.stringify(value));
        } else {
          let calenderData = this.state.myEvents;
          var eventData = {
            [moment(this.state.calenderDate).format("l")]: [this.state.eventValue],
          };
          calenderData.push(eventData);
          localStorage.setItem("myEvents", JSON.stringify(calenderData));
          this.setState({ myEventData: calenderData, myEvents: calenderData });
        }
      }
    }
  };

  render() {
    console.log(this.state.myEvents);
    console.log(this.state.myEventData);
    return (
      <div style={styles.calenderComponent}>
        <div>
          <Calendar
            showNavigation={false}
            showNeighboringMonth={false}
            activeStartDate={new Date()}
            style={{ height: "40vh", width: "40vh" }}
            allowPartialRange={true}
            onChange={(value, event) => this.handleChangeDate(value, event)}
            defaultValue={new Date()}
            value={this.state.calenderDate}
          />
        </div>
        {this.state.addEvent ? (
          <div style={styles.addEventDiv}>
            <div style={styles.insideAddEventDiv}>
              <input
                style={{ marginTop: "10%", width: "45vh", height: "30px", marginRight: "4%" }}
                type="text"
                id="eventValue"
                name="eventValue"
                placeholder="Add Your Event"
                value={this.state.eventValue}
                onChange={this.handleChange("eventValue")}
              />
              <div style={styles.actionDiv} onClick={() => this.saveData()}>
                +
              </div>
            </div>
            {this.state.myEvents === null ? (
              ""
            ) : (
              <div style={styles.eventListDiv}>
                {this.state.myEvents.map((singleEvent, index) =>
                  Object.entries(singleEvent).map(([key, value]) => {
                    console.log(value[0]);
                    // value.map((singleValue) => {
                    <span style={styles.eventListSpan}>
                      {/* {console.log(singleValue)} */}
                      {value[0]}
                    </span>;
                    // });
                  })
                )}
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default CalenderComponentClass;
