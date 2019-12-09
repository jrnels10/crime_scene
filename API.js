function getDataByCity(city) {
    return $.ajax({
        url: `http://spectrumcontent.com/api/city/${city}`,
        success: function (result) {
            return result;
        }
    });

}