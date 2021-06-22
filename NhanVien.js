var NhanVien = function (maNhanVien, tenNhanVien, chucVu, heSoLuong, luongCoBan, soGioLamTrongThang) {
    this.maNhanVien = maNhanVien,
    this.tenNhanVien = tenNhanVien,
    this.chucVu = chucVu,
    this.heSoLuong = heSoLuong,
    this.luongCoBan = luongCoBan,
    this.soGioLamTrongThang = soGioLamTrongThang,
    this.tongLuong = function () {
        return Number (this.heSoLuong)* Number (this.luongCoBan);
    },
    this.xepLoai = function () {
        var gioLam = this.soGioLamTrongThang;
        if (gioLam >= 120) {
            return 'Nhân viên xuất sắc';
        }
        else if (gioLam >= 100) {
            return 'Nhân viên giỏi';
        }
        else if (gioLam >= 80) {
            return 'Nhân viên khá';
        }
        else return 'Nhân viên trung bình';
    }
}