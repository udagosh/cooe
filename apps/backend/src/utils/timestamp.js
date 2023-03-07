function getTimeStamp(){
    const dt = new Date(Date.now())
    const date = dt.getDate()
    const month = dt.getMonth()
    const year = dt.getFullYear()
    const hours = dt.getHours()
    const minutes= dt.getMinutes()
    const seconds = dt.getSeconds()
    const stamp = `${date}/${month}/${year} ${hours}:${minutes}:${seconds}` 
    
    return stamp
}

export default getTimeStamp