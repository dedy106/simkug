window.app_eclaim2_transaksi_fDokumen2 = function(owner) {
	if (owner){
		window.app_eclaim2_transaksi_fDokumen2.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_eclaim2_transaksi_fDokumen2";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelengkapan Dokumen", 0);	
		uses("uploader;saiMemo;util_file;datePicker");	
		this.ed_Periode = new saiLabelEdit(this,{bound:[20,0,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,220,20],caption:"No Dokumen",readOnly:true, maxLength:45});
		this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});
		this.cb_klaim = new saiCBBL(this,{bound:[20,3,220,20],caption:"No Klaim", btnClick:[this,"doFindBtnClick"]});
		this.ed_ket = new saiMemo(this,{bound:[20,4,600,50],caption:"Keterangan", maxLength:150});				
		
		this.p1 = new panel(this,{bound:[20,10,800,230],caption:"Upload Dokumen"});		
		this.sgUpld = new saiGrid(this.p1,{bound:[1,20,898,180],colCount:5,colTitle:["Kode Ref.","Nama Ref.","Dokumen","Upload","Keterangan Dokumen"],colFormat:[[3],[cfUpload]],
					rowCount:1,colWidth:[[4,3,2,1,0],[200,80,180,200,100]], colReadOnly: [true,[0,1,2,3],[]], change:[this,"doGridChange"],buttonStyle:[[0],[bsEllips]],ellipsClick:[this,"doEllipseClick"],tag:9});
			
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,798,25],buttonStyle:1, grid:this.sgUpld});
		this.rearrangeChild(10,23);
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
window.app_eclaim2_transaksi_fDokumen2.extend(window.childForm);
window.app_eclaim2_transaksi_fDokumen2.implement({
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
					if (result == mrOk) {
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
								this.saveFiles += this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + this.sgUpld.cells(3,i).tmpfile;
								this.dest += this.rootDir+"/server/media/" + this.sgUpld.cells(3,i).filedest;
								first = false;                        
								files.push(this.sgUpld.cells(2,i));
							}
						}
						var param = this.sgUpld.columns.get(3).param2.split("tmp/");
						sql.add("insert into tlk_dok_m (no_dok,no_klaim,kode_lokasi,tanggal,keterangan,periode,nik_user,tgl_input)values"+
							"('"+this.ed_kode.getText()+"','"+this.cb_klaim.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl.getDateString()+"','"+this.ed_ket.getText()+"',"+
							" '"+this.ed_Periode.getText()+"','"+this.app._userLog+"',now()) ");
						//sql.add("update tlk_klaim set progress='7', flag7='1' where no_klaim = '"+this.cb_klaim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						if (files.length > 0){
							var scan = "insert into tlk_dok_d (no_dok,kode_lokasi,kode_ref,no_file,nu,nik_user,tgl_input,ket_dok) values ";						
							var first = true;
							var noUrut=1;
							for (var i in files){
								if (!first) scan +=",";
								scan += "('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sgUpld.cells(0,i)+"','"+files[i]+"',"+noUrut+",'"+this.app._userLog+"',now(),'"+this.sgUpld.cells(4,i)+"') ";
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
		if (sender == this.cb_klaim){
			this.standarLib.showListData(this, "Data Klaim",sender,undefined, 
										  "select no_klaim, alamat from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and status='1' ",//
										  "select count(no_klaim) from tlk_klaim where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' and status='1' ",//"+this.app._userLog+"
										  ["no_klaim","alamat"],"and",["No Klaim","Lokasi"],false); 
		}
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Kode Referensi",sender,undefined, 
												  "select a.kode_ref, a.nama from tlk_ref a inner join tlk_klaim b on a.kode_ttg=b.kode_ttg  where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and b.no_klaim='"+this.cb_klaim.getText()+"'",
												  "select count(a.kode_ref)  from tlk_ref a inner join tlk_klaim b on a.kode_ttg=b.kode_ttg  where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and b.no_klaim='"+this.cb_klaim.getText()+"'",
												  ["a.kode_ref","a.nama"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'tlk_dok_m','no_dok',"DOK/"+this.ed_Periode.getText().substring(2)+"/",'0000'));
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
        	if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
                this.sgUpld.cells(2,row, data.filedest);
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});
