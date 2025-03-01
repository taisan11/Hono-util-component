import { assertEquals } from "jsr:@std/assert";
import { Hono } from "hono";
import {createAtag} from "./A.tsx"

Deno.test("Test Typed", () => {
    const app = new Hono();
    app.get("/a",(c)=>{return c.text("a")});
    app.get("/b",(c)=>{return c.text("b")});
    app.get("/c/:aaaa",(c)=>{return c.text("c")});
    app.get("/d/*",(c)=>{return c.text("d")});
    const A = createAtag(app);
    if (typeof A === "function") {
        const a = A({href:"", children:"a"});
        console.log(a.toString());
    }
})