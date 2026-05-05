document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    // URL zu deiner ICS-Datei
    const icsUrl = 'https://outlook.office365.com/owa/calendar/8fbb565826364b84a534e665d69016ae@ncg-online.de/55be7f3f593f4783912ad3f45d8a4e2815113796284404592643/calendar.ics';

    // Da Outlook CORS-Anfragen blockiert, nutzen wir einen Proxy für die Demo
    // In einer Produktionsumgebung würde man dies über ein eigenes Backend lösen.
    const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(icsUrl);

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'de', // Deutsche Sprache
        firstDay: 1,  // Woche startet montags
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek'
        },
        buttonText: {
            today: 'Heute',
            month: 'Monat',
            week: 'Woche',
            list: 'Terminliste'
        },
        events: {
            url: proxyUrl,
            format: 'ics'
        },
        eventClick: function(info) {
            alert('Termin: ' + info.event.title + '\nOrt: ' + (info.event.extendedProps.location || 'Nicht angegeben'));
        }
    });

    calendar.render();
});