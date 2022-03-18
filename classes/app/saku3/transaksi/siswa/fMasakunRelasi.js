window.app_saku3_transaksi_siswa_fMasakunRelasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fMasakunRelasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fMasakunRelasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Master Akun Relasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Akun","Data Akun","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Curr","Modul","Jenis"],
					colWidth:[[4,3,2,1,0],[80,80,50,400,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:20,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Nama", maxLength:100, tag:1});			
		this.c_curr = new saiCB(this.pc1.childPage[1],{bound:[20,14,180,20],caption:"Currency",readOnly:true,tag:2});			
		this.c_modul = new saiCB(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Modul",items:["AKTIVA","PASIVA","LABARUGI"], readOnly:true,tag:2});
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Jenis",items:["Neraca","Pendapatan","Beban"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,22,200,20],caption:"Status Aktifasi",items:["AKTIF","BLOCK"], readOnly:true,tag:2});
		this.c_gar = new saiCB(this.pc1.childPage[1],{bound:[20,23,200,20],caption:"Status Budget",items:["0. NON","1. BUDGET"], readOnly:true,tag:2});		
		this.c_normal = new saiCB(this.pc1.childPage[1],{bound:[20,24,200,20],caption:"Normal Account",items:["D. Debet","C. Kredit"], readOnly:true,tag:2});		
				
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[5,12,990,180], childPage:["Flag Akun","Lap Keuangan","Lap Anggaran","Mapping PP"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[0,5,this.pc2.width-5,140],colCount:2,tag:9,
		            colTitle:["Kode","Deskripsi"],
					colWidth:[[1,0],[250,100]],					
					ellipsClick:[this,"doEllipsClick"],
					readOnly:true,buttonStyle:[[0],[bsEllips]],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[0,5,this.pc2.width-5,140],colCount:4,tag:9,
		            colTitle:["Kode FS","Deskripsi","Kode Lap","Deskripsi"],
					colWidth:[[3,2,1,0],[300,80,300,80]],					
					ellipsClick:[this,"doEllipsClick3"],
					readOnly:true,buttonStyle:[[0,2],[bsEllips,bsEllips]],
					autoAppend:true,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg3});		
		
		this.sg4 = new saiGrid(this.pc2.childPage[2],{bound:[0,5,this.pc2.width-5,140],colCount:4,tag:9,
		            colTitle:["Kode FS","Deskripsi","Kode Lap","Deskripsi"],
					colWidth:[[3,2,1,0],[300,80,300,80]],					
					ellipsClick:[this,"doEllipsClick4"],
					readOnly:true,buttonStyle:[[0,2],[bsEllips,bsEllips]],
					autoAppend:true,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg4});		
		
		this.sg5 = new saiGrid(this.pc2.childPage[3],{bound:[0,5,this.pc2.width-5,140],colCount:2,tag:9,
		            colTitle:["Kode","Nama"],
					colWidth:[[1,0],[300,80]],					
					ellipsClick:[this,"doEllipsClick5"],
					change:[this,"doChangeCell5"],
					readOnly:true,buttonStyle:[[0],[bsEllips]],
					autoAppend:true,defaultRow:1});		
		this.sgn5 = new portalui_sgNavigator(this.pc2.childPage[3],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg5});		
		
		/*this.sg5 = new saiGrid(this.pc2.childPage[3],{bound:[0,5,this.pc2.width-5,140],colCount:2,tag:9,				
				colTitle:["Kode","Nama"],
				colWidth:[[1,0],[300,80]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick5"],change:[this,"doChangeCell5"],
				defaultRow:1,autoAppend:true});
		this.sgn5 = new portalui_sgNavigator(this.pc2.childPage[3],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg5});	
		this.bPP = new portalui_imageButton(this.sgn5,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load PP",click:[this,"doLoadPP"]});
*/
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
			this.c_jenis.setText("Neraca");			
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("IDR");			
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fMasakunRelasi.extend(window.childForm);
window.app_saku3_transaksi_siswa_fMasakunRelasi.implement({
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
					sql.add("delete from masakun where kode_akun = '"+this.cb_kode.getText()+"'");
					sql.add("delete from relakun where kode_akun = '"+this.cb_kode.getText()+"'");
					sql.add("delete from relakungar where kode_akun = '"+this.cb_kode.getText()+"'");
					sql.add("delete from flag_relasi where kode_akun = '"+this.cb_kode.getText()+"'");
					sql.add("delete from konsol_relasi where kode_akun = '"+this.cb_kode.getText()+"'");
					
					var data = this.dbLib.getDataProvider("select kode_lokasi from lokasi",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							sql.add("insert into masakun (kode_akun,kode_lokasi,nama,modul,jenis,kode_curr,block,status_gar,normal) values "+
									"('"+this.cb_kode.getText()+"','"+line.kode_lokasi+"','"+this.e_nama.getText()+"','"+this.c_modul.getText().substr(0,1)+"','"+this.c_jenis.getText()+"','"+this.c_curr.getText()+"','0','"+this.c_gar.getText().substring(0,1)+"','"+this.c_normal.getText().substring(0,1)+"')");
							if (this.sg.getRowValidCount() > 0){
								for (var i=0;i < this.sg.getRowCount();i++){
									if (this.sg.rowValid(i)){								
										sql.add("insert into flag_relasi(kode_akun,kode_lokasi,kode_flag) values "+
												"('"+this.cb_kode.getText()+"','"+line.kode_lokasi+"','"+this.sg.cells(0,i)+"')");
									}
								}
							}
							if (this.sg3.getRowValidCount() > 0){
								for (var i=0;i < this.sg3.getRowCount();i++){
									if (this.sg3.rowValid(i)){								
										sql.add("insert into relakun (kode_neraca,kode_fs,kode_akun,kode_lokasi) values ('"+this.sg3.cells(2,i)+"','"+this.sg3.cells(0,i)+"','"+this.cb_kode.getText()+"','"+line.kode_lokasi+"')");
									}
								}
							}
							if (this.sg5.getRowValidCount() > 0){
								for (var i=0;i < this.sg5.getRowCount();i++){
									if (this.sg5.rowValid(i)){								
										sql.add("insert into relakun_pp (kode_pp,kode_akun,kode_lokasi) values ('"+this.sg5.cells(0,i)+"','"+this.cb_kode.getText()+"','"+line.kode_lokasi+"')");
									}
								}
							}
							if (this.sg4.getRowValidCount() > 0){
								for (var i=0;i < this.sg4.getRowCount();i++){
									if (this.sg4.rowValid(i)){								
										sql.add("insert into relakungar (kode_neraca,kode_fs,kode_akun,kode_lokasi) values ('"+this.sg4.cells(2,i)+"','"+this.sg4.cells(0,i)+"','"+this.cb_kode.getText()+"','"+line.kode_lokasi+"')");
									}
								}
							}
						}
					}

					//konsol relasi
					var data = this.dbLib.getDataProvider("select kode_lokasi from lokasi where kode_lokasi <> '"+this.app._kodeLokasiKonsol+"' ",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							sql.add("insert into konsol_relasi(kode_lokkonsol,akun_konsol,kode_lokasi,kode_akun,tgl_awal,tgl_akhir) values "+
									"('"+this.app._kodeLokasiKonsol+"','"+this.cb_kode.getText()+"','"+line.kode_lokasi+"','"+this.cb_kode.getText()+"',getdate(),getdate())");							
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
					sql.add("delete from masakun where kode_akun = '"+this.cb_kode.getText()+"'");
					sql.add("delete from relakun where kode_akun = '"+this.cb_kode.getText()+"'");
					sql.add("delete from relakungar where kode_akun = '"+this.cb_kode.getText()+"'");
					sql.add("delete from flag_relasi where kode_akun = '"+this.cb_kode.getText()+"'");
					sql.add("delete from konsol_relasi where kode_akun = '"+this.cb_kode.getText()+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.sg.clear(1);
					this.sg3.clear(1);
					this.sg4.clear(1);
					this.sg5.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.doLoad();
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{						
			if (sender == this.cb_kode) {
				if (this.cb_kode.getText() != "" ){
					var data = this.dbLib.getDataProvider("select nama,modul,jenis,block,status_gar,normal from masakun "+
														  "where kode_akun = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.e_nama.setText(line.nama);													
							if (line.modul == "A") this.c_modul.setText("AKTIVA");
							else {
								if (line.modul == "P") this.c_modul.setText("PASIVA");
								else if (line.modul == "L") this.c_modul.setText("LABARUGI");
							}						
							this.c_jenis.setText(line.jenis);
							if (line.block == "0") this.c_status.setText("AKTIF");
							else this.c_status.setText("BLOCK");						
							if (line.status_gar == "0") this.c_gar.setText("0. NON");
							else this.c_gar.setText("1. BUDGET");							
							if (line.normal == "D") this.c_normal.setText("D. Debet");
							else this.c_normal.setText("C. Kredit");	
																						
							var data = this.dbLib.getDataProvider("select b.kode_flag,b.nama from flag_relasi a inner join flag_akun b on a.kode_flag=b.kode_flag where a.kode_akun = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line;
								this.sg.clear();
								for (var i in data.rs.rows){
									line = data.rs.rows[i];												
									this.sg.appendData([line.kode_flag, line.nama]);
								}
							} else this.sg.clear(1);													
							
							var data = this.dbLib.getDataProvider("select b.kode_fs,b.nama as nama_fs,c.kode_neraca,c.nama as nama_lap "+
							           "from relakun a "+
							           "inner join fs b on a.kode_fs=b.kode_fs and a.kode_lokasi=b.kode_lokasi "+
									   "inner join neraca c on a.kode_neraca=c.kode_neraca and a.kode_fs=c.kode_fs and a.kode_lokasi=c.kode_lokasi "+
									   "where a.kode_akun = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line;
								this.sg3.clear();
								for (var i in data.rs.rows){
									line = data.rs.rows[i];												
									this.sg3.appendData([line.kode_fs, line.nama_fs, line.kode_neraca, line.nama_lap]);
								}
							} else this.sg3.clear(1);													
							
							var data = this.dbLib.getDataProvider("select b.kode_fs,b.nama as nama_fs,c.kode_neraca,c.nama as nama_lap "+
							           "from relakungar a "+
							           "inner join fsgar b on a.kode_fs=b.kode_fs and a.kode_lokasi=b.kode_lokasi "+
									   "inner join neracagar c on a.kode_neraca=c.kode_neraca and a.kode_fs=c.kode_fs and a.kode_lokasi=c.kode_lokasi "+
									   "where a.kode_akun = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line;
								this.sg4.clear();
								for (var i in data.rs.rows){
									line = data.rs.rows[i];												
									this.sg4.appendData([line.kode_fs, line.nama_fs, line.kode_neraca, line.nama_lap]);
								}
							} else this.sg4.clear(1);													
							
							var data = this.dbLib.getDataProvider("select b.kode_pp,b.nama from relakun_pp a inner join pp b on a.kode_pp=b.kode_pp where a.kode_akun = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by b.kode_pp",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line;
								this.sg5.clear();
								for (var i in data.rs.rows){
									line = data.rs.rows[i];												
									this.sg5.appendData([line.kode_pp, line.nama]);
								}
							} else this.sg5.clear(1);

							setTipeButton(tbUbahHapus);
						}
						else{
							this.standarLib.clearByTag(this, new Array("1"),undefined);
							setTipeButton(tbSimpan);
						}
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
											  "select kode_akun, nama  from masakun where kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(kode_akun) from masakun where kode_lokasi='"+this.app._lokasi+"' ",
											  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Flag Akun",sender,undefined, 
												  "select kode_flag,nama    from flag_akun ",
												  "select count(kode_flag)  from flag_akun ",
												  ["kode_flag","nama"],"and",["Kode","Nama"],false);				
				}						
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick3: function(sender, col, row){
		try{			
			if (sender == this.sg3) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Laporan Keuangan",sender,undefined, 
												  "select kode_fs, nama from fs where kode_lokasi='"+this.app._lokasi+"'",
												  "select count(kode_fs) from fs where kode_lokasi='"+this.app._lokasi+"'",
												  ["kode_fs","nama"],"and",["Kode","Nama"],false);				
				}
			if (col == 2){
					this.standarLib.showListData(this, "Daftar Format Lap Keuangan",sender,undefined, 
												  "select kode_neraca, nama from neraca where kode_fs='"+this.sg3.cells(0,row)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",
												  "select count(kode_neraca) from neraca where kode_fs='"+this.sg3.cells(0,row)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",
												  ["kode_neraca","nama"],"and",["Kode","Nama"],false);				
				}				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Laporan Anggaran",sender,undefined, 
												  "select kode_fs, nama from fsgar where kode_lokasi='"+this.app._lokasi+"'",
												  "select count(kode_fs) from fsgar where kode_lokasi='"+this.app._lokasi+"'",
												  ["kode_fs","nama"],"and",["Kode","Nama"],false);				
				}
			if (col == 2){
					this.standarLib.showListData(this, "Daftar Format Lap Anggaran",sender,undefined, 
												  "select kode_neraca, nama from neracagar where kode_fs='"+this.sg4.cells(0,row)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",
												  "select count(kode_neraca) from neracagar where kode_fs='"+this.sg4.cells(0,row)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",
												  ["kode_neraca","nama"],"and",["Kode","Nama"],false);				
				}				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select kode_akun,nama,kode_curr,modul,jenis from masakun where kode_lokasi='"+this.app._lokasi+"' order by kode_akun";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doCari:function(sender){						
		if (this.e_kode2.getText() != "") var filter = " kode_akun like '"+this.e_kode2.getText()+"%' and ";
		else var filter = " nama like '"+this.e_nama2.getText()+"%' and ";
		var strSQL = "select kode_akun,nama,kode_curr,modul,jenis from masakun where "+filter+" kode_lokasi='"+this.app._lokasi+"' order by kode_akun";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},	
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_akun,line.nama,line.kode_curr,line.modul,line.jenis]); 
		}
		this.sg1.setNoUrut(start);
	},
	doChangeCell5: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    			
		if (col == 0) {
			if (this.sg5.cells(0,row) != "") {
				var pp = this.dataPP.get(sender.cells(0,row));
				if (pp) sender.cells(1,row,pp);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode PP "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick5: function(sender, col, row){
		try{			
			if (sender == this.sg5) {				
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
			this.sg.clear();
			for (var i in data.rs.rows) {
				line = data.rs.rows[i];						
				this.sg5.appendData([line.kode_pp,line.nama]);
			}
		} else this.sg5.clear(1);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});