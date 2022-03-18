window.app_saku3_transaksi_bangtel_proyek_fJenisProyek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bangtel_proyek_fJenisProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_proyek_fJenisProyek";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Jenis Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Jenis","Data Jenis"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Pilih"],
					colWidth:[[2,1,0],[70,300,80]],
					readOnly:true,
					colFormat:[[2],[cfButton]],
					click:[this,"doSgBtnClick"], colAlign:[[2],[alCenter]],													 
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1,change:[this,"doChange"]});			
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"PP/Cabang", multiSelection:false, maxLength:10, tag:1});						
		this.cb_bdd = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Akun BDD", multiSelection:false, maxLength:10, tag:1});				
		this.cb_piu = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:1});				
		this.cb_pdpt = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Akun Pendapatan", multiSelection:false, maxLength:10, tag:1});						
		this.cb_pdd = new saiCBBL(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"Akun PDD", multiSelection:false, maxLength:10, tag:1});						
		this.cb_bmhd = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Akun BYMHD", multiSelection:false, maxLength:10, tag:1});				
		this.cb_pph = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Akun PPh", multiSelection:false, maxLength:10, tag:1});				
		
		this.p1 = new panel(this.pc1.childPage[1],{bound:[1,23,600,223],caption:"Akun Beban Proyek"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:2,tag:9,				
				colTitle:["Kode","Nama"],
				colWidth:[[1,0],[350,100]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:true});				
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg,visible:true});				
		
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
			
			this.dataAkun = this.app._masakun;
			this.doLoad();			

			this.cb_bdd.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_piu.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_pdpt.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_pdd.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_bmhd.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_pph.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP/Cabang",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_proyek_fJenisProyek.extend(window.childForm);
window.app_saku3_transaksi_bangtel_proyek_fJenisProyek.implement({
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
					sql.add("insert into spm_proyek_jenis(kode_jenis,kode_lokasi,nama,akun_bdd,akun_piutang,akun_pdpt,akun_bmhd,kode_pp,akun_pph,akun_pdd) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_bdd.getText()+"','"+this.cb_piu.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_bmhd.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_pph.getText()+"','"+this.cb_pdd.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)) 
								sql.add("insert into spm_proyek_jenis_d(kode_jenis,kode_lokasi,kode_akun) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"')");
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
					sql.add("delete from spm_proyek_jenis where kode_jenis= '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					sql.add("delete from spm_proyek_jenis_d where kode_jenis= '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					
					sql.add("insert into spm_proyek_jenis(kode_jenis,kode_lokasi,nama,akun_bdd,akun_piutang,akun_pdpt,akun_bmhd,kode_pp,akun_pph,akun_pdd) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_bdd.getText()+"','"+this.cb_piu.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_bmhd.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_pph.getText()+"','"+this.cb_pdd.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)) 
								sql.add("insert into spm_proyek_jenis_d(kode_jenis,kode_lokasi,kode_akun) values ('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"')");
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
					sql.add("delete from spm_proyek_jenis where kode_jenis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					sql.add("delete from spm_proyek_jenis_d where kode_jenis= '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
					this.sg.clear(1);
					setTipeButton(tbAllFalse);
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
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from spm_proyek_jenis "+
						     "where kode_jenis ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);				
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.cb_bdd.setText(line.akun_bdd);
						this.cb_piu.setText(line.akun_piutang);
						this.cb_pdpt.setText(line.akun_pdpt);
						this.cb_pdd.setText(line.akun_pdd);
						this.cb_bmhd.setText(line.akun_bmhd);
						this.cb_pph.setText(line.akun_pph);
						this.cb_pp.setText(line.kode_pp);
						
						var strSQL = "select a.kode_akun,a.nama from masakun a inner join spm_proyek_jenis_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+						 
									 "where b.kode_jenis='"+this.cb_kode.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by b.kode_akun";						
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg.appendData([line.kode_akun,line.nama]);
							}
						} else this.sg.clear(1);									
						setTipeButton(tbUbahHapus);
					}
					else{
						this.sg.clear(1);
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
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
			    this.standarLib.showListData(this, "Daftar Jenis",sender,undefined, 
											  "select kode_jenis, nama  from spm_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(*) from spm_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell: function(sender, col, row){		
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
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}				
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
			var strSQL = "select a.kode_jenis,a.nama "+
						 "from spm_proyek_jenis a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+					 
						 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_jenis";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.kode_jenis,line.nama,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col == 2) this.doDoubleClick(this.sg1,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbah);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});