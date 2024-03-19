  var api = 'caea83d20b89b90';
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
   }
  
   $.ajax({
    method: "GET",
    url: "https://api-rekening.my.id/trueid/game/" + game + "/?id=" + id + "&key=" + api,
        beforeSend: function () {
     $('#nick').text('Sedang Mengecek...');
     $('#nickplayer').text('Sedang Mengecek...');
    },
    success: function (response) {
     if (response.hasOwnProperty('error_msg')) {
      $('#nick').text('Tidak Ditemukan!');
      $('#nickplayer').text('Tidak Ditemukan!');
     } else {
      $('#nick').text(response.nickname);
      $('#nickplayer').text(response.nickname);
     }
    }
   });
}
  $('#id').on('change', function () {
   var no = $(this).val()
   var newno = no.replace('-', '').trim()
   var cek = newno.substring(0, 3).replace('-', '').trim()
   var ceka = newno.substring(3, 16).replace('-', '').trim()

   if (cek == '+62') {
    let result = 0
    $(this).val(result + ceka)
    getNmr(result + ceka)
   } else {
    $(this).val(cek + ceka)
    getNmr(cek + ceka);
   }
  });
   function getContact() {
      window.location.href = urlOlshop + '/ambil_kontak';
    }
    function getScan() {
      window.location.href = urlOlshop + '/scan_all';
    }
    function convertToPoints(hargaFormatted) {
      var numericValue = parseFloat(hargaFormatted.replace(/[^\d]/g, ''));
      var rate = membershipRates[namaMembership] || 10000000;
      var points = Math.floor(numericValue / rate) * 1;
      return points > 0 ? '+' + points + ' poin' : '';
    }
