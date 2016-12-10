angular.module('capapp', [
	'mobile-angular-ui',
	'mobile-angular-ui.gestures',
	'mobile-angular-ui.components.switch',
	'ngRoute',
	//'ngMockE2E',
	'agenda.module',
	'news.module',
	'capapp.clarity.module',
  //  'capapp.clarity.mock',
	'directivesClarityApp',
	'ui.bootstrap',
	'directivesClarityApp',
	'mobile-angular-ui.directives.overlay',
	'customDirectives',
	'scrollableDirectives',
	'ui.bootstrap'
])

/*
.run(function($httpBackend, config) {
	$httpBackend.whenGET(new RegExp(config.API_URL + "/users/me")).passThrough();
	$httpBackend.whenPUT(new RegExp(config.API_URL + "/users/me")).passThrough();
})
*/
// handle authentication
/*
.run(function($log, $location, authenticationService, capAppService){
	    // Init on resume
    document.addEventListener("resume", initAuthentication, false);

    function initAuthentication(){
    	authenticationService.init().then(
    	function(user){
			$log.debug("authentication succesfull", user);
			capAppService.user = user;
			$location.path("/home");
		},
		function(response){
			$log.debug("authentication failed");
		});
    }
    initAuthentication();

	
})*/

//routing
.config(function($routeProvider) {
		$routeProvider
		.when('/', {
            templateUrl: 'views/home/menu.html',
            controller: 'capAppContoller'
        })
        .when('/profile', {
            templateUrl: 'views/home/profile.html',
            controller: 'capAppContoller'
        })
        .when('/login', {
            templateUrl: 'views/home/login.html',
            controller: 'loginCapAppContoller'
        })
		.when('/alerts/list', {
            templateUrl: 'views/home/alerts.html',
            controller: 'alertsContoller'
        })
		.when('/visiting/list', {
            templateUrl: 'views/home/places.html',
            controller: 'visitContoller'
        })
		.when('/contacts', {
            templateUrl: 'views/home/contacts.html',
            controller: 'contactsContoller'
        })
        .otherwise({
        	redirectTo: '/'
        });
	}
)

.constant("config", {
	//API_URL: "http://localhost:8080/capapi/api",
    //AUTH_URL: "http://localhost:8080/capapi/oauth",

    API_URL: "https://capapp.azurewebsites.net/api",
    AUTH_URL: "https://capapp.azurewebsites.net/oauth",



	peoplefinder : {
		url : "/people"
	},
	carpool : {
		url : "/carpool"
	},
	clarity : {
		url : "/clarity"
	},
	linkedin : {
		url : ""
	}
});
angular.module('capapp')

.controller("alertsContoller", function ($log, $scope) {

	$log.debug("init alertsContoller");

   $scope.notices = [];

  for (var j = 0; j < 15; j++) {
    $scope.notices.push({icon: 'envelope', message: 'Alert' + (j + 1)});
  }
 

  $scope.deleteNotice = function(notice) {
    var index = $scope.notices.indexOf(notice);
    if (index > -1) {
      $scope.notices.splice(index, 1);
    }
	
  };





});

angular.module('capapp')

.controller("capAppContoller", function ($log, $scope, $http, config, capAppService) {

	$log.debug("init capAppContoller");

	// Date
	var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var months = ['January', 'Februari', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    $scope.day = days[new Date().getDay()];
    $scope.date = new Date().getDate() + " " + months[new Date().getMonth()] + " " + new Date().getFullYear();

    //$http({method: 'GET', url: 'http://sample-env.zcnp5wxuqt.sa-east-1.elasticbeanstalk.com/employees'}).
    $http({method: 'GET', url: 'http://sample-env.zcnp5wxuqt.sa-east-1.elasticbeanstalk.com/employees'}).
    success(function(data, status) {
    	alert("Datta"+data);
    	$scope.empData =   data.employees;
	      
	    }).
	    error(function(data, status) {
	     alert("fail");
	    });
    
    // User
    $log.debug("User", capAppService.user);
	$scope.user = capAppService.user;
	$scope.user.pictureUrl = "images/logo_ing.png";

 

    $scope.color = function (i) {

        color = {
            "0": "color0",
            "1": "color1",
            "2": "color2",
            "3": "color3"
        };

        return color[i % 4];
    };

    $scope.saveProfile = function(){
     //   $http.put("http://localhost:8080/capapi/api/users/me", $scope.user).success(function(){
      //  	$log.debug("Saved Profile");
        //});
		alert("Mail Sent");
    };

	// Show and Hide footer
    $scope.showFooter = true;
    
    window.addEventListener('native.keyboardshow', function (e) {
        $scope.showFooter = false;
        $scope.$apply();
    });

    window.addEventListener('native.keyboardhide', function (e) {
        $scope.showFooter = true;
        $scope.$apply();
    });


});

angular.module('capapp')

.controller("contactsContoller", function ($log, $scope) {

	$log.debug("init contacts Contoller");
	$scope.rememberMe = false;

   });

angular.module('capapp')

.controller("visitContoller", function ($log, $scope) {

	$log.debug("init visit Contoller");
	$scope.visitImages = [
	{name: "1.png",desc:"Beautiful Ancient Temple of ancients built with stones, clay and a very rare granite.",web:"http://www.hyderabadtourism.in/"}, 
	{name:"2.png", desc:"Birla Mandir is a Hindu temple, built on a 280 feet (85 m) high hillock called Naubath Pahad on a 13 acres (53,000 m2) plot. The construction took 10 years and was opened in 1976 by Swami Ranganathananda of Ramakrishna Mission. The temple was constructed by Birla Foundation, which has also constructed several similar temples across India, all of which are known as Birla Mandir.",web:"http://www.hyderabadtourism.in/"},
	{name:"3.png", desc:"Golkonda, also known as Golconda, Gol konda, or Golla konda, is a citadel and fort in Southern India and was the capital of the medieval sultanate of the Qutb Shahi dynasty, is situated 11 kilometres west of Hyderabad",web:"http://www.hyderabadtourism.in/"},
	{name:"4.png", desc:"Falaknuma is a palace in Hyderabad, Telangana, India. It belonged to the Paigah family, and it was later owned by the Nizam of Hyderabad.",web:"http://www.hyderabadtourism.in/"},
	{name:"5.png", desc:"The Ramoji Film City in India is located in Hyderabad. At 1500 acres, it is the largest integrated film city in the world.",web:"http://www.hyderabadtourism.in/"}
	];

   });

var app = angular.module('customDirectives',[]);

// `$drag` example: drag to dismiss
//
app.directive('dragToDismiss', function($drag, $parse, $timeout) {
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem) {
        var dismiss = false;

        $drag.bind(elem, {
          transform: $drag.TRANSLATE_RIGHT,
          move: function(drag) {
            if (drag.distanceX >= drag.rect.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function() {
            elem.removeClass('dismiss');
          },
          end: function(drag) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() {
                scope.$apply(function() {
                  dismissFn(scope);
                });
              }, 300);
            } else {
              drag.reset();
            }
          }
        });
      };
    }
  };
});

//
// Another `$drag` usage example: this is how you could create
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
app.directive('carousel', function() {
  return {
    restrict: 'C',
    scope: {},
    controller: function() {
      this.itemCount = 0;
      this.activeItem = null;

      this.addItem = function() {
        var newId = this.itemCount++;
        this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
        return newId;
      };

      this.next = function() {
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
      };

      this.prev = function() {
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
      };
    }
  };
});

app.directive('carouselItem', function($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();

      var zIndex = function() {
        var res = 0;
        if (id === carousel.activeItem) {
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function() {
        return carousel.activeItem;
      }, function() {
        elem[0].style.zIndex = zIndex();
      });

      $drag.bind(elem, {
        //
        // This is an example of custom transform function
        //
        transform: function(element, transform, touch) {
          //
          // use translate both as basis for the new transform:
          //
          var t = $drag.TRANSLATE_BOTH(element, transform, touch);

          //
          // Add rotation:
          //
          var Dx = touch.distanceX;
          var t0 = touch.startTransform;
          var sign = Dx < 0 ? -1 : 1;
          var angle = sign * Math.min((Math.abs(Dx) / 700) * 30, 30);

          t.rotateZ = angle + (Math.round(t0.rotateZ));

          return t;
        },
        move: function(drag) {
          if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            elem.addClass('dismiss');
          } else {
            elem.removeClass('dismiss');
          }
        },
        cancel: function() {
          elem.removeClass('dismiss');
        },
        end: function(drag) {
          elem.removeClass('dismiss');
          if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            scope.$apply(function() {
              carousel.next();
            });
          }
          drag.reset();
        }
      });
    }
  };
});

app.directive('dragMe', ['$drag', function($drag) {
  return {
    controller: function($scope, $element) {
      $drag.bind($element,
        {
          //
          // Here you can see how to limit movement
          // to an element
          //
          transform: $drag.TRANSLATE_INSIDE($element.parent()),
          end: function(drag) {
            // go back to initial position
            drag.reset();
          }
        },
        { // release touch when movement is outside bounduaries
          sensitiveArea: $element.parent()
        }
      );
    }
  };
}]);
var app = angular.module('customDirectives',[]);

// `$drag` example: drag to dismiss
//
app.directive('dragToDismiss', function($drag, $parse, $timeout) {
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem) {
        var dismiss = false;

        $drag.bind(elem, {
          transform: $drag.TRANSLATE_RIGHT,
          move: function(drag) {
            if (drag.distanceX >= drag.rect.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function() {
            elem.removeClass('dismiss');
          },
          end: function(drag) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() {
                scope.$apply(function() {
                  dismissFn(scope);
                });
              }, 300);
            } else {
              drag.reset();
            }
          }
        });
      };
    }
  };
});

//
// Another `$drag` usage example: this is how you could create
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
app.directive('carousel', function() {
  return {
    restrict: 'C',
    scope: {},
    controller: function() {
      this.itemCount = 0;
      this.activeItem = null;

      this.addItem = function() {
        var newId = this.itemCount++;
        this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
        return newId;
      };

      this.next = function() {
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
      };

      this.prev = function() {
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
      };
    }
  };
});

app.directive('carouselItem', function($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();

      var zIndex = function() {
        var res = 0;
        if (id === carousel.activeItem) {
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function() {
        return carousel.activeItem;
      }, function() {
        elem[0].style.zIndex = zIndex();
      });

      $drag.bind(elem, {
        //
        // This is an example of custom transform function
        //
        transform: function(element, transform, touch) {
          //
          // use translate both as basis for the new transform:
          //
          var t = $drag.TRANSLATE_BOTH(element, transform, touch);

          //
          // Add rotation:
          //
          var Dx = touch.distanceX;
          var t0 = touch.startTransform;
          var sign = Dx < 0 ? -1 : 1;
          var angle = sign * Math.min((Math.abs(Dx) / 700) * 30, 30);

          t.rotateZ = angle + (Math.round(t0.rotateZ));

          return t;
        },
        move: function(drag) {
          if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            elem.addClass('dismiss');
          } else {
            elem.removeClass('dismiss');
          }
        },
        cancel: function() {
          elem.removeClass('dismiss');
        },
        end: function(drag) {
          elem.removeClass('dismiss');
          if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            scope.$apply(function() {
              carousel.next();
            });
          }
          drag.reset();
        }
      });
    }
  };
});

app.directive('dragMe', ['$drag', function($drag) {
  return {
    controller: function($scope, $element) {
      $drag.bind($element,
        {
          //
          // Here you can see how to limit movement
          // to an element
          //
          transform: $drag.TRANSLATE_INSIDE($element.parent()),
          end: function(drag) {
            // go back to initial position
            drag.reset();
          }
        },
        { // release touch when movement is outside bounduaries
          sensitiveArea: $element.parent()
        }
      );
    }
  };
}]);

(function() {
  'use strict';
 	
	var module = angular.module('scrollableDirectives',['mobile-angular-ui.core.touchmoveDefaults']);

  var getTouchY = function(event) {
    var touches = event.touches && event.touches.length ? event.touches : [event];
    var e = (event.changedTouches && event.changedTouches[0]) ||
        (event.originalEvent && event.originalEvent.changedTouches &&
            event.originalEvent.changedTouches[0]) ||
        touches[0].originalEvent || touches[0];

    return e.clientY;
  };

  module.directive('scrollableContent', function() {
    return {
      restrict: 'C',
      controller: ['$element', '$document', 'allowTouchmoveDefault', function($element, $document, allowTouchmoveDefault) {
        var scrollableContent = $element[0];
        var scrollable = $element.parent()[0];

        // Handle nobounce behaviour
        if ('ontouchmove' in $document[0]) {
          var allowUp;
          var allowDown;
          var lastY;
          var setupTouchstart = function(event) {
            allowUp = (scrollableContent.scrollTop > 0);

            allowDown = (scrollableContent.scrollTop < scrollableContent.scrollHeight - scrollableContent.clientHeight);
            lastY = getTouchY(event);
          };

          $element.on('touchstart', setupTouchstart);
          $element.on('$destroy', function() {
            $element.off('touchstart');
          });

          allowTouchmoveDefault($element, function(event) {
            var currY = getTouchY(event);
            var up = (currY > lastY);
            var down = !up;
            lastY = currY;
            return (up && allowUp) || (down && allowDown);
          });
        }

        this.scrollableContent = scrollableContent;

        this.scrollTo = function(elementOrNumber, marginTop) {
          marginTop = marginTop || 0;

          if (angular.isNumber(elementOrNumber)) {
            scrollableContent.scrollTop = elementOrNumber - marginTop;
          } else {
            var target = angular.element(elementOrNumber)[0];
            if ((!target.offsetParent) || target.offsetParent === scrollable) {
              scrollableContent.scrollTop = target.offsetTop - marginTop;
            } else {
              // recursively subtract offsetTop from marginTop until it reaches scrollable element.
              this.scrollTo(target.offsetParent, marginTop - target.offsetTop);
            }
          }
        };
      }],
      link: function(scope, element) {
        if (overthrow.support !== 'native') {
          element.addClass('overthrow');
          overthrow.forget();
          overthrow.set();
        }
      }
    };
  });

  angular.forEach(['input', 'textarea'], function(directiveName) {
    module.directive(directiveName, ['$rootScope', '$timeout', function($rootScope, $timeout) {
      return {
        require: '?^^scrollableContent',
        link: function(scope, elem, attrs, scrollable) {
          // Workaround to avoid soft keyboard hiding inputs
          elem.on('focus', function() {
            if (scrollable && scrollable.scrollableContent) {
              var h1 = scrollable.scrollableContent.offsetHeight;
              $timeout(function() {
                var h2 = scrollable.scrollableContent.offsetHeight;
                //
                // if scrollableContent height is reduced in half second
                // since an input got focus we assume soft keyboard is showing.
                //
                if (h1 > h2) {
                  var marginTop = 10;
                  // if scrollableHeader is present increase the marginTop to compensate for scrollableHeader's height.
                  var scrollableHeader = scrollable.scrollableContent.parentElement.querySelector('.scrollable-header');
                  if (scrollableHeader) {
                    marginTop = (scrollableHeader.getBoundingClientRect().bottom - scrollableHeader.getBoundingClientRect().top) + marginTop;
                  }
                  scrollable.scrollTo(elem, marginTop);
                }
              }, 500);
            }
          });
        }
      };
    }]);
  });

  /**
   * @directive uiScrollTop
   * @restrict A
   *
   * @param {expression} uiScrollTop The expression to be evaluated when scroll
   * reaches top of element.
   */

  /**
   * @directive uiScrollBottom
   * @restrict A
   *
   * @param {expression} uiScrollBottom The expression to be evaluated when scroll
   * reaches bottom of element.
   */
  angular.forEach(
    {
      uiScrollTop: function(elem) {
        return elem.scrollTop === 0;
      },
      uiScrollBottom: function(elem) {
        return elem.scrollHeight === elem.scrollTop + elem.clientHeight;
      }
    },
    function(reached, directiveName) {
      module.directive(directiveName, [function() {
        return {
          restrict: 'A',
          link: function(scope, elem, attrs) {
            elem.on('scroll', function() {
              /* If reached bottom */
              if (reached(elem[0])) {
                /* Do what is specified by onScrollBottom */
                scope.$apply(function() {
                  scope.$eval(attrs[directiveName]);
                });
              }
            });
          }
        };
      }]);
    });

  /**
   * @directive uiScrollableHeader
   * @restrict C
   */

  /**
   * @directive uiScrollableFooter
   * @restrict C
   */
  angular.forEach({Top: 'scrollableHeader', Bottom: 'scrollableFooter'},
    function(directiveName, side) {
      module.directive(directiveName, [
        '$window',
        function($window) {
          return {
            restrict: 'C',
            link: function(scope, element) {
              var el = element[0];
              var parentStyle = element.parent()[0].style;

              var adjustParentPadding = function() {
                var styles = $window.getComputedStyle(el);
                var margin = parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10);
                parentStyle['padding' + side] = el.offsetHeight + margin + 'px';
              };

              var interval = setInterval(adjustParentPadding, 30);

              element.on('$destroy', function() {
                parentStyle['padding' + side] = null;
                clearInterval(interval);
                interval = adjustParentPadding = element = null;
              });
            }
          };
        }
      ]);
    });
})();

/**
 * A module with just a directive to create a switch input component.
 *
 * @module mobile-angular-ui.components.switch
 */
(function() {
  'use strict';
  angular.module('mobile-angular-ui.components.switch', [])

  /**
   * @directive uiSwitch
   * @restrict EA
   * @requires ngModel
   * @description
   *
   * The `ui-switch` directive (not to be confused with `ng-switch`) lets
   * you create a toggle switch control bound to a boolean `ngModel` value.
   *
   * <figure class="full-width-figure">
   *   <img src="/assets/img/figs/switch.png" alt=""/>
   * </figure>
   *
   * It requires `ngModel`. It supports `ngChange` and `ngDisabled`.
   *
   * ``` html
   * <ui-switch  ng-model="invoice.paid"></ui-switch>
   * ```
   *
   * ``` html
   * <ui-switch  ng-model="invoice.paid" disabled></ui-switch>
   * ```
   *
   * ``` html
   * <ui-switch  ng-model="invoice.paid" ng-disabled='{{...}}'></ui-switch>
   * ```
   *
   * Note that if `$drag` service from `mobile-angular-ui.gestures` is available
   * `ui-switch` will support drag too.
   *
   * @param {expression} ngModel The model bound to this component.
   * @param {boolean} [disabled] Whether this component should be disabled.
   * @param {expression} [ngChange] An expression to be evaluated when model changes.
   */
    .directive('uiSwitch', ['$injector', function($injector) {
      var $drag = $injector.has('$drag') && $injector.get('$drag');

      return {
        restrict: 'EA',
        scope: {
          model: '=ngModel',
          changeExpr: '@ngChange'
        },
        link: function(scope, elem, attrs) {
          elem.addClass('switch');

          var disabled = attrs.disabled || elem.attr('disabled');

          var unwatchDisabled = scope.$watch(
          function() {
            return attrs.disabled || elem.attr('disabled');
          },
          function(value) {
            if (!value || value === 'false' || value === '0') {
              disabled = false;
            } else {
              disabled = true;
            }
          }
        );

          var handle = angular.element('<div class="switch-handle"></div>');
          elem.append(handle);

          if (scope.model) {
            elem.addClass('active');
          }
          elem.addClass('switch-transition-enabled');

          var unwatch = scope.$watch('model', function(value) {
            if (value) {
              elem.addClass('active');
            } else {
              elem.removeClass('active');
            }
          });

          var setModel = function(value) {
            if (!disabled && (value !== scope.model)) {
              scope.model = value;
              scope.$apply();
              if (scope.changeExpr !== null && scope.changeExpr !== undefined) {
                scope.$parent.$eval(scope.changeExpr);
              }
            }
          };

          var clickCb = function() {
            setModel(!scope.model);
          };

          elem.on('click tap', clickCb);

          var unbind = angular.noop;

          if ($drag) {
            unbind = $drag.bind(handle, {
              transform: $drag.TRANSLATE_INSIDE(elem),
              start: function() {
                elem.off('click tap', clickCb);
              },
              cancel: function() {
                handle.removeAttr('style');
                elem.off('click tap', clickCb);
                elem.on('click tap', clickCb);
              },
              end: function() {
                var rh = handle[0].getBoundingClientRect();
                var re = elem[0].getBoundingClientRect();
                if (rh.left - re.left < rh.width / 3) {
                  setModel(false);
                  handle.removeAttr('style');
                } else if (re.right - rh.right < rh.width / 3) {
                  setModel(true);
                  handle.removeAttr('style');
                } else {
                  handle.removeAttr('style');
                }
                elem.on('click tap', clickCb);
              }
            });
          }

          elem.on('$destroy', function() {
            unbind();
            unwatchDisabled();
            unwatch();
            setModel = unbind = unwatch = unwatchDisabled = clickCb = null;
          });
        }
      };
    }]);
})();

angular.module('capapp')

.filter('moduleFilter', function () {
    return function (items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function (item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if (reverse) filtered.reverse();
        return filtered;
    };
});

angular.module('capapp')

.service('capAppService', function(){

	this.user = {
			welcomeNote: "Welcome To Capgemini",
			firstName: "",
			middleName: "",
			lastName: "",
			tittle:"",
			department: "",
			country: "India",
			place: "Hyderabad",
			account: "",
			bPhone: "",
			mobile:"",
			to:"",
			cc:"",
			subject:"",
			message:""
			};
});


angular.module('agenda.module', [
	'ngRoute'
])

//routing
.config(['$routeProvider', function($routeProvider) {
		$routeProvider
	
		.when('/agenda/agendaHome', {
            templateUrl: 'views/agenda/agendaHome.html',
            controller: 'agendaHomeContoller'
        })
		.when('/agenda/pageConstruction', {
            templateUrl: 'views/agenda/pageConstruction.html',
            controller: 'agendaHomeContoller'
        })
		.when('/news/market', {
            templateUrl: 'views/agenda/marketNews.html',
            controller: 'collapseDemoCtrl'
        });
	}]
);
angular.module('agenda.module')

.controller("agendaHomeContoller", ['$log', '$scope', '$location', '$routeParams', 'config', '$modal','$http', function($log, $scope, $location, $routeParams, config, $modal,$http){
	$log.debug("init agendaHomeContoller");
	
	 /*  $http({method: 'GET', url: 'http://localhost:8080/CCCApiProviderv3/agenda'}).
	     $http({method: 'GET', url: 'http://sample-env.zcnp5wxuqt.sa-east-1.elasticbeanstalk.com/agenda'}).
	    success(function(data, status) {
		      
		      alert("Recieved Agenda data from AWS Agenda Rest Service-->"+data);
		      $scope.agendaData = data.clientAgendaList;
		    }).
		    error(function(data, status) {
		     alert("REST call to Agenda data from AWS Agenda Rest Service failed.");
		    });*/
	
	$scope.agendaData = [
		{
			account: "DCX",
			project: "Lisa",
			agendaId: "#agenda1",
			agendaOvr: "agenda1",
			startDate: "Dec 12 2016",
			startTime: "9:00 - 12:00",
			description:"Presentation of Scrum methodology",
			story: "Scrum is part of the Agile movement. Agile is a response to the failure of the dominant software development project management paradigms (including waterfall) and borrows many principles from lean manufacturing."
		},{
			account: "DCX",
			project: "Lisa",
			agendaId: "#agenda2",
			agendaOvr: "agenda2",
			startDate: "Dec 12 2016",
			startTime: "12:00 - 13:00",
			description:"Lunch",
			story: "Team lunch with delivery heads and project managers"
		},{
			account: "DCX",
			project: "Lisa",
			agendaId: "#agenda3",
			agendaOvr: "agenda3",
			startDate: "Dec 12 2016",
			startTime: "14:00 - 17:00",
			description:"Implementing Scrum",
			story: "The Agile Manifesto doesn’t provide concrete steps. Organizations usually seek more specific methods within the Agile movement. These include Crystal Clear, Extreme Programming, Feature Driven Development, Dynamic Systems Development Method (DSDM), Scrum, and others."
		},
		{
			account: "DCX",
			project: "Lisa",
			agendaId: "#agenda3",
			agendaOvr: "agenda3",
			startDate: "Dec 13 2016",
			startTime: "09:00 - 11:00",
			description:"Team Introduction",
			story: "Meet the offshore project team to discuss about the issues and how to proceed further with new methodology."
		},
		{
			account: "DCX",
			project: "Lisa",
			agendaId: "#agenda3",
			agendaOvr: "agenda3",
			startDate: "Dec 13 2016",
			startTime: "13:00 - 16:00",
			description:"Meeting with ACE team",
			story: "Presentation on migrating the old data centres to new data centre, discuss about the risks, recovery, cost etc"
		}
	];

}]

);
angular.module('agenda.module')
.controller('collapseDemoCtrl', ['$scope', function ($scope) {
  $scope.isCollapsedJune = false;
   $scope.isCollapsedMay = false;
    $scope.isCollapsedApril = false;
}]);
angular.module('directivesClarityApp',[])

.directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue === undefined) return '';
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput !== inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
})


  .directive('starRating',
	function() {
		return {
			restrict : 'A',
			template : '<ul class="rating">	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)"> \u2605 </li></ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};
				
				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};
				
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if (newVal) {
							updateStars();
						}
					}
				);
			}
		};
	}
);
angular.module('mobile-angular-ui.directives.overlay', []).directive('overlay', [
  "$compile", function($compile) {
    return {
        compile: function(tElem, tAttrs) {
            var rawContent = tElem.html();
            return function postLink(scope, elem, attrs) {
                var active = "";
                var body = rawContent;
                var id = attrs.overlay;

                if (attrs["default"] !== null) {
                   active = "default='" + attrs["default"] + "'";
                }

                var html = "<div class=\"overlay\" id=\"" + id + "\" toggleable " + active + " parent-active-class=\"overlay-in\" active-class=\"overlay-show\">\n  <div class=\"overlay-inner\">\n    <div class=\"overlay-background\"></div>\n    <a href=\"#" + id + "\" toggle=\"off\" class=\"overlay-dismiss\">\n      <i class=\"fa fa-times-circle-o\"></i>\n    </a>\n    <div class=\"overlay-content\">\n      <div class=\"overlay-body\">\n        " + body + "\n      </div>\n    </div>\n  </div>\n</div>";
                elem.remove();

                var sameId = angular.element(document.getElementById(id));

                if (sameId.length > 0 && sameId.hasClass('overlay')) {
                  sameId.remove();
                }

                body = angular.element(document.body);
                body.prepend($compile(html)(scope));

                if (attrs["default"] === "active") {
                   body.addClass('overlay-in');
                }
            };
        }
    };
  }
]);
angular.module('agenda.module')
  .controller('ratingCtrl', ['$scope', function($scope) {
    $scope.rating = 5;
    $scope.rateFunction = function(rating) {
      alert('Thanks for the Rating selected - ' + rating);
    };
  }]);
angular.module('capapp.clarity.module', [
	'ngRoute'
])

//routing
.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/clarity/index', {
            templateUrl: 'views/clarity/index.html',
            controller: 'indexClarityContoller'
        })
        .when('/clarity/form/:weekIndex', {
            templateUrl: 'views/clarity/form.html',
            controller: 'formClarityContoller'
        })
        .when('/clarity/select-tasks/:weekIndex', {
            templateUrl: 'views/clarity/selecttasks.html',
            controller: 'formClarityContoller'
        })
        .when('/clarity/testfab', {
            templateUrl: 'views/clarity/testfab.html',
            controller: 'testFabContoller'
        })
		;
	}]
);
angular.module('capapp.clarity.module')

.controller("clarityIndexContoller", ['$log', '$scope', 'config', 'clarityService', function($log, $scope, config, clarityService){
	$log.debug("init clarityIndexContoller");

	$scope.timesheets = null;

	clarityService.getTimeSheets().then(function(data){
		$log.debug("Load timesheets tst fab " + data);
		$scope.timesheets = data;
		//$scope.timesheets.startDate = Date.parse($scope.timesheets.startDate);
	});

}]);
angular.module('capapp.clarity.module')

.controller("formClarityContoller", ['$log', '$scope', '$location', '$routeParams', 'config', 'clarityService', '$modal', function($log, $scope, $location, $routeParams, config, clarityService, $modal){
	$log.debug("init formClarityContoller");
	
	$scope.weekIndex = $routeParams.weekIndex;

	$log.debug("de weekindex is : " + $routeParams.weekIndex);
	

	$scope.days = [
		'Ma',
		'Di',
		'Wo',
		'Do',
		'Vr',
		'Za',
		'Zo'
	];

	clarityService.getTimeSheets().then(function(data){
		$log.debug("Load timesheets" + data);
		$scope.timesheets = data;
		
		var i;
		for(i=0; i<$scope.timesheets.length; i++){
			$scope.timesheets[i].startDate = Date.parse($scope.timesheets[i].startDate);
			$scope.timesheets[i].endDate = Date.parse($scope.timesheets[i].endDate);
		}
	});

	
	$scope.goToMain = function(){
		$log.debug("fab clicked goto main");
		$location.path('/clarity/index');
	};
	
	
	
	
	$scope.items = [
					{pDesc:'LISA Sep Dec 2014',
					 pCode:'1'
					 }, 
					{pDesc:'Holiday',
					 pCode:'2'
					 },
					 {pDesc:'Annual Leave',
					 pCode:'3'
					 },
					 {pDesc:'Shadow Billing',
					 pCode:'4'
					 },
					 {pDesc:'Com Off',
					 pCode:'5'
					 }
					];
	 $scope.openTasks = function (size) {
	$log.debug("openTasks" );
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
	
	
	
	
	// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
  
	
    $modalInstance.close($scope.selection);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
  
  //check box handlings
	
	$scope.selection = [];
	 $scope.toggleSelection = function (item) {
	
     var idx = $scope.selection.indexOf(item);
     // is currently selected
     if (idx > -1) {
       $scope.selection.splice(idx, 1);
     }
     // is newly selected
     else {
       $scope.selection.push(item);
     }
   };
  
  
};
ModalInstanceCtrl.$inject = ['$scope', '$modalInstance', 'items'];
	//Below is separated outside for angular - mobile ui

	$scope.selection = [];
	 $scope.toggleSelection = function (item) {
	
     var idx = $scope.selection.indexOf(item);
     // is currently selected
     if (idx > -1) {
       $scope.selection.splice(idx, 1);
     }
     // is newly selected
     else {
       $scope.selection.push(item);
     }
   };

   //for project radio button click
   $scope.selPrjData = [];
    $scope.selTimeSheet = [];
    $scope.onSelectProject = function (pitem, tms) {
		$log.debug("-->"+tms.startDate);
		$log.debug("S-->"+tms.status);
		$scope.selPrjData.length=0;
		$scope.selectedTasks.length=0;
		
	var idx = $scope.selPrjData.indexOf(pitem);
	  if (idx > -1) {
       $scope.selPrjData.splice(idx, 1);
     } else {
       $scope.selPrjData.push(pitem);
     }
	 
	 
	 var idt = $scope.selTimeSheet.indexOf(tms);
	  if (idt > -1) {
       $scope.selTimeSheet.splice(idt, 1);
     } else {
       $scope.selTimeSheet.push(tms);
     }
   };
   
   //on selection of tasks
   $scope.selectedTasks = [];
	 $scope.toggleTasksSelection = function (item) {
	
     var idx = $scope.selectedTasks.indexOf(item);
     // is currently selected
     if (idx > -1) {
       $scope.selectedTasks.splice(idx, 1);
     }
     // is newly selected
     else {
       $scope.selectedTasks.push(item);
     }
   };
   
  
    $scope.showSelectedTasks = function () {
	$log.debug("Project Desc: 1[] "+$scope.selPrjData[0].projectdesc);
	$log.debug("Project Code: 1[] "+$scope.selPrjData[0].projectcode);
	
	
	$log.debug("selTimeSheet: 1[] "+$scope.selTimeSheet[0].status);
	$scope.selTimeSheet[0].status = 'Submitted';
	$log.debug("selTimeSheet: 2[] "+$scope.selTimeSheet[0].status);
	
	var j;
	
		for(j=0; j<$scope.selectedTasks.length; j++){
		
		var a = $scope.selectedTasks[j].taskdesc;
		$log.debug("Tdesc:   "+a);
		}
	//call the api here	  

	
	//navigate to how page
	alert("Time Sheets Submitted");
	
   };
	
	//Agenda Function
	
	  $scope.navigateToAgenda = function () {

		$log.debug(" navigateToAgenda ");
		$location.path('/agenda/agendaHome');
	
   };
	
	
	
  
    $scope.enteredHours = function () {

			
		var j;
	for(j=0; j<$scope.selectedTasks.length; j++){
			
		var total;
		var mon = $scope.selectedTasks[j].weekdays[0].MonHours;
		var tue = $scope.selectedTasks[j].weekdays[1].TueHours;
		var wed = $scope.selectedTasks[j].weekdays[2].WedHours;
		var thu = $scope.selectedTasks[j].weekdays[3].ThrHours;
		var fri = $scope.selectedTasks[j].weekdays[4].FriHours;
		var sat = $scope.selectedTasks[j].weekdays[5].SatHours;
		var sun = $scope.selectedTasks[j].weekdays[6].SunHours;
		
	
		$scope.selectedTasks[j].totalhours = mon+tue+wed+thu+fri+sat+sun;

		}    
   };
  
	
	

}]);
angular.module('capapp.clarity.module')

.controller("indexClarityContoller",['$log','$scope','$location','config','clarityService', function($log, $scope, $location, config, clarityService){
	$log.debug("init indexClarityContoller");

	$scope.timesheets = null;
	//$scope.weekIndex = null;

	clarityService.getTimeSheets().then(function(data){
		$log.debug("Load timesheets " + data);
		$scope.timesheets = data;

		var i;
		for(i=0; i<$scope.timesheets.length; i++){
			$scope.timesheets[i].startDate = Date.parse($scope.timesheets[i].startDate);
			$scope.timesheets[i].endDate = Date.parse($scope.timesheets[i].endDate);
		}
		
	});

	$scope.goToForm = function(selectedPeriodId){
		$log.debug("periodId goToForm fabian = " + selectedPeriodId);
		
		
		var selectedTimesheetIndex;
		var i;
		for(i=0; i<$scope.timesheets.length; i++){
			if ($scope.timesheets[i].periodId == selectedPeriodId) {
				selectedTimesheetIndex = i;
			}
		}

		$log.debug("selectedTimesheetIndex fabje = " + selectedTimesheetIndex);
		$location.path('/clarity/select-tasks/' + selectedTimesheetIndex);

		// $location.path('/clarity/form/' + currentWeekIndex);
	};
	
	
	
	

	
	
	

}]);


angular.module('capapp.clarity.module')

.controller("testFabContoller", ['$log', '$scope', '$location', '$routeParams', 'config', 'clarityService', function($log, $scope, $location, $routeParams, config, clarityService){
	$log.debug("init testFabContoller");
	

}]);
angular.module('directivesClarityApp',[])

.directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue === undefined) return '';
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput !== inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
})


  .directive('starRating',
	function() {
		return {
			restrict : 'A',
			template : '<ul class="rating">	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)"> \u2605 </li></ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};
				
				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};
				
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if (newVal) {
							updateStars();
						}
					}
				);
			}
		};
	}
);
angular.module('mobile-angular-ui.directives.overlay', []).directive('overlay', [
  "$compile", function($compile) {
    return {
        compile: function(tElem, tAttrs) {
            var rawContent = tElem.html();
            return function postLink(scope, elem, attrs) {
                var active = "";
                var body = rawContent;
                var id = attrs.overlay;

                if (attrs["default"] !== null) {
                   active = "default='" + attrs["default"] + "'";
                }

                var html = "<div class=\"overlay\" id=\"" + id + "\" toggleable " + active + " parent-active-class=\"overlay-in\" active-class=\"overlay-show\">\n  <div class=\"overlay-inner\">\n    <div class=\"overlay-background\"></div>\n    <a href=\"#" + id + "\" toggle=\"off\" class=\"overlay-dismiss\">\n      <i class=\"fa fa-times-circle-o\"></i>\n    </a>\n    <div class=\"overlay-content\">\n      <div class=\"overlay-body\">\n        " + body + "\n      </div>\n    </div>\n  </div>\n</div>";
                elem.remove();

                var sameId = angular.element(document.getElementById(id));

                if (sameId.length > 0 && sameId.hasClass('overlay')) {
                  sameId.remove();
                }

                body = angular.element(document.body);
                body.prepend($compile(html)(scope));

                if (attrs["default"] === "active") {
                   body.addClass('overlay-in');
                }
            };
        }
    };
  }
]);
angular.module('capapp.clarity.module')

.service("clarityService", ['$q', '$http', 'config', function($q, $http, config){

    this.getTimeSheets = function(){
        		
       	var deferred = $q.defer();

		$http.get(config.clarity.url + "/timesheets")
		.success(function(data, status, headers, config) {
			deferred.resolve(data);
		}).error(function(data, status, headers, config) {
			deferred.reject();
		});

		return deferred.promise;

    };

}]);

angular.module('news.module', [
	'ngRoute'])

//routing
.config(['$routeProvider', function($routeProvider) {
		$routeProvider
	
		.when('/news/newsHome', {
            templateUrl: 'views/news/newsHome.html',
            controller: 'newsHomeController'
        });
	}]
);
angular.module('news.module')

.controller("itemsController",  ['$scope', function ($scope) {

                $scope.$parent.isopen = ($scope.$parent.default === $scope.item);

                $scope.$watch('isopen', function (newvalue, oldvalue, $scope) {
                    $scope.$parent.isopen = newvalue;
                });

            }]);
angular.module('news.module')

.controller("newsHomeController",  ['$scope', function ($scope) {
$scope.items = [
                    {
                        name: "item1",
                        desc: "@December",
                        subitems: [
                            {
                                name: "subitem1",
                                desc: "Capgemini announced as a recipient of two Pegasystems Partner Excellence Awards"
                            },
                            {
                                name: "subitem2",
                                desc: "Capgemini launches a capital increase in the context of the financing of the IGATE acquisition"
                            },
                            {
                                name: "subitem2",
                                desc: "Success of the capital increase launched for the financing of the IGATE acquisition"
                            }]
                    },
                    {
                        name: "item2",
                        desc: "@November",
                        subitems: [
                            {
                                name: "subitem1",
                                desc: "Capgemini wins multi-million euro contract extension with Nokia for Global Order Management Processing"
                            },
                            {
                                name: "subitem2",
                                desc: "2015 Capital Market Day"
                            },
                            {
                                name: "subitem2",
                                desc: "Capgemini Honored as the Recipient of EMC Global Innovation Award"
                            }]
                    },
                    {
                        name: "item3",
                        desc: "@October",
                        subitems: [
                            {
                                name: "subitem1",
                                desc: "Capgemini Chosen as State of Georgia’s Multi-sourcing Service Integrator"
                            },
                            {
                                name: "subitem2",
                                desc: "Capgemini Introduces New Cloud-Based Banking Platform Solution"
                            },
                            {
                                name: "subitem2",
                                desc: "Capgemini Canada Named Among Toronto’s Top Employers and Canada’s Best Diversity Employers"
                            }]
                    },
					{
                        name: "item4",
                        desc: "@September",
                        subitems: [
                            {
                                name: "subitem1",
                                desc: "Capgemini Accelerates Global FinTech Initiative to Meet Market Demand for Innovation"
                            },
                            {
                                name: "subitem2",
                                desc: "Capgemini has completed the early redemption of the ORNANE bonds"
                            },
                            {
                                name: "subitem2",
                                desc: "Capgemini successfully places a €500 million bond issue"
                            }]
                    },
					{
                        name: "item5",
                        desc: "@August",
                        subitems: [
                            {
                                name: "subitem1",
                                desc: "Global Digital Payment Transactions Set to Reach 10 Percent Growth for First Time Finds World Payments Report 2016"
                            },
                            {
                                name: "subitem2",
                                desc: "Capgemini is Zurich’s chosen provider for core insurance system transformation"
                            },
                            {
                                name: "subitem2",
                                desc: "Capgemini named a 'Leader’ in IDC MarketScape: Worldwide Oil and Gas Professional Services 2016 Vendor Assessment Report"
                            }]
                    },
					{
                        name: "item6",
                        desc: "@July",
                        subitems: [
                            {
                                name: "subitem1",
                                desc: "Capgemini reports very good results for H1 2016 and raises its full-year margin guidance"
                            },
                            {
                                name: "subitem2",
                                desc: "The Capgemini Group named a Leader in Software Testing by NelsonHall"
                            },
                            {
                                name: "subitem2",
                                desc: "Capgemini unifies automation technologies with Automation Drive, a single suite of services to accelerate client growth"
                            }]
                    }
                ];

$scope.default = $scope.items[2];
}]);



/*
angular.module('capapp.clarity.mock', [
  'ngMockE2E'
])

// Stub backend

.run(function($httpBackend) {
	var timesheets = [
		{
			periodId: 20,
			startDate: "07-07-2014",
			endDate: "07-13-2014",
			status:"Open",
			weekdays : [
			 {MOND: "Ma 7/7", MonHours: ""},
			 {TUES: "Di 8/7", TueHours: ""},
			 {WEDS: "Wo 9/7", WedHours: ""},
			 {THUR:"Do 10/7", ThrHours: ""},
			 {FRID:"Vr 11/7", FriHours: ""},
			 {SATR:"Za 12/7", SatHours: ""},
			 {SUND:"Zo 13/7", SunHours: ""}
			],
			projects : [
				"Lisa",
				"Windows BB",
				"Dialog"
			],
			projectsData : [{
				projectdesc: "Lisa",
				projectcode: "P_code",
				projectstasks:[{taskdesc: "Task 1",
								taskcode: "Task code 1",
								totalhours: 0,
								weekdays : [
											 {MOND: "Ma 7/7", MonHours: 0},
											 {TUES: "Di 8/7", TueHours: 0},
											 {WEDS: "Wo 9/7", WedHours: 0},
											 {THUR:"Do 10/7", ThrHours: 0},
											 {FRID:"Vr 11/7", FriHours: 0},
											 {SATR:"Za 12/7", SatHours: 0},
											 {SUND:"Zo 13/7", SunHours: 0}
											]
						},{taskdesc: "Task 2",
								taskcode: "Task code 2",
								totalhours: 0,
								weekdays : [
											 {MOND: "Ma 7/7", MonHours: 0},
											 {TUES: "Di 8/7", TueHours: 0},
											 {WEDS: "Wo 9/7", WedHours: 0},
											 {THUR:"Do 10/7", ThrHours: 0},
											 {FRID:"Vr 11/7", FriHours: 0},
											 {SATR:"Za 12/7", SatHours: 0},
											 {SUND:"Zo 13/7", SunHours: 0}
											]
						}]
				
			},{
				projectdesc: "Kijkglas",
				projectcode: "KP_code",
				projectstasks:[{taskdesc: "Task 3",
								taskcode: "Task code 3",
								totalhours: 0,
								weekdays : [
											 {MOND: "Ma 7/7", MonHours: 0},
											 {TUES: "Di 8/7", TueHours: 0},
											 {WEDS: "Wo 9/7", WedHours: 0},
											 {THUR:"Do 10/7", ThrHours: 0},
											 {FRID:"Vr 11/7", FriHours: 0},
											 {SATR:"Za 12/7", SatHours: 0},
											 {SUND:"Zo 13/7", SunHours: 0}
											]
						},{taskdesc: "Task 4",
								taskcode: "Task code 4",
								totalhours: 0,
								weekdays : [
											 {MOND: "Ma 7/7", MonHours: 0},
											 {TUES: "Di 8/7", TueHours: 0},
											 {WEDS: "Wo 9/7", WedHours: 0},
											 {THUR:"Do 10/7", ThrHours: 0},
											 {FRID:"Vr 11/7", FriHours: 0},
											 {SATR:"Za 12/7", SatHours: 0},
											 {SUND:"Zo 13/7", SunHours: 0}
											]
						}]
				
			}]
		}, 
		{
			periodId: 21,
			startDate: "07-14-2014",
			endDate: "07-20-2014",
			status:"Open",
			weekdays : [
			 {MOND: "Ma 7/7", MonHours: "12"},
			 {TUES: "Di 8/7", TueHours: "12"},
			 {WEDS: "Wo 9/7", WedHours: ""},
			 {THUR:"Do 10/7", ThrHours: ""}
			],
			projects : [
				"Lisa",
				"Windows BB",
				"Dialog"
			],
			projectsData : [{
				projectdesc: "Lisa",
				projectcode: "P_code",
				projectstasks:[{taskdesc: "Task 1",
								taskcode: "Task code 1",
								totalhours: 0,
								weekdays : [
											 {MOND: "Ma 7/7", MonHours: 0},
											 {TUES: "Di 8/7", TueHours: 0},
											 {WEDS: "Wo 9/7", WedHours: 0},
											 {THUR:"Do 10/7", ThrHours: 0},
											 {FRID:"Vr 11/7", FriHours: 0},
											 {SATR:"Za 12/7", SatHours: 0},
											 {SUND:"Zo 13/7", SunHours: 0}
											]
						},{taskdesc: "Task 2",
								taskcode: "Task code 2",
								totalhours: 0,
								weekdays : [
											 {MOND: "Ma 7/7", MonHours: 0},
											 {TUES: "Di 8/7", TueHours: 0},
											 {WEDS: "Wo 9/7", WedHours: 0},
											 {THUR:"Do 10/7", ThrHours: 0},
											 {FRID:"Vr 11/7", FriHours: 0},
											 {SATR:"Za 12/7", SatHours: 0},
											 {SUND:"Zo 13/7", SunHours: 0}
											]
						}]
				
			},{
				projectdesc: "MCP Plugin",
				projectcode: "MCP_code",
				projectstasks:[{taskdesc: "Task 5",
								taskcode: "Task code 5",
								totalhours: 0,
								weekdays : [
											 {MOND: "Ma 7/7", MonHours: 0},
											 {TUES: "Di 8/7", TueHours: 0},
											 {WEDS: "Wo 9/7", WedHours: 0},
											 {THUR:"Do 10/7", ThrHours: 0},
											 {FRID:"Vr 11/7", FriHours: 0},
											 {SATR:"Za 12/7", SatHours: 0},
											 {SUND:"Zo 13/7", SunHours: 0}
											]
						},{taskdesc: "Task 6",
								taskcode: "Task code 6",
								totalhours: 0,
								weekdays : [
											 {MOND: "Ma 7/7", MonHours: 0},
											 {TUES: "Di 8/7", TueHours: 0},
											 {WEDS: "Wo 9/7", WedHours: 0},
											 {THUR:"Do 10/7", ThrHours: 0},
											 {FRID:"Vr 11/7", FriHours: 0},
											 {SATR:"Za 12/7", SatHours: 0},
											 {SUND:"Zo 13/7", SunHours: 0}
											]
						}]
				
			}]
		}, 
		{
			periodId: 22,
			startDate: "07-21-2014",
			endDate: "07-27-2014",
			status:"Open",
			weekdays : [
			 {MOND: "Ma 7/7", MonHours: "12"},
			 {TUES: "Di 8/7", TueHours: "12"},
			 {WEDS: "Wo 9/7", WedHours: ""},
			 {THUR:"Do 10/7", ThrHours: ""}
			],
			projects : [
				"Lisa",
				"Windows BB",
				"Dialog"
			],
			
			projectsData : [{
				projectdesc: "Bert",
				projectcode: "Br_code",
				projectstasks:[{taskdesc: "Task 7",
								taskcode: "Task_code_7",
								totalhours: 29,
								weekdays : [
											 {MOND: "Ma 7/7", MonHours: 12},
											 {TUES: "Di 8/7", TueHours: 10},
											 {WEDS: "Wo 9/7", WedHours: 12},
											 {THUR:"Do 10/7", ThrHours: 12},
											 {FRID:"Vr 11/7", FriHours: 12},
											 {SATR:"Za 12/7", SatHours: 12},
											 {SUND:"Zo 13/7", SunHours: 12}
											]
						},{taskdesc: "Task 8",
								taskcode: "Task_code_8",
								totalhours: 79,
								weekdays : [
											 {MOND: "Ma 7/7", MonHours: 1},
											 {TUES: "Di 8/7", TueHours: 2},
											 {WEDS: "Wo 9/7", WedHours: 0},
											 {THUR:"Do 10/7", ThrHours: 0},
											 {FRID:"Vr 11/7", FriHours: 0},
											 {SATR:"Za 12/7", SatHours: 0},
											 {SUND:"Zo 13/7", SunHours: 0}
											]
						}]
				
			}]
		}
	];

	// returns the current list of phones
	$httpBackend.whenGET(/\/clarity\/timesheets/).respond(timesheets);
	$httpBackend.whenGET(/views/).passThrough();

})
*/
;
