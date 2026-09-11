import express from "express";

export function createApp(service){
    const app = express();

    app.use(express.text());

    app.post("/api/summarize",async(req,res)=>{
        if(!req.body || !req.body.trim()){
            return res.status(400).send("Ticket text is required.");
        }

        const summary = await service.summarize(req.body);
        res.type("text/plain").send(summary);
    });
    return app;
}