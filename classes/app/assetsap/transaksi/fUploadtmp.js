/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fUpload = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fUpload.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fUpload";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Upload Data Asset Inventarisasi Fisik", 0);	
		uses("uploader;saiMemo;util_file;datePicker;uploader;checkBox;app_assetsap_transaksi_fSvrUpload");
		this.ed_Periode = new saiLabelEdit(this, {
			bound: [20, 0, 200, 20],
			caption: "Periode",
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
			param3: "object",		
			param2 :"server/tmp/",		
			param1 : "uploadTo",
			autoSubmit:true
			//funcName: "upload",
			//uploadClassName: "server_upload_assetsap_uploadData"
		});		
		this.p1 = new panel(this, {
			bound: [20, 11, 900, 230],
			caption: "Upload Dokumen"
		});
		this.sgUpld = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 14,
			colTitle: "No Gabung, NKA, SN, Deskripsi, Deskrips2, Akun Aset, Klp. Aset, BA, Plant, Lokasi, Tgl Perolehan, Nilai Perolehan, Nilai Akumulasi, Nilai Buku ",
			colWidth: [[13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [100, 100, 100, 80, 80, 80, 50, 80, 80, 150, 150, 50, 100, 100]],
			readOnly: true,
			change: [this, "doGridChange"],
			rowCount: 1,
			colFormat: [[13,12,11],[cfNilai, cfNilai, cfNilai]],
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
		this.ed_Periode.setText(this.dp_tgl.getThnBln());
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.svrUpload = new app_assetsap_transaksi_fSvrUpload();
		this.svrUpload.addListener(this);
		this.rootDir = this.fileUtil.getRootDir();			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);			
		this.onClose.set(this,"doClose");
	}
};
window.app_assetsap_transaksi_fUpload.extend(window.childForm);
window.app_assetsap_transaksi_fUpload.implement({
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
						this.sgUpld.clear(1);
					}
				break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();					
						sql.add("insert into amu_load_m (no_load, tanggal, keterangan, namafile, kode_lokasi, tgl_input, nik_user, periode)"+
							" values('"+this.ed_kode.getText()+"','"+this.dp_tgl.getDateString()+"', '"+this.ed_ket.getText()+"', '"+this.ed_nmFile.getText()+"','"+this.app._lokasi+"', now(),'"+this.app._userLog+"','"+this.app._periode+"'  )");
						var line;
						for (var i in this.dataUpload.rows ){
							line = this.dataUpload.rows[i];
							//No Gabung, NKA, SN, Deskripsi, Deskrips2, Akun Aset, Klp. Aset, Nama Klp, BA, Plant, Lokasi, Tgl Perolehan, Nilai Perolehan, Nilai Akumulasi, Nilai Buku
							data = ["'"+this.ed_kode.getText()+"'","'"+this.app._lokasi+"'",line["Asset"]+line["SNo."]];
							for (var c in line){
								if (c != "CoCd" && trim(c) != "Asset Class"){
									if (c == "nilai" || c == "nilai_ap" || c == "nilai_buku" || trim(c) == "Acquis.val." || trim(c) == "Accum.dep." || trim(c) == "Book val."){												
										data[data.length] = parseFloat(line[c]);
									}else  
										data[data.length] = "'"+(line[c] == "" ? "-" : line[c])+"'";					
								}				
							}
							sql.add("insert into amu_load_d (no_load, kode_lokasi, no_gabung,no_fa, no_sn,  nama, nama2,kode_klpakun, kode_klpfa, kode_lokfa, ref2, ref3,  tgl_perolehan, nilai, nilai_ap, nilai_buku,jml_fisik )values("+ data+")");
							//	" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+line.no_fa+"', '"+line.no_sn+"', '"+line.no_gabung+"', '"+line.ba+"', '"+line.ubis+"','"+line.group+"','"+line.jenis+"', '"+line.nama+"','"+line.alamat+"','"+line.cap_date+"', '"+line.nilai+"', '"+line.nilai_ap+"', '"+line.nilai_buku+"','1')");
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
       this.ed_Periode.setText(sender.getThnBln());
    },
	doFindBtnClick: function(sender){		
	},
	doChange: function(sender){		
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_load_m','no_load',"LD/"+this.ed_Periode.getText().substring(2)+"/",'0000'));
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
							system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")","");
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
        if (sender == this.svrUpload){
			if (methodName == "upload"){
				alert(result);
			}
		}
	},	
	doGridChange: function(sender, col, row,param1,result, data){	    
    },
	doUploadFinish: function(sender, result, data, filename){
		if (result){			
			/*this.dataUpload= data;			
			this.sgn.setTotalPage(Math.ceil(data.rows.length / 50));
			this.sgn.rearrange();
			this.doLoadPage(1);*/
			this.svrUpload.upload(filename, sender.param2+data.tmpfile);
			this.ed_nmFile.setText(filename);
		}else system.alert(this,"Error upload","");
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
		var first = true;
		for (var i = start; i < finish; i++) {
			line = this.dataUpload.rows[i];
			data = [line["Asset"] + line["SNo."]];			
			for (var c in line){	
				if (c != "CoCd" && trim(c) != "Asset Class"){		
					if (c == "nilai" || c == "nilai_ap" || c == "nilai_buku" || trim(c) == "Acquis.val." || trim(c) == "Accum.dep." || trim(c) == "Book val."){												
						data[data.length] = floatToNilai(parseFloat(line[c]));
					}else  
						data[data.length] = line[c] == "" ? "-" : line[c];					
				}				
			}
			this.sgUpld.appendData(data);			
		}			
		this.start = start;
		this.sgUpld.setNoUrut(start);
	}
});
