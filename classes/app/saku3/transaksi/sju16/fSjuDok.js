window.app_saku3_transaksi_sju16_fSjuDok = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fSjuDok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fSjuDok";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Inisial Dokumen", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");

		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["List Format","Entry Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["Kode","Nama"],
					colWidth:[[1,0],[400,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:5,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,995,370], childPage:["Modul","Akun Dokumen","PP Dokumen","Form TCODE"]});
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,335],colCount:3,tag:0,				
				colTitle:["Status","Modul","Deskripsi"],
				colWidth:[[2,1,0],[250,90,80]],
				columnReadOnly:[true,[1,2],[0]],	
				dblClick:[this,"doDoubleClick"],			
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["TRUE","FALSE"]})]],checkItem:true,
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});

		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,335],colCount:2,tag:9,				
				colTitle:["Kode","Nama"],
				colWidth:[[1,0],[300,80]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],
				defaultRow:1,autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});				
		
		this.sgp = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:9,				
				colTitle:["Kode","Nama"],
				colWidth:[[1,0],[300,80]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClickp"],change:[this,"doChangeCellp"],
				defaultRow:1,autoAppend:true});
		this.sgnp = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sgp});	
		this.bPP = new portalui_imageButton(this.sgnp,{bound:[this.sgnp.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load PP",click:[this,"doLoadPP"]});

		this.sgm = new saiGrid(this.pc2.childPage[3],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:9,				
				colTitle:["Kode","Nama"],
				colWidth:[[1,0],[300,80]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClickm"],change:[this,"doChangeCellm"],
				defaultRow:1,autoAppend:true});
		this.sgnm = new portalui_sgNavigator(this.pc2.childPage[3],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sgm});	
		this.bMenu = new portalui_imageButton(this.sgnm,{bound:[this.sgnm.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Menu",click:[this,"doLoadForm"]});

		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	

		setTipeButton(tbSimpan);
				
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	

			var data = this.dbLib.getDataProvider("select 'FALSE' as status,modul,keterangan from periode_aktif where kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg.appendData([line.status.toUpperCase(),line.modul,line.keterangan]);
				}
			} else this.sg.clear(1);	
			this.dataAkun = this.app._masakun;
			this.dataPP = this.app._pp;

			var sql = new server_util_arrayList();
			sql.add("select kode_form,nama_form from m_form where sts_dok = '1' order by kode_form ");			
			this.dbLib.getMultiDataProviderA(sql);

			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fSjuDok.extend(window.childForm);
window.app_saku3_transaksi_sju16_fSjuDok.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from sju_dokumen where no_dokumen='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_dokakun where no_dokumen = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_dokumen_pp where no_dokumen = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_dokumen_form where no_dokumen = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i)=="TRUE") {							
							sql.add("insert into sju_dokumen(no_dokumen,kode_lokasi,nama,modul) values "+
									"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.sg.cells(1,i)+"')");
						}						
					}										
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) 
							sql.add("insert into sju_dokakun (no_dokumen,kode_lokasi,kode_akun) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"')");
					}	

					if (this.sgp.getRowValidCount() > 0){
						for (var i=0;i < this.sgp.getRowCount();i++){
							if (this.sgp.rowValid(i)){							
								sql.add("insert into sju_dokumen_pp(no_dokumen,kode_lokasi,kode_pp) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sgp.cells(0,i)+"')");								
							}
						}
					}
					if (this.sgm.getRowValidCount() > 0){
						for (var i=0;i < this.sgm.getRowCount();i++){
							if (this.sgm.rowValid(i)){							
								sql.add("insert into sju_dokumen_form(no_dokumen,kode_lokasi,kode_form) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sgm.cells(0,i)+"')");								
							}
						}
					}

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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					var data = this.dbLib.getDataProvider("select 'FALSE' as status,modul,keterangan from periode_aktif where kode_lokasi='"+this.app._lokasi+"' ",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sg.appendData([line.status.toUpperCase(),line.modul,line.keterangan]);
						}
					} else this.sg.clear(1);	
					this.sg2.clear(1);	
					this.sgp.clear(1);	
					this.sgm.clear(1);					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.doLoad();
				break;
			case "simpan" :				
				if (this.cb_kode.getText().length != 5) {
					system.alert(this,"Data tidak valid.","Kode harus 5 digit.");
					return false;						
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;											
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "FALSE") this.sg.cells(0,row,"TRUE");
		else this.sg.cells(0,row,"FALSE");
	},
	doChange: function(sender){
		try{			
			if (this.cb_kode.getText() != ""){			
				var strSQL = "select case when b.modul is null then 'FALSE' else 'TRUE' end as status,a.modul,a.keterangan,b.nama "+
							 "from periode_aktif a left join sju_dokumen b on a.modul=b.modul and a.kode_lokasi=b.kode_lokasi and b.no_dokumen ='"+this.cb_kode.getText()+"' "+
							 "where a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																		
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sg.appendData([line.status.toUpperCase(),line.modul,line.keterangan]);
							if (line.status.toUpperCase() == "TRUE") this.e_nama.setText(line.nama);
						}					
					}					
				}


				var strSQL = "select a.kode_akun,a.nama from masakun a inner join sju_dokakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+						 
				 			 "where b.no_dokumen='"+this.cb_kode.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by b.kode_akun";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama]);
					}
				} else this.sg2.clear(1);	

				var data = this.dbLib.getDataProvider("select distinct a.kode_pp,a.nama from pp a inner join sju_dokumen_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.no_dokumen='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgp.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];								
						this.sgp.appendData([line.kode_pp,line.nama]);					
					}
				} else this.sgp.clear(1);

				var data = this.dbLib.getDataProvider("select distinct a.kode_form,a.nama_form from m_form a inner join sju_dokumen_form b on a.kode_form=b.kode_form  where b.no_dokumen='"+this.cb_kode.getText()+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgm.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];								
						this.sgm.appendData([line.kode_form,line.nama_form]);					
					}
				} else this.sgm.clear(1);

			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doChangeCell2: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on b.kode_akun=a.kode_akun and b.kode_lokasi=a.kode_lokasi where b.kode_flag in ('001','009') and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on b.kode_akun=a.kode_akun and b.kode_lokasi=a.kode_lokasi where b.kode_flag in ('001','009') and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCellp: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    			
		if (col == 0) {
			if (this.sgp.cells(0,row) != "") {
				var pp = this.dataPP.get(sender.cells(0,row));
				if (pp) sender.cells(1,row,pp);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode PP "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCellp");		
	},
	doEllipsClickp: function(sender, col, row){
		try{			
			if (sender == this.sgp) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif ='1'",
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif ='1'",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoadPP : function() {
		var data = this.dbLib.getDataProvider("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sgp.clear();
			for (var i in data.rs.rows) {
				line = data.rs.rows[i];						
				this.sgp.appendData([line.kode_pp,line.nama]);
			}
		} else this.sgp.clear(1);
	},


	doChangeCellm: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    			
		if (col == 0) {
			if (this.sgm.cells(0,row) != "") {
				var form = this.dataForm.get(sender.cells(0,row));
				if (form) sender.cells(1,row,form);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Form "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCellm");		
	},
	doEllipsClickm: function(sender, col, row){
		try{			
			if (sender == this.sgm) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Form",sender,undefined, 
							"select kode_form, nama_form  from m_form where sts_dok='1'  order by kode_form",
							"select count(kode_form) from m_form where sts_dok='1'",
							["kode_form","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoadForm : function() {
		var data = this.dbLib.getDataProvider("select kode_form,nama_form from m_form where sts_dok='1' order by kode_form",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sgm.clear();
			for (var i in data.rs.rows) {
				line = data.rs.rows[i];						
				this.sgm.appendData([line.kode_form,line.nama_form]);
			}
		} else this.sgm.clear(1);
	},


	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataForm = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataForm.set(line.kode_form, line.nama_form);										
								}								
							}													
						}else throw result;
					break;

	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){						
		var strSQL = "select distinct no_dokumen,nama "+
		             "from sju_dokumen "+
					 "where kode_lokasi='"+this.app._lokasi+"' order by no_dokumen";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_dokumen,line.nama]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
			}
		} catch(e) {alert(e);}
	}
});