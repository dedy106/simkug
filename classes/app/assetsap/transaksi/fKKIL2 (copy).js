/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fKKIL2 = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fKKIL2.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fKKIL2";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Inventarisasi Non Tanah Bangunan", 0);	
		uses("uploader;saiMemo;util_file;datePicker;uploader;checkBox");								
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,220,20],caption:"No Inventarisasi",readOnly:true});
		this.bGen = new button(this,{bound:[250,2,60,20],caption:"Generate",click:"doClick"});									
		this.ed_jenis = new saiLabelEdit(this,{bound:[20,10,200,20], caption:"Jenis",text:"NTB", readOnly:true});
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Area Bisnis",
			readOnly:true,
			multiSelection: false,
			text:this.app._kodeLokfa,
			rightLabel:this.app._namaLokfa,			
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
			change:[this,"doChange"]		
		});
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Pembuat",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});
		this.ed_klpfa = new saiCBBL(this, {
			bound: [20, 4, 200, 20],
			caption: "Kelompok Aset",
			multiSelection: false,
			change:[this, "doChange"]
			//sql:["select kode_klpfa, nama from amu_klp where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_klpfa","nama"],false, ["Kode Group","Nama"],"and","Data Kelompok Aset(Asset Class)",true]
		});
		this.cbUpl = new checkBox(this, {bound:[450,4,100,18], caption:"Upload"});
		this.uploader = new uploader(this, {bound:[560,4,80,18], param4:"gridupload",param3:"object", autoSubmit:true, afterUpload:[this,"doAfterLoad"], hint:"Pilih file"});
		this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Asset"});
		this.sg = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 15,
			colTitle: ["Id Gabung","No Asset", "SN", "Jenis Asset", "Deskripsi Asset", "Cap Date", "Harga Perolehan", "Akm. Penyusutan", "Nilai Buku", "Alamat Asset", "Jumlah Fisik", "No. Label", "Status", "Update Deskripsi & Lokasi", "Keterangan"],
			colWidth: [[14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [250,250, 100, 80, 80, 250, 80, 100, 80, 80, 150, 80, 50, 150,150]],
			colReadOnly: [true,[1,2,3,4,5,6,7,8],[]],
			change: [this, "doGridChange"],
			rowCount: 1,
			tag: 9,
			buttonStyle:[[0,12],[bsEllips, bsAuto]],
			ellipsClick: [this,"doEllipsClick"],
			colFormat:[[6,7,8,10],[cfNilai, cfNilai, cfNilai]]
		});		
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:0, grid:this.sg});
		this.rearrangeChild(10,23);			
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
		this.doChange(this.ed_lokfa);
				
		this.onClose.set(this,"doClose");
		this.dbLib.setItemsFromSQL("select kode_status from amu_status  ", [this.sg.columns.get(12).pickList]);
	}
};
window.app_assetsap_transaksi_fKKIL2.extend(window.childForm);
window.app_assetsap_transaksi_fKKIL2.implement({
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
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
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
						this.ed_jenis.setText("NTB");
						this.ed_lokfa.setText(this.app._kodeLokfa);
					}
				break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();
						sql.add("insert into amu_kkl_m (no_inv,  kode_lokasi, kode_lokfa, tanggal, nik_user, tgl_input, jenis, periode)values"+
							"('"+this.ed_kode.getText()+"', '"+this.app._lokasi+"','"+this.ed_lokfa.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.app._userLog+"',now(), '"+this.ed_jenis.getText()+"','"+this.app._periode+"' )");
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into amu_kkl_d (no_inv, kode_lokasi, no_gabung,no_fa,no_sn, alamat, jml_fisik, no_label, kode_status, nama, keterangan , no_sertifikat, luas) "+
								" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+ this.sg.cells(1,i)+"','"+ this.sg.cells(2,i)+"','"+ this.sg.cells(9,i)+"', "+
								" '"+ this.sg.cells(10,i)+"','"+ this.sg.cells(11,i)+"','"+this.sg.cells(12,i)+"','"+ this.sg.cells(13,i)+"','"+ this.sg.cells(14,i)+"','-','0' )");
							}
						}						
						this.dbLib.execArraySQL(sql);
					}
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
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
		if (sender == this.ed_lokfa){
			this.sg.clear(1);							
			this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+sender.getText()+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);			
			this.ed_klpfa.setSQL("select a.kode_klpfa, a.nama from amu_klp a "+
				"	inner join amu_lokasi c on c.kode_lokfa = '"+this.ed_lokfa.getText()+"' " +
				" 	inner join amu_lokasi d on d.kode_lokfa = c.kode_induk "+
				" 	inner join amu_lokasi e on e.kode_lokfa = d.kode_induk "+
				"	inner join amu_bagiklp_d b on b.kode_klpfa = a.kode_klpfa and b.kode_lokfa = e.kode_lokfa and b.periode = '"+this.app._periode+"' and b.jenis_proc = 'FISIK' " +
				" where a.kode_lokasi = '"+this.app._lokasi+"'  ", ["a.kode_klpfa","a.nama"],false, ["Kode Group","Nama"],"and","Data Kelompok Aset(Asset Class)",true);
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_kkl_m','no_inv',"INV."+this.app._kodeLokfa+"."+this.dp_tgl.getYear()+".",'000000'));
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.app._mainForm.bClear.click();
                                                      
						}else system.info(this,result,"");
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
		if (col == 1) {
			var data = this.dbLib.getDataProvider("select no_fa, no_sn, jenis, nama, nilai, nilai_ap, nilai_buku, date_format(tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, alamat from amu_asset a where no_gabung = '" + sender.cells(0,row) + "' and kode_lokasi = '" + this.app._lokasi + "' ", true);
			if (typeof data != "string"){
				if (data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.sg.editData(row,[line.no_sn, line.jenis, line.nama, line.tgl_perolehan, parseNilai(line.nilai), parseNilai(line.nilai_ap), parseNilai(line.nilai_buku)],
					[2,3,4,5,6,7,8]);
				}
			}			
		}
		if (col == 8){
			this.sg.setRowIndex(row, 9);
		}
    },
	doEllipsClick:function(sender, col ,row){		
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Asset SAP",this.sg, this.sg.row, this.sg.col, 
								"select a.no_gabung, a.no_fa, a.no_sn, a.nama from amu_asset a "+
								" left outer join amu_kkl_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
								" where a.periode = '"+this.app._periode+"' and b.no_gabung is null and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa = '"+this.ed_klpfa.getText()+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' ",
								"select count(*) from amu_asset a "+
								" left outer join amu_kkl_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
								" where a.periode = '"+this.app._periode+"' and b.no_gabung is null and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_klpfa = '"+this.ed_klpfa.getText()+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' ",
								["a.no_gabung","a.nama"],"and",["ID gabung","No Kartu Asset","No SN","Deskripsi Asset"],false);
					break;				
			}	
	}
});
