window.app_eclaim_transaksi_fBayarK = function(owner) {
	if (owner){
		window.app_eclaim_transaksi_fBayarK.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim_transaksi_fBayarK";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pembayaran:Koreksi", 0);	
		uses("portalui_uploader;portalui_saiMemo;util_file;portalui_datePicker");
		uses("portalui_uploader",true);
		this.ed_periode = new portalui_saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new portalui_datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new portalui_saiCBBL(this,{bound:[20,2,220,20],caption:"No Bayar",readOnly:true, rightLabelVisible:false, change:[this,"doChange"], btnClick:[this,"doFindBtnClick"]});		
		this.cb_klaim = new portalui_saiCBBL(this,{bound:[20,3,220,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"]});
		this.cb_adjust = new portalui_saiCBBL(this,{bound:[20,4,220,20],caption:"No Adjust", btnClick:[this,"doFindBtnClick"]});		
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[20,6,350,20],caption:"No Dokumen", maxLength:45});				
		this.ed_nilai = new portalui_saiLabelEdit(this,{bound:[20,8,200,20],caption:"Nilai",tipeText:ttNilai});
		this.ed_ket = new portalui_saiMemo(this,{bound:[20,9,600,50],caption:"Keterangan", maxLength:150});					
		this.p1 = new portalui_panel(this,{bound:[20,10,600,230],caption:"Upload Dokumen (Max 2 Mb)"});
		this.sgUpld = new portalui_saiGrid(this.p1,{bound:[1,20,598,180],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					colWidth:[[1,0],[80,480]], readOnly:true, change:[this,"doGridChange"],tag:9});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height - 25,598,25],buttonStyle:1, grid:this.sgUpld});
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
		this.fileBfr = new portalui_arrayMap();	
		this.onClose.set(this,"doClose");
	}
};
window.app_eclaim_transaksi_fBayarK.extend(window.portalui_childForm);
window.app_eclaim_transaksi_fBayarK.implement({
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
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.eKontrak);		
						this.sgUpld.clear(1);
					}
				break;
				case "ubah" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.saveFiles = "", this.dest = "", first = true;
						var files = [];
						for (var i=0; i < this.sgUpld.getRowCount();i++){
							if (this.sgUpld.cells(0,i) != ""){ 
								if (this.fileBfr.get(this.sgUpld.cells(0,i)) === undefined){
								   if (!first) { 
										this.saveFiles += ";";
										this.dest += ";";
									}                               
									this.saveFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(1,i).tmpfile;
									this.dest += this.rootDir+"/server/media/" + this.sgUpld.cells(1,i).filedest;
									first = false;
								}
								files.push(this.sgUpld.cells(0,i));
							}
						}
						sql.add("delete from eclaim_bayar where kode_ttg = '"+this.app._kodeTtg+"' and no_bayar= '"+this.ed_kode.getText()+"'");
						sql.add("delete from eclaim_bayar_dok where kode_ttg = '"+this.app._kodeTtg+"' and no_bayar= '"+this.ed_kode.getText()+"'");
						var param = this.sgUpld.columns.get(1).param2.split("tmp/");
						sql.add("insert into eclaim_bayar (no_bayar, no_adjust, no_klaim, periode, tanggal, no_dokumen,nilai,keterangan, kode_lokasi, tgl_input, nik_user,kode_ttg)values"+
							"('"+this.ed_kode.getText()+"','"+this.cb_adjust.getText()+"','"+this.cb_klaim.getText()+"','"+this.ed_periode.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_dok.getText()+"',"+
							parseNilai(this.ed_nilai.getText())+",'"+this.ed_ket.getText()+"','"+this.app._lokasi+"',now(),'"+this.app._userLog+"','"+this.app._kodeTtg+"') ");
						sql.add("update eclaim_klaim set progress = '5',status='1' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_ttg ='"+this.app._kodeTtg+"' ");
						if (files.length > 0){
							var scan = "insert into eclaim_bayar_dok (no_bayar,kode_lokasi,no_file,nama,nu,kode_ttg) values ";						
							var first = true;
							var noUrut=1;
							for (var i in files){
								if (!first) scan +=",";
								scan += "('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+files[i]+"','"+files[i]+"',"+noUrut+",'"+this.app._kodeTtg+"')";
								first = false;
								noUrut++;
							}
							sql.add(scan);
						}
						this.uplFile = 0;
						this.dbLib.execArraySQL(sql);
					}
				break;				
				case "hapus" :
					sql.add("delete from eclaim_bayar where kode_ttg = '"+this.app._kodeTtg+"' and no_bayar= '"+this.ed_kode.getText()+"'");
					sql.add("delete from eclaim_bayar_dok where kode_ttg = '"+this.app._kodeTtg+"' and no_bayar= '"+this.ed_kode.getText()+"'");
					sql.add("update eclaim_klaim set progress = '4',status='0' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_ttg ='"+this.app._kodeTtg+"' ");
					this.dbLib.execArraySQL(sql);
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
		if (sender == this.cb_adjust){
			this.standarLib.showListData(this, "Data Adjustment",sender,undefined, 
										  "select no_adjust, keterangan from eclaim_adjust where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+this.cb_klaim.getText()+"' and nik_user = '"+this.app._userLog+"' ",
										  "select count(no_adjust) from eclaim_adjust where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+this.cb_klaim.getText()+"' and nik_user = '"+this.app._userLog+"' ",
										  ["no_adjust","keterangan"],"and",["No Adjust","Keterangan"],false); 
		}
		if (sender == this.cb_klaim){
			this.standarLib.showListData(this, "Data Klaim",sender,undefined, 
										  "select no_klaim, penyebab from eclaim_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress='1' ",
										  "select count(no_klaim) from eclaim_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress='1' ",
										  ["no_klaim","penyebab"],"and",["No Klaim","Keterangan"],false); 
		}
		if (sender == this.ed_kode){
			this.standarLib.showListData(this, "Data Pembayaran",sender,undefined, 
										   "select a.no_bayar, a.keterangan from eclaim_bayar a "+
										  " inner join eclaim_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
										  " where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg='"+this.app._kodeTtg+"' and a.nik_user = '"+this.app._userLog+"'  ",
										  "select count(a.no_bayar) from eclaim_bayar a "+
										  " inner join eclaim_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
										  " where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg='"+this.app._kodeTtg+"' and a.nik_user = '"+this.app._userLog+"' ",
										  ["a.no_bayar","a.keterangan"],"and",["No Pembayaran","Keterangan"],false); 
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.ed_kode){
				if (sender.getText() != ""){	
					this.sgUpld.clear();
					var sql = new server_util_arrayList();
					sql.add("select a.*, b.penyebab, c.keterangan as ket_adjust from eclaim_bayar a "+
						" inner join eclaim_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
						" inner join eclaim_adjust c on c.no_adjust = a.no_adjust and c.kode_lokasi = a.kode_lokasi "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bayar = '"+sender.getText()+"' ");
					sql.add("select nama, nu from eclaim_bayar_dok where kode_lokasi =  '"+this.app._lokasi+"' and no_bayar = '"+sender.getText()+"' order by nu");
					var data = this.dbLib.getMultiDataProvider(sql,true);					
					if (typeof data != "string" && data.result[0].rs.rows[0] !== undefined){
						var detail = data.result[1];
						data = data.result[0].rs.rows[0];	
						this.ed_periode.setText(data.periode);
						this.dp_tgl.setText(data.tanggal)
						this.cb_klaim.setText(data.no_klaim,data.penyebab);
						this.cb_adjust.setText(data.no_adjust, data.ket_adjust);
						this.ed_ket.setText(data.keterangan);
						this.ed_dok.setText(data.no_dokumen);
						this.ed_nilai.setText(floatToNilai(data.nilai));										
						var line;
						this.fileBfr = new portalui_arrayMap();
						for (var i in detail.rs.rows){
							line = detail.rs.rows[i];
							this.sgUpld.appendData([line.nama, {filedest:line.nama, filename:line.nama}]);
							this.fileBfr.set(line.nama, line.nama);
						}
						setTipeButton(tbUbahHapus);
						return;
					}else setTipeButton(tbAllFalse);
				}else setTipeButton(tbAllFalse);				
				this.sgUpld.clear(1);
			}
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'eclaim_bayar','no_bayar',"BYR/"+this.ed_periode.getText().substring(2)+"/",'0000'));
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
							var delFile = "", first = true, ketemu = true;
                            for (var i in this.fileBfr.objList){
                                ketemu = false;
                                for (var r=0;r < this.sgUpld.getRowCount();r++){
                                    if (this.sgUpld.cells(0,r) == this.fileBfr.get(i)){
                                        ketemu = true;
                                        break;
                                    }
                                }
							     if (!ketemu){
							         if (!first) delFile += ";";
                                     delFile += this.rootDir+"/server/media/"+this.fileBfr.get(i);
                                     first = false;
                                 }
                            }
                            if (delFile != "") this.fileUtil.deleteFiles(delFile);
                            if ((delFile != "" && this.fileBfr.getLength() > 0)){//cek dulu jika ada perbedaan , upload yg beda aja
                                this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+").. waiting upload");							
                                this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);
                            }else if (delFile == "" && this.fileBfr.getLength() > 0){//menambah
                                this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+").. waiting upload");
                                this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);
                            }else if (this.fileBfr.getLength() == 0 && this.saveFiles != ""){//baru
                                this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");							
                                this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);
                            }else if (this.saveFiles == ""){
                                system.alert(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
								this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);		
								this.sgUpld.clear(1);
							}
						}else system.info(this,result,"");
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){
	        switch(methodName){
    	       case "copyFilesTo" : 
                   if (result.indexOf("error") != -1){
        	           systemAPI.alert(result);
                   }else{ 
        		      this.app._mainForm.pesan(2,"upload "+result);	
					  system.alert(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
						this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);		
						this.sgUpld.clear(1);
        		      showProgress("delete temporary...");
        		      if (this.saveFiles !="" ) this.fileUtil.deleteFiles(this.saveFiles);
    		       }
                break;
                case "deleteFiles" :
                    hideProgress("delete temporary...");
                break;
             }
        }
	},
	
	doGridChange: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld && col == 1){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + data.tmpfile;
                this.sgUpld.cells(0,row, data.filedest);
                this.sgUpld.cells(0,row, data.filedest);
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});