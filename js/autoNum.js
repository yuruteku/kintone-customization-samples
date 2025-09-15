(() => {
  "use strict";

  const ITEM_ID_FIELD = "itemId";
  const PREFIX = "ID_";

  kintone.events.on("app.record.create.show", async (event) => {
    const appId = kintone.app.getId();

    const resp = await kintone.api(kintone.api.url("/k/v1/records"), "GET", {});
  });
})();
