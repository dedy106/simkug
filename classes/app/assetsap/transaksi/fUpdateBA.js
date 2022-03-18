/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fUpdateBA = function(owner, ba, klpfa, fa, formView) {
	if (owner){
		try{
			window.app_assetsap_transaksi_fUpdateBA.prototype.parent.constructor.call(this,owner);
			this.maximize();
			this.className  = "app_assetsap_transaksi_fUpdateBA";		
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Perubahan Lokasi Inventarisasi ", 0);	
			uses("saiMemo;util_file;datePicker;checkBox");								
			this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
			this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});		
			this.ed_lokfa = new saiCBBL(this, {
				bound: [20, 30, 150, 20],
				caption: "Bus. Area SAP",
				multiSelection: false,
				text:this.app._kodeLokfa,
				rightLabel:this.app._namaLokfa,						
				sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Bisnis Area",true],
				change:[this,"doChange"],
				tag:9
			});						
			this.ed_kode = new saiLabelEdit(this,{bound:[20,2,220,20],caption:"No Perubahan",readOnly:true});
			this.bGen = new button(this,{bound:[250,2,60,20],caption:"Generate",click:"doClick"});						
			this.ed_lokfa2 = new saiCBBL(this, {
				bound: [20, 31, 150, 20],
				caption: "Bus. Area Tujuan",
				multiSelection: false,
				text:this.app._kodeLokfa,
				rightLabel:this.app._namaLokfa,						
				sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Bisnis Area",true],
				change:[this,"doChange"],
				tag:9
			});
			this.ed_plant2 = new saiCBBL(this, {
				bound: [20, 32, 150, 20],
				caption: "Plant",
				multiSelection: false,				
				sql:["select kode_regional, nama from amu_regional ", ["kode_regional","nama"],false, ["Kode","Nama"],"and","Data Plant",true],
				change:[this,"doChange"],
				tag:9
			});
			this.ed_location2 = new saiCBBL(this, {
				bound: [20, 33, 150, 20],
				caption: "Location",
				multiSelection: false,				
				sql:["select kode_loksto, nama from amu_loksto where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_loksto","nama"],false, ["Kode","Nama"],"and","Data Location/Area",true],
				change:[this,"doChange"],
				tag:9
			});
			this.ed_nik1 = new saiCBBL(this, {
				bound: [20, 3, 220, 20],
				caption: "Pembuat",
				multiSelection: false,
				text: this.app._userLog,
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true],
				tag:9
			});
			this.ed_nik2 = new saiCBBL(this, {
				bound: [20, 1, 220, 20],
				caption: "Approval",
				multiSelection: false,			
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true],
				tag:9
			});		
			this.ed_nofa = new saiCBBL(this, {
				bound: [20, 5, 220, 20],
				caption: "NKA + SN",
				multiSelection: false,
				rightLabelVisible:false,
				change:[this, "doChange"]			
			});				
			this.ed_ket = new saiLabelEdit(this, {bound:[20,6,400,20], caption:"Catatan"});					
			//aset info
			this.pinfo = new panel(this, {bound:[20, 10, 570, 200], caption:"Data SAP AM"});
			this.ed_nka = new saiLabelEdit(this.pinfo,{bound:[10,0,500,20], caption:"NKA", readOnly:true});
			this.ed_nama = new saiLabelEdit(this.pinfo,{bound:[10,1,500,20], caption:"Deskripsi", readOnly:true});
			this.ed_sn = new saiLabelEdit(this.pinfo,{bound:[10,2,200,20], caption:"SN Aset", readOnly:true});
			this.ed_tgl = new saiLabelEdit(this.pinfo,{bound:[310,2,200,20], caption:"Cap. Date", readOnly:true});
			this.ed_n1 = new saiLabelEdit(this.pinfo,{bound:[10,3,200,20], caption:"Harga Perolehan", readOnly:true, tipeText:ttNilai});
			this.ed_n2 = new saiLabelEdit(this.pinfo,{bound:[310,3,200,20], caption:"Akum. Penyusutan", readOnly:true, tipeText:ttNilai});
			this.ed_n3 = new saiLabelEdit(this.pinfo,{bound:[10,4,200,20], caption:"Nilai Buku", readOnly:true, tipeText:ttNilai});
			this.ed_jml = new saiLabelEdit(this.pinfo,{bound:[310,4,200,20], caption:"Quantity SAP", readOnly:true, tipeText:ttNilai});
			this.ed_alm = new saiLabelEdit(this.pinfo,{bound:[10,5,500,20], caption:"Alamat", readOnly:true});
			this.ed_location = new saiLabelEdit(this.pinfo,{bound:[10,6,200,20], caption:"Location", readOnly:true});
			this.ed_Plant = new saiLabelEdit(this.pinfo,{bound:[310,6,200,20], caption:"Plant", readOnly:true});
			this.rearrangeChild(10,23);			
			
			this.pinfo.rearrangeChild(30,23);
			this.setTabChildIndex();
			this.dbLib = this.app.dbLib;
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			setTipeButton(tbSimpan);
						
			this.onClose.set(this,"doClose");		
			this.doChange(this.ed_lokfa);			
			this.fromView = false;
			this.ed_nik1.setText(this.app._userLog);
			if (fa){
				this.ed_lokfa.setText(ba);				
				this.ed_nofa.setText(fa);
				this.fromView = true;
				this.formView = formView;
			}		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_assetsap_transaksi_fUpdateBA.extend(window.childForm);
window.app_assetsap_transaksi_fUpdateBA.implement({
	doClose: function(sender){			
		this.dbLib.delListener(this);	
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
		if (sender == this.app._mainForm.bBack){
			if (this.fromView){
				this.app._mainForm.pButton.hide();
				this.formView.show();
				this.free();
				this.formView.refresh();		
			}else{
				this.app._mainForm.bTutup.click();
			}
		}
	},
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);														
						this.ed_nik1.setText(this.app._userLog);
					}
				break;
				case "simpan" :
					if (this.ed_nik1.getText() == "-") { system.alert(this, "NIK tidak valid","Proses dibatalkan."); return;}					
					if (this.ed_nofa.getText() == "-") { system.alert(this, "NKA tidak valid","Proses dibatalkan."); return;}
					if (this.ed_lokfa2.getText() == "-") { system.alert(this, "Lokasi Tujuan tidak valid","Proses dibatalkan."); return;}
					this.doClick();					
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){						
						sql.add("insert into amu_updba (no_upd,  kode_lokasi, kode_lokfa, kode_lokfa2, kode_loksto, kode_regional, tanggal, keterangan, nik_user, tgl_input, nik_buat, nik_app)values"+
							"('"+this.ed_kode.getText()+"', '"+this.app._lokasi+"','"+this.ed_lokfa.getText()+"','"+this.ed_lokfa2.getText()+"','"+this.ed_location2.getText()+"', '"+this.ed_plan2.getText()+"', "+
							" '"+this.dp_tgl.getDateString()+"','"+this.ed_ket.getText()+"','"+this.app._userLog+"',now(), '"+this.ed_nik1.getText()+"','"+this.ed_nik2.getText()+"' )");							
						sql.add("update amu_asset set kode_lokfa = '"+this.ed_lokfa2.getText()+"', ref1='"+this.ed_location2.getText()+"', ref2='"+this.ed_plan2.getText()+"' where periode = '"+this.app._periode+"' and no_gabung = '"+this.ed_nofa.getText()+"' ");
						this.dbLib.execArraySQL(sql, undefined, this);				
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
		var diva = this.ed_lokfa.getText().substr(0,2) == "TD" || this.ed_lokfa.getText().substr(0,2) == "TC";
		try{
			if (sender == this.ed_lokfa){
				this.doClick(this.bGen);				
				this.ed_nik1.clear();				
				this.ed_nik1.clear();				
				this.ed_nofa.clear();
				this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);							
				this.ed_nofa.setSQL("select a.no_gabung, a.no_fa, a.no_sn, a.nama from amu_asset a "+					
					" where a.periode = '"+this.app._periode+"' and a.kode_lokasi = '"+this.app._lokasi+"'  "+
					" and (a.kode_lokfa = '"+this.ed_lokfa.getText()+"' or a.ref1 = '"+( diva ? this.ed_lokfa.getText() :"" )+"' ) ", ["a.no_gabung","a.no_fa","a.no_sn","a.nama"],false, ["No Gabung","NKA","SN","Deskripsi"],"and","Data SAP AM",true);				
			}	
			if (sender == this.ed_klpfa){
				this.ed_nofa.clear();				
			}	
			if (sender == this.ed_nofa){				
				var data = this.dbLib.getDataProvider("select a.no_fa, a.no_sn, a.jenis, a.nama, a.nilai, a.nilai_ap, a.nilai_buku, a.jml_fisik, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.nama2, ifnull(b.bun,'-') as bun, a.ref2, a.ref1, a.kode_lokfa2, ifnull(a.kode_loksto, a.ref2) as loksto, ifnull(a.kode_regional, a.ref1) as regional "+
					" 	from amu_asset a "+
					"	left outer join xsapqtybun b on b.no_gabung = a.no_gabung "+
					" where a.no_gabung = '" + this.ed_nofa.getText() + "' and a.kode_lokasi = '" + this.app._lokasi + "' and a.periode =  '"+this.app._periode+"' ", true);
				if (typeof data != "string"){
					if (data.rs.rows[0] != undefined){						
						var line = data.rs.rows[0];
						this.ed_nka.setText(line.no_fa);
						this.ed_nama.setText(line.nama);
						this.ed_sn.setText(line.no_sn);
						this.ed_tgl.setText(line.tgl_perolehan);
						this.ed_alm.setText(line.nama2);
						this.ed_jml.setText(line.jml_fisik);
						this.ed_n1.setText(floatToNilai(line.nilai));
						this.ed_n2.setText(floatToNilai(line.nilai_ap));
						this.ed_n3.setText(floatToNilai(line.nilai_buku));						
						this.ed_jml.setCaption("Quantity SAP(" +line.bun+")");
						this.ed_location2.setText(line.loksto);
						this.ed_plant2.setText(line.regional);
					}
				}
			}
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_updba','no_upd',"UPD."+this.ed_lokfa.getText()+"."+this.dp_tgl.getYear()+".",'00000'));
	},
	doRequestReady: function(sender, methodName, result, callbackObj){		
		if (sender == this.dbLib && this == callbackObj)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{			
							if (this.filename){
								var file = this.filename.split(";");
								this.saveFiles = this.rootDir+"/"+this.upl_1.param2 + file[1];
								this.dest = this.rootDir+"/server/media/amu/" + file[0];
								this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);					  				
							}
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
						if (this.cekStatus != 1){
							eval("result = "+result+";");
							this.dataStatus = new arrayMap();
							for (var i in result.rs.rows){
								this.dataStatus.set(result.rs.rows[i].kode_status, result.rs.rows[i].nama);
							}							
						}else {
							result = JSON.parse(result);
							this.dataFA = new arrayMap();
							var line;
							for (var i in result.rs.rows){
								line = result.rs.rows[i];
								this.dataFA.set(line.no_gabung, line);
							}
						}
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}        
	},	
	doGridChange: function(sender, col, row,param1,result, data){			
    },	
	tampilGrid: function(result){					
	},	
	doDownload: function(sender){
	
	},
	doAfterPaste: function(sender){		
		
	}
});

