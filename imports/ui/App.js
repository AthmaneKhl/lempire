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
  "click button"(_, instance) {
    const fastExport = instance.state.get("fastExport");
    Meteor.call("exports.start", fastExport);
  },
  "click #fast-export"(_, instance) {
    const fastExport = instance.state.get("fastExport");
    instance.state.set("fastExport", !fastExport);
  },
});

Template.export.events({
  "click button"(event, instance) {
    event.stopPropagation();
    Meteor.call("exports.remove", instance.data._id);
  },
});
