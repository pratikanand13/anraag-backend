process.env.TZ = "Asia/Calcutta";

const app = require("./src/server");

app.listen(process.env.PORT || 8080, async () => {
    console.log(
        "Server running at http://localhost:" + (process.env.PORT || 8080)
    );
});
