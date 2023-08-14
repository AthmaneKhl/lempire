import { check } from "meteor/check";
import { ExportsCollection } from "../db/ExportsCollection";

Meteor.methods({
  "export.start"() {
    let progress = 0;

    ExportsCollection.insert({
      progress,
      createdAt: new Date(),
    });

    const interval = setInterval(() => {
      progress += 5;
      ExportsCollection.update(taskId, {
        $set: {
          progress,
        },
      });

      if (progress === 100) {
        clearInterval(interval);
      }
    }, 1000);
  },

  "export.remove"(taskId) {
    check(taskId, String);

    ExportsCollection.remove(taskId);
  },
});
