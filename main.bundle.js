webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Propagation of Uncertainty Calculator</h1>\n<p class=\"lead\">Uncertain about your uncertainty calculations? This tool helps you check if you're right or wrong, with steps! Found a bug? <a href=\"https://github.com/nicoco007/Propagation-of-Uncertainty-Calculator/issues\">Report it!</a></p>\n<h2>Variables</h2>\n<div class=\"variables\">\n  <app-variable *ngFor=\"let variable of variables\" [variable]=\"variable\" (onDelete)=\"deleteVariable(variable)\"></app-variable>\n</div>\n<p><button class=\"btn btn-primary btn-sm\" (click)=\"addVariable()\" title=\"Add Variable\"><i class=\"fa fa-plus\"></i><span class=\"sr-only\">Add Variable</span></button></p>\n\n<h2>Equation</h2>\n<div class=\"eq\">\n  <div class=\"row\">\n    <div class=\"form-group col-12 d-flex align-items-center\">\n      <div class=\"input-group\">\n        <input id=\"result-variable\" class=\"form-control\" type=\"text\" [(ngModel)]=\"resultVariable\" title=\"Result Variable\">\n        <label class=\"input-group-addon mb-0 pb-1\" for=\"equation\" katex=\" = \"></label>\n        <input id=\"equation\" class=\"form-control\" type=\"text\" [(ngModel)]=\"equation\" placeholder=\"Equation\" [class.is-invalid]=\"!isEquationValid()\"/>\n      </div>\n    </div>\n  </div>\n</div>\n\n<h2>Result</h2>\n<div class=\"result\">\n  <p [katex]=\"getResultFunction()\"></p>\n  <p [katex]=\"getDeltaResultFunction()\"></p>\n  <p [katex]=\"getResultWithUncertainty()\"></p>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".result {\n  text-align: center;\n  overflow-x: auto;\n  border-radius: 0;\n  background: linear-gradient(to right, white 30%, rgba(0, 0, 0, 0)), linear-gradient(to right, rgba(0, 0, 0, 0), white 70%) 100% 0, radial-gradient(farthest-side at 0 50%, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0)), radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0)) 100% 0;\n  background-repeat: no-repeat;\n  background-color: white;\n  background-size: 40px 100%, 40px 100%, 12px 100%, 12px 100%;\n  background-attachment: local, local, scroll, scroll; }\n\n#result-variable {\n  -webkit-box-flex: 0 !important;\n      -ms-flex: none !important;\n          flex: none !important;\n  width: 3rem; }\n\nh2 {\n  margin-top: 2rem; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__variable__ = __webpack_require__("../../../../../src/app/variable.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__("../../../../../src/app/util.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppComponent = (function () {
    function AppComponent() {
        this.resultVariable = 'R';
        this.equation = 'm/V';
        this.invalidInput = false;
        this.variables = [
            new __WEBPACK_IMPORTED_MODULE_1__variable__["a" /* Variable */]('V', 6.95e-6, 0.03e-6),
            new __WEBPACK_IMPORTED_MODULE_1__variable__["a" /* Variable */]('m', 1.87e-2, 0.01e-2)
        ];
    }
    AppComponent.prototype.addVariable = function () {
        this.variables.push(new __WEBPACK_IMPORTED_MODULE_1__variable__["a" /* Variable */]());
    };
    AppComponent.prototype.deleteVariable = function (variable) {
        var index = this.variables.indexOf(variable);
        this.variables.splice(index, 1);
    };
    AppComponent.prototype.isEquationValid = function () {
        try {
            math.parse(this.equation);
            return true;
        }
        catch (ex) {
            return false;
        }
    };
    AppComponent.prototype.derivative = function (inRespectTo) {
        if (this.equation && inRespectTo) {
            try {
                return math.derivative(this.equation, inRespectTo).toString();
            }
            catch (ex) {
                return '';
            }
        }
        return '';
    };
    AppComponent.prototype.getResultFunction = function () {
        try {
            var result = this.getResult();
            return this.resultVariable + ' = ' + result.toString().replace(/e\+?(-?)(\d+)/, ' \\times 10^{$1$2}');
        }
        catch (ex) {
            return '';
        }
    };
    AppComponent.prototype.getDeltaResultFunction = function () {
        try {
            var steps = [];
            var parts = [];
            var parts2 = [];
            var parts3 = [];
            var scope = {};
            for (var i = 0; i < this.variables.length; i++) {
                var variable = this.variables[i];
                var derivative = this.derivative(variable.name);
                if (!derivative) {
                    return '';
                }
                parts.push("\\left( \\frac{\\partial " + this.resultVariable + "}{\\partial " + variable.name + "} \\Delta " + variable.name + " \\right)^2");
                parts2.push('\\left( ' + derivative + ' \\cdot \\Delta ' + variable.name + '\\right)^2');
                parts3.push('(' + derivative.toString() + ' * ' + variable.delta + ')^2');
                scope[variable.name] = variable.value;
            }
            steps.push('\\sqrt{' + parts.join(' + ') + '}');
            steps.push('\\sqrt{' + parts2.join(' + ') + '}');
            var result = this.getUncertainty();
            var exp = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].getPowerOf10(result);
            steps.push(result);
            steps.push(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].fixPrecision(result / Math.pow(10, exp)) + ' \\times 10^{' + exp + '}');
            steps.push(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].fixPrecision(parseFloat(result.toPrecision(1)) / Math.pow(10, exp)) + ' \\times 10^{' + exp + '}');
            return "\\begin{aligned} \\Delta " + this.resultVariable + " &= " + steps.join(' \\\\ &= ') + " \\end{aligned}";
        }
        catch (ex) {
            return '';
        }
    };
    AppComponent.prototype.getResult = function () {
        var scope = {};
        for (var i = 0; i < this.variables.length; i++) {
            scope[this.variables[i].name] = this.variables[i].value;
        }
        return __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].fixPrecision(math.eval(this.equation, scope));
    };
    AppComponent.prototype.getUncertainty = function () {
        var scope = {};
        var parts = [];
        for (var i = 0; i < this.variables.length; i++) {
            var variable = this.variables[i];
            var derivative = math.derivative(this.equation, variable.name);
            parts.push('(' + derivative.toString() + ' * ' + variable.delta + ')^2');
            scope[variable.name] = variable.value;
        }
        var eq = 'sqrt(' + parts.join(' + ') + ')';
        return __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].fixPrecision(math.eval(eq, scope));
    };
    AppComponent.prototype.getResultWithUncertainty = function () {
        try {
            var result = this.getResult();
            var uncertainty = this.getUncertainty();
            var resultExp = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].getPowerOf10(result);
            var uncertaintyExp = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].getPowerOf10(uncertainty);
            var diffExp = resultExp - uncertaintyExp;
            var roundedResult = Math.round(result / Math.pow(10, uncertaintyExp)) / Math.pow(10, diffExp);
            var roundedUncertainty = Math.round(uncertainty / Math.pow(10, uncertaintyExp)) / Math.pow(10, diffExp);
            return this.resultVariable + " = \\left( " + roundedResult + " \\pm " + roundedUncertainty + " \\right) \\times 10^{" + resultExp + "}";
        }
        catch (ex) {
            return '';
        }
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__variable_variable_component__ = __webpack_require__("../../../../../src/app/variable/variable.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__katex_directive__ = __webpack_require__("../../../../../src/app/katex.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_3__variable_variable_component__["a" /* VariableComponent */],
                __WEBPACK_IMPORTED_MODULE_5__katex_directive__["a" /* KatexDirective */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/katex.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KatexDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_katex__ = __webpack_require__("../../../../katex/dist/katex.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_katex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_katex__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var KatexDirective = (function () {
    function KatexDirective(el) {
        this.el = el;
    }
    KatexDirective.prototype.ngOnChanges = function () {
        this.el.nativeElement.innerHTML = __WEBPACK_IMPORTED_MODULE_1_katex__["renderToString"](this.katex);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])('katex'),
        __metadata("design:type", String)
    ], KatexDirective.prototype, "katex", void 0);
    KatexDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Directive */])({
            selector: '[katex]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* ElementRef */]])
    ], KatexDirective);
    return KatexDirective;
}());



/***/ }),

/***/ "../../../../../src/app/util.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Util; });
var Util = (function () {
    function Util() {
    }
    /**
     * Get the power of 10 necessary to convert a number to scientific notation
     * @param {number} num
     * @returns {number}
     */
    Util.getPowerOf10 = function (num) {
        // make sure we actually have a number and that it's not 0
        if (!isFinite(num) || isNaN(num) || num === 0) {
            return 0;
        }
        // since we want the number of times to divide/multiply by 10, we have
        // c / 10^x >= 1
        // c <= 10^x
        // log10(c) >= x
        // with c > 0 since log(x) when x <= 0 does not exist
        return Math.floor(Math.log10(Math.abs(num)));
    };
    /**
     * Round a number to a maximum of 10 decimals to avoid precision issues
     * @param {number} num
     * @returns {number}
     */
    Util.fixPrecision = function (num) {
        return Math.round(num * 1e10) / 1e10;
    };
    return Util;
}());



/***/ }),

/***/ "../../../../../src/app/variable.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Variable; });
var Variable = (function () {
    function Variable(name, value, delta) {
        if (name === void 0) { name = null; }
        if (value === void 0) { value = null; }
        if (delta === void 0) { delta = null; }
        this.value = null;
        this.delta = null;
        this.name = name;
        this.value = value;
        this.delta = delta;
    }
    return Variable;
}());



/***/ }),

/***/ "../../../../../src/app/variable/variable.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"variable row\">\n  <div class=\"variable-name col-md-2\">\n    <div class=\"input-group\">\n      <span class=\"input-group-btn\">\n        <button class=\"btn btn-danger\" (click)=\"onDelete.emit()\" title=\"Remove Variable\"><i class=\"fa fa-trash\"></i><span class=\"sr-only\">Remove Variable</span></button>\n      </span>\n      <input id=\"variable\" type=\"text\" class=\"form-control\" [(ngModel)]=\"variable.name\" placeholder=\"Name\"/>\n    </div>\n  </div>\n\n  <div class=\"variable-value col-md-5\">\n    <div class=\"input-group\">\n      <label class=\"input-group-addon\" for=\"value\" [katex]=\"(variable.name || '?') + ' ='\"></label>\n      <input id=\"value\" type=\"text\" class=\"form-control d-block\" [(ngModel)]=\"variable.value\" placeholder=\"Value\"/>\n    </div>\n  </div>\n\n  <div class=\"variable-delta col-md-5\">\n    <div class=\"input-group\">\n      <label class=\"input-group-addon\" for=\"delta\" [katex]=\"'\\\\Delta ' + (variable.name || '?') + ' ='\"></label>\n      <input id=\"delta\" type=\"text\" class=\"form-control d-block\" [(ngModel)]=\"variable.delta\" placeholder=\"Error\"/>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/variable/variable.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".variable {\n  margin-bottom: 0.25rem; }\n  .variable .variable-name, .variable .variable-value, .variable .variable-delta {\n    margin-bottom: 0.5rem; }\n    .variable .variable-name .input-group-addon, .variable .variable-value .input-group-addon, .variable .variable-delta .input-group-addon {\n      padding-bottom: 0.25rem;\n      margin-bottom: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/variable/variable.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VariableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__variable__ = __webpack_require__("../../../../../src/app/variable.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VariableComponent = (function () {
    function VariableComponent() {
        this.onDelete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__variable__["a" /* Variable */])
    ], VariableComponent.prototype, "variable", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */])
    ], VariableComponent.prototype, "onDelete", void 0);
    VariableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-variable',
            template: __webpack_require__("../../../../../src/app/variable/variable.component.html"),
            styles: [__webpack_require__("../../../../../src/app/variable/variable.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], VariableComponent);
    return VariableComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map