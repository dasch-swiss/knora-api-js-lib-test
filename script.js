'use strict';

//import { KnoraApiConnection } from "./node_modules/api2js/index.js";

var api2js = require("./node_modules/api2js/index");

var knoraApiConnection = new api2js.KnoraApiConnection("http://localhost:3333");

knoraApiConnection.admin.users.getAll().subscribe(
    function (a) {
        console.log("SUCCESS:");
        console.log(a);
    },
    function (b) {
        console.log("ERROR:");
        console.log(b);
    }
);

