import { Component, OnInit } from '@angular/core';
import { KnoraApiConfig, KnoraApiConnection } from "@knora/api";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    knoraApiConnection: KnoraApiConnection;

    ngOnInit() {
        const config = new KnoraApiConfig("http", "localhost", 3333);
        this.knoraApiConnection = new KnoraApiConnection(config);
        console.log(this.knoraApiConnection);
    }

    login() {

        this.knoraApiConnection.v2.auth.login("root", "test").subscribe(
            (token: string) => {
                console.log(token);
            },
            error => console.error(error)
        );

        /**/

    }

    logout() {

        this.knoraApiConnection.v2.auth.logout().subscribe(
            a => console.log(a),
            b => console.error(b)
        );

    }

    test() {

        this.knoraApiConnection.admin.users.getAll().subscribe(
            a => console.log(a),
            b => console.error(b)
        );

    }

}
