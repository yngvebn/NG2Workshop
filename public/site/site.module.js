"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var site_header_component_1 = require("./header/site-header.component");
var site_footer_component_1 = require("./footer/site-footer.component");
var core_1 = require("@angular/core");
var SiteModule = (function () {
    function SiteModule() {
    }
    return SiteModule;
}());
SiteModule = __decorate([
    core_1.NgModule({
        declarations: [
            site_footer_component_1.SiteFooterComponent,
            site_header_component_1.SiteHeaderComponent
        ],
        exports: [
            site_footer_component_1.SiteFooterComponent,
            site_header_component_1.SiteHeaderComponent
        ]
    }),
    __metadata("design:paramtypes", [])
], SiteModule);
exports.SiteModule = SiteModule;
//# sourceMappingURL=site.module.js.map