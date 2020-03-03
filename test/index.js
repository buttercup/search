const { expect } = require("chai");
const sinon = require("sinon");

require("@buttercup/app-env/native");

Object.assign(global, {
    expect,
    sinon
});
