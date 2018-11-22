By uruchomić w trybie developmentu, wpisz w konsoli kolejne komendy:
npm install
npm run start
...i otwórz przeglądarkę:
localhost:8080

Folder bundle zawiera skrypt i style - stronę można przeglądać lokalnie
bez powyższej instalacji npm, jako plik lokalny.

Opis czynności dokonanych ponad wytyczne zawarte pliku psd:

Opcje slidera:
-autoslide (interwał restartowany przy próbie przesunięcia)
-click event (kropki i strzałki)
-swipe event
-reagowanie na próbę przesunięcia poza zakres

Rozwój strony:
W przypadku dodania kolejnych zdjęć do slidera, ilość kropek zaktualizuje się.
Slider działa z każdą ilością zdjęć.
URL zdjęć wprowadzany jest inline, z uwagi na ewentualne użycie funkcji PHP
w systemach CMS (np Wordpress); 

Przyciski: 
-reagowanie na zdarzenie mouseover

RWD:
-niektóre elementy zostają schowane w wersji mobile.

technologie:
vanilla JS (by zaprezentować umiejętności, nie korzystałem z bilbiotek ani frameworków)
SCSS
webpack/babel

