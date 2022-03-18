window.app_eclaim_transaksi_fAdjust = function(owner) {
	if (owner){
		window.app_eclaim_transaksi_fAdjust.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim_transaksi_fAdjust";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Adjustment", 0);	
		uses("portalui_uploader;portalui_saiMemo;util_file;portalui_datePicker;portalui_uploader;portalui_checkBox");		
		this.ed_Periode = new portalui_saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,1,100,20],caption:"Tanggal Adjustment",underline:true});
		this.dp_tgl = new portalui_datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new portalui_saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Adjustment",readOnly:true});
		this.bGen = new portalui_button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});		
		this.cb_klaim = new portalui_saiCBBL(this,{bound:[20,3,220,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"]});
		this.cb_survey = new portalui_saiCBBL(this,{bound:[20,4,220,20],caption:"No Survey", btnClick:[this,"doFindBtnClick"]});
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[20,6,350,20],caption:"No Dokumen", maxLength:45});		
		this.ed_dp = new portalui_saiLabelEdit(this,{bound:[20,7,200,20],caption:"Nilai DP/COA",tipeText:ttNilai});	
		this.ed_nilai = new portalui_saiLabelEdit(this,{bound:[20,8,200,20],caption:"Nilai Adjustment",tipeText:ttNilai});	
		this.ed_tuntutan = new portalui_saiLabelEdit(this,{bound:[20,7,200,20],caption:"Nilai Tuntutan",tipeText:ttNilai});	
		this.ed_nilaiDdct = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Nilai Deductible",tipeText:ttNilai});		
		this.ed_ket = new portalui_saiMemo(this,{bound:[20,9,500,50],caption:"Keterangan", maxLength:150});		
		this.p1 = new portalui_panel(this,{bound:[20,10,600,230],caption:"Upload Dokumen (Max 2 Mb)"});
		this.sgUpld = new portalui_saiGrid(this.p1,{bound:[1,20,598,180],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					colWidth:[[1,0],[80,480]], readOnly:true, change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height - 25,598,25],buttonStyle:1, grid:this.sgUpld});
		this.rearrangeChild(10,23);
		this.cb_aktif = new portalui_checkBox(this,{bound:[530,this.ed_ket.top,100,20],caption:"Status Aktif", selected:true});		
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
		this.ed_Periode.setText(this.dp_tgl.getThnBln());
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.fileUtil.getRootDir();			
		this.separator = "/";
		this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);	
		
		this.onClose.set(this,"doClose");
	}
};
window.app_eclaim_transaksi_fAdjust.extend(window.portalui_childForm);
window.app_eclaim_transaksi_fAdjust.implement({
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
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();
						this.saveFiles = "", this.dest = "", first = true;
						var files = [];
						for (var i=0; i < this.sgUpld.getRowCount();i++){		
							if (this.sgUpld.cells(0,i) != ""){ 
								if (!first) { 
									this.saveFiles += ";";
									this.dest += ";";
								}                               
								this.saveFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(1,i).tmpfile;
								this.dest += this.rootDir+"/server/media/" + this.sgUpld.cells(1,i).filedest;
								first = false;                       
								files.push(this.sgUpld.cells(0,i));
							}
						}
						var param = this.sgUpld.columns.get(1).param2.split("tmp/");
						/*
						if (this.cb_aktif.isSelected())
							sql.add("update eclaim_adjust set status = '0' where kode_lokasi = '"+this.app._lokasi+"' and  no_survey = '"+this.cb_survey.getText()+"' and no_klaim ='"+this.cb_klaim.getText()+"' ");
						*/
						
						sql.add("insert into eclaim_adjust (no_adjust, no_survey, no_klaim, periode, tanggal, no_dokumen,nilai,nilai_dp, keterangan, nilai_ddct,kode_lokasi, tgl_input, nik_user,status,kode_ttg,nilai_tuntutan)values"+
							"('"+this.ed_kode.getText()+"','"+this.cb_survey.getText()+"','"+this.cb_klaim.getText()+"','"+this.ed_Periode.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_dok.getText()+"',"+
							parseNilai(this.ed_nilai.getText())+","+parseNilai(this.ed_dp.getText())+",'"+this.ed_ket.getText()+"','"+parseNilai(this.ed_nilaiDdct.getText())+"','"+this.app._lokasi+"',now(),'"+this.app._userLog+"','"+aktif+"','"+this.app._kodeTtg+"',"+parseNilai(this.ed_tuntutan.getText())+") ");
						sql.add("update eclaim_klaim set progress = '4' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_ttg ='"+this.app._kodeTtg+"' ");
						if (files.length > 0){
							var scan = "insert into eclaim_adjust_dok (no_adjust,kode_lokasi,no_file,nama,nu,kode_ttg) values ";						
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
		if (sender == this.cb_survey){
			this.standarLib.showListData(this, "Data Survey",sender,undefined, 
										  "select no_survey, keterangan from eclaim_survey where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+this.cb_klaim.getText()+"'  ",
										  "select count(no_survey) from eclaim_survey where kode_lokasi = '"+this.app._lokasi+"' and no_klaim='"+this.cb_klaim.getText()+"'  ",
										  ["no_survey","keterangan"],"and",["No Survey","Keterangan"],false); 
		}
		if (sender == this.cb_klaim){
			this.standarLib.showListData(this, "Data Klaim",sender,undefined, 
										  "select no_klaim, penyebab from eclaim_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('3') ",
										  "select count(no_klaim) from eclaim_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and progress in ('3')  ",
										  ["no_klaim","penyebab"],"and",["No Klaim","Keterangan"],false); 
		}
	},
	doChange: function(sender){		
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'eclaim_adjust','no_adjust',"ADJ/"+this.ed_Periode.getText().substring(2)+"/",'0000'));
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
                            if (this.saveFiles != ""){//baru
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
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});