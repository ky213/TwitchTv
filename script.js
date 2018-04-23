// Send a request

$("form").on("submit", function () {
    const type = $('label.active input').attr('name');
    const query = $('#search').val();
    const url = "https://wind-bow.glitch.me/twitch-api/" + type + "/" + encodeURI(query);

    getData(url, type);

    return false
});

function getData(url, type) {
    spinner('add')
    fetch(url).then(async function (res) {
        spinner('remove')
        type === "streams" ?
            displayStreams(await res.json())
            :
            displayChannels(await res.json())

    }).catch(function (err) {
        spinner('remove')
        console.log("Error Happend: \n" + err);
    })
}

function displayStreams(streams) {
    const results = $('#results');

    results.empty()

    if (!streams.stream) {
        const msg = $("<h1 class='display-1'>No Stream :(</h1>")
        results.append(msg);
    } else {
        $.each(stream, function (i, v) {
            console.log(v);
        });
    }
}

function displayChannels(channels) {
    const results = $('#results');
    const chan = $('<a></a>');

    results.empty()
    console.log(channels);
}

function spinner(action) {
    const btnText = $('button[type="submit"] span');
    const spinner = $('.fa-spinner');

    if (action === 'add') {
        spinner.removeClass('d-none')
        btnText.text('')
    } else {
        spinner.addClass('d-none')
        btnText.text('Go!')
    }
}