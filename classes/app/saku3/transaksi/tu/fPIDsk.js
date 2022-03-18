window.app_saku3_transaksi_tu_fPIDsk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_fPIDsk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_fPIDsk";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data SK PID", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar SK","Data SK"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:3,tag:9,
		            colTitle:["Kode","Nama","NIP"],
					colWidth:[[2,1,0],[100,500,80]],					
					readOnly:true, autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager"]});

		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No SK",maxLength:10,change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Deskripsi",maxLength:50});			
		this.cb_nik = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"ID", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});								
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Prodi",readOnly:true});									
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[5,12,990,320], childPage:["Data PID","Tarif"]});
		this.c_jenjang = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Jenjang Pddk",items:["S3","S2","S1","D3"], readOnly:true,tag:2});		
		this.l_tgl1 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tanggal Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,12,100,18],caption:"Tanggal Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,12,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.c_lokasi = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Lokasi",items:["DN","LN"], readOnly:true,tag:2});		
		this.cb_sdana = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Sumber Dana",multiSelection:false, maxLength:10, tag:1});								
		
		this.e_univ = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,300,20],caption:"Universitas",maxLength:50});			
		this.e_fak = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,300,20],caption:"Fakultas",maxLength:50});				
		this.e_pstudi = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,300,20],caption:"Program Studi",maxLength:50});				
		this.e_kota = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,300,20],caption:"Kota",maxLength:50});				
		this.e_negara = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,300,20],caption:"Negara",maxLength:50});				
		
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["Kode Param","Deskripsi","Satuan","Nilai"],
					colWidth:[[3,2,1,0],[100,80,450,100]],					
					columnReadOnly:[true,[0,1,2],[3]],
					colFormat:[[3],[cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
						
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
			this.doLoad();
			
			this.cb_nik.setSQL("select kode_dosen,nama from tu_dosen where kode_lokasi='"+this.app._lokasi+"'",["kode_dosen","nama"],false,["NIP","Nama"],"and","Data Dosen",true);
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi",true);
			this.cb_sdana.setSQL("select kode_sdana,nama from tu_sdana where kode_lokasi='"+this.app._lokasi+"'",["kode_sdana","nama"],false,["Kode","Nama"],"and","Data Sumber Dana",true);
			
			this.doLoadParam();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_fPIDsk.extend(window.childForm);
window.app_saku3_transaksi_tu_fPIDsk.implement({
	doLoadParam: function(){		
		var data = this.dbLib.getDataProvider("select kode_param,nama,sat,tarif from tu_param_pid where kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg.appendData([line.kode_param,line.nama,line.sat,floatToNilai(line.tarif)]);
			}
		} else this.sg.clear(1);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into tu_pid_sk(no_sk,keterangan,kode_lokasi, kode_dosen,jenjang,tgl_mulai,tgl_selesai,lokasi,kode_sdana,univ,fak,pstudi,kota,negara,no_kapital) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"',  '"+this.cb_nik.getText()+"','"+this.c_jenjang.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.c_lokasi.getText()+"','"+this.cb_sdana.getText()+"','"+this.e_univ.getText()+"','"+this.e_fak.getText()+"','"+this.e_pstudi.getText()+"','"+this.e_kota.getText()+"','"+this.e_negara.getText()+"','-')");
					if (this.sg.getRowValidCount() > 0) {
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								                           
								sql.add("insert into tu_pid_d (no_sk,kode_lokasi,kode_param,tarif) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+")");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from tu_pid_sk where no_sk='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tu_pid_d where no_sk='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into tu_pid_sk(no_sk,keterangan,kode_lokasi, kode_dosen,jenjang,tgl_mulai,tgl_selesai,lokasi,kode_sdana,univ,fak,pstudi,kota,negara,no_kapital) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"',  '"+this.cb_nik.getText()+"','"+this.c_jenjang.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.c_lokasi.getText()+"','"+this.cb_sdana.getText()+"','"+this.e_univ.getText()+"','"+this.e_fak.getText()+"','"+this.e_pstudi.getText()+"','"+this.e_kota.getText()+"','"+this.e_negara.getText()+"','-')");
					
					if (this.sg.getRowValidCount() > 0) {
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								                           
								sql.add("insert into tu_pid_d (no_sk,kode_lokasi,kode_param,tarif) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+")");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from tu_pid_sk where no_sk='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tu_pid_d where no_sk='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.doLoad();
					this.doLoadParam();
					setTipeButton(tbAllFalse);
					this.sg.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0])
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_nik && this.cb_nik.getText() != "") {
				var strSQL = "select kode_pp "+
				             "from tu_dosen "+
						     "where kode_dosen ='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){														
						this.cb_pp.setText(line.kode_pp);
					}					
				}
			}
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * "+
				             "from tu_pid_sk "+
						     "where no_sk ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.e_ket.setText(line.keterangan);
						this.cb_nik.setText(line.kode_dosen);
						this.c_jenjang.setText(line.jenjang);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.c_lokasi.setText(line.lokasi);
						this.cb_sdana.setText(line.kode_sdana);
						this.e_univ.setText(line.univ);
						this.e_fak.setText(line.fak);
						this.e_pstudi.setText(line.pstudi);
						this.e_kota.setText(line.kota);
						this.e_negara.setText(line.negara);
						
						var data = this.dbLib.getDataProvider("select a.kode_param,a.nama,a.sat,b.tarif "+
						                                      "from tu_param_pid a inner join tu_pid_d b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
						                                      "where b.no_sk='"+this.cb_kode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg.appendData([line.kode_param,line.nama,line.sat,floatToNilai(line.tarif)]);
							}
						} else this.sg.clear(1);
	
						setTipeButton(tbUbahHapus);
					}					
					else setTipeButton(tbSimpan);
				}
				else setTipeButton(tbSimpan);
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar  SK",sender,undefined, 
											  "select no_sk, keterangan from tu_pid_sk where no_kapital ='-' and kode_lokasi='"+this.app._lokasi+"'",
											  "select count(no_sk) from tu_pid_sk where no_kapital ='-' and kode_lokasi='"+this.app._lokasi+"'",
											  ["no_sk","keterangan"],"and",["No SK","Deskripsi"],false);				
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
	doLoad:function(sender){								
		try {
			var strSQL = "select no_sk,keterangan,kode_dosen "+
						 "from tu_pid_sk "+					 
						 "where kode_lokasi='"+this.app._lokasi+"' and no_kapital='-' order by no_sk";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.sg1.clear();
				for (var i=0;i<this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];							
					this.sg1.appendData([line.no_sk,line.keterangan,line.kode_dosen]); 
				}
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.doSelectPage(page);				
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_ket.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});