function getDataByCity(city, startDate, endDate, UpperLatitude, UpperLongitude, LowerLatitude, LowerLongitude, crimeType) {
    console.log(startDate, endDate, UpperLatitude, UpperLongitude, LowerLatitude, LowerLongitude, crimeType)
    const string = `http://spectrumcontent.com/api/entity/${city}?startDate=${startDate}&endDate=${endDate}&UpperLatitude=${UpperLatitude}&UpperLongitude=${UpperLongitude}&LowerLatitude=${LowerLatitude}&LowerLongitude=${LowerLongitude}&crimeType=${crimeType}`
    debugger
    return $.ajax({
        url: string,
        success: function (result) {
            console.log(result)
            let datesArray = result.filter(item => { return item.Date != null }).map(item => { return item.Date })
            var min = Math.min.apply(null, datesArray);
            var max = Math.max.apply(null, datesArray);
            console.log(new Date(min), new Date(max));

            return result;
        }
    });

}