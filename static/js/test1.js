var kwadrat = document.getElementById("kwadrat");
var przycisk = document.getElementById("przycisk");

var kolory = ["blue", "green", "red"];
var kolor = kolory[0];
var poprzedni_kolor = null;
var czasy_reakcji = [];
var czas_reakcji_element = document.getElementById("czas-reakcji");
var liczba_klikniec_w_zielony_kwadrat = 0;
var liczba_klikniec_na_buttonie = 0;
var czy_zielony = false;
var isButtonDisabled = false;

function zmienKolor() {
    if (liczba_klikniec_w_zielony_kwadrat < 3 || czy_zielony) {
        do {
            var randomIndex = Math.floor(Math.random() * 3);
            kolor = kolory[randomIndex];
        } while (kolor === poprzedni_kolor && kolor === "green");
        kwadrat.style.backgroundColor = kolor;
        if (kolor === "green") {
            czas_reakcji = new Date().getTime();
            czy_zielony = true;
        } else {
            czy_zielony = false;
        }
        poprzedni_kolor = kolor;
    }
}

setInterval(zmienKolor, 1000);

przycisk.addEventListener("click", function () {
    if (!isButtonDisabled) {
        isButtonDisabled = true;
        setTimeout(function() {
            isButtonDisabled = false;
        }, 3000); // 3 second

        // rest of the code here
        if (czas_reakcji === null || kolor !== "green") {
            czas_reakcji_element.innerHTML += "<br>It's not green";
        } else {
            var czas = new Date().getTime() - czas_reakcji;
            czasy_reakcji.push(czas);
            czas_reakcji_element.innerHTML += "<br>Raaction time: " + czas + " ms";

            // Przesyłanie czasu reakcji do bazy danych SQLAlchemy
            fetch('/dodaj_czas_reakcji', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    czas: String(czas)
                })
            })
            .then(response => response.json())
            .then(data => console.log(data))


            czas_reakcji = null;
            liczba_klikniec_na_buttonie++;
            if (liczba_klikniec_w_zielony_kwadrat === 2) {
                kwadrat.style.display = "none";
                liczba_klikniec_w_zielony_kwadrat = 0;
                czy_zielony = false;
            } else {
                liczba_klikniec_w_zielony_kwadrat++;
            }
            if (liczba_klikniec_na_buttonie === 3) {
                przycisk.style.display = "none";
            }
        }
    }
});