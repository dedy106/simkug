/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fAppKKIL2K = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fAppKKIL2K.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fAppKKIL2K";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Approval KKIL oleh Sub UBIS/ Regional (Koreksi)", 0);	
		uses("datePicker;saiCBBL");
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Bus. Area",
			multiSelection: false,
			text:this.app._kodeLokfa,
			rightLabel:this.app._namaLokfa,						
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
			change:[this,"doChange"]		
		});
		this.ed_kode = new saiCBBL(this,{bound:[20,2,250,20],caption:"No App",readOnly:true, multiSelection:false, change:[this,"doChange"]});
		this.ed_jenis = new saiCB(this,{bound:[20,10,200,20], caption:"Jenis",text:"TB", items:["TB","NTB"], change:[this,"doChange"]});		
		this.ed_ket = new saiLabelEdit(this, {bound:[20,11,800,20], caption:"Keterangan"});
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Approval",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});				
		this.bTampil = new button(this, {
			bound: [820, 3, 80, 20],
			caption: "Tampil",
			click: [this, "doTampil"],
			visible: false
		});
		this.p1 = new panel(this, {
			bound: [20, 11, 900, 230],
			caption: "Data Inventarisasi"
		});
		this.sg = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 17,
			colTitle: "Approve, Catatan, No Inventarisasi, Tanggal, No Gabung, Asset, SNo., Nama, Alamat/Deskripsi Lainnya,Tgl Perolehan, Nilai Perolehan, Nilai Akumulasi, Nilai Buku, Quantity , User Entry, Nama, Area ",
			colWidth: [[16,15,14,13,12,11,10,9,8,7,6,5, 4, 3, 2, 1, 0], [150,150,100,100,120,120,120,100,250,250,60,100,120,80,120,200,50]],
			colReadOnly: [true,[1,2,3,4,5,6,7,8,9,10,11,12, 13, 14, 15, 16],[]],
			change: [this, "doGridChange"],
			rowCount: 1,
			tag: 9,				
			picklist:[[0],[new arrayMap({items:["INPROG","APP","NOTAPP"]})]],
			buttonStyle:[[0],[bsAuto]],
			colFormat:[[12,11,10,9],[cfNilai, cfNilai, cfNilai, cfNilai]],
			click: [this,"doSgClick"]
		});		
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:bsView, grid:this.sg, pager:[this,"doPager"]});
		
		this.p2 = new panel(this,{bound:[20,12,900,230],caption:"Data Inventarisasi"});
		this.sg2 = new saiGrid(this.p2, {
			bound: [1, 20, 898, 180],
			colCount: 7,
			colTitle: "Alamat, Jml Fisik, No Label, Status, Ket. Status, Update Deskripsi / Update Lokasi, Keterangan ",
			colWidth: [[6,5, 4, 3, 2, 1, 0], [250,250,150,80,120,80,150]],
			readOnly:true,
			change: [this, "doGridChange"],
			rowCount: 1,
			tag: 9
		});		
		this.sgn2 = new sgNavigator(this.p2,{bound:[1,this.p2.height - 25,898,25],buttonStyle:bsView, grid:this.sg2});
		
		this.rearrangeChild(10,23);							
		
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
					
		this.onClose.set(this,"doClose");		
		this.doChange(this.ed_lokfa);		
		this.ed_nik1.setText(this.app._userLog);
	}
};
window.app_assetsap_transaksi_fAppKKIL2K.extend(window.childForm);
window.app_assetsap_transaksi_fAppKKIL2K.implement({
	doClose: function(sender){				
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "delete", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);		
						this.sg.clear(1);
						this.ed_lokfa.setText(this.app._kodeLokfa);
						this.ed_jenis.setText("TB");
						this.ed_nik1.setText(this.app._userLog);
					}
				break;
				case "ubah" :					
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){							
						var inv = ["' '"], line;
						for (var i in this.dataKKIL.rs.rows){
							line = this.dataKKIL.rs.rows[i];
							inv[inv.length] = "'"+line.no_inv+"'";
						}								
						//by pass Approval Area
						sql.add("update amu_kkl_m set progress = '0' where no_inv in ("+inv+")");					
						sql.add("delete from amu_appkkil_d where no_app = '"+this.ed_kode.getText()+"' ");
						sql.add("update amu_appkkil_m set tanggal = '"+this.dp_tgl.getDateString() +"', "+
							"	nik_app='"+this.ed_nik1.getText()+"', keterangan='"+this.ed_ket.getText()+"' "+
							" , jenis = '"+this.ed_jenis.getText()+"',tgl_input=now() where no_app = '"+this.ed_kode.getText()+"' ");
						inv = ["' '"];
						for (var i in this.dataKKIL.rs.rows){
							line = this.dataKKIL.rs.rows[i];
							if (line.status != "INPROG"){
								sql.add("insert into amu_appkkil_d (no_app, status,catatan,no_inv, no_gabung ) "+
								" values('"+this.ed_kode.getText()+"','"+line.status+"','"+line.catatan+"','"+line.no_inv+"','"+line.no_gabung+"' )");
								if (line.status == "NOTAPP")
									sql.add("update amu_kkl_m set progress = '6' where no_inv = '"+line.no_inv+"' ");
								else inv[inv.length] = "'"+line.no_inv+"'";
							}							
						}								
						sql.add("update amu_kkl_m set progress = '2' where no_inv in ("+inv+")");
						this.dbLib.execArraySQL(sql);					
					}
				break;				
				case "delete" :
					sql.add("delete from amu_appkkil_d where no_app = '"+ this.ed_kode.getText()+"' ");
					sql.add("delete from amu_appkkil_m where no_app = '"+ this.ed_kode.getText()+"' ");
					this.dbLib.execArraySQL(sql);
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender){
				
	},
	doChange: function(sender){
		try{
			if (sender == this.ed_kode){
				var data = this.dbLib.getDataProvider("select distinct date_format(a.tanggal,'%d-%m-%Y') as tgl, a.nik_app, a.keterangan, "+
					"	b.status, cc.no_inv, date_format(cc.tanggal,'%d-%m-%Y') as tanggal, b.catatan, c.no_gabung, c.no_fa, c.no_sn, d.nama, d.nama2, date_format(d.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, d.nilai, d.nilai_ap, d.nilai_buku, d.jml_fisik, cc.nik_buat, e.nama as nmbuat, cc.kode_lokfa2 "+
					" from amu_appkkil_m a inner join amu_appkkil_d b on b.no_app = a.no_app "+
					" 	inner join amu_kkl_m cc on cc.no_inv = b.no_inv "+
					" 	inner join amu_kkl_d c on c.no_inv = b.no_inv "+
					" 	inner join amu_asset d on d.no_gabung = c.no_gabung "+
					"	inner join amu_karyawan e on e.nik = cc.nik_buat "+
					" where a.no_app = '"+ sender.getText() +"' and cc.progress in ('2','6') order by cc.no_inv ",true);//by pass aproval area
				this.sg.clear(1);
				setTipeButton(tbAllFalse);
				if (typeof data != "string" ){
					var first = true, line;
					
					for (var i in data.rs.rows){
						if (first){
							line = data.rs.rows[i];
							this.dp_tgl.setText(line.tgl);
							this.ed_nik1.setText(line.nik_app);
							this.ed_ket.setText(line.keterangan);
							setTipeButton(tbUbahHapus);
							break;
						}
						first = false;
					}
					
					this.dataKKIL = data;
					this.rowPerPage = 20;
					this.sgn.setTotalPage(Math.ceil(this.dataKKIL.rs.rows.length / this.rowPerPage));
					this.sgn.rearrange();
					this.doPager(this.sgn,1);
					this.dataKKIL_Orig = data;
				}			
			}
			if (sender == this.ed_jenis){
				this.sg.clear();
				this.sg2.clear();
				if (this.ed_jenis.getText() == "NTB"){
					this.sg2.setColCount(7);
					this.sg2.setColTitle("Alamat, Jml Fisik, No Label, Status, Ket. Status, Update Deskripsi / Update Lokasi, Keterangan ");
					this.sg2.setColWidth([6,5,4,3,2,1,0],[250,250,150,80,120,80,150]);
				}else{
					this.sg2.setColCount(9);
					this.sg2.setColTitle("Alamat, Jml Fisik, No Label, Status, Ket. Status, No Sertifikat/IMB/PBB/DLL, Luas,Update Deskripsi / Update Lokasi, Keterangan ");
					this.sg2.setColWidth([8,7,6,5,4,3,2,1,0],[250,250,100,150,150,80,120,80,150]);
				}
			}
			if (sender == this.ed_lokfa){
				this.ed_kode.setSQL("select a.no_app, a.kode_lokfa, b.nama from amu_appkkil_m a inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa "+
						" where a.proses = 'T' and a.jenis = '"+this.ed_jenis.getText()+"' and a.kode_lokfa = '"+ sender.getText() +"' ", ["no_app","kode_lokfa","nama"], false, ["no Approve","Area","Bus. Area"], "and","Daftar Transaksi Approval",true);
				this.sg.clear(1);							
				this.sg2.clear(1);	
				this.ed_nik1.clear();
				this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);											
			}			
		}catch(e){
			alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{							
							if (this.fromView) {
								this.app._mainForm.pButton.hide();
								this.formView.show();
								this.free();
								this.formView.refresh();
							}else{
								this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
								this.app._mainForm.bClear.click();
                            }
						}else system.info(this,result,"");
	    			break;
	    			case "getDataProvider":
						eval("result = "+result+";");
						this.dataStatus = new arrayMap();
						for (var i in result.rs.rows){
							this.dataStatus.set(result.rs.rows[i].kode_status, result.rs.rows[i].nama);
						}
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){	        
        }
	},	
	doGridChange: function(sender, col, row,param1,result, data){	
		if (col == 0){
			this.dataKKIL.rs.rows[(this.page - 1) * this.rowPerPage + row].status = sender.cells(0, row);
		}	
    },	
	doTampil: function(sender){		
		try{
			this.dataKKIL = this.dbLib.getDataProvider("select distinct 'INPROG' as status,a.no_inv, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.no_gabung, b.no_fa, b.no_sn, c.nama, c.nama2, date_format(c.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, c.nilai, c.nilai_ap, c.nilai_buku, c.jml_fisik, a.nik_buat, d.nama as nmbuat "+
				" from amu_kkl_m a "+
				" 	inner join amu_kkl_d b on b.no_inv = a.no_inv "+
				" 	inner join amu_asset c on c.no_gabung = b.no_gabung "+
				"	inner join amu_karyawan d on d.nik = a.nik_buat "+
				"where a.jenis = '"+this.ed_jenis.getText()+"' and a.progress in ('0','1') and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' ", true);
			this.rowPerPage = 20;
			this.sgn.setTotalPage(Math.ceil(this.dataKKIL.rs.rows.length / this.rowPerPage));
			this.sgn.rearrange();
			this.doPager(this.sgn,1);
		}catch(e){
			alert(e);
		}
	},
	doPager: function(sender, page){
		this.page = page;
		var start = (page - 1) * this.rowPerPage;
		var finish = (start + this.rowPerPage > this.dataKKIL.rs.rows.length ? this.dataKKIL.rs.rows.length : start + this.rowPerPage);
		var line;
		this.sg.clear();
		for (var i = start; i < finish; i++){
			line =  this.dataKKIL.rs.rows[i];
			this.sg.appendData([line.status, line.catatan, line.no_inv, line.tanggal, line.no_gabung, line.no_fa, line.no_sn, line.nama, line.nama2, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku), floatToNilai(line.jml_fisik), line.nik_buat, line.nmbuat]);
		}
		this.sg.setNoUrut(start);
	},
	doSgClick: function(sender, col, row){
		var data = this.dbLib.getDataProvider("select a.alamat, a.jml_fisik, a.no_label, a.kode_status, b.nama, a.no_sertifikat, a.luas, a.ket_lokasi, a.keterangan from amu_kkl_d a  inner join amu_status b on b.kode_status = a.kode_status and b.jenis = '"+this.ed_jenis.getText()+"' where no_inv = '"+sender.cells(2,row)+"' ",true);
		var line;
		this.sg2.clear();
		for (var i in data.rs.rows){
			line = data.rs.rows[i];
			//Status, Ket. Status, Update Deskripsi / Update Lokasi, Keterangan
			if (this.ed_jenis.getText() == "TB")
				this.sg2.appendData([line.alamat, line.jml_fisik, line.no_label,  line.kode_status, line.nama, line.no_sertifikat, line.luas, line.ket_lokasi, line.keterangan]);
			else  this.sg2.appendData([line.alamat, line.jml_fisik, line.no_label,  line.kode_status, line.nama, line.ket_lokasi, line.keterangan]);
		}
	}
});
