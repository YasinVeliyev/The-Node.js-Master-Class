exports.sample = (data, callback) => {
    //Callback a http status code,and a payload object

    callback(406, { name: "Sample Handler" });
};

exports.notFound = (data, callback) => {
    callback(404);
};
