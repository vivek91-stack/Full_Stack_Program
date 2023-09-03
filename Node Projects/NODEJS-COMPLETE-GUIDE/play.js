const fetchData = ()=>{
    const promise = new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('Done');
        }, 1000);
    });
    return promise;
}

setTimeout(() => {
    console.log('timer is done');
    fetchData().then(text=>{
        console.log(text);
        return fetchData();
    })
    .then(text2=>{
        console.log(text2);
    });
}, 1500);

console.log('timer 1');
console.log('timer 2');