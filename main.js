$(document).ready(function () {
    document.querySelectorAll('.toggle-password').forEach(function(button) {
        button.addEventListener('click', function () {
            const inputId = this.getAttribute('data-target');
            const input = document.getElementById(inputId);
            const img = this.querySelector('img');

            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';

            img.src = isPassword ? 'Project_pictures/visibility-off.png' : 'Project_pictures/visibility-on.png';
            img.alt = isPassword ? 'visibility-off' : 'visibility-on';
        });
    });

    $('#registrationForm').on('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        $('.error-msg').text('');
        $('input').removeClass('error');

        const email = $('#email').val();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
        $('#emailError').text('Unesite ispravnu email adresu.');
        $('#email').addClass('error');
        isValid = false;
        }

        const password = $('#password').val();
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordPattern.test(password)) {
        $('#passwordError').text('Lozinka mora sadrzavati: veliko slovo, malo slovo i broj. Min duzina je 6 znakova.');
        $('#password').addClass('error');
        isValid = false;
        }

        const confirmPassword = $('#confirm-password').val();
        if (password !== confirmPassword) {
        $('#confirmPasswordError').text('Lozinke nisu iste.');
        $('#confirm-password').addClass('error');
        isValid = false;
        }

        if (isValid) {
        $('#submitMessage').css('color', 'green').text('Uspješno ste registrirani!');
        } else {
        $('#submitMessage').css('color', 'red').text('Ispravite navedene greške!');
        }
    });

    $('#weather-form').on('submit', function (e) {
        e.preventDefault();

        const city = $('#city').val().trim();
        const apiKey = 'c271eff4838a48729bd140217250108';

        if (!city) {
            alert("You must enter a city name.");
            return;
        }
        $('#weather-result').empty();

        $.ajax({
            url: `https://api.weatherapi.com/v1/current.json?key=c271eff4838a48729bd140217250108&q=${encodeURIComponent(city)}`,
            method: 'GET',
            success: function (data) {
                const tempC = data.current.temp_c;
                const lat = data.location.lat;
                const lon = data.location.lon;

                const firstLetterBigCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
                const enteredCity = $('<h3>').text(firstLetterBigCity);
                const temperature = $('<p>').text(`Temperature: ${tempC} °C`);
                const latitude = $('<p>').text(`Latitude: ${lat}`);
                const longitude = $('<p>').text(`Longitude: ${lon}`);

                $('#weather-result').append(enteredCity, temperature, latitude, longitude);
            },
            error: function (xhr) {
                $('#weather-result').append($('<p style="color:red;">').text("Error fetching data. Check city name or try again."));
            }
        });
    });
});