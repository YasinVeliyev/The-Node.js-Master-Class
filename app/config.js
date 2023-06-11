let env = {};

env.staging = {
    port: 3000,
    name: "Staging",
};
env.production = {
    port: 5000,
    name: "Production",
};

console.log("Hello World");
let mode = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : "staging";
module.exports = env[mode] ? env[mode] : env["staging"];
