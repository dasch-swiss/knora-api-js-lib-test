import { Component, OnInit } from '@angular/core';
import { KnoraApiConfig, KnoraApiConnection } from "@knora/api";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    ngOnInit() {

        const config = new KnoraApiConfig("http", "localhost", 3333);
        const knoraApiConnection = new KnoraApiConnection(config);

        console.log(knoraApiConnection);

        knoraApiConnection.admin.users.getAll().subscribe(
            a => console.log(a),
            b => console.error(b)
        );

    }

}
