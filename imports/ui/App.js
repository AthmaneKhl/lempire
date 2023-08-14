import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";

import "./App.html";

const IS_LOADING = "isLoading";

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();

  const handler = Meteor.subscribe("exports");
  Tracker.autorun(() => {
    this.state.set(IS_LOADING, !handler.ready());
  });
});

Template.mainContainer.helpers({
  exports: [
    { progress: 50 },
    { progress: 20 },
    { progress: 70 },
    { progress: 100, url: "test.com" },
  ],
  isLoading() {
    const instance = Template.instance();
    return instance.state.get(IS_LOADING);
  },
});
