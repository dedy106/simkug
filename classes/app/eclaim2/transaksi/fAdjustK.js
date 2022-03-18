window.app_eclaim2_transaksi_fAdjustK = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fAdjustK.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fAdjustK";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Adjustment : Koreksi", 0);	
		uses("portalui_uploader;portalui_saiMemo;util_file;portalui_datePicker;portalui_uploader;portalui_checkBox");		
		this.ed_periode = new portalui_saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,1,100,20],caption:"Tanggal Adjustment",underline:true});
		this.dp_tgl = new portalui_datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new portalui_saiCBBL(this,{bound:[20,2,220,20],caption:"No Adjustment",readOnly:true,change:[this,"doChange"], btnClick:[this,"doFindBtnClick"], rightLabelVisible:false});		
		this.cb_klaim = new portalui_saiCBBL(this,{bound:[20,3,220,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"]});
		this.cb_survey = new portalui_saiCBBL(this,{bound:[20,4,200,20],caption:"No Survey", btnClick:[this,"doFindBtnClick"]});
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[20,6,350,20],caption:"No Dokumen", maxLength:45});		
		//this.ed_dp = new portalui_saiLabelEdit(this,{bound:[20,7,200,20],caption:"Nilai DP",tipeText:ttNilai});	
		this.ed_nilaiEst = new saiLabelEdit(this,{bound:[20,7,200,20],caption:"Nilai Estimasi",tipeText:ttNilai});
		this.ed_nilai = new portalui_saiLabelEdit(this,{bound:[20,8,200,20],caption:"Nilai Adjust",tipeText:ttNilai});
		this.ed_nilaiDdct = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Nilai Deductable",tipeText:ttNilai});
		this.ed_ket = new portalui_saiMemo(this,{bound:[20,9,500,50],caption:"Keterangan", maxLength:150});			
		this.p1 = new portalui_panel(this,{bound:[20,10,600,230],caption:"Upload Dokumen"});
		this.sgUpld = new portalui_saiGrid(this.p1,{bound:[1,20,598,180],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					colWidth:[[1,0],[80,480]], readOnly:true, change:[this,"doGridChange"],tag:9});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height - 25,598,25],buttonStyle:1, grid:this.sgUpld});
		this.rearrangeChild(10,23);
		this.cb_aktif = new portalui_checkBox(this,{bound:[530,this.ed_ket.top,100,20],caption:"Status Aktif"});
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
window.app_eclaim2_transaksi_fAdjustK.extend(window.portalui_childForm);
window.app_eclaim2_transaksi_fAdjustK.implement({
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
			var aktif = this.cb_aktif.isSelected() ? "1" : "0";
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.eKontrak);		
						this.sgUpld.clear(1);
					}
				break;
				case "ubah" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						//this.doClick();
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
						var param = this.sgUpld.columns.get(1).param2.split("tmp/");
						sql.add("delete from tlk_adjust where kode_lokasi = '"+this.app._lokasi+"' and no_adjust = '"+this.ed_kode.getText()+"' ");
						sql.add("delete from tlk_adjust_dok where kode_lokasi = '"+this.app._lokasi+"' and no_adjust = '"+this.ed_kode.getText()+"' ");
						if (this.cb_aktif.isSelected())
							sql.add("update tlk_adjust set status = '0' where kode_lokasi = '"+this.app._lokasi+"' and  no_survey = '"+this.cb_survey.getText()+"' and no_klaim ='"+this.cb_klaim.getText()+"' ");
							
						sql.add("update tlk_adjust set status = '0' where kode_lokasi = '"+this.app._lokasi+"' and  no_survey = '"+this.cb_survey.getText()+"' and no_klaim ='"+this.cb_klaim.getText()+"' ");
						sql.add("insert into tlk_adjust (no_adjust, no_survey, no_klaim, periode, tanggal, no_dokumen,nilai,nilai_dp, keterangan,nilai_ddct,  kode_lokasi, tgl_input, nik_user,status)values"+
							"('"+this.ed_kode.getText()+"','"+this.cb_survey.getText()+"','"+this.cb_klaim.getText()+"','"+this.ed_periode.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_dok.getText()+"',"+
							parseNilai(this.ed_nilai.getText())+",0,'"+this.ed_ket.getText()+"','"+parseNilai(this.ed_nilaiDdct.getText())+"','"+this.app._lokasi+"',now(),'"+this.app._userLog+"','"+aktif+"') ");
						sql.add("update tlk_klaim set progress = '6',flag6='1',nilai="+parseNilai(this.ed_nilaiEst.getText())+" where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						if (files.length > 0){
							var scan = "insert into tlk_adjust_dok (no_adjust,kode_lokasi,no_file,nama,nu) values ";						
							var first = true;
							var noUrut=1;
							for (var i in files){
								if (!first) scan +=",";
								scan += "('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+files[i]+"','"+files[i]+"',"+noUrut+")";
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
					sql.add("delete from tlk_adjust where kode_lokasi = '"+this.app._lokasi+"' and no_adjust = '"+this.ed_kode.getText()+"' ");
					sql.add("delete from tlk_adjust_dok where kode_lokasi = '"+this.app._lokasi+"' and no_adjust = '"+this.ed_kode.getText()+"' ");
					sql.add("update tlk_klaim a left outer join tlk_adjust b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
						" set a.progress ='4' "+						
						" where a.no_klaim = '"+this.cb_klaim.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ");
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
		if (sender == this.cb_survey){
			this.standarLib.showListData(this, "Data Survey",sender,undefined, 
										  "select no_survey, keterangan from tlk_survey where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+this.cb_klaim.getText()+"' and nik_user = '"+this.app._userLog+"' ",
										  "select count(no_survey) from tlk_survey where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+this.cb_klaim.getText()+"' and nik_user = '"+this.app._userLog+"' ",
										  ["no_survey","keterangan"],"and",["No Survey","Keterangan"],false); 
		}
		if (sender == this.cb_klaim){
			this.standarLib.showListData(this, "Data Klaim",sender,undefined, 
										  "select no_klaim, alamat from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('6')  and status='1' ",
										  "select count(no_klaim) from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('6') and status='1' ",
										  ["no_klaim","alamat"],"and",["No Klaim","Lokasi"],false); 
		}
		if (sender == this.ed_kode){
			this.standarLib.showListData(this, "Data Adjustment",sender,undefined, 
										  "select a.no_adjust, a.keterangan from tlk_adjust a "+
										  " inner join tlk_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
										  " where a.kode_lokasi = '"+this.app._lokasi+"' and b.progress='6' ",
										  "select count(a.no_adjust) from tlk_adjust a "+
										  " inner join tlk_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
										  " where a.kode_lokasi = '"+this.app._lokasi+"'  and b.progress='6' ",
										  ["a.no_adjust","a.keterangan"],"and",["No Adjust","Keterangan"],false); 
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.ed_kode){
				if (sender.getText() != ""){	
					this.sgUpld.clear();
					var sql = new server_util_arrayList();
					sql.add("select a.*, b.penyebab, c.keterangan as ket_survey,a.nilai as nilai_est from tlk_adjust a "+
						" inner join tlk_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
						" inner join tlk_survey c on c.no_survey = a.no_survey and c.kode_lokasi = a.kode_lokasi "+
						" where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_adjust = '"+sender.getText()+"' ");
					sql.add("select nama, nu from tlk_adjust_dok where kode_lokasi =  '"+this.app._lokasi+"' and no_adjust = '"+sender.getText()+"' order by nu");
					var data = this.dbLib.getMultiDataProvider(sql,true);					
					if (typeof data != "string" && data.result[0].rs.rows[0] !== undefined){
						var detail = data.result[1];
						data = data.result[0].rs.rows[0];	
						this.ed_periode.setText(data.periode);
						this.dp_tgl.setText(data.tanggal);
						this.ed_nilaiEst.setText(floatToNilai(data.nilai_est));
						this.cb_klaim.setText(data.no_klaim,data.penyebab);
						this.cb_survey.setText(data.no_survey, data.ket_survey);
						this.ed_ket.setText(data.keterangan);
						this.ed_dok.setText(data.no_dokumen);
						this.ed_nilai.setText(floatToNilai(data.nilai));
						//this.ed_dp.setText(floatToNilai(data.nilai_dp));						
						this.ed_nilaiDdct.setText(floatToNilai(data.nilai_ddct));
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
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_adjust','no_adjust',"ADJ/"+this.ed_periode.getText().substring(2)+"/",'0000'));
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
                                system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
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
					  system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
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
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});
