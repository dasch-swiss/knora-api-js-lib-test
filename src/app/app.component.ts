import { Component, OnInit } from '@angular/core';
import { KnoraApiConnection } from "@knora/api";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    ngOnInit() {

        const knoraApiConnection = new KnoraApiConnection("http://localhost:3333");

        knoraApiConnection.admin.users.getAll().subscribe(
            a => console.log(a),
            b => console.error(b)
        );

    }

}
