window.app_saku3_transaksi_spm_fDokLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_fDokLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fDokLoad";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kelengkapan Dokumen", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		

		this.c_jenis = new saiCB(this,{bound:[20,11,200,20],caption:"Modul",items:["PB","PROYEK"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"PP/Cabang",tag:1,multiSelection:false,change:[this,"doChange"]}); 				
		this.cb_pb = new portalui_saiCBBL(this,{bound:[20,13,220,20],caption:"No PB",tag:9,multiSelection:false,change:[this,"doChange"],visible:false}); 				
		this.cb_proyek = new portalui_saiCBBL(this,{bound:[20,13,220,20],caption:"ID Proyek",tag:9,multiSelection:false,change:[this,"doChange"],visible:false}); 				

		this.pc1 = new pageControl(this,{bound:[10,18,1000,410], childPage:["Data Dokumen"]});		
		this.sgUpld = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,188],colCount:4,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload"],
					colWidth:[[3,2,1,0],[80,480,200,80]], 
					colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[0],{bound:[1,195,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});
		
		this.sg1mp2 = new saiGrid(this.pc1.childPage[0],{bound:[1,225,this.pc1.width-5,160],colCount:6,readOnly:true,tag:9,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad","Status","Modul"],
					colWidth:[[5,4,3,2,1,0],[80,80,80,380,200,80]],
					rowCount:1,colFormat:[[3],[cfButton]],
					buttonStyle:[[4],[bsAuto]], 
					picklist:[[4],[new portalui_arrayMap({items:["PAKAI","HAPUS"]})]],
					click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3, 
					pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.c_jenis.setText("");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_fDokLoad.extend(window.childForm);
window.app_saku3_transaksi_spm_fDokLoad.implement({
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
		}catch(e){
			alert(e);
		}
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
	simpan: function(){			
		try{		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					
					if (this.c_jenis.getText() == "PB") {
						var ix=0;
						for (var i=0;i < this.sgUpld.getRowCount();i++){
							if (this.sgUpld.rowValid(i)){
								ix++;											
								sql.add("insert into yk_pb_dok(no_pb,no_gambar,nu,kode_jenis,kode_lokasi,no_ref) values ('"+this.cb_pb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','"+this.cb_pb.getText()+"')");
							}	
						}				
						
						for (var i=0;i < this.sg1mp2.getRowCount();i++){
							if (this.sg1mp2.rowValid(i)){
								if (this.sg1mp2.cells(4,i) == "HAPUS") {
									sql.add("delete from yk_pb_dok where no_pb='"+this.cb_pb.getText()+"' and no_gambar='"+this.sg1mp2.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
							}	
						}
					}
					else {
						var ix=0;
						for (var i=0;i < this.sgUpld.getRowCount();i++){
							if (this.sgUpld.rowValid(i)){
								ix++;											
								sql.add("insert into spm_proyek_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,no_ref) values ('"+this.cb_proyek.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','"+this.cb_proyek.getText()+"')");
							}	
						}				
						
						for (var i=0;i < this.sg1mp2.getRowCount();i++){
							if (this.sg1mp2.rowValid(i)){
								if (this.sg1mp2.cells(4,i) == "HAPUS") {
									sql.add("delete from spm_proyek where no_bukti='"+this.cb_pb.getText()+"' and no_gambar='"+this.sg1mp2.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
							}	
						}
					}
					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_pb);
					this.sgUpld.clear(1); this.sg1mp2.clear(1);					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doChange:function(sender){		
		if (sender == this.c_jenis && this.c_jenis.getText()!=""){
			if (this.c_jenis.getText()=="PB") {
				this.cb_pb.show(); 
				this.cb_proyek.hide();
				this.cb_pb.setTag("1");
				this.cb_proyek.setTag("9");
			}
			else {
				this.cb_pb.hide(); 
				this.cb_proyek.show();
				this.cb_pb.setTag("9");
				this.cb_proyek.setTag("1");
			}
		}
		if (sender == this.cb_pp && this.cb_pp.getText()!="") {
			this.cb_pb.setSQL("select distinct a.no_pb,a.keterangan from yk_pb_m a where a.no_pb like '%PB%' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_pb","a.keterangan"],false,["No PB","Deskripsi"],"and","Data PB",true);
			this.cb_proyek.setSQL("select kode_proyek, nama from spm_proyek where kode_pp='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);			
		}			
		if (sender == this.cb_pb && this.cb_pb.getText()!="") {
			this.sg1mp2.clear();
			var data = this.dbLib.getDataProvider(
					"select b.kode_jenis,b.nama,a.no_gambar "+
					"from yk_pb_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
					"where a.no_pb = '"+this.cb_pb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1mp2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													 
					this.sg1mp2.appendData([line.kode_jenis, line.nama, line.no_gambar, "DownLoad","PAKAI","PB"]);
				}
			} else this.sg1mp2.clear(1);
		}	
		if (sender == this.cb_proyek && this.cb_proyek.getText()!="") {
			this.sg1mp2.clear();
			var data = this.dbLib.getDataProvider(
					"select b.kode_jenis,b.nama,a.no_gambar, case when no_bukti=no_ref then 'PROYEK' else 'BILL' end as modul "+
					"from spm_proyek_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
					"where a.no_ref = '"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1mp2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													 
					this.sg1mp2.appendData([line.kode_jenis, line.nama, line.no_gambar, "DownLoad","PAKAI",line.modul.toUpperCase()]);
				}
			} else this.sg1mp2.clear(1);
		}					
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.cb_pb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
												  "select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}					
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
                this.sgUpld.cells(2,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});