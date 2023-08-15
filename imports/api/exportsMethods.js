import { check } from "meteor/check";
import { ExportsCollection } from "../db/ExportsCollection";

Meteor.methods({
  async "exports.start"(fastExport = false) {
    let progress = 0;
    const speed = fastExport ? 100 : 1000;

    const exportId = ExportsCollection.insert({
      progress,
      createdAt: new Date(),
    });

    const interval = Meteor.setInterval(() => {
      progress += 5;
      ExportsCollection.update(exportId, {
        $set: {
          progress,
          url: progress === 100 ? getUrl() : undefined,
        },
      });

      if (progress === 100) {
        Meteor.clearInterval(interval);
      }
    }, speed);
  },

  "exports.remove"(taskId) {
    check(taskId, String);
    ExportsCollection.remove(taskId);
  },
});

const getUrl = () => {
  const urls = {
    1: "https://www.lempire.com/",
    2: "https://www.lemlist.com/",
    3: "https://www.lemverse.com/",
    4: "https://www.lemstash.com/",
  };

  const index = Math.floor(Math.random() * 4 + 1);
  return urls[index];
};
