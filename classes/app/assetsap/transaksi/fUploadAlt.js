/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fUploadAlt = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fUploadAlt.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fUploadAlt";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Upload Data Asset Inventarisasi Fisik", 0);	
		uses("uploader;saiMemo;util_file;datePicker;uploader;checkBox");				
		this.ed_periode = new saiLabelEdit(this, {
			bound: [20, 0, 200, 20],
			caption: "Periode ",
			change: [this, "doChange"],
			readOnly: true,
			tag: 2
		});
		this.l_tgl = new label(this, {
			bound: [20, 1, 100, 20],
			caption: "Tanggal",
			underline: true
		});
		this.dp_tgl = new datePicker(this, {
			bound: [120, 1, 100, 18],
			selectDate: [this, "doSelectedDate"]
		});
		this.ed_kode = new saiLabelEdit(this, {
			bound: [20, 2, 200, 20],
			caption: "No Upload",
			readOnly: true
		});
		this.bGen = new button(this, {
			bound: [230, 2, 80, 20],
			caption: "Generate",
			click: "doClick"
		});							
		this.ed_ket = new saiMemo(this, {
			bound: [20, 9, 500, 50],
			caption: "Keterangan",
			maxLength: 150
		});
		this.ed_nmFile = new saiLabelEdit(this, {
			bound: [20, 10, 500, 20],
			readOnly: true,
			caption: "Namafile"
		});
		this.ed_upld = new uploader(this, {
			bound: [530, 10, 80, 20],
			afterUpload: [this, "doUploadFinish"],
			//param4: "gridupload",
			param3: "object" ,
			autoSubmit:true,
			funcName: "upload",
			uploadClassName: "server_upload_assetsap_uploadData"
		});		
		this.p1 = new panel(this, {
			bound: [20, 11, 900, 230],
			caption: "Upload Dokumen"
		});
		this.sgUpld = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 15,
			colTitle: ["UBIS", "BA", "Area Bisnis", "Grup", "Jenis", "No Asset", "SN","No Gabung", "Deskripsi Asset", "Alamat Asset", "Cap Date", "Harga Perolehan", "Penyusutan", "Nilai Buku", "Jumlah Fisik SAP"],
			colWidth: [[14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100, 100, 100, 100, 80, 250, 250, 100,80, 100, 80, 80, 150, 80, 80]],
			readOnly: true,
			change: [this, "doGridChange"],
			rowCount: 1,
			tag: 9
		});		
		this.sgn = new sgNavigator(this.p1, {
			bound: [1, this.p1.height - 25, 898, 25],
			buttonStyle: 3,
			grid: this.sgUpld,
			pager:[this,"doPager"]
		});
		this.rearrangeChild(10,23);			
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
		this.ed_periode.setText(this.dp_tgl.getThnBln());
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.fileUtil.getRootDir();			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);			
		this.onClose.set(this,"doClose");
	}
};
window.app_assetsap_transaksi_fUploadAlt.extend(window.childForm);
window.app_assetsap_transaksi_fUploadAlt.implement({
	doClose: function(sender){		
		if (this.uploadedFiles !="" ) this.fileUtil.deleteFiles(this.uploadedFiles);
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
						this.sgUpld.clear(1);
					}
				break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();					
						sql.add("insert into amu_load_m (no_load, tanggal, keterangan, namafile, kode_lokasi, tgl_input, nik_user)"+
							" values('"+this.ed_kode.getText()+"','"+this.dp_tgl.getDateString()+"', '"+this.ed_ket.getText()+"', '"+this.ed_nmFile.getText()+"','"+this.app._lokasi+"', now(),'"+this.app._userLog+"'  )");
						var line;
						for (var i in this.dataUplod.rows ){
							line = this.dataUpload.rows[i];
							sql.add("insert into amu_load_d (no_load, kode_lokasi, no_fa, no_sn, no_gabung, kode_lokfa, kode_ubis, kode_klpfa, kode_jenis, nama, alamat,tgl_perolehan, nilai, nilai_ap, nilai_buku,jml_fisik, periode )"+
								" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+line.no_fa+"', '"+line.no_sn+"', '"+line.no_gabung+"', '"+line.ba+"', '"+line.ubis+"','"+line.group+"','"+line.jenis+"', '"+line.nama+"','"+line.alamat+"','"+line.cap_date+"', '"+line.nilai+"', '"+line.nilai_ap+"', '"+line.nilai_buku+"','"+line.jml_fisik+"','"+this.ed_periode.getText()+"')");
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
       this.ed_periode.setText(sender.getThnBln());
    },
	doFindBtnClick: function(sender){		
	},
	doChange: function(sender){		
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_load_m','no_load',"LD/"+this.ed_periode.getText().substring(2)+"/",'0000'));
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
                            this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);                            
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
    },
	doUploadFinish: function(sender, result, data, filename){
		if (result){
			this.dataUpload= data;
			this.doLoadPage(1);
		}
	},
	doPager: function(sender,page){
		this.doLoadPage(page);
	},
	doLoadPage: function(page){
		var line;
		this.sgUpld.clear();
		var data,start = (page - 1) * 50;
		var finish = start + 50;
		if (finish > this.dataUpload.rows.length) 
			finish = this.dataUpload.rows.length;								
		for (var i = start; i < finish; i++) {
			line = this.dataUpload.rows[i];
			data = [];
			for (var c in line)
				if (c == "nilai" || c == "nilai_ap" || c == "nilai_buku")
					data[data.length] = floatToNilai(line[c]);
				else  
					data[data.length] = line[c];					
			this.sgUpld.appendData(data);
		}	
		this.start = start;
	}
});
