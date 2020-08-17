import Promise from 'bluebird'
import airlinesJSON from '../../assets/data/airlines.json'

const airlines = JSON.parse(JSON.stringify(airlinesJSON)).data
const todayDate = new Date()

export function PromiseKit({
  data,
  errorMessage
}) {
  return new Promise((resolve, reject) => {
    if (data) {
      resolve(data)
    } else {
      reject(new Error(errorMessage))
    }
  })
}

export const getHKAirportData = async date => {
  const stateDate = formatDate(date.toDateString())
  const today = formatDate(todayDate.toDateString())
  const url = `https://www.hongkongairport.com/flightinfo-rest/rest/flights/past?date=${stateDate}&lang=en&cargo=false&arrival=false`

  try {
    const HKApiResponse = await fetch(url)
    const jsonData = await HKApiResponse.json()
    return PromiseKit({
      data: stateDate === today ? jsonData[1].list : jsonData[0].list,
      errorMessage: 'https://www.hongkongairport.com was failed to fetch'
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getAirlineData = code => {
  const matchedData = airlines.filter(arl => {
    return arl.icao_code == code
  })

  return matchedData
}

export const getDestinationData = async code => {
  const url = `https://api.flightstats.com/flex/airports/rest/v1/json/iata/${code}?appId=1325dd17&appKey=563dbeacb54a6c8a49438c0ad557b4a8`

  try {
    const flightStatsAPIResponse = await fetch(url)
    const jsonData = await flightStatsAPIResponse.json()
    return jsonData.airports[0]
  } catch (error) {
    throw new Error(error)
  }
}

export function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export const dates = {
    convert: function(d) {
      // Converts the date in d to a date-object. The input can be:
      //   a date object: returned without modification
      //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      //   a number     : Interpreted as number of milliseconds
      //                  since 1 Jan 1970 (a timestamp) 
      //   a string     : Any format supported by the javascript engine, like
      //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      //  an object     : Interpreted as an object with year, month and date
      //                  attributes.  **NOTE** month is 0-11.
      return (
          d.constructor === Date ? d :
          d.constructor === Array ? new Date(d[0],d[1],d[2]) :
          d.constructor === Number ? new Date(d) :
          d.constructor === String ? new Date(d) :
          typeof d === "object" ? new Date(d.year,d.month,d.date) :
          NaN
      )
    },
    compare: function(a,b) {
      // Compare two dates (could be of any type supported by the convert
      // function above) and returns:
      //  -1 : if a < b
      //   0 : if a = b
      //   1 : if a > b
      // NaN : if a or b is an illegal date
      // NOTE: The code inside isFinite does an assignment (=).
      return (
          isFinite(a=this.convert(a).valueOf()) &&
          isFinite(b=this.convert(b).valueOf()) ?
          (a>b)-(a<b) :
          NaN
      )
    },
    inRange: function(d,start,end) {
      // Checks if date in d is between dates in start and end.
      // Returns a boolean or NaN:
      //    true  : if d is between start and end (inclusive)
      //    false : if d is before start or after end
      //    NaN   : if one or more of the dates is illegal.
      // NOTE: The code inside isFinite does an assignment (=).
      return (
          isFinite(d=this.convert(d).valueOf()) &&
          isFinite(start=this.convert(start).valueOf()) &&
          isFinite(end=this.convert(end).valueOf()) ?
          start <= d && d <= end :
          NaN
      )
    }
}

export function amPmConvert(time) {
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) { 
      time = time.slice (1)
      time[5] = +time[0] < 12 ? ' AM' : ' PM'
      time[0] = +time[0] % 12 || 12
  }
  return time.join ('')
}

export function checkIndexIsEven (n) {
  return n % 2 == 0
}