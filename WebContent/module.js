angular.module('capapp', [
	'mobile-angular-ui',
	'mobile-angular-ui.gestures',
	'mobile-angular-ui.components.switch',
	'ngRoute',
	'ngMockE2E',
	'agenda.module',
	'news.module',
	'capapp.clarity.module',
    'capapp.clarity.mock',
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

