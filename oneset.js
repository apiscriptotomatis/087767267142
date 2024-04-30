var api = 'ec29949cf99660de25ded77e78859771';
function cekNick() {
  var id = $('#id').val();
  if (id === "") {
    $('#nick').text('');
    $('#nickplayer').text('');
    Toastify({
      text: "ID Player Kosong..",
      duration: 900,
      close: false,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #F00000 , #F00000)",
      stopOnFocus: true,
      style: {
        fontSize: "13px",
        fontWeight: "bold",
        borderRadius: "10px"
      }
    }).showToast();
    return; // Keluar dari fungsi jika id kosong
  }

  $.ajax({
    method: "GET",
    url: "https://api-otomatis.my.id/trueid/games/" + games + "/?id=" + id + "&key=" + api,
    beforeSend: function () {
      $('#nick').text('Sedang Mengecek...');
      $('#nickplayer').text('Sedang Mengecek...');
    },
    success: function (response) {
      if (response.hasOwnProperty('error_msg')) {
        $('#nick').text('Tidak Ditemukan!');
        $('#nickplayer').text('Tidak Ditemukan!');
        $('#stats').hide();
      } else {
        $('#nick').text(response.nickname);
        $('#nickplayer').text(response.nickname);
        $('#stats').show();
      }
    },
    error: function () {
      $('#nick').text('Terjadi kesalahan!');
      $('#nickplayer').text('Terjadi kesalahan!');
      $('#stats').hide();
    }
  });
}
