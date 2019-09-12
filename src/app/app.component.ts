import {Component, OnInit} from '@angular/core';
import {ApiResponseData, KnoraApiConfig, KnoraApiConnection, LoginResponse, OntologyCache, UserCache} from '@knora/api';
import {UsersResponse} from '@knora/api/src/models/admin/users-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  knoraApiConnection: KnoraApiConnection;

  userCache: UserCache;
  ontologyCache: OntologyCache;

  ngOnInit() {
    const config = new KnoraApiConfig('http', '0.0.0.0', 3333);
    this.knoraApiConnection = new KnoraApiConnection(config);
    console.log(this.knoraApiConnection);
    this.userCache = new UserCache(this.knoraApiConnection);
    this.ontologyCache = new OntologyCache(this.knoraApiConnection, config);
  }

  login() {

    this.knoraApiConnection.v2.auth.login('root', 'test').subscribe(
      (loginResponse: ApiResponseData<LoginResponse>) => {
        console.log(loginResponse);
      },
      error => console.error(error)
    );

  }

  logout() {

    this.knoraApiConnection.v2.auth.logout().subscribe(
      a => console.log(a),
      b => console.error(b)
    );

  }

  getUsers() {

    this.knoraApiConnection.admin.usersEndpoint.getUsers().subscribe(
      (a: ApiResponseData<UsersResponse>) => console.log(a.body.users),
      b => console.error(b)
    );

  }

  getOntology(iri: string) {

    this.ontologyCache.getOntology(iri).subscribe(
      onto => {
        console.log('onto ', onto);
      }
    );
  }

  getResourceClass(iri: string) {

    this.ontologyCache.getResourceClassDefinition(iri).subscribe(
      onto => {
        console.log(onto);
      }
    );
  }

  getResource(iri: string) {

    this.knoraApiConnection.v2.res.getResource(iri, this.ontologyCache).subscribe(
      (resClass) => {
        console.log(resClass);
      }
    );

  }

}
