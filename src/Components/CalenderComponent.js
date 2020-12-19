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
            this.setState({ myEventData: concatMyEvent });
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
    if (this.state.myEvents === null) {
      localStorage.setItem("myEvents", JSON.stringify([data]));
      this.setState({ myEventData: [this.state.eventValue] });
    } else {
      Object.keys(this.state.myEvents).map((singleEventDate) => {
        if (singleEventDate === moment(this.state.calenderDate).format("l")) {
          Object.entries(this.state.myEvents).map(([key, value]) => {
            var concatMyEvent = value.concat(this.state.eventValue);
            var mySecondEvent = {
              [moment(this.state.calenderDate).format("l")]: concatMyEvent,
            };
            this.setState({ myEventData: concatMyEvent }, () => {
              localStorage.setItem("myEvents", JSON.stringify(mySecondEvent));
            });
          });
        } else {
          let calenderData = [this.state.myEvents];
          var eventData = {
            [moment(this.state.calenderDate).format("l")]: [this.state.eventValue],
          };
          console.log(this.state.myEvents);
          console.log(calenderData);
          calenderData.push(eventData);
          localStorage.setItem("myEvents", JSON.stringify(calenderData));
        }
      });
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
            {this.state.myEventData.length === 0 ? (
              ""
            ) : (
              <div style={styles.eventListDiv}>
                {this.state.myEventData.map((singleEvent, index) => (
                  <span style={styles.eventListSpan}>{`${singleEvent}`}</span>
                ))}
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
