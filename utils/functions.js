
// function to format timestamp

module.exports = (timestamp) => {
    const createdDate = new Date(timestamp);
    return createdDate.toLocaleString('en-US');
}

