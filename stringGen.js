function randomString() {
    var chars = '01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'
    var stringlength = 5 /* could be 6 or 7, but takes forever because there are lots of dead images */
    var text = ''
    for (var i = 0; i < stringlength; i++) {
        var rnum = Math.floor(Math.random() * chars.length)
        text += chars.substring(rnum, rnum + 1)
    }
    return 'https://i.imgur.com/' + text + '.jpg'
}