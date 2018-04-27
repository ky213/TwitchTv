const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
const stream_modal = $('.stream')

channels.forEach(function (query) {
    fetch('https://wind-bow.glitch.me/twitch-api/streams/' + query)
        .then(async function (data) {
            displayStreams(await data.json(), query);
        }).catch(function (err) {
            console.log("An error Happend: ", error);
        })
})



function displayStreams(streams, query) {
    const stream = streams.stream;
    const new_stream = $('.stream').first().clone().attr('id', query)

    new_stream.removeClass('d-none')
        .find('.display-name')
        .text(query)


    if (streams.stream) {
        new_stream
            .attr('href', stream.channel.url)
            .css('border-left', '5px solid var(--green)')
            .find('.followers')
            .text('Followers: ' + stream.channel.followers)
        new_stream.find('.viewers')
            .text('Viewers: ' + stream.viewers)
        new_stream.find('.status')
            .text('Status: Online')
        new_stream.find('.logo')
            .attr('src', stream.preview.large)

        new_stream.appendTo('.all, .online')

    } else {
        new_stream
            .appendTo('.all, .offline')
            .css('border-left', '5px solid var(--red)')

    }
}



$("#filter").on("keyup", function () {
    const filter = this.value
    const exp = new RegExp('^' + filter, 'i')

    if (filter) {
        $("div.show")
            .children()
            .filter(function () {
                return !this.id.match(exp)
            })
            .addClass('d-none')
    } else {
        $("div.show")
            .children('[id]')
            .removeClass('d-none')
    }
});
