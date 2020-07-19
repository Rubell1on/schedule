function buildQuery(obj) {
    return Object.entries(obj).map(([key, value]) => {
        const val = Array.isArray(value) || typeof value === 'object' ? JSON.stringify(value) : value;
        return val ? `${key}=${val}` : null;
    }).filter(e => e).join('&');
}

function parseQuery(query) {
    if (typeof query === 'string' && query) {
        const temp = query[0] === '?' ? query.slice(1) : query;

        return temp.split('&').reduce((acc, curr) => {
            const [key, value] = curr.split('=');
            if (key && value) {
                acc[key] = value;
                return acc;
            } else {
                throw new ReferenceError();
            }
        }, {});
    } else {
        throw new TypeError();
    }
}

function getCurrWeek() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const currWeek = Math.floor(diff / oneWeek) + 1;

    return currWeek;
}

function getCurrStudyWeek() {
    const halfYear = getHalfYear();
    let subtrahend;
    if (halfYear === 'spring') {
        subtrahend = 5;
    } else if (halfYear === 'autumn') {
        subtrahend = 33;
    }

    return getCurrWeek() - subtrahend;
}

function getHalfYear() {
    const month = new Date().getMonth();
    const springMonth = [0, 1, 2, 3, 4, 5, 6, 7];
    return springMonth.includes(month) ? 'spring': 'autumn'; 
}

export {buildQuery, getCurrWeek, getHalfYear, getCurrStudyWeek, parseQuery};