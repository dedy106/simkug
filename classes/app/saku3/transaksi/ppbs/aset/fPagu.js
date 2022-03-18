window.app_saku3_transaksi_ppbs_aset_fPagu = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_aset_fPagu.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_aset_fPagu";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pagu Investasi : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Kuota","Data Kuota","Filter Cari","Upload Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Tahun","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,60,200,80,200,80]],
					readOnly:true,
					colFormat:[[5],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.c_tahun = new saiCB(this.pc1.childPage[1],{bound:[20,9,180,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Kode MTA", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Nilai Kuota", tag:1,  tipeText:ttNilai, text:"0"});
		
		this.c_tahun2 = new saiCB(this.pc1.childPage[2],{bound:[20,13,180,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_pp2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,16,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.cb_akun2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,17,200,20],caption:"Kode MTA", multiSelection:false, maxLength:10, tag:9});	
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});
		this.c_tahun3 = new saiCB(this.pc1.childPage[3],{bound:[20,13,180,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.bUpload = new button(this.pc1.childPage[3],{bound:[250,13,80,18],caption:"Simpan Upload",click:[this,"doUpload"]});
		
		this.sg = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-45],colCount:3,tag:9,
		            colTitle:["Kode Akun","Kode PP","Nilai"],
					colWidth:[[2,1,0],[100,100,100]],
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});


		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_tahun where kode_lokasi='"+this.app._lokasi+"' ");
			
			//this.pp=this.dbLib.getPeriodeFromSQL("select kode_pp as periode from agg_user where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"' ");
			
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select max(tahun) as tahun from agg_tahun where kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			this.c_tahun2.items.clear();
			var data = this.dbLib.getDataProvider("select max(tahun) as tahun from agg_tahun where kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun2.addItem(i,line.tahun);
				}
			}
			this.c_tahun3.items.clear();
			var data = this.dbLib.getDataProvider("select max(tahun) as tahun from agg_tahun where kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun3.addItem(i,line.tahun);
				}
			}
			this.cb_pp.setSQL("select kode_pp, nama from agg_pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' and tahun='"+this.tahun+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"' and block='0'  ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);	
			this.cb_pp2.setSQL("select kode_pp, nama from agg_pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' and tahun='"+this.tahun+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_akun2.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"' and block='0'  ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);	

			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_aset_fPagu.extend(window.childForm);
window.app_saku3_transaksi_ppbs_aset_fPagu.implement({
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
					
					sql.add("insert into agg_pagu_log(kode_pp,kode_akun,kode_lokasi,tahun,n_max) values ('"+this.cb_pp.getText()+"','"+this.cb_akun.getText()+"','"+this.app._lokasi+"','"+this.tahun+"',"+nilaiToFloat(this.e_nilai.getText())+")");

					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
					this.doLoad();
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	simpan2: function(){			
		try{						
			if (this.sg.getRowValidCount() > 0){
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from agg_pagu_log where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.tahun+"'");
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						sql.add("insert into agg_pagu_log(kode_pp,kode_akun,kode_lokasi,tahun,n_max) values ('"+
						this.sg.cells(1,i)+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.tahun+"','"+nilaiToFloat(this.sg.cells(2,i))+"')");
					}
				}
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
				this.doLoad();
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
					sql.add("delete from agg_pagu_log where kode_akun = '"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' and tahun='"+this.tahun+"' ");
					sql.add("insert into agg_pagu_log(kode_pp,kode_akun,kode_lokasi,tahun,n_max) values ('"+this.cb_pp.getText()+"','"+this.cb_akun.getText()+"','"+this.app._lokasi+"','"+this.tahun+"',"+nilaiToFloat(this.e_nilai.getText())+")");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
					this.doLoad();
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
					sql.add("delete from agg_pagu_log where kode_akun = '"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' and tahun='"+this.tahun+"' ");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
					this.doLoad();
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doCari:function(sender){								
		try {
			var filter = "";
			if (this.c_tahun2.getText() != "") var filter = filter+" and a.tahun = '"+this.c_tahun2.getText()+"' ";
			if (this.cb_pp2.getText() != "") var filter = filter+" and a.kode_pp = '"+this.cb_pp2.getText()+"' ";
			if (this.cb_akun2.getText() != "") var filter = filter+" and a.kode_akun = '"+this.cb_akun2.getText()+"' ";
			
			var strSQL = "select a.kode_akun,a.kode_pp,b.nama as nama_akun,c.nama as nama_pp,a.n_max,a.tahun "+
					"from agg_pagu_log a "+
					"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
		            "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.kode_akun,a.kode_pp ";	
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
	doUpload: function(){
		system.confirm(this, "upload", "Apa data sudah benar?","data diform ini apa sudah benar.");
		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					setTipeButton(tbAllFalse);
					this.doLoad();
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
			case "upload" :	
				this.simpan2();
				break;
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_pp.getText() != "" || this.cb_akun.getText() != ""){
				var strSQL = "select n_max from agg_pagu_log where kode_pp ='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_akun='"+this.cb_akun.getText()+"' and tahun='"+this.tahun+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nilai.setText(floatToNilai(line.n_max));						
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		try {
			if (sender == this.dbLib){
				try{   
					switch(methodName){
						case "execArraySQL" :	    				
							if (result.toLowerCase().search("error") == -1)					
							{
								this.app._mainForm.pesan(2,"Transaksi telah sukses tereksekusi");							
								this.app._mainForm.bClear.click();
							}else system.info(this,result,"");
						break;	      		
					}    		
				}
				catch(e){
					systemAPI.alert("step : "+step+"; error = "+e);
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				
				this.cb_pp.setText(this.sg1.cells(2,row));
				this.cb_akun.setText(this.sg1.cells(0,row));
				this.e_nilai.setText(floatToNilai(nilaiToFloat(this.sg1.cells(5,row))));
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.kode_akun,a.kode_pp,b.nama as nama_akun,c.nama as nama_pp,a.n_max,a.tahun "+
					"from agg_pagu_log a "+
					"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
		            "where a.kode_lokasi='"+this.app._lokasi+"'  and a.tahun='"+this.tahun+"' order by a.kode_akun,a.kode_pp ";	//and a.kode_pp='"+this.pp+"'	
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
			this.sg1.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.tahun,floatToNilai(line.n_max)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});