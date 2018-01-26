angular.module("ngTableDemos", []);

(function() {
  "use strict";

  angular.module("ngTableDemos").directive("loadingContainer", function() {
    return {
      restrict: "A",
      scope: false,
      link: function(scope, element, attrs) {
        var loadingLayer = angular.element("<div class='loading'></div>");
        element.append(loadingLayer);
        element.addClass("loading-container");
        scope.$watch(attrs.loadingContainer, function(value) {
          loadingLayer.toggleClass("ng-hide", !value);
        });
      }
    };
  })
})();

(function() {
  "use strict";

  angular.module("ngTableDemos").factory("ngTableSimpleList", dataFactory);

  dataFactory.$inject = [];

  function dataFactory() {
    return [{"id":1,"name":"Nissim","age":41,"money":454},{"id":2,"name":"Mariko","age":10,"money":-100},{"id":3,"name":"Mark","age":39,"money":291},{"id":4,"name":"Allen","age":85,"money":871},{"id":5,"name":"Dustin","age":10,"money":378},{"id":6,"name":"Macon","age":9,"money":128},{"id":7,"name":"Ezra","age":78,"money":11},{"id":8,"name":"Fiona","age":87,"money":285},{"id":9,"name":"Ira","age":7,"money":816},{"id":10,"name":"Barbara","age":46,"money":44},{"id":11,"name":"Lydia","age":56,"money":494},{"id":12,"name":"Carlos","age":80,"money":193}];
  }
})();

(function() {
  "use strict";

  angular.module("ngTableDemos").factory("ngTableGroupedList", dataFactory);

  dataFactory.$inject = [];

  function dataFactory() {
    return [{"name":"Karen","age":45,"money":798,"country":"Czech Republic"},{"name":"Cat","age":49,"money":749,"country":"Czech Republic"},{"name":"Bismark","age":48,"money":672,"country":"Denmark"},{"name":"Markus","age":41,"money":695,"country":"Costa Rica"},{"name":"Anthony","age":45,"money":559,"country":"Japan"},{"name":"Alex","age":55,"money":645,"country":"Czech Republic"},{"name":"Stephane","age":57,"money":662,"country":"Japan"},{"name":"Alex","age":59,"money":523,"country":"American Samoa"},{"name":"Tony","age":56,"money":540,"country":"Canada"},{"name":"Cat","age":57,"money":746,"country":"China"},{"name":"Christian","age":59,"money":572,"country":"Canada"},{"name":"Tony","age":60,"money":649,"country":"Japan"},{"name":"Cat","age":47,"money":675,"country":"Denmark"},{"name":"Stephane","age":50,"money":674,"country":"China"},{"name":"Markus","age":40,"money":549,"country":"Portugal"},{"name":"Anthony","age":53,"money":660,"country":"Bahamas"},{"name":"Stephane","age":54,"money":549,"country":"China"},{"name":"Karen","age":50,"money":611,"country":"American Samoa"},{"name":"Therese","age":53,"money":754,"country":"China"},{"name":"Bismark","age":49,"money":791,"country":"Canada"},{"name":"Daraek","age":56,"money":640,"country":"Costa Rica"},{"name":"Tony","age":43,"money":674,"country":"Canada"},{"name":"Karen","age":47,"money":700,"country":"Portugal"},{"name":"Therese","age":47,"money":718,"country":"Czech Republic"},{"name":"Karen","age":50,"money":655,"country":"Japan"},{"name":"Daraek","age":59,"money":581,"country":"American Samoa"},{"name":"Daraek","age":60,"money":595,"country":"Portugal"},{"name":"Markus","age":44,"money":607,"country":"China"},{"name":"Simon","age":58,"money":728,"country":"Japan"},{"name":"Simon","age":49,"money":655,"country":"Bahamas"}];
  }
})();

(function() {
  "use strict";

  angular.module("ngTableDemos").factory("ngTableDemoCountries", dataFactory);

  dataFactory.$inject = ["ngTableSimpleMediumList"];

  function dataFactory(ngTableSimpleMediumList) {
    var countries = ngTableSimpleMediumList.reduce(function(results, item) {
      if (results.indexOf(item.country) < 0) {
        results.push(item.country);
      }
      return results;
    }, []).map(function(country){
      return { id: country, title: country};
    });

    countries.sort(function(a, b) {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    return countries;
  }
})();

(function() {
  "use strict";

  angular.module("ngTableDemos").factory("ngTableNestedMediumList", dataFactory);

  dataFactory.$inject = ["ngTableSimpleMediumList"];

  function dataFactory(ngTableSimpleMediumList) {
    return ngTableSimpleMediumList.map(function(item){
      return { 
        name: item.name, 
        surname: item.surname,
        details: { 
          country: item.country,
          personal: { 
            age: item.age 
          }
        },
        job: {
          money: item.money
        }
      };
    });
  }
})();

(function() {
  "use strict";

  angular.module("ngTableDemos").factory("ngTableSimpleMediumList", dataFactory);

  dataFactory.$inject = [];

  function dataFactory() {
    return [{"name":"Martin","surname":"Freeman","age":55,"money":564,"country":"Uzbekistan"},{"name":"Vladimir","surname":"Carson","age":50,"money":131,"country":"China"},{"name":"Morgan","surname":"Marquez","age":55,"money":182,"country":"Tajikistan"},{"name":"Blossom","surname":"Maynard","age":50,"money":967,"country":"Latvia"},{"name":"Macy","surname":"Whitaker","age":54,"money":-49,"country":"France"},{"name":"Willa","surname":"Fischer","age":52,"money":-39,"country":"Viet Nam"},{"name":"Josiah","surname":"Fisher","age":59,"money":641,"country":"India"},{"name":"Jemima","surname":"Huff","age":56,"money":489,"country":"Bahamas"},{"name":"Scarlet","surname":"Mcdaniel","age":52,"money":311,"country":"Maldives"},{"name":"Bert","surname":"Walton","age":58,"money":856,"country":"Montserrat"},{"name":"Eleanor","surname":"Richard","age":58,"money":106,"country":"Sweden"},{"name":"Lysandra","surname":"Mclean","age":56,"money":809,"country":"Philippines"},{"name":"Brandon","surname":"Ellison","age":52,"money":512,"country":"Tunisia"},{"name":"Holly","surname":"Kelley","age":54,"money":445,"country":"Jersey"},{"name":"Azalia","surname":"Reeves","age":50,"money":630,"country":"Nigeria"},{"name":"Maite","surname":"Vasquez","age":55,"money":482,"country":"Niger"},{"name":"Fitzgerald","surname":"Joyce","age":56,"money":530,"country":"Greece"},{"name":"Naida","surname":"Marquez","age":53,"money":547,"country":"Saint Pierre and Miquelon"},{"name":"Cara","surname":"Zimmerman","age":60,"money":920,"country":"South Georgia and The South Sandwich Islands"},{"name":"Linda","surname":"Clements","age":60,"money":987,"country":"Bosnia and Herzegovina"},{"name":"Nelle","surname":"Osborn","age":50,"money":34,"country":"Sierra Leone"},{"name":"Fuller","surname":"Maddox","age":58,"money":3,"country":"United Arab Emirates"},{"name":"Jemima","surname":"Crawford","age":60,"money":-76,"country":"Norway"},{"name":"Tate","surname":"Trujillo","age":52,"money":681,"country":"United States"},{"name":"Devin","surname":"Knapp","age":51,"money":77,"country":"Kyrgyzstan"},{"name":"Miranda","surname":"Bowers","age":55,"money":-49,"country":"Solomon Islands"},{"name":"Bradley","surname":"Griffin","age":50,"money":453,"country":"South Georgia and The South Sandwich Islands"},{"name":"Ross","surname":"Mccormick","age":53,"money":397,"country":"Gambia"},{"name":"Melinda","surname":"Dotson","age":60,"money":8,"country":"French Polynesia"},{"name":"Imani","surname":"Brady","age":50,"money":324,"country":"Papua New Guinea"},{"name":"Camden","surname":"Porter","age":57,"money":698,"country":"Bahamas"},{"name":"Micah","surname":"Gross","age":56,"money":727,"country":"Georgia"},{"name":"Ella","surname":"Maldonado","age":57,"money":-79,"country":"Saint Helena, Ascension and Tristan da Cunha"},{"name":"Zoe","surname":"Warner","age":50,"money":408,"country":"Palau"},{"name":"Jaquelyn","surname":"Burt","age":53,"money":-94,"country":"Liechtenstein"},{"name":"Echo","surname":"Joseph","age":51,"money":422,"country":"Fiji"},{"name":"Dexter","surname":"Keith","age":52,"money":288,"country":"Tanzania"},{"name":"Sade","surname":"Gonzales","age":50,"money":352,"country":"Heard Island and Mcdonald Islands"},{"name":"Joel","surname":"Richmond","age":55,"money":733,"country":"French Guiana"},{"name":"Regan","surname":"Dillon","age":52,"money":479,"country":"Nigeria"},{"name":"Garth","surname":"Mclaughlin","age":60,"money":798,"country":"Niue"},{"name":"Sharon","surname":"Nguyen","age":54,"money":62,"country":"Bonaire, Sint Eustatius and Saba"},{"name":"Joseph","surname":"Ortega","age":58,"money":370,"country":"Andorra"},{"name":"Willow","surname":"Summers","age":54,"money":958,"country":"United States Minor Outlying Islands"},{"name":"Samson","surname":"Soto","age":54,"money":631,"country":"Trinidad and Tobago"},{"name":"Quail","surname":"Bush","age":58,"money":56,"country":"Reunion"},{"name":"Leah","surname":"Booker","age":53,"money":17,"country":"Pakistan"},{"name":"Mannix","surname":"Mccarty","age":50,"money":340,"country":"Suriname"},{"name":"Curran","surname":"Spence","age":52,"money":352,"country":"Pakistan"},{"name":"Wilma","surname":"Davenport","age":56,"money":-45,"country":"Senegal"},{"name":"Cyrus","surname":"Middleton","age":51,"money":840,"country":"Botswana"},{"name":"Avye","surname":"Whitehead","age":58,"money":-72,"country":"South Sudan"},{"name":"Chelsea","surname":"Jacobson","age":56,"money":354,"country":"American Samoa"},{"name":"Kaseem","surname":"Orr","age":53,"money":686,"country":"Portugal"},{"name":"Ann","surname":"Keller","age":52,"money":82,"country":"Canada"},{"name":"Mikayla","surname":"Cannon","age":52,"money":251,"country":"Bahrain"},{"name":"Lynn","surname":"Berry","age":53,"money":988,"country":"Denmark"},{"name":"Lunea","surname":"Newman","age":57,"money":480,"country":"China"},{"name":"Shelly","surname":"Cummings","age":60,"money":942,"country":"Tunisia"},{"name":"Kaitlin","surname":"Ayers","age":59,"money":235,"country":"Sint Maarten"},{"name":"Maggy","surname":"Head","age":58,"money":162,"country":"Falkland Islands"},{"name":"Herrod","surname":"Garrett","age":50,"money":383,"country":"Ecuador"},{"name":"Jorden","surname":"Tran","age":51,"money":916,"country":"Maldives"},{"name":"Raphael","surname":"Cox","age":50,"money":207,"country":"Switzerland"},{"name":"Willow","surname":"Hobbs","age":56,"money":239,"country":"Singapore"},{"name":"Harding","surname":"Gross","age":51,"money":-44,"country":"Czech Republic"},{"name":"Nichole","surname":"Bryant","age":55,"money":66,"country":"Venezuela"},{"name":"Mollie","surname":"Moran","age":52,"money":665,"country":"Japan"},{"name":"Nita","surname":"Ochoa","age":52,"money":227,"country":"Virgin Islands, British"},{"name":"Julian","surname":"Oneil","age":57,"money":809,"country":"Korea, South"},{"name":"Leo","surname":"Anthony","age":53,"money":278,"country":"Russian Federation"},{"name":"Reuben","surname":"Benjamin","age":51,"money":342,"country":"Costa Rica"},{"name":"Quyn","surname":"Lindsay","age":51,"money":122,"country":"Nigeria"},{"name":"Carolyn","surname":"Sweet","age":52,"money":821,"country":"Svalbard and Jan Mayen Islands"},{"name":"Anastasia","surname":"Bentley","age":59,"money":596,"country":"Nepal"},{"name":"Neville","surname":"Hatfield","age":60,"money":880,"country":"Korea, South"},{"name":"Fatima","surname":"Swanson","age":53,"money":980,"country":"French Southern Territories"},{"name":"Ebony","surname":"Cline","age":50,"money":280,"country":"Tanzania"},{"name":"Nayda","surname":"Gould","age":50,"money":439,"country":"Montserrat"},{"name":"Frances","surname":"Levy","age":60,"money":679,"country":"Ecuador"},{"name":"Courtney","surname":"Weaver","age":54,"money":636,"country":"Turkey"},{"name":"Rose","surname":"Woodard","age":55,"money":820,"country":"Fiji"},{"name":"Wanda","surname":"Berry","age":52,"money":360,"country":"Sudan"},{"name":"Dean","surname":"Silva","age":55,"money":-22,"country":"Netherlands"},{"name":"Leslie","surname":"Sanford","age":50,"money":64,"country":"Namibia"},{"name":"Xanthus","surname":"Chase","age":60,"money":499,"country":"Laos"},{"name":"Catherine","surname":"Dorsey","age":59,"money":94,"country":"Bahrain"},{"name":"Lana","surname":"Rios","age":52,"money":25,"country":"Guatemala"},{"name":"Wayne","surname":"Zimmerman","age":53,"money":557,"country":"Guadeloupe"},{"name":"Uriel","surname":"Fowler","age":51,"money":626,"country":"Mozambique"},{"name":"Montana","surname":"Perkins","age":52,"money":354,"country":"Bouvet Island"},{"name":"Robert","surname":"Stein","age":57,"money":-9,"country":"Saint Helena, Ascension and Tristan da Cunha"},{"name":"Teegan","surname":"Hopper","age":54,"money":806,"country":"Martinique"},{"name":"Mariko","surname":"Johnston","age":53,"money":901,"country":"Mongolia"},{"name":"Jorden","surname":"Miller","age":58,"money":604,"country":"Eritrea"},{"name":"Lance","surname":"Nieves","age":57,"money":701,"country":"France"},{"name":"Ina","surname":"Ramsey","age":51,"money":292,"country":"Tuvalu"},{"name":"Hayes","surname":"Osborn","age":55,"money":479,"country":"Guinea-Bissau"},{"name":"Sydney","surname":"Salinas","age":52,"money":10,"country":"Iraq"},{"name":"Sarah","surname":"Moore","age":60,"money":226,"country":"Niger"}];
  }
})();

(function() {
  "use strict";

  angular.module("ngTableDemos").controller("testDataController", testDataController);
  
  testDataController.$inject = ["ngTableDemoCountries"];
  function testDataController(ngTableDemoCountries){
    this.ngTableDemoCountries = ngTableDemoCountries;
    this.page = 1;
    this.pageSize = 10;
  }
})();