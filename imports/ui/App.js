import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";
import "./App.html";

const Exports = new Mongo.Collection("exports");

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();
  const handler = Meteor.subscribe("exports");

  Tracker.autorun(() => {
    const exports = Exports.find().fetch();
    this.state.set({
      isLoading: !handler.ready(),
      exports,
    });
  });
});

Template.mainContainer.helpers({
  exports: () => {
    const instance = Template.instance();
    return instance.state.get("exports");
  },

  isLoading() {
    const instance = Template.instance();
    return instance.state.get("isLoading");
  },
});

Template.mainContainer.events({
  "click button"() {
    Meteor.call("exports.start");
  },
});

Template.export.events({
  "click button"(event, instance) {
    event.stopPropagation();
    Meteor.call("exports.remove", instance.data._id);
  },
});
