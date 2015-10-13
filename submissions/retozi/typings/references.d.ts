/// <reference path="./react/react.d.ts" />

/**
 * Type declarations for Webpack runtime.
 */
interface WebpackRequire {
    (id:string): any;
}

declare var require: WebpackRequire;