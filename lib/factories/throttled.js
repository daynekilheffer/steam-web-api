const execute = require('./basic');

module.exports = (timeInMilliseconds) => {
    const queue = [];
    let timeoutId;
    
    const evalQueue = () => {
        if (timeoutId) return
        else {
            const {url, cb} = queue.pop();
            execute(url, cb);
            if (queue.length) {
                setTimeout(evalQueue, timeInMilliseconds);
            }
        }
    }
    
    return {
        execute: (url, cb) => {
            queue.push({
                url,
                cb,
            })
            evalQueue(queue);
        }
    }
}