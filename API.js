function getDataByCity(city, year, type) {
    return $.ajax({
        url: `http://spectrumcontent.com/api/entity/${city}?year=${year}&crimeType=${type}`,
        success: function (result) {
            console.log(result)
            return result;
        }
    });

}