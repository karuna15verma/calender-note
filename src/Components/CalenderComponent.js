import React from "react";
import Calendar from "react-calendar";
import moment from "moment";

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
    if (this.state.myEvents === null) localStorage.setItem("myEvents", JSON.stringify(data));
    else {
      Object.keys(this.state.myEvents).map((singleEventDate) => {
        if (singleEventDate === moment(this.state.calenderDate).format("l")) {
          var myEventValueData = Object.values(this.state.myEvents);
          var concatMyEvent = myEventValueData.concat(this.state.eventValue);
          var mySecondEvent = {
            [moment(this.state.calenderDate).format("l")]: concatMyEvent,
          };
          this.setState({ myEvents: mySecondEvent }, () => {
            localStorage.setItem("myEvents", JSON.stringify(this.state.myEvents));
          });
        }
      });
    }
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
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
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <input
                style={{ marginTop: "10%", width: "45vh", height: "30px", marginRight: "4%" }}
                type="text"
                id="eventValue"
                name="eventValue"
                placeholder="Add Your Event"
                value={this.state.eventValue}
                onChange={this.handleChange("eventValue")}
              />
              <div
                style={{
                  borderRadius: "50%",
                  border: "1px solid blue",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "30px",
                  height: "30px",
                  color: "blue",
                }}
                onClick={() => this.saveData()}
              >
                +
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default CalenderComponentClass;
