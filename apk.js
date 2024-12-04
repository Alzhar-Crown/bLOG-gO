// LOGIKA USER LOGIN t


let acUser = []

let aksi = true

const saveStorage = () => {



    localStorage.setItem('acUser', JSON.stringify(acUser))




}



const daftarAccnt = () => {
    let user = document.getElementById("InUser").value.trim(); // Menghapus spasi di awal/akhir input
    let pass = document.getElementById("InPass").value.trim()

    // Ambil data user dari localStorage, jika kosong default ke array kosong
    let akses = JSON.parse(localStorage.getItem("acUser")) || [];

    // Cek apakah username sudah ada di localStorage
    let userExists = akses.some(acc => acc.username === user);

    if (userExists) {

        alert("Username sudah terdaftar! Silakan gunakan username lain.");
    }
    else if (document.getElementById("InUser").value.length > 16) {
        alert("Maksimal Karakter 16!")
    }
    else if (document.getElementById("InPass").value.trim().length !== 10) {
        alert("Password harus 10 karakter!");

    }
    else if (user === "" || pass === "") {
        alert("Username dan password tidak boleh kosong!");
    } else {
        // Tambahkan user baru ke array
        let newUser = {
            username: user,
            password: pass,
            id: getRandomNumber()
        };
        akses.push(newUser); // Tambahkan ke array akses

        // Simpan kembali ke localStorage
        localStorage.setItem("acUser", JSON.stringify(akses));

        alert("Akun berhasil didaftarkan!");

        // Reset input form
        document.getElementById("InUser").value = "";
        document.getElementById("InPass").value = "";
    }
};

const getRandomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000);

}

const cariIndex = (user = document.getElementById("InUser").value) => {
    let akses = JSON.parse(localStorage.getItem("acUser"));
    for (let index = 0; index < akses.length; index++) {
        if (akses[index].username.toLowerCase() === user.toLowerCase()) {
            localStorage.setItem("index", index)
        }
    }
}

const loginAwal = () => {
    window.location.href = 'login.html'
}
// PR user belum bisa login pada akun yang dibuat !!!!!!
const loginAccnt = () => {
    let userIn = document.getElementById("InUser").value.trim()
    let passIn = document.getElementById("InPass").value.trim()
    let akses = JSON.parse(localStorage.getItem("acUser")) || [];
    let userExists = akses.some(acc => acc.username === userIn);
    let passwordExists = akses.some(acc => acc.password === passIn);


    if (userExists && passwordExists) {
        localStorage.setItem("loggedInUser", userIn);
        cariIndex()

        // pr belum bisa ganti dengan username user
        // document.getElementById("name").innerHTML = `<h3> Hallo </h3>`
        document.getElementById("InPass").value = ""
        document.getElementById("InUser").value = ""
        window.location.href = "beranda.html"





    }
    else if (userExists) {
        alert("Password akun salah! ")
        document.getElementById("InUser").value = ""
        document.getElementById("InPass").value = ""
    }
    else {
        alert("Akun belum terdaftar")
        document.getElementById("InUser").value = ""
        document.getElementById("InPass").value = ""
    }


}


//close kembali ke welcome page
const kembali = () => {
    window.location.href = "index.html"
}
const logOut = () => {
    window.location.href = "login.html"
}

//isi h3
const isi = () => {
    let userLog = localStorage.getItem("loggedInUser")
    document.getElementById('name').innerHTML = `Hallo ${userLog}`



}

//isi di profile
const profile = () => {
    const akses = JSON.parse(localStorage.getItem("acUser"))
    document.getElementById("berandaUs").value = `${akses[parseInt(localStorage.getItem("index"))].username}`
    document.getElementById("berandaIn").value = `${akses[parseInt(localStorage.getItem("index"))].password}`
    document.getElementById("berandaIn").setAttribute("type", "text")
}
//edit profile
const editUs = () => {
    let us = document.getElementById("berandaUs").value
    let log = localStorage.getItem('loggedInUser')
    let akses = JSON.parse(localStorage.getItem("acUser"))
    if (akses) {
        akses[parseInt(localStorage.getItem("index"))].username = us
        localStorage.setItem("acUser", JSON.stringify(akses))
        log = us
        localStorage.setItem("loggedInUser", log)
        isi()


    }


}
const editPass = () => {
    let pass = document.getElementById("berandaIn").value
    let akses = JSON.parse(localStorage.getItem("acUser"))
    if (akses) {
        akses[parseInt(localStorage.getItem("index"))].password = pass
        localStorage.setItem("acUser", JSON.stringify(akses))

    }
}

function AlertDelete() {
    let result = confirm("Apakah anda yakin?")
    if (result) {
        DeleteAkun()
        window.location.href = "login.html"
    }
}

const DeleteAkun = () => {
    let akses = (JSON.parse(localStorage.getItem("acUser")))
    const index = parseInt(localStorage.getItem("index"))
    if (akses) {
        localStorage.removeItem(`riwayat${akses[index].id}`)
        akses.splice(parseInt(localStorage.getItem("index")), 1)
        localStorage.setItem("acUser", JSON.stringify(akses))
        alert("Delete succes")
        window.location.href = "login.html"
    }
}

profile()
isi()


const topUp = () => {
    document.getElementById("popUp").style.zIndex = "-1"
    document.getElementById("popUp").style.opacity = "0%"
    let akses = JSON.parse(localStorage.getItem("acUser"))
    const index = parseInt(localStorage.getItem("index"))
    let nominalIn = document.getElementById("nominal").value

    let nominal = parseFloat(nominalIn)
    if (akses[index].saldo === undefined) {
        akses[index].saldo = 0
        akses[index].saldo += nominal
        localStorage.setItem("acUser", JSON.stringify(akses))
        innerNom()
        // Mengambil atau menginisialisasi riwayat
        let NewHis = JSON.parse(localStorage.getItem(`Riwayat ${akses[index].id}`)) || [];

        // Menambahkan riwayat baru

        const newEntry = {
            resi: `Resi ${getRandomNumber()}`,
            nominal: `melakukan topup sebesar Rp ${nominalIn} pada `,
            tanggal: `${new Date().toLocaleString()}`
        };
        NewHis.push(newEntry);

        // Menyimpan kembali ke localStorage
        localStorage.setItem(`Riwayat ${akses[index].id}`, JSON.stringify(NewHis));
        document.getElementById("historySp").innerHTML += `${newEntry.resi} Melakukan Top Up sbesar ${newEntry.nominal} pada ${newEntry.tanggal}<br>`

        // Menampilkan notifikasi sukses
        alert(`Top-up sukses! Saldo baru: Rp ${akses[index].saldo}`);
    }
    else {
        akses[index].saldo += nominal
        localStorage.setItem("acUser", JSON.stringify(akses))
        innerNom()
        // Mengambil atau menginisialisasi riwayat
        let NewHis = JSON.parse(localStorage.getItem(`Riwayat ${akses[index].id}`)) || [];

        // Menambahkan riwayat baru
        const newEntry = {
            resi: `Resi ${getRandomNumber()}`,
            nominal: `Melakukan Top Up sebesar Rp ${nominalIn} pada `,
            tanggal: `${new Date().toLocaleString()}`
        };
        NewHis.push(newEntry);

        // Menyimpan kembali ke localStorage
        localStorage.setItem(`Riwayat ${akses[index].id}`, JSON.stringify(NewHis));
        document.getElementById("historySp").innerHTML += `${newEntry.resi} Melakukan Top up ${newEntry.nominal} pada ${newEntry.tanggal}<br>`

        // Menampilkan notifikasi sukses
        alert(`Top-up sukses! Saldo baru: Rp ${akses[index].saldo}`);

    }
}

const resetRiwayat = () => {
    let akses = JSON.parse(localStorage.getItem("acUser"))
    const index = parseInt(localStorage.getItem("index"))
    let riwayat = JSON.parse(localStorage.getItem(`Riwayat ${akses[index].id}` || []))
    for (let i = 0; i < riwayat.length; i++) {
        riwayat = []
        localStorage.setItem(`Riwayat ${akses[index].id}`, JSON.stringify(riwayat))
    }
    let ref = JSON.parse(localStorage.getItem(`Riwayat ${akses[index].id}` || []))
    document.getElementById("historySp").innerHTML = `${ref}<br>`




}
const pull = () => {
    let akses = JSON.parse(localStorage.getItem("acUser"))
    const index = parseInt(localStorage.getItem("index"))
    let aksesfe = localStorage.getItem("FeeDev")
    let Storagehis = JSON.parse(localStorage.getItem(`Riwayat ${akses[index].id}` || []))
    if (aksesfe == undefined) {
        let Fe = 0
        localStorage.setItem("FeeDev", (Fe))
    }
    else {
        let fee = parseInt(localStorage.getItem("FeeDev"))
        if (akses[index].saldo < 100000) {
            alert("Minimal penarikan saldo adalah Rp 100.000")
        }
        else {
            let currentFe = akses[index].saldo * 25 / 100
            fee += currentFe
            const newEntry = {
                resi: `Resi ${getRandomNumber()}`,
                nominal: `Melakukan pull sebesar Rp ${akses[index].saldo} pada `,
                tanggal: new Date().toLocaleString(),
                currentFee: `dengan pajak sebesar ${currentFe} `
            }
            Storagehis.push(newEntry)
            aksi = false
            akses[index].saldo = 0
            document.getElementById("historySp").innerHTML += `${newEntry.resi} ${newEntry.nominal}  ${newEntry.tanggal} ${newEntry.currentFee}<br>`
            localStorage.setItem(`Riwayat ${akses[index].id}`, JSON.stringify(Storagehis))
            localStorage.setItem("FeeDev", fee.toString())
            localStorage.setItem("acUser", JSON.stringify(akses))
            innerNom()
            alert("Penarikan Berhasil!")
        }

    }

}

const history = () => {

    let akses = JSON.parse(localStorage.getItem("acUser"))
    let index = parseInt(localStorage.getItem("index"))
    let storHis = JSON.parse(localStorage.getItem(`Riwayat ${akses[index].id}`))
    if (!storHis) {
        let bro = [0]
        localStorage.setItem(`Riwayat ${akses[index].id}`, JSON.stringify(bro))
    }
    else {
        for (let i = 0; i < storHis.length; i++) {
            document.getElementById("historySp").innerHTML += `${storHis[i].resi} ${storHis[i].nominal} ${storHis[i].tanggal}<br>`


        }

    }
}

const innerNom = () => {
    let akses = JSON.parse(localStorage.getItem("acUser"))
    const index = parseInt(localStorage.getItem("index"))
    if (akses[index].saldo == undefined) {
        document.getElementById("totalNom").innerHTML = `Rp 0`

    } else {
        document.getElementById("totalNom").innerHTML = `Rp ${akses[index].saldo}`

    }

}
const pop = () => {
    document.getElementById("popUp").style.zIndex = "4"
    document.getElementById("popUp").style.opacity = "100%"
}
innerNom()
history()
// desainn bagian //

function popup1() {
    document.getElementById("pop1").style.marginLeft = "220px"
    document.getElementById("pop1").style.zIndex = "1"
    document.getElementById("pop1").style.width = "700px"
    document.getElementById("pop1").style.height = "fit-content"
}

function popup2() {
    document.getElementById("pop2").style.marginLeft = "640px"
    document.getElementById("pop2").style.zIndex = "1"
    document.getElementById("pop2").style.width = "700px"
    document.getElementById("pop2").style.height = "fit-content"
}
function popup3() {
    document.getElementById("pop3").style.marginLeft = "-700px"
    document.getElementById("pop3").style.zIndex = "1"
    document.getElementById("pop3").style.width = "700px"
    document.getElementById("pop3").style.height = "fit-content"
}

function cancelpop() {
    document.getElementById("pop1").style.zIndex = "-1"
    document.getElementById("pop1").style.marginLeft = "-600px"
    document.getElementById("pop1").style.width = "300px"
    document.getElementById("pop1").style.height = "200px"
}
function cancelpop2() {
    document.getElementById("pop2").style.zIndex = "-1"
    document.getElementById("pop2").style.marginLeft = "-300px"
    document.getElementById("pop2").style.width = "300px"
    document.getElementById("pop2").style.height = "200px"
}
function cancelpop3() {
    document.getElementById("pop3").style.zIndex = "-1"
    document.getElementById("pop3").style.marginLeft = "400px"
    document.getElementById("pop3").style.width = "300px"
    document.getElementById("pop3").style.height = "200px"
}

function addCart() {
    let brand = document.getElementById("titlePr").textContent
    let akses = JSON.parse(localStorage.getItem("acUser"))
    const index = parseInt(localStorage.getItem("index"))
    let cart = JSON.parse(localStorage.getItem(`cart ${akses[index].id}`)) || []

    let newCart = {
        resi: getRandomNumber(),
        brand: brand,
        harga: document.getElementById("harga").textContent

    }
    cart.push(newCart)
    localStorage.setItem(`cart ${akses[index].id}`, JSON.stringify(cart))
    alert("Add to cart")
}
function addCart2() {
    let brand = document.getElementById("titlePr2").textContent
    let akses = JSON.parse(localStorage.getItem("acUser"))
    const index = parseInt(localStorage.getItem("index"))
    let cart = JSON.parse(localStorage.getItem(`cart ${akses[index].id}`)) || []

    let newCart = {
        resi: getRandomNumber(),
        brand: brand,
        harga: document.getElementById("harga2").textContent

    }
    cart.push(newCart)
    localStorage.setItem(`cart ${akses[index].id}`, JSON.stringify(cart))
    alert("Add to cart")
}
function addCart3() {
    let brand = document.getElementById("titlePr3").textContent
    let akses = JSON.parse(localStorage.getItem("acUser"))
    const index = parseInt(localStorage.getItem("index"))
    let cart = JSON.parse(localStorage.getItem(`cart ${akses[index].id}`)) || []

    let newCart = {
        resi: getRandomNumber(),
        brand: brand,
        harga: document.getElementById("harga3").textContent

    }
    cart.push(newCart)
    localStorage.setItem(`cart ${akses[index].id}`, JSON.stringify(cart))
    alert("Add to cart")
}


const indexpaid = (itemIndex) => {
    let akses = JSON.parse(localStorage.getItem("acUser"));
    const userIndex = parseInt(localStorage.getItem("index"));
    let cart = JSON.parse(localStorage.getItem(`cart ${akses[userIndex].id}`)) || [];

    let resiElement = document.getElementById(`resi${itemIndex + 1}`);

    if (resiElement) {
        let resi = resiElement.textContent.trim();

        if (cart[itemIndex].resi.toString() === resi) {
            localStorage.setItem("indexPaid", itemIndex);
            let dataPaid = JSON.parse(localStorage.getItem(`dataPaid ${akses[userIndex].id}`))

            if (!Array.isArray(dataPaid)) {
                dataPaid = []
            }

            let newData = { data: cart[itemIndex] }
            let saldo = parseFloat(akses[userIndex].saldo)
            let harga = parseInt(cart[itemIndex].harga)
            if (saldo < harga) {
                alert("saldo tidak cukup!")
            }
            else {

                let sisa = saldo - harga
                akses[userIndex].saldo = sisa
                localStorage.setItem("acUser", JSON.stringify(akses))

                let NewHis = JSON.parse(localStorage.getItem(`Riwayat ${akses[userIndex].id}`)) || [];

                const newEntry = {
                    resi: `Resi ${getRandomNumber()}`,
                    nominal: `melakukan transaksi sebesar Rp ${harga} pada `,
                    tanggal: `${new Date().toLocaleString()}`
                };
                NewHis.push(newEntry);
                localStorage.setItem(`Riwayat ${akses[userIndex].id}`, JSON.stringify(NewHis));
                document.getElementById("historySp").innerHTML += `${newEntry.resi}  ${newEntry.nominal}     ${newEntry.tanggal}<br>`



                innerNom()

                dataPaid.push(newData)
                localStorage.setItem(`dataPaid ${akses[userIndex].id}`, JSON.stringify(dataPaid));

                cart.splice(itemIndex, 1)
                localStorage.setItem(`cart ${akses[userIndex].id}`, JSON.stringify(cart))
                tampilCart()


                return itemIndex
                // Tambahkan logika pembayaran di sini  
            }


        } else {
            alert("Resi tidak cocok.");
        }
    } else {
        alert("Elemen resi tidak ditemukan.");
    }


}








const tampilCart = () => {
    let akses = JSON.parse(localStorage.getItem("acUser"))
    const index = parseInt(localStorage.getItem("index"))
    let cart = JSON.parse(localStorage.getItem(`cart ${akses[index].id}`)) || []
    let table = document.getElementById("tbl_show")
    table.innerHTML = `<tr> 
                                       
                                        
                                    </tr>`

    for (let i = 0; i < cart.length; i++) {
        table.innerHTML += `<tr>
                                        <td>${i + 1}</td>
                                        <td id="resi${i + 1}">${cart[i].resi}</td>
                                        <td>${cart[i].brand}</td>
                                        <td>${cart[i].harga}</td>
                                        <td><button class="btn btn-outline-success ms-4" onclick="indexpaid(${i})">Pay</button> <button class="btn btn-outline-danger ms-4" onclick = "deleteCart()">Delete</button></td>
                                        
                                    </tr>`

    }
}
tampilCart()
const tampilpaid = () => {
    let akses = JSON.parse(localStorage.getItem("acUser"))
    const index = parseInt(localStorage.getItem("index"))
    let paid = JSON.parse(localStorage.getItem(`dataPaid ${akses[index].id}`)) || []
    let table = document.getElementById("tbl_show")

    table.innerHTML = `<tr> 
                                       
                                        
                                    </tr>`

    for (let i = 0; i < paid.length; i++) {
        table.innerHTML += `<tr>
                                        <td>${i + 1}</td>
                                        <td id="resi${i + 1}">${paid[i].data.resi}</td>
                                        <td>${paid[i].data.brand}</td>
                                        <td>${paid[i].data.harga} (Payment Succes)</td>
                                        <td> <button class = "btn btn-outline-warning mb-2 ms-3" onclick = "unduhCerti()"> Certificat</button> <button class="btn btn-outline-danger ms-4" onclick = "deletePaid()">Delete</button></td>
                                        
                                    </tr>`

    }

}

const deleteCart = () => {
    let akses = JSON.parse(localStorage.getItem("acUser"));
    const userIndex = parseInt(localStorage.getItem("index"));
    let cart = JSON.parse(localStorage.getItem(`cart ${akses[userIndex].id}`)) || [];
    let indexPaid = parseInt(localStorage.getItem(indexpaid))
    cart.splice(indexPaid, 1)
    localStorage.setItem(`cart ${akses[userIndex].id}`, JSON.stringify(cart))
    tampilCart()





}

const deletePaid = () => {
    let akses = JSON.parse(localStorage.getItem("acUser"))
    let index = parseInt(localStorage.getItem("index"))
    let dataPaid = JSON.parse(localStorage.getItem(`dataPaid ${akses[index].id}`)) || []
    let indexPaid = parseInt(localStorage.getItem(indexpaid))
    dataPaid.splice(indexPaid, 1)
    localStorage.setItem(`dataPaid ${akses[index].id}`, JSON.stringify(dataPaid))
    tampilpaid()

}

function bernplay() {
    let audio = document.getElementById("bernad");
    document.getElementById("sound").style.animation = "song 4s infinite ease-in-out"

    if (audio) {
        audio.play().catch((error) => {
            console.error("Error playing audio:", error);
        });
    } else {
        console.error("Audio element not found");
    }
}
function stopAudio() {
    let audio = document.getElementById("bernad");
    document.getElementById("sound").style.animation = "none"


    if (!audio.paused) {
        audio.pause(); // Hentikan lagu
    }
}

const closeCerti = () => {


    document.getElementById("tampilCart").style.zIndex = "1"
    document.getElementById("sertif").style.opacity = "0%"
}

const unduhCerti = () => {
    document.getElementById("tampilCart").style.zIndex = "-1"
    document.getElementById("sertif").style.opacity = "100%"
    document.getElementById("saldo").style.zIndex = "0"
    // Ambil data dari local storage
    const index = parseInt(localStorage.getItem("index"))
    const userName = JSON.parse(localStorage.getItem("acUser"));
    const paidIndex = parseInt(localStorage.getItem("indexPaid"))
    const designName = JSON.parse(localStorage.getItem(`dataPaid ${userName[index].id}`))
    // const currentDate = new Date().toLocaleDateString();
    const { jsPDF } = window.jspdf;


    // Isi sertifikat dengan data user
    document.getElementById("userName").textContent = userName[index].username || "John Doe";
    document.getElementById("designName").textContent = designName[paidIndex].data.brand || "Sample Design";
    document.getElementById("date").textContent = new Date().toLocaleDateString();

    // Fungsi untuk download sertifikat sebagai PDF
    document.getElementById("downloadBtn").addEventListener("click", () => {
        const element = document.getElementById("certificate");

        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 150); // Atur posisi dan ukuran
            pdf.save(`certificate${getRandomNumber()}.pdf`);
        });
    });

}

const popDesain = () => {
    document.getElementById("inpDesign").style.zIndex = "3"
    document.getElementById("inpDesign").style.opacity = "1"
}

const cancelPopd = () => {
    document.getElementById("inpDesign").style.zIndex = "-3"
    document.getElementById("inpDesign").style.opacity = "0%"
}


// Ketika pengguna memilih gambar
document.getElementById('inputImg').addEventListener('change', function (event) {
    const file = event.target.files[0];  // Mengambil file pertama dari input file
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Konversi gambar ke Base64
            const base64Image = e.target.result;

            // Menampilkan gambar yang dipilih di preview
            document.getElementById('preview').src = base64Image;
            document.getElementById('preview').style.display = 'block';  // Menampilkan gambar preview
        };
        reader.readAsDataURL(file);  // Membaca file sebagai Base64
    }
})

const saveDesain = () => {
    let akses = JSON.parse(localStorage.getItem("acUser"))
    let index = parseInt(localStorage.getItem("index"))
    let judul = document.getElementById("inputJudulD").value
    let desk = document.getElementById("inputDesk").value
    let harga = document.getElementById("inputPrice").value
    const base64Image = document.getElementById('preview').src;  // Mengambil Base64 gambar preview
    let desain = JSON.parse(localStorage.getItem(`design${akses[index].id}`)) || []
    const Updesain = {
        judulDesign: judul,
        deskripsi: desk,
        harga: harga,
        img: base64Image
    }
    desain.push(Updesain)
    localStorage.setItem(`design${akses[index].id}`, JSON.stringify(desain))
    alert("Berhasil Upload Design")
}
function isiDesain  () {
    let akses = JSON.parse(localStorage.getItem("acUser"))
    let index = parseInt(localStorage.getItem("index"))
    const imgsaved = JSON.parse(localStorage.getItem(`design${akses[index].id}`))
    if (imgsaved) {
        document.getElementById("img3pop").src = `${imgsaved[0].img}`
        document.getElementById("img3pop").style.display="block"
        document.getElementById("tiga").style.backgroundImage =`url(${imgsaved[0].img})`
        document.getElementById("tiga").style.display="block"
        document.getElementById("titlePr3").innerHTML= imgsaved[0].judulDesign
        document.getElementById("harga3").innerHTML= parseInt(imgsaved[0].harga)
        document.getElementById("txtDesk3").innerText= imgsaved[0].deskripsi

    }
    else {
    }
}
cancelPopd()
isiDesain()