document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    const icsUrl = 'https://outlook.office365.com/owa/calendar/8fbb565826364b84a534e665d69016ae@ncg-online.de/55be7f3f593f4783912ad3f45d8a4e2815113796284404592643/calendar.ics';
    const proxyUrl = 'http://localhost:3000/proxy?url=' + encodeURIComponent(icsUrl);

    const detailModal = document.getElementById('event-detail-modal');
    const detailTitle = document.getElementById('detail-title');
    const detailDate = document.getElementById('detail-date');
    const detailLocation = document.getElementById('detail-location');
    const detailDescription = document.getElementById('detail-description');
    const detailClose = document.getElementById('detail-close');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'de',
        firstDay: 1,
        showNonCurrentDates: false,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek'
        },
        views: {
            dayGridMonth: {
                showNonCurrentDates: false
            }
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
            const start = info.event.start;
            const end = info.event.end;
            const formattedStart = start ? start.toLocaleString('de-DE', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) : 'Nicht verfügbar';
            const formattedEnd = end ? end.toLocaleString('de-DE', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) : null;

            detailTitle.textContent = info.event.title || 'Termin-Details';
            detailDate.textContent = formattedEnd ? formattedStart + ' – ' + formattedEnd : formattedStart;
            detailLocation.textContent = info.event.extendedProps.location || 'Nicht angegeben';
            detailDescription.textContent = info.event.extendedProps.description || 'Keine weiteren Informationen.';
            detailModal.classList.add('active');
            detailModal.setAttribute('aria-hidden', 'false');
        }
    });

    calendar.render();

    detailClose.addEventListener('click', function() {
        detailModal.classList.remove('active');
        detailModal.setAttribute('aria-hidden', 'true');
    });

    detailModal.addEventListener('click', function(event) {
        if (event.target === detailModal) {
            detailModal.classList.remove('active');
            detailModal.setAttribute('aria-hidden', 'true');
        }
    });
});