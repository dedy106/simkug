window.app_saku3_transaksi_ppbs_fPaKaryawan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaKaryawan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaKaryawan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Karyawan","Data Karyawan","Filter Cari","Upload Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["NIK","Nama","Status SDM","Jabatan","Tahun","Kode PP"],
					colWidth:[[5,4,3,2,1,0],[80,80,100,100,200,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.c_tahun = new saiCB(this.pc1.childPage[1],{bound:[20,9,180,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"NIK",maxLength:20,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:150, tag:1});	
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,17,202,20],caption:"Kode PP",tag:2,multiSelection:false});
		this.e_status = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,400,20],caption:"Status", maxLength:150, tag:1});
		this.e_jab = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Jabatan", maxLength:150, tag:1});
		this.c_tahun2 = new saiCB(this.pc1.childPage[2],{bound:[20,13,180,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,300,20],caption:"Nama",maxLength:50,tag:9});
		this.cb_pp2 = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,17,202,20],caption:"Kode PP",tag:2,multiSelection:false});
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});
		this.bUpload = new button(this.pc1.childPage[3],{bound:[30,16,80,18],caption:"Simpan Upload",click:[this,"doUpload"]});
		/*
		this.sg = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["NIK","Nama","Status SDM","Jabatan","Tahun","Kode PP"],
					colWidth:[[5,4,3,2,1,0],[80,80,300,100]],
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		*/
		this.sg = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["NIK","Nama","Status SDM","Jabatan","Tahun","Kode PP"],
					colWidth:[[5,4,3,2,1,0],[80,80,100,100,200,100]],
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
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			this.c_tahun2.items.clear();
			var data = this.dbLib.getDataProvider("select distinct tahun from agg_rektor order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun2.addItem(i,line.tahun);
				}
			}
			this.cb_pp.setSQL("select kode_pp, nama from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp2.setSQL("select kode_pp, nama from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaKaryawan.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaKaryawan.implement({
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
					sql.add("insert into agg_karyawan(nik,nama,kode_lokasi,status_sdm,tahun,jabatan,kode_pp) values ('"+
							this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.e_status.getText().substr(0,1)+"','"+this.c_tahun.getText()+"','"+this.e_jab.getText()+"','"+this.cb_pp.getText()+"')");
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
	simpan2: function(){			
		try{						
			if (this.sg.getRowValidCount() > 0){
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from agg_karyawan where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						sql.add("insert into agg_karyawan(nik,nama,kode_lokasi,status_sdm,jabatan,tahun,kode_pp) values ('"+
						this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"')");
					}
				}
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
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
					sql.add("delete from agg_karyawan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
					sql.add("insert into agg_karyawan(nik,nama,kode_lokasi,status_sdm,tahun,jabatan,kode_pp) values ('"+
							this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.e_status.getText().substr(0,1)+"','"+this.c_tahun.getText()+"','"+this.e_jab.getText()+"','"+this.cb_pp.getText()+"')");
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
					sql.add("delete from agg_karyawan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");			
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
	doUpload: function(){
		system.confirm(this, "upload", "Apa data sudah benar?","data diform ini apa sudah benar.");
		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
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
			if (this.cb_kode.getText() != ""){
				var strSQL = "select nik,nama,tahun from agg_karyawan where nik ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
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
	doCari:function(sender){								
		try {
			var filter = "";
			if (this.e_kode2.getText() != "") var filter = filter+" and kode_drk like '%"+this.e_kode2.getText()+"%' ";
			if (this.e_nama2.getText() != "") var filter = filter+" and nama like  '%"+this.e_nama2.getText()+"%' ";
			if (this.cb_pp2.getText() != "") var filter = filter+" and kode_pp = '"+this.cb_pp2.getText()+"' ";
			
			var strSQL = "select nik,nama,tahun,status_sdm,jabatan,kode_pp "+
		             "from agg_karyawan where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' "+filter+" order by nik ";
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
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Flag Akun",sender,undefined, 
											  "select nik, nama  from agg_rektor where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from agg_rektor where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"where",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));	
				this.e_status.setText(this.sg1.cells(2,row));	
				this.e_jab.setText(this.sg1.cells(3,row));	
				this.c_tahun.setText(this.sg1.cells(4,row));
				this.cb_pp.setText(this.sg1.cells(5,row));					
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select nik,nama,tahun,status_sdm,jabatan,kode_pp "+
		             "from agg_karyawan where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' order by nik ";		
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
			this.sg1.appendData([line.nik,line.nama,line.status_sdm,line.jabatan,line.tahun,line.kode_pp]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});