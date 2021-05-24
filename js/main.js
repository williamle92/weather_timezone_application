

let loadTime = () =>{
    let time = document.querySelector('.ctime');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos =>{
            console.log(pos);
            let lng = pos.coords.longitude;
            let lat = pos.coords.latitude;


            const key = config.key;
            const api2 = `http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&by=position&lat=${lat}&lng=${lng}&format=json`;

            fetch(api2).then(x =>{
                return x.json();
            })
            .then(data2=> {
                console.log(data2);
                time.textContent = data2.formatted
                

            });
            
        });
    }
}
loadTime();

window.addEventListener('load', ()=> {
    let lng;
    let lat;
    let tempDesc= document.querySelector('.tempdesc')
    let tempDegree = document.querySelector('.tempdeg')
    let locationTimezone = document.querySelector('.location-timezone')
    let locationIcon = document.querySelector('.weather-icon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            lng = position.coords.longitude;
            lat = position.coords.latitude;
            


            const appid = config.SECRET_KEY;
            const api =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${appid}&units=imperial`

            fetch(api).then(response =>{
                return response.json();
             })
             .then(data=> {
                 console.log(data);



                 tempDegree.textContent = data.main.temp;
                 tempDesc.textContent = data.weather[0].description;
                 locationTimezone.textContent = data.name;
                 let wicon = data.weather[0].icon
                 locationIcon.innerHTML = `<img src="icons/${wicon}.png">`;

             });
        });
    }
});