    function saveToFavorite() {
   var phoneNumberInput = document.getElementById('inputNumber');
   var phoneNumber = phoneNumberInput.value;

   if (phoneNumber.trim() !== "") {
    var savedNumbers = JSON.parse(localStorage.getItem('savedNumbers')) || [];
    if (!savedNumbers.includes(phoneNumber)) {
     savedNumbers.push(phoneNumber);
     localStorage.setItem('savedNumbers', JSON.stringify(savedNumbers));
     Swal.fire({
      icon: 'success',
      text: 'Berhasil Disimpan',
      showConfirmButton: false,
      timer: 1500
     });
     displaySavedNumbers();
     phoneNumberInput.value = "";
    } else {
     Swal.fire({
      icon: 'info',
      text: 'Nomor Sudah ada!',
      showConfirmButton: false,
      timer: 1500
     });
    }
   }
  }
  function displaySavedNumbers() {
   var savedNumbersList = document.getElementById('savedNumbersList');
   savedNumbersList.innerHTML = "";
   var savedNumbers = JSON.parse(localStorage.getItem('savedNumbers')) || [];

   if (savedNumbers.length === 0) {
    // Jika belum ada nomor tersimpan
    var infoMessage = document.createElement('p');
    infoMessage.textContent = 'Belum ada nomor tersimpan.';
    savedNumbersList.appendChild(infoMessage);
   } else {
    savedNumbers.forEach(function (number) {
     var listItem = document.createElement('li');
     listItem.textContent = number;

     listItem.classList.add('saved-number-item');

     var checkbox = document.createElement('input');
     checkbox.type = "checkbox";
     checkbox.value = number;

     checkbox.classList.add('checkbox');
     checkbox.addEventListener('click', function (event) {
      event.stopPropagation();
     });

     listItem.appendChild(checkbox);

     listItem.addEventListener('click', function () {
      copyToClipboard(number);
     });
     savedNumbersList.appendChild(listItem);
    });
   }
  }
  function copyToClipboard(text) {
   var textArea = document.createElement('textarea');
   textArea.value = text;
   document.body.appendChild(textArea);
   textArea.select();
   document.execCommand('copy');
   document.body.removeChild(textArea);
   Swal.fire({
    icon: 'success',
    text: 'Nomor Disalin!',
    showConfirmButton: false,
    timer: 1500
   });
  }
  function deleteSelected() {
   var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
   var savedNumbers = JSON.parse(localStorage.getItem('savedNumbers')) || [];
   if (checkboxes.length > 0) {
    Swal.fire({
     text: 'Anda yakin ingin menghapus nomor terpilih?',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#d33',
     cancelButtonColor: '#3085d6',
     confirmButtonText: 'Ya, hapus!',
     cancelButtonText: 'Batal'
    }).then((result) => {
     if (result.isConfirmed) {
      checkboxes.forEach(function (checkbox) {
       var value = checkbox.value;
       savedNumbers = savedNumbers.filter(function (number) {
        return number !== value;
       });
      });
      localStorage.setItem('savedNumbers', JSON.stringify(savedNumbers));
      displaySavedNumbers();
      Swal.fire({
       icon: 'success',
       text: 'Nomor Terpilih dihapus',
       showConfirmButton: false,
       timer: 1500
      });
     }
    });
   } else {
    Swal.fire({
     icon: 'info',
     text: 'Pilih nomor untuk dihapus',
     showConfirmButton: false,
     timer: 1500
    });
   }
  }
  displaySavedNumbers();
  function getContact() {
   window.location.href = urlOlshop + '/ambil_kontak';
  }
  function getScan() {
   window.location.href = urlOlshop + '/scan_all';
  }
  function convertToPoints(product) {
   var rate = membershipRates[namaMembership];
   if (!rate) {
    console.error("Tingkat keanggotaan tidak ditemukan:", namaMembership);
    return '';
   }
   if (!product || !product.harga_produk) {
    console.error("Data produk tidak valid atau properti harga_produk tidak ditemukan.");
    return '';
   }
   var points = Math.floor(product.harga_produk / rate);
   return points > 0 ? '+' + points + ' poin' : '';
  } var pointsText = convertToPoints(product);
