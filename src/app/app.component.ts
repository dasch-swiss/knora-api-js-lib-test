import { Component, OnInit } from '@angular/core';
import {ApiResponseData, KnoraApiConfig, KnoraApiConnection, LoginResponse} from '@knora/api';

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
            (loginResponse: ApiResponseData<LoginResponse>) => {
                console.log(loginResponse);
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

    getUsers() {

        this.knoraApiConnection.admin.users.getUsers().subscribe(
            a => console.log(a),
            b => console.error(b)
        );

    }

    getOntology(ontologyIri: string) {

      this.knoraApiConnection.v2.onto.getOntology(ontologyIri).subscribe((onto) => {
        console.log(onto);
      });

    }

}
