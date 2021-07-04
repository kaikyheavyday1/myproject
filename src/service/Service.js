export class Service {
    checkPassword = (e) => {
        if (e.password === e.confirmpassword) return true
        return false
    }
    validateInput(e) {
        if(!e.email) return 'อีเมล'
        if(!e.firstname) return 'ชื่อ'
        if(!e.lastname) return 'นามสกุล'
        if(!e.tel) return 'เบอร์โทร'
        if(!e.address) return 'ที่อยู่'
        if(!e.password) return 'รหัสผ่าน'
        if(!e.confirmpassword) return 'ยืนยันรหัสผ่าน'
        return ''
    }
    validateInputBook(e){
        if(!e.name) return 'ชื่อหนังสือ'
        if(!e.description) return 'รายละเอียดของหนังสือ'
        if(!e.price) return 'ราคา'
    }
}