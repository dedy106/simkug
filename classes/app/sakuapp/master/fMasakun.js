window.app_sakuapp_master_fMasakun = function (owner) {
    if (owner) {
        window.app_sakuapp_master_fMasakun.prototype.parent.constructor.call(this, owner);
        this.className = "app_sakuapp_master_fMasakun";
        this.itemsValue = new arrayList();
        this.app._mainForm.childFormConfig(this, "mainButtonClick", "Form Master Akun", 0);

        uses("saiCBBL;saiEdit;saiGrid;");
        this.fKode = new saiLabelEdit(this, { bound: [20, 10, 202, 20], labelWidth: 100, caption: "Kode", placeHolder: "" });
        this.fNama = new saiLabelEdit(this, { bound: [20, 11, 202, 20], labelWidth: 100, caption: "Nama", placeHolder: "" });
        this.p1 = new panel(this, { bound: [20, 23, 300, 283], caption: "Daftar Akun" });
        this.sg1 = new saiGrid(this.p1, {
            bound: [0, 20, 295, 260],
            tag: 9,
            readOnly: true, autoPaging:true, rowPerPage:50,
            colCount: 2,
            colWidth: [[1, 0], [80, 80]],
            colTitle: ["Kode", "Nama"]
        });

        this.fKode.input.addEventListener("change", (e) => {
            let kode = e.srcElement.value;
            this.app.services.callServices("financial_sakuServices", "getAkun", [this.app._lokasi, kode ], (data) => {
                this.fNama.setText(data);
                if (data == ""){
                    setTipeButton(tbSimpan);
                }else setTipeButton(tbUbahHapus);
            });
        });
        this.rearrangeChild(10, 22);
        this.maximize();
        this.setTabChildIndex();

        try {
            this.standarLib = new util_standar();
            this.loadData();
            setTipeButton(tbSimpan);
        } catch (e) {
            systemAPI.alert(e);
        }
    }
};
window.app_sakuapp_master_fMasakun.extend(window.childForm);
window.app_sakuapp_master_fMasakun.implement({
    mainButtonClick: function (sender) {
        if (sender == this.app._mainForm.bClear)
            system.confirm(this, "clear", "screen akan dibersihkan?", "form inputan ini akan dibersihkan");
        if (sender == this.app._mainForm.bSimpan)
            system.confirm(this, "simpan", "Apa data sudah benar?", "data diform ini apa sudah benar.");
        if (sender == this.app._mainForm.bEdit)
            system.confirm(this, "ubah", "Apa perubahan data sudah benar?", "perubahan data diform ini akan disimpan.");
        if (sender == this.app._mainForm.bHapus)
            system.confirm(this, "hapus", "Yakin data akan dihapus?", "data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
    },
    simpan: function () {
        try {
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    let self = this;
                    let kode = self.fKode.getText();
                    let nama = self.fNama.getText();
                    try {
                        if (kode != '' && nama != '') {
                            self.app.services.callServices("financial_sakuServices", "addAkun", [this.app._lokasi, kode, nama], (data) => {
                                if (data == 'process completed') {
                                    system.info(self, "Data berhasil disimpan");
                                    self.loadData();
                                }else system.alert(self, data);
                            })
                        } else {
                            system.alert(self, "Inputan Tidak Boleh Kosong");
                        }

                    } catch (e) {
                        systemAPI.alert(e);
                    }
                }
                catch (e) {
                    system.alert(this, e, "");
                }
            }
        } catch (e) {
            systemAPI.alert(e);
        }
    },
    ubah: function () {
        try {
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    let self = this;
                    let kode = self.fKode.getText();
                    let nama = self.fNama.getText();
                    self.app.services.callServices("financial_sakuServices", "ubahAkun", [this.app._lokasi, kode, nama], (data) => {
                        if (data == 'process completed') {
                            system.info(self, "Data berhasil disimpan");
                            self.loadData();
                        }else system.alert(self, data);
                    })
                }
                catch (e) {
                    system.alert(this, e, "");
                }
            }
        } catch (e) {
            systemAPI.alert(e);
        }
    },
    hapus: function () {
        try {
            if (this.standarLib.checkEmptyByTag(this, [0, 1])) {
                try {
                    let self = this;
                    let kode = self.fKode.getText();
                    let nama = self.fNama.getText();
                    self.app.services.callServices("financial_sakuServices", "hapusAkun", [this.app._lokasi, kode, nama], (data) => {
                        if (data == 'process completed') {
                            system.info(self, "Data berhasil dihapus");
                            self.loadData();
                        }else system.alert(self, data);
                    })
                }
                catch (e) {
                    system.alert(this, e, "");
                }
            }
        } catch (e) {
            systemAPI.alert(e);
        }
    },
    doModalResult: function (event, modalResult) {
        if (modalResult != mrOk) return false;
        switch (event) {
            case "clear":
                if (modalResult == mrOk)
                    this.standarLib.clearByTag(this, new Array("0", "1"), this.fkode);
                setTipeButton(tbAllFalse);
                this.loadData();
                break;
            case "simpan":
                this.simpan();
                break;
            case "simpancek": this.simpan();
                break;
            case "ubah":
                this.ubah();
                break;
            case "hapus":
                this.hapus();
                break;
        }
    },
  
    loadData: function () {
        let self = this;
        self.sg1.clear(0);
        this.app.services.callServices("financial_sakuServices", "listAkun", [this.app._lokasi], (data) => {
            // console.log(JSON.stringify(data));
            data.rs.rows.forEach( (val, index) => {
                this.sg1.appendData([val.kode_akun, val.nama]);
            } );
            // this.sg1.setData(data, true, 50);
        });
    },
    doSimpanClick: function (sender) {
        
    },
   
    doPager: function (sender, page) {
        this.sg1.selectPage(page);
    },
    
});