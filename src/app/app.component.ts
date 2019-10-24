import {Component, OnInit} from '@angular/core';
import {
  ApiResponseData,
  CountQueryResponse,
  KnoraApiConfig,
  KnoraApiConnection,
  LoginResponse,
  ReadResource,
  ReadUriValue,
  UserCache,
  UsersResponse
} from '@knora/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  knoraApiConnection: KnoraApiConnection;

  userCache: UserCache;

  resource: ReadResource;
  uriVal: ReadUriValue;
  numOfUriVals: number;
  numOfNonExistingVals: number;
  uriPropType: string;

  ngOnInit() {
    const config = new KnoraApiConfig('http', '0.0.0.0', 3333, undefined, undefined, true);
    this.knoraApiConnection = new KnoraApiConnection(config);
    // console.log(this.knoraApiConnection);
    this.userCache = new UserCache(this.knoraApiConnection);
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

    this.knoraApiConnection.v2.ontologyCache.getOntology(iri).subscribe(
      onto => {
        console.log('onto ', onto);
      }
    );
  }

  getResourceClass(iri: string) {

    this.knoraApiConnection.v2.ontologyCache.getResourceClassDefinition(iri).subscribe(
      onto => {
        console.log(onto);
      }
    );
  }

  getResource(iri: string) {

    this.knoraApiConnection.v2.res.getResource(iri).subscribe(
      (res: ReadResource) => {
        console.log(res);
        this.resource = res;

        this.uriVal = res.getValuesAs('http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri', ReadUriValue)[0];

        this.numOfUriVals = res.getNumberOfValues('http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri');
        this.numOfNonExistingVals = res.getNumberOfValues('http://0.0.0.0:3333/ontology/0001/anything/v2#hasNothing');
        this.uriPropType = res.getValueType('http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri') as string;

      },
      (error) => {

      }
    );

  }

  getListNode(listNodeIri: string) {

    this.knoraApiConnection.v2.listNodeCache.getNode(listNodeIri).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  fulltextSearch(searchTerm: string) {

    this.knoraApiConnection.v2.search.doFulltextSearch(searchTerm, 0).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  fulltextSearchCountQuery(searchTerm: string) {

    this.knoraApiConnection.v2.search.doFulltextSearchCountQuery(searchTerm, 0).subscribe(
      (res: CountQueryResponse) => {
        console.log(res);
      }
    );
  }

  labelSearch(searchTerm: string) {

    this.knoraApiConnection.v2.search.doSearchByLabel(searchTerm, 0).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  extendedSearch() {

    const gravsearchQuery = `
                PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
                CONSTRUCT {

                    ?mainRes knora-api:isMainResource true .

                } WHERE {

                    ?mainRes a knora-api:Resource .

                    ?mainRes a <http://0.0.0.0:3333/ontology/0001/anything/v2#Thing> .
                }

                OFFSET 0
            `;

    this.knoraApiConnection.v2.search.doExtendedSearch(gravsearchQuery).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  extendedSearchCountQuery() {

    const gravsearchQuery = `
                PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
                CONSTRUCT {

                    ?mainRes knora-api:isMainResource true .

                } WHERE {

                    ?mainRes a knora-api:Resource .

                    ?mainRes a <http://0.0.0.0:3333/ontology/0001/anything/v2#Thing> .
                }

                OFFSET 0
            `;

    this.knoraApiConnection.v2.search.doExtendedSearchCountQuery(gravsearchQuery).subscribe(
      res => {
        console.log(res);
      }
    );
  }


}
