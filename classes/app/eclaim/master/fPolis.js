window.app_eclaim_master_fPolis = function(owner) {
	if (owner){
		window.app_eclaim_master_fPolis.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim_master_fPolis";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Polis", 0);	
		uses("portalui_saiMemo;portalui_saiEdit;portalui_uploader;portalui_datePicker;portalui_checkBox;util_file");
		this.cb_ttg = new portalui_saiCBBL(this,{bound:[20,4,200,20], caption:"Tertanggung", btnClick:[this,"doFindBtnClick"],tag:1});		
		//this.ed_periode = new portalui_saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode"});
		this.ed_polis = new portalui_saiCBBL(this,{bound:[20,1,300,20], caption:"No Polis", btnClick:[this,"doFindBtnClick"],change:[this,"doChange"], tag:1});		
		this.cb_png = new portalui_saiCBBL(this,{bound:[20,5,200,20], caption:"Penanggung", btnClick:[this,"doFindBtnClick"],tag:1});		
		this.cb_ja = new portalui_saiCBBL(this,{bound:[20,6,200,20], caption:"Jenis Asuransi", btnClick:[this,"doFindBtnClick"],tag:1});		
		//this.cb_acc = new portalui_saiCBBL(this,{bound:[20,7,300,20], caption:"Acc", btnClick:[this,"doFindBtnClick"], tag:1});		
		this.l_tgl = new portalui_label(this,{bound:[20,2,100,20],caption:"Tanggal Polis",underline:true});
		this.dp_tgl = new portalui_datePicker(this,{bound:[120,2,100,18], selectDate:[this,"doSelectedDate"]});		
		this.l_tglAwal = new portalui_label(this,{bound:[20,9,100,20],caption:"Periode Awal",underline:true});
		this.dp_tglAwal = new portalui_datePicker(this,{bound:[120,9,100,18]});		
		this.l_tglAkhir = new portalui_label(this,{bound:[20,10,100,20],caption:"Periode Akhir",underline:true});
		this.dp_tglAkhir = new portalui_datePicker(this,{bound:[120,10,100,18]});		
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,11,200,20], caption:"Currency - Kurs ", btnClick:[this,"doFindBtnClick"], tag:1});		
		this.ed_kurs = new portalui_saiEdit(this,{bound:[230,11,80,20],tipeText:ttNilai, text:"",tag:1});
		this.ed_nilai = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"Nilai Pertanggungan",tag:1, tipeText:ttNilai});
		this.ed_premi = new portalui_saiLabelEdit(this,{bound:[20,13,200,20],caption:"Nilai Premi",tag:1, tipeText:ttNilai});
		this.ed_obyek = new portalui_saiMemo(this,{bound:[20,8,500,50],caption:"Obyek Pertanggungan", tag:1}); 
		this.ed_ket = new portalui_saiMemo(this,{bound:[20,13,500,50],caption:"Keterangan", tag:1});
		this.ed_file = new portalui_saiLabelEdit(this,{bound:[20,3,300,20],caption:"File Dokumen", readOnly:true, tag:1});
		this.up_file = new portalui_uploader(this,{bound:[330,3,80,20],param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true,afterUpload:[this,"doAfterLoad"], tag:1});
		this.cb_aktif = new portalui_checkBox(this,{bound:[20,14,100,20],caption:"Status Aktif",selected:true});
		
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
		this.cb_ttg.setText(this.app._kodeTtg,this.app._namaTtg);
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.fileUtil.getRootDir();			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);	
		this.fileUtil.cleanUp(this.rootDir + "/server/media/tmp");
		
		this.onClose.set(this, "doClose");
		
	}
};
window.app_eclaim_master_fPolis.extend(window.portalui_childForm);
window.app_eclaim_master_fPolis.implement({
	doClose: function(sender){		
		if (this.dataUpload !== undefined) this.fileUtil.deleteFiles(this.dataUpload.temporary);		
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
			if(event == "clear"){
				this.standarLib.clearByTag(this,["0","1"]);
				this.cb_ttg.setText(this.app._kodeTtg,this.app._namaTtg);
				return;
			}
			var status =  this.cb_aktif.isSelected() ? "1":"0";
			var sql = new server_util_arrayList();
			switch(event){
				case "simpan" :
					sql.add("insert into eclaim_polis (no_polis, tanggal, kode_png, kode_asuransi, kode_ttg, obyek, nilai, periode_awal, periode_akhir, status, kode_kurs, kurs, keterangan, file_dok, kode_lokasi, premi, tgl_input, nik_user)values"+
						"('"+this.ed_polis.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.cb_png.getText()+"','"+this.cb_ja.getText()+"', "+
						" '"+this.cb_ttg.getText()+"','"+this.ed_obyek.getText()+"','"+parseNilai(this.ed_nilai.getText())+"','"+this.dp_tglAwal.getDateString()+"', "+
						" '"+this.dp_tglAkhir.getDateString()+"','"+status+"','"+this.cb_curr.getText()+"','"+parseNilai(this.ed_kurs.getText())+"','"+this.ed_ket.getText()+"','"+this.ed_file.getText()+"','"+this.app._lokasi+"','"+parseNilai(this.ed_premi.getText())+"',now(),'"+this.app._userLog+"') ");
				break;
				case "ubah" :
					sql.add("update eclaim_polis set kode_png = '"+this.cb_png.getText()+"',"+
						"	kode_asuransi = '"+this.cb_ja.getText()+"', kode_ttg = '"+this.cb_ttg.getText()+"', "+
						"	obyek = '"+this.ed_obyek.getText()+"', nilai = '"+parseNilai(this.ed_nilai.getText())+"', "+
						"	tanggal = '"+this.dp_tgl.getDateString()+"',periode_awal = '"+this.dp_tglAwal.getDateString()+"',periode_akhir = '"+this.dp_tglAkhir.getDateString()+"', "+
						"	status = '"+status+"',  kode_kurs = '"+this.cb_curr.getText()+"', kurs = '"+parseNilai(this.ed_kurs.getText())+"', "+						
						"	keterangan = '"+this.ed_ket.getText()+"', file_dok = '"+this.ed_file.getText()+"', kode_lokasi = '"+this.app._lokasi +"', "+
						"	premi = "+parseNilai(this.ed_premi.getText())+" "+
						" where kode_lokasi = '"+this.app._lokasi+"' and no_polis ='"+this.ed_polis.getText()+"'  ");
				break;
				case "hapus" :
					sql.add("delete from eclaim_polis where kode_lokasi = '"+this.app._lokasi+"' and no_polis ='"+this.ed_polis.getText()+"'  ");
				break;
			}
			this.dbLib.execArraySQL(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doFindBtnClick: function(sender){
		switch(sender){
			case this.cb_ja : this.standarLib.showListData(this, "Data Jenis Asuransi",sender,undefined, 
											  "select a.kode_asuransi, a.nama  from eclaim_asuransi a "+
											  " inner join eclaim_asuransi_ttg b on b.kode_asuransi = a.kode_asuransi and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg = '"+this.app._kodeTtg+"'",
											  "select count(a.kode_asuransi) from eclaim_asuransi a "+
											  " inner join eclaim_asuransi_ttg b on b.kode_asuransi = a.kode_asuransi and b.kode_lokasi = a.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg = '"+this.app._kodeTtg+"'",		  
											  ["kode_asuransi","nama"],"and",["No Asuransi","Keterangan"],false); 
								break;
			case this.ed_polis :this.standarLib.showListData(this, "Data Polis",sender,undefined, 
											  "select no_polis,keterangan from eclaim_polis where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
											  "select count(no_polis) from eclaim_polis where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",											  
											  ["no_polis","keterangan"],"and",["No Polis","Keterangan"],false); 
								break;
			
			case this.cb_curr : this.standarLib.showListData(this, "Data Currency",sender,undefined, 
											  "select kode_curr,nama from curr ",
											  "select count(*) from curr ",  
											  ["kode_curr","nama"],"and",["Kode Curr","nama"],false); 
								break;
			case this.cb_ttg : this.standarLib.showListData(this, "Data Tertanggung",sender,undefined, 
											  "select kode_ttg, nama from eclaim_ttg where kode_lokasi = '"+this.app._lokasi+"'",
											  "select count(*) from eclaim_ttg where kode_lokasi = '"+this.app._lokasi+"'",											  
											  ["kode_ttg","nama"],"and",["Kode Tertanggung","Nama"],false); 
								break;
			case this.cb_png : this.standarLib.showListData(this, "Data Penangggung",sender,undefined, 
											  "select kode_png, nama from eclaim_png where kode_lokasi = '"+this.app._lokasi+"'",
											  "select count(*) from eclaim_png where kode_lokasi = '"+this.app._lokasi+"'",											  
											  ["kode_png","nama"],"and",["Kode Penanggung","Nama"],false); 
								break;
			case this.acc : this.standarLib.showListData(this, "Data Karyawan",sender,undefined, 
											  "select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",
											  "select count(*) from karyawan where kode_lokasi = '"+this.app._lokasi+"'",											  
											  ["nik","nama"],"and",["NIK","Nama"],false); 
								break;
		}
		
	},
	doChange: function(sender){		
			
		//this.standarLib.clearByTag(this,[1]);
		if (sender.getText() != ""){	
			var data = this.dbLib.getDataProvider("select * from eclaim_polis where kode_lokasi = '"+this.app._lokasi+"' and no_polis = '"+sender.getText()+"' ",true);
			if ((typeof (data) != "string") && data.rs.rows[0] !== undefined){				
				line = data.rs.rows[0];
				this.ed_file.setText(line.file_dok);
				this.cb_ttg.setText(line.kode_ttg);
				this.cb_png.setText(line.kode_png);
				this.cb_ja.setText(line.kode_asuransi);
				this.ed_obyek.setText(line.obyek);
				this.ed_ket.setText(line.keterangan);
				this.dp_tgl.setText(line.tanggal)
				this.dp_tglAwal.setText(line.periode_awal);
				this.dp_tglAkhir.setText(line.periode_akhir);
				this.cb_aktif.setSelected(line.status == "1" ? true:false);
				this.ed_nilai.setText(floatToNilai(line.nilai));
				this.ed_premi.setText(floatToNilai(line.premi));
				this.ed_kurs.setText(line.kurs);
				this.cb_curr.setText(line.kode_kurs);
				this.fileBfr = line.file_dok;
				setTipeButton(tbUbahHapus);
			}else setTipeButton(tbSimpan);
		}else setTipeButton(tbSimpan);
	},
	doClick: function(sender){
		this.ed_polis.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'eclaim_polis','no_polis',this.app._lokasi+"-JA.",'000'));
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			if ((methodName == "execArraySQL") && (result.search("error") == -1)){
				if (this.fileBfr !== undefined && this.fileBfr != this.ed_file.getText()){
					this.fileUtil.deleteFiles(this.rootDir+"/"+this.up_file.param4 +this.fileBfr);
				}
				this.app._mainForm.pesan(2,"transfer file.............");
				if (this.ed_file.getText() != "-" && this.dataUpload !== undefined)
					this.fileUtil.copyFileTo(this.rootDir+"/"+this.up_file.param2 +this.dataUpload.tmpfile,this.rootDir+"/"+this.up_file.param4 +this.dataUpload.filedest);
				else {
					this.app._mainForm.pesan(2,"Proses Lengkap (Polis : "+ this.ed_polis.getText()+" tersimpan.)");
					this.app._mainForm.bClear.click();
				}
			}else{
				systemAPI.alert(result);
			}
		}
		if (sender == this.fileUtil){
			if ( (methodName == "copyFileTo")){
				if (typeof result == "boolean" && result){
					this.app._mainForm.pesan(2,"Proses Lengkap (Polis : "+ this.ed_polis.getText()+" tersimpan.)");
					this.app._mainForm.bClear.click();
				}else systemAPI.alert(result);
			}
		}
	},
	doAfterLoad: function(sender, result, data, filename){
		if (result) this.ed_file.setText(data.filedest);
		this.dataUpload = data;
		if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
		else this.dataUpload.temporary = "";
		this.dataUpload.temporary += this.rootDir+"/"+this.up_file.param2 +this.dataUpload.tmpfile;
	},
	doSelectedDate: function(sender, y, m, d){
		this.ed_periode.setText(y+(m < 10 ? "0":"")+m);
	}
});