import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from "@angular/router";
import { Feature } from "../service/feature";

export const FeatureFlagGuard: CanMatchFn = (route: Route, UrlSegment: UrlSegment[]) => {
    const feature =  inject(Feature);
    return feature.hasFeatureFlag('reviewe');
}