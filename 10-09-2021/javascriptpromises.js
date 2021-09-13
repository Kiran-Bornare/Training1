let countValue = new Promise(function (resolve, reject) {
    reject('Promise rejected');
    });
    // executes when promise is resolved successfully
    countValue.then(
    function successValue(result) {
    console.log(result); // Promise resolved
    },
    )