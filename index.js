var mangNhanVien = [];
var validate = new Validation ();
var themNhanVien = function () {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoLuong = document.querySelector('#chucVu').value;
    var tagChucVu = document.querySelector('#chucVu');
    var arrOption = tagChucVu.options;
    nhanVien.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    
    var valid = true;
    valid &= validate.ktr(nhanVien.maNhanVien, "Mã nhân viên", ".ktr-maNhanVien")
    & validate.ktr(nhanVien.tenNhanVien, "Tên nhân viên", ".ktr-tenNhanVien")
    & validate.ktr(nhanVien.luongCoBan, "Lương cơ bản", ".ktr-luongCoBan")
    & validate.ktr(nhanVien.soGioLamTrongThang, "Số giờ làm trong tháng", ".ktr-soGioLamTrongThang");

    valid &= validate.ktl(nhanVien.maNhanVien, "Mã nhân viên", ".ktl-maNhanVien", 4, 6)
    & validate.ktl(nhanVien.tenNhanVien, "Tên nhân viên", ".ktl-tenNhanVien", 2, 50);

    valid &= validate.ktv(nhanVien.luongCoBan, "Lương cơ bản", ".ktv-luongCoBan", 1000000, 20000000)
    & validate.ktv(nhanVien.soGioLamTrongThang, "Số giờ làm trong tháng", ".ktv-soGioLamTrongThang", 50, 150);

    valid &= validate.kts(nhanVien.tenNhanVien, "Tên nhân viên", ".kts-tenNhanVien");

    valid &= validate.kti(nhanVien.luongCoBan, "Lương cơ bản", ".kti-luongCoBan")
    & validate.kti(nhanVien.soGioLamTrongThang, "Số giờ làm trong tháng", ".kti-soGioLamTrongThang");

    if (!valid) {
        return; 
    }

    mangNhanVien.push(nhanVien);    
    saveLocalStorage();
    renderTable(mangNhanVien);
    location.reload();
}

var luuThongTin = function () {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoLuong = document.querySelector('#chucVu').value;
    var tagChucVu = document.querySelector('#chucVu');
    var arrOption = tagChucVu.options;
    nhanVien.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    for (var index = 0; index < mangNhanVien.length; index++) {
        var update = mangNhanVien[index];
        if (update.maNhanVien === nhanVien.maNhanVien) {
            update.tenNhanVien = nhanVien.tenNhanVien;
            update.heSoLuong = nhanVien.heSoLuong;
            update.chucVu = nhanVien.chucVu;
            update.luongCoBan = nhanVien.luongCoBan;
            update.soGioLamTrongThang = nhanVien.soGioLamTrongThang;
        }
    }
    saveLocalStorage();
    renderTable(mangNhanVien);
    document.querySelector('#maNhanVien').disabled = false;
    document.querySelector('#themNhanVien').disabled = false;
    location.reload();
}

var deleteRow = function (maNV) {
    for (var index = mangNhanVien.length - 1; index >= 0; index--) {
        var nv = mangNhanVien[index];
        if(nv.maNhanVien === maNV){
            mangNhanVien.splice(index, 1);
        }
    }
    deleteLocalStorage();
    renderTable(mangNhanVien);
}

var editRow = function (maNV) {
    document.querySelector('#maNhanVien').disabled = true;
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nhanVien = mangNhanVien[index];
        if (maNV === nhanVien.maNhanVien) {
            document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
            document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
            var tagChucVu = document.querySelector('#chucVu');
            var arrOption = tagChucVu.options;
            arrOption[tagChucVu.selectedIndex].innerHTML = nhanVien.chucVu;
            document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
            document.querySelector('#soGioLamTrongThang').value = nhanVien.soGioLamTrongThang;
        }
    }
    document.querySelector('#themNhanVien').disabled = true;
}

var renderTable = function (arrNV) {
    var contentTable = '';
    for (var index = 0; index < arrNV.length; index++) {
        var nhanVien = arrNV[index];
        var nv = new NhanVien(nhanVien.maNhanVien, nhanVien.tenNhanVien, nhanVien.chucVu, nhanVien.heSoLuong, nhanVien.luongCoBan, nhanVien.soGioLamTrongThang);
        contentTable += `
                        <tr>
                            <td>${nv.maNhanVien}</td>
                            <td>${nv.tenNhanVien}</td>
                            <td>${nv.chucVu}</td>
                            <td>${nv.luongCoBan}</td>
                            <td>${nv.tongLuong ()}</td>
                            <td>${nv.soGioLamTrongThang}</td>
                            <td>${nv.xepLoai ()}</td>                                                       
                            <td><button class="btn btn-danger" onclick ="deleteRow('${nv.maNhanVien}')">Xóa</button></td>
                            <td><button class="btn btn-primary" onclick ="editRow('${nv.maNhanVien}')">Chỉnh sửa</button></td>
                        </tr>
        `;
    }
    document.querySelector('#tbody').innerHTML = contentTable;
} 

var saveLocalStorage = function () {
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    localStorage.setItem('mangNhanVien', sMangNhanVien);
}

var deleteLocalStorage = function () {
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    localStorage.removeItem('mangNhanVien', sMangNhanVien);
}
  
var getMangNhanVienStorage = function () {
    if (localStorage.getItem('mangNhanVien')){
      var sMangNhanVien = localStorage.getItem('mangNhanVien');
      mangNhanVien = JSON.parse(sMangNhanVien);
      renderTable(mangNhanVien);
    }
  }
  
getMangNhanVienStorage();




    



