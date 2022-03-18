window.app_saku3_transaksi_uin_fRealBljDok = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fRealBljDok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fRealBljDok";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Dokumen Pendukung", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.cb_pp = new saiCBBL(this,{bound:[20,16,220,20],caption:"Fak/Unit", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Agenda","Data Agenda"]});				
		this.sg3 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
					 colTitle:["No Agenda","Tanggal","Keterangan","Total","Pilih"],
					 colWidth:[[4,3,2,1,0],[70,100,300,100,100]],readOnly:true,
					 colFormat:[[3,4],[cfNilai,cfButton]],	
					 click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
					 dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});			
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Pengajuan",click:[this,"doLoad3"]});				

		this.e_tanggal = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Tanggal", tag:1, readOnly:true});					
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,11,200,20],caption:"Total Pengajuan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Agenda",maxLength:30,readOnly:true});		
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,12,200,20],caption:"Total PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.c_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,22,200,20],caption:"Jenis", readOnly:true,tag:2});
		this.e_pph = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,22,200,20],caption:"Total PPh", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Deskripsi", readOnly:true});				
		this.e_neto = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,17,200,20],caption:"Net Pengajuan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,996,326], childPage:["Rekap RAB","Controlling","Dok Pendukung"]});												
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:19,tag:0,
					colTitle:["KdTrm","Nama Penerima","Deskripsi","IDitem","Satuan","Harga","Vol","Jumlah","PPN","PPh","Total","Output","DOutput","Komponen","Dkomponen","KdAkun","IDitem","ID","KdGiat"],
					colWidth:[[18,17,16,15,14,13,12, 11,10,9,8,7,6,5,4,3,2,1,0],[80,50,120,80,80,80,80,80,  80,80,80,80,60,80,60,60,250,150,60]],					
					readOnly:true,		
					colHide:[[0,3,11,12,13,14,15,16,17,18],[true,true,true,true,true,true,true,true,true,true]],		
					colFormat:[[5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],				
					nilaiChange:[this,"doNilaiChange1"],					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1});		
	
		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9, 
					colTitle:["KdGiat","KdOut","KdSOut","KdKmpnen","KdSKmpnen","KdAkun","Saldo Budget","Ni Pengajuan"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100]],
					colFormat:[[6,7],[cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});		

		this.sgUpld = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5, 
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height - 25,this.pc2.width-1,25],buttonStyle:1, grid:this.sgUpld});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Fakultas/Unit",true);			
			this.cb_pp.setText(this.app._kodePP);
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.doLoad3();

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fRealBljDok.extend(window.childForm);
window.app_saku3_transaksi_uin_fRealBljDok.implement({		
	doGridChange: function(sender, col, row,param1,result, data){
	    try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
            }
         }catch(e){
            alert(e+" "+data);
         }
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dok",sender,undefined, 
							"select kode_dok, nama  from uin_dok_ver where kode_lokasi='"+this.app._lokasi+"' ", 
							"select count(*) from uin_dok_ver where kode_lokasi='"+this.app._lokasi+"' ", 
							["kode_dok","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4)
				window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
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
						
					this.deletedFiles = "";	
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							if (this.deletedFiles != "") this.deletedFiles += ";";
							this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
						}
					}
					sql.add("delete from uin_aju_dok where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-"){
							ix++;
							sql.add("insert into uin_aju_dok(no_aju,no_gambar,nu,kode_dok,kode_lokasi)values('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					this.deletedFiles = "";	
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							if (this.deletedFiles != "") this.deletedFiles += ";";
							this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
						}
					}
					sql.add("delete from uin_aju_dok where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																

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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg1.clear(1); this.sg1.clear(1); this.sg2.clear(1); this.sgUpld.clear(1);
					setTipeButton(tbAllFalse);	
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.doLoad3();			
				}
				break;
			case "simpan" :	
			case "ubah" :									
				this.preView = "1";
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				this.hapus();
				break;				
		}
	},		
	doNilaiChange1: function(){
		try{
			var tot=ppn=pph=neto=0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(7,i) != ""){					
					tot += nilaiToFloat(this.sg1.cells(7,i));	
					ppn += nilaiToFloat(this.sg1.cells(8,i));					
					pph += nilaiToFloat(this.sg1.cells(9,i));					
					neto += nilaiToFloat(this.sg1.cells(10,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
			this.e_ppn.setText(floatToNilai(ppn));			
			this.e_pph.setText(floatToNilai(pph));			
			this.e_neto.setText(floatToNilai(neto));			
		}catch(e)
		{
			alert("doNilaiChange1: "+e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)	{
							if (this.preView == "1") {
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
								
								this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
								this.app._mainForm.bClear.click();
							}
							else {
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}
								this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
								this.app._mainForm.bClear.click();
							}
						}else system.info(this,result,"");
					break;				
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad3:function(sender){	
		try{		
			var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai-a.ppn-a.pph as nilai "+
						 "from uin_aju_m a "+
						 "where a.progress in ('0','V') and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' order by a.no_aju desc";							 						
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn3.rearrange();
				this.doTampilData3(1);
			} else this.sg3.clear(1);						
		}
		catch(e) {
			alert(e);
		}
	},		
	doTampilData3: function(page) {		
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg3.appendData([line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.e_nb.setText(this.sg3.cells(0,row));	
														
				var data = this.dbLib.getDataProvider(
								"select a.*,convert(varchar,a.tanggal,103) as tgl "+
								"from uin_aju_m a "+
								"where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.e_tanggal.setText(line.tgl);											
						this.e_ket.setText(line.keterangan);
						this.c_jenis.setText(line.jenis);						
					} 
				}			
				var strSQL = "select a.*,c.nama as atensi, a.total-a.ppn-a.pph as neto, a.idbukti+cast(a.nu as varchar) as iditem "+
							 "from uin_aju_d a inner join uin_atensi c on a.kode_atensi=c.kode_atensi and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_atensi,line.atensi,line.keterangan,line.idbukti,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.neto),line.kdoutput,line.kdsoutput,line.kdkmpnen,line.kdskmpnen,line.kode_akun,line.idbukti,line.nu,line.kdgiat]);
					}					
				} else this.sg1.clear(1);	
				this.sg1.validasi();

				var strSQL = "select * from uin_aju_r where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kdgiat,line.kdoutput,line.kdsoutput,line.kdkmpnen,line.kdskmpnen,line.kode_akun,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
					}					
				} else this.sg2.clear(1);	
				
				this.sgUpld.clear();
				this.deleteFiles = [];
				this.listFiles = new arrayMap();			
				var data = this.dbLib.getDataProvider("select b.kode_dok,b.nama,a.no_gambar "+
						   "from  uin_aju_dok a inner join uin_dok_ver b on a.kode_dok=b.kode_dok and a.kode_lokasi=b.kode_lokasi "+
						   "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgUpld.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.listFiles.set(line.no_gambar,line.no_gambar); 
						this.sgUpld.appendData([line.kode_dok, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);
					}
				} else this.sgUpld.clear(1);
				
			}
		} catch(e) {alert(e);}
	}
});